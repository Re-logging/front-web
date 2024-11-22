import { useEffect } from 'react'

export const useTokenRefresh = () => {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        await fetch('/api/auth/reissue', {
          method: 'POST',
          credentials: 'include',
        })
      } catch (error) {
        console.error('Token refresh failed:', error)
        window.location.href = '/?auth=login'
      }
    }

    // 액세스 토큰 만료 15분 전에 갱신
    const interval = setInterval(refreshToken, 45 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])
}
