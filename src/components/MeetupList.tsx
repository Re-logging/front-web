import { useState } from 'react'
import ContentList from './ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { EmptyState } from './status/EmptyStatus'
import { ErrorAlert } from './status/ErrorAlert'
import { LoadingSkeleton } from './status/LoadingSkeleton'

export default function MeetupList() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

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
