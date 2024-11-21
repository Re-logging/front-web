import { useRouter } from 'next/navigation'

const api = {
  fetch: async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
      })

      // 액세스 토큰 만료
      if (response.status === 401) {
        try {
          // 토큰 재발급 시도
          await fetch('/api/auth/reissue', {
            method: 'POST',
            credentials: 'include',
          })

          // 원래 요청 재시도
          return fetch(url, options)
        } catch (error) {
          // 재발급 실패시 로그아웃 처리
          const router = useRouter()
          router.replace('/?auth=login')
          //   window.location.href = '/?auth=login'
        }
      }

      return response
    } catch (error) {
      throw error
    }
  },
}
