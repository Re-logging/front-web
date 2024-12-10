'use client'

import Image from 'next/image'
import IcMoreIcon from '@/assets/icon_more.svg'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'

type ContentType = 'ploggingEvents' | 'ploggingMeetups'

const CommentSection = ({
  eventId,
  eventDetail,
  refetchEventDetail,
  contentType,
}: {
  eventId: string
  eventDetail: any
  refetchEventDetail: () => void
  contentType: ContentType
}) => {
  return (
    <article>
      <h2 className="text-2xl font-semibold">댓글</h2>
      <div className="mt-2 flex items-center gap-2 p-2">
        <Image
          src={eventDetail?.user?.profileImage ?? '/default_avatar.svg'}
          alt="profile"
          width={24}
          height={24}
        />
        <p className="text-xl">{eventDetail?.user?.nickname}</p>
        <p className="text-green">본인</p>
      </div>
      <CommentInput
        eventId={eventId}
        refetchEventDetail={refetchEventDetail}
        contentType={contentType}
      />
      <div className="my-8 border border-gray-300" />
      <CommentList
        eventDetail={eventDetail}
        refetchEventDetail={refetchEventDetail}
        contentType={contentType}
      />
    </article>
  )
}

export default CommentSection

const CommentInput = ({
  eventId,
  commentId,
  refetchEventDetail,
  contentType,
}: {
  eventId: string
  commentId?: string
  refetchEventDetail: () => void
  contentType: ContentType
}) => {
  const queryClient = useQueryClient()
  const [isFocus, setIsFocus] = useState(false)
  const [comment, setComment] = useState('')
  const isExceeded = comment.length >= 250

  const { mutate: createComment } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `/api/${contentType}/comments?eventId=${eventId}${commentId ? `&commentId=${commentId}` : ''}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: comment }),
        },
      )
      refetchEventDetail()
      if (!response.ok) {
        throw new Error('Failed to create comment')
      }

      return response.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', eventId] })
      setComment('')
    },

    onError: () => {
      console.log('error')
      alert('댓글 작성에 실패했습니다.')
    },
  })

  const handleSubmit = () => {
    createComment()
  }

  return (
    <div
      tabIndex={0} // 포커스를 받을 수 있도록 tabIndex 추가
      className="outline-none" // 포커스 테두리 제거
      onFocusCapture={() => setIsFocus(true)}
      onBlurCapture={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return
        setIsFocus(false)
      }}
    >
      <textarea
        placeholder="댓글을 입력하세요"
        className={`w-full resize-none rounded-xl border border-gray-300 p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isFocus ? 'h-20 border-green' : 'h-12'}`}
        value={comment}
        onChange={(e) =>
          e.target.value.length <= 250 && setComment(e.target.value)
        }
      />
      {isFocus && (
        <section className="flex items-center justify-between gap-2">
          <p
            className={`transition-colors ${isExceeded ? 'text-red-500' : 'text-gray-500'}`}
          >
            {comment.length}/250
          </p>
          <button
            type="submit"
            className="mt-1 rounded-md bg-green px-6 py-2 text-white"
            onClick={handleSubmit}
          >
            등록
          </button>
        </section>
      )}
    </div>
  )
}

const CommentList = ({
  eventDetail,
  refetchEventDetail,
  contentType,
}: {
  eventDetail: any
  refetchEventDetail: () => void
  contentType: ContentType
}) => {
  return (
    <div>
      <CommentContainer
        replyListRepresent={true}
        replyCount={eventDetail?.commentCount ?? 0}
        eventDetail={eventDetail}
        refetchEventDetail={refetchEventDetail}
        contentType={contentType}
      />
    </div>
  )
}

const CommentContainer = ({
  replyCount,
  eventDetail,
  refetchEventDetail,
  contentType,
}: {
  replyListRepresent: boolean
  replyCount: number
  eventDetail: any
  refetchEventDetail: () => void
  contentType: ContentType
}) => {
  const [replyListRepresents, setReplyListRepresents] = useState<{
    [key: string]: boolean
  }>({})

  const toggleReplyList = (commentId: string) => {
    setReplyListRepresents((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }
  return (
    eventDetail.commentList.length > 0 &&
    eventDetail.commentList.map((comment: any) => (
      <section className="p-4" key={comment.id}>
        <CommentItem
          comment={comment}
          eventId={eventDetail.id}
          contentType={contentType}
        />
        <details
          className="mt-4 [&>summary]:list-none"
          open={replyListRepresents[comment.id]}
        >
          <summary
            onClick={(e) => {
              e.preventDefault()
              toggleReplyList(comment.id)
            }}
            className={`cursor-pointer hover:underline ${replyListRepresents[comment.id] ? 'text-gray-900' : 'text-green'}`}
          >
            {`답글${replyListRepresents[comment.id] ? '보기' : '달기'}(${replyCount})`}
          </summary>
          <div className="ml-10 mt-4 flex flex-col gap-1">
            {comment.replies.length > 0 &&
              comment.replies.map((reply: any) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  eventId={eventDetail.id}
                  contentType={contentType}
                />
              ))}
            <CommentInput
              eventId={eventDetail?.id ?? ''}
              refetchEventDetail={refetchEventDetail}
              commentId={comment.id}
              contentType={contentType}
            />
          </div>
        </details>
      </section>
    ))
  )
}

const CommentItem = ({
  comment,
  eventId,
  contentType,
}: {
  comment: any
  eventId: string
  contentType: ContentType
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const { user } = useAuthStore() // 로그인한 유저 정보 가져오기

  const isAuthor = comment.userEmail === user?.email // 작성자가 본인인지 여부를 나타내는 속성
  // const isAuthor = true
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const handleEditClick = () => {
    if (!isAuthor) return
    setIsEditing(true)
    setIsDropdownOpen(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditedContent(comment.content) // 원래 내용으로 복구
  }

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `/api/${contentType}/comments?eventId=${eventId}&commentId=${comment.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: editedContent }),
        },
      )

      if (!response.ok) {
        throw new Error('댓글 수정에 실패했습니다.')
      }

      setIsEditing(false)
      // UI 업데이트 로직 추가 필요
    } catch (error) {
      console.error('댓글 수정 오류:', error)
    }
  }

  const handleDeleteComment = async () => {
    try {
      if (!isAuthor) return
      const response = await fetch(
        `/api/${contentType}/comments?eventId=${eventId}&commentId=${comment.id}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        throw new Error('댓글 삭제에 실패했습니다.')
      }

      // UI 업데이트 로직 추가 필요
    } catch (error) {
      console.error('댓글 삭제 오류:', error)
    }
  }

  return (
    <>
      <section className="flex items-center justify-between gap-2 p-2">
        <section className="flex items-center gap-2">
          <Image
            src={comment?.authorImageUrl ?? '/default_avatar.svg'}
            alt="profile"
            width={24}
            height={24}
          />
          <p className="text-xl">{comment?.authorName}</p>
        </section>
        {!isEditing && (
          <div className="relative">
            <button onClick={toggleDropdown}>
              <IcMoreIcon />
            </button>
            {isDropdownOpen && (
              <div className="absolute rounded border bg-white shadow-md">
                {isAuthor ? (
                  <>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleEditClick}
                    >
                      수정
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleDeleteComment}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    신고
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>
      {isEditing ? (
        <div className="flex gap-2 p-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full resize-none rounded-xl border p-2 text-sm"
            rows={3}
          />
          <div className="flex flex-col gap-2">
            <button
              onClick={handleEditSubmit}
              className="rounded bg-green px-3 py-1 text-sm text-white hover:bg-green/90"
            >
              완료
            </button>
            <button
              onClick={handleEditCancel}
              className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className="p-2">{comment?.content}</p>
      )}
    </>
  )
}
