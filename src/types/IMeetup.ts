export type MeetupDetailType = 'prev' | 'next'

// MeetupDetailSection의 props 타입 정의
export interface IMeetupDetailSectionProps {
  meetupDetail: IMeetupContentCard | null // null 포함하여 데이터가 없을 경우 대비
  isLoading: boolean
  isError: boolean
  error: Error | null
  handleMeetupChange: (type: MeetupDetailType) => void
}

export interface ImeetupQueries {
  currentPage?: number
  pageSize?: number
  meetupId?: string
}
export interface IMeetupContentCard {
  id: number
  title: string
  region: string
  location: string
  startDate: string
  endDate: string
  imageUrl: string
  activityHours: string
  hits: number
}

// 컨텐츠 배열 타입 정의
export interface IPloggingMeetupList {
  content: IMeetupContentCard[]
}

export interface IMeetupListResponse {
  totalPage: number
  totalElements: number
  ploggingMeetupSimpleResponseList: IMeetupContentCard[]
}
