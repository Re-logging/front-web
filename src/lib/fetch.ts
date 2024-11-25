import { clearToken } from '@/app/actions/auth'
import { cookies } from 'next/headers'

interface CustomRequestInit extends RequestInit {
  _retry?: boolean
}

interface FetchOptions extends RequestInit {
  data?: any
  _retry?: boolean
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function baseCustomFetch(url: string, options: FetchOptions = {}) {
  const { data, ...customOptions } = options
  const token = cookies().get('accessToken')

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...customOptions,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token.value}` : '',
        ...customOptions.headers,
      },
      body: data ? JSON.stringify(data) : null,
    })

    if (response.ok) {
      return response.json()
    }

    // 토큰 만료 시 재발급 시도
    if (response.status === 401 && !options._retry) {
      const newToken = await refreshToken()

      if (newToken) {
        // 원래 요청 재시도
        return baseCustomFetch(url, {
          ...customOptions,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newToken}`,
            ...customOptions.headers,
          },
          body: data ? JSON.stringify(data) : null,
          _retry: true,
        })
      }
    }

    throw new Error('API 요청 실패')
  } catch (error) {
    console.error('Fetch 에러:', error)
    throw error
  }
}

async function refreshToken() {
  try {
    const refreshToken = cookies().get('refreshToken')

    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다')
    }

    const response = await fetch(`${BASE_URL}/api/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken.value}`,
      },
    })

    if (!response.ok) {
      throw new Error('토큰 갱신 실패')
    }

    const data = await response.json()

    // 새 액세스 토큰 저장
    cookies().set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return data.accessToken
  } catch (error) {
    clearToken()
    console.error('토큰 갱신 에러:', error)
    throw error
  }
}

// 편의를 위한 메서드들
const customFetch = {
  get: (url: string, options?: FetchOptions): Promise<any> =>
    baseCustomFetch(url, { ...options, method: 'GET' }),

  post: (url: string, options?: FetchOptions): Promise<any> =>
    baseCustomFetch(url, { ...options, method: 'POST' }),

  put: (url: string, options?: FetchOptions): Promise<any> =>
    baseCustomFetch(url, { ...options, method: 'PUT' }),

  delete: (url: string, options?: FetchOptions): Promise<any> =>
    baseCustomFetch(url, { ...options, method: 'DELETE' }),

  // FormData 전송을 위한 특별한 메서드
  upload: async (
    url: string,
    formData: FormData,
    options: FetchOptions = {},
  ) => {
    const token = cookies().get('accessToken')
    console.log('formData:', formData)
    console.log('url:', url)
    console.log('options:', options)
    console.log('token:', token)
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        method: options.method || 'POST',
        headers: {
          Authorization: token ? `Bearer ${token?.value}` : '',
          ...options.headers,
        },
        body: formData,
      })

      if (response.ok) {
        return response.json()
      }

      if (response.status === 401 && !options._retry) {
        const newToken = await refreshToken()

        if (newToken) {
          const retryOptions: CustomRequestInit = {
            ...options,
            method: options.method || 'POST',
            headers: {
              Authorization: `Bearer ${newToken}`,
              ...options.headers,
            },
            body: formData,
            // _retry: true,
          }
          return fetch(`${BASE_URL}${url}`, retryOptions)
        }
      }

      throw new Error('API 요청 실패1')
    } catch (error) {
      console.error('Upload 에러1:', error)
      throw error
    }
  },
}

export default customFetch
