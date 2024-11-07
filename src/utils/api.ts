// utils/api.ts
import { auth } from '@/auth'

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await auth()

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // 리프레시 토큰을 위한 쿠키 포함
      headers: {
        ...options.headers,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return response
  } catch (error) {
    console.error('API error:', error)
    throw error
  }
}
