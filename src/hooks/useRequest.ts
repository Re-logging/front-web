import { refreshAccessToken } from './useOAuth'

// API 유틸리티 정의
const authenticatedApi = {
  fetch: async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
      })

      // 액세스 토큰 만료
      if (response.status === 401) {
        console.log(
          '🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩액세스 토큰 만료🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩🇦🇩',
        )
        try {
          // 토큰 재발급 시도
          await refreshAccessToken()
          // 원래 요청 재시도
          return fetch(url, options)
        } catch (error) {
          window.location.href = '/?auth=login'
        }
      }

      return response
    } catch (error) {
      throw error
    }
  },
}

export const useRequest = () => {
  const authenticatedRequest = async (url: string, options = {}) => {
    try {
      console.log('방금 만든 useRequest 훅을 사용합니다.')
      const response = await authenticatedApi.fetch(url, options)
      return response.json()
    } catch (error) {
      console.error('authRequest API 요청 에러 ', error)
      throw error
    }
  }

  return { authenticatedRequest }
}
