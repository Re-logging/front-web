import { useAuthStore } from '@/store/authStore'

export async function AuthFetchProvider(
  url: string,
  options: RequestInit = {},
) {
  const { accessToken } = useAuthStore()
  if (!accessToken) {
    throw new Error('로그인이 필요합니다.')
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('서버 요청 중 오류가 발생했습니다.')
  }
  return response.json()
}
