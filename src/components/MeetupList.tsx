import { useState } from 'react'
import ContentList from './ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { EmptyState } from './status/EmptyStatus'
import { ErrorAlert } from './status/ErrorAlert'
import { LoadingSkeleton } from './status/LoadingSkeleton'
import AddIcon from '@/assets/icon_add.svg'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
export default function MeetupList() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수
  const router = useRouter()
  const {
    meetupList,
    meetupListIsLoading,
    meetupListIsError,
    meetupListError,
  } = useMeetupQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (meetupListIsLoading) return <LoadingSkeleton />
  if (meetupListError || !meetupList || meetupListIsError) {
    return (
      <ErrorAlert
        error={meetupListError?.message || '데이터를 불러오는데 실패했습니다'}
      />
    )
  }
  if (meetupList.ploggingMeetupSimpleResponseList.length === 0) {
    return (
      <EmptyState
        title="플로깅 모임이 없습니다"
        description="현재 플로깅 모임이 없습니다."
      />
    )
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          {/* TODO: 지역 미지정, 등록순 버튼 추가 */}
          {/* <Button>지역 미지정</Button> // 
          <Button>등록순</Button> */}
        </div>

        <Button
          onClick={() => {
            router.push('/meetup/new')
          }}
          className="h-full max-h-[40px] w-full max-w-[200px] bg-green"
        >
          <AddIcon width="17px" height="17px" color="white"></AddIcon>새 모임
          등록하기
        </Button>
      </div>
      <ContentList
        contentData={meetupList?.ploggingMeetupSimpleResponseList}
        totalPage={meetupList?.totalPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        cotentListIsLoading={meetupListIsLoading}
        contentListIsError={meetupListIsError}
        eventType={'meetup'}
        styleType={'grid'}
      />
    </>
  )
}
