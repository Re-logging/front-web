// lib/fetch.ts
import { getSession } from './auth'

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const session = await getSession()

  if (!session?.accessToken) {
    throw new Error('No access token found')
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
        { credentials: 'include' },
      )

      if (!refreshResponse.ok) {
        throw new Error('Failed to refresh token')
      }

      const { accessToken } = await refreshResponse.json()

      // 새 토큰으로 재요청
      return fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }

  return response
}
