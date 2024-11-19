import { IMeetupListResponse, ImeetupQueries } from '@/types/IMeetup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export async function fetchMeetupingArticle(page: number, size: number) {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('size', size.toString())
  params.append('sort', 'desc')

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/list?${params.toString()}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const fetchMeetupDetail = async (meetupId: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/${meetupId}`,
    {
      method: 'get',
    },
  ).then((res) => {
    return res.json()
  })
  return data
}

export const useMeetupQueries = ({
  currentPage,
  pageSize,
  meetupId,
}: ImeetupQueries) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const meetupListQuery = useQuery<IMeetupListResponse>({
    queryKey: ['meetupList', currentPage, pageSize],
    queryFn: () => fetchMeetupingArticle(currentPage ?? 0, pageSize ?? 15),
  })

  const meetupDetailQuery = useQuery({
    queryKey: ['meetupDetail', meetupId],
    queryFn: () => fetchMeetupDetail(meetupId ?? ''),
    enabled: !!meetupId,
  })

  // 이전/다음 이벤트 네비게이션
  const navigationMutation = useMutation({
    mutationFn: async ({
      type,
      currentId,
    }: {
      type: 'prev' | 'next'
      currentId: string
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/${currentId}/${type}`,
      )

      if (!response.ok) throw new Error(`Failed to fetch ${type} event`)

      const nextEvent = await response.json()
      // 응답에서 받은 이벤트 데이터를 바로 캐시에 저장
      queryClient.setQueryData(['meetupDetail', nextEvent.id], nextEvent)

      return nextEvent
    },
    onSuccess: (newEvent) => {
      // URL 업데이트
      router.push(`/ploggingMeetups/${newEvent.id}`)
    },
  })

  return {
    // 모임 리스트
    meetupList: meetupListQuery.data,
    meetupListIsLoading: meetupListQuery.isLoading,
    meetupListError: meetupListQuery.error,
    meetupListIsError: meetupListQuery.isError,
    // 모암 디테일
    meetupDetail: meetupDetailQuery.data,
    meetupDetailiIsLoading: meetupDetailQuery.isLoading,
    meetupDetailIsError: meetupDetailQuery.isError,
    meetupDetailError: meetupDetailQuery.error,

    navigate: navigationMutation.mutate,
    isNavigating: navigationMutation.isPending,
  }
}
