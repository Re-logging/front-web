import { useAuthStore } from '@/store/authStore'
import { OAuthRequest, OAuthResponse } from '@/types/IAuth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// 백엔드 서버로부터 리프레쉬 토큰을 요청하는 함수
export const useRefreshToken = () => {
  const { accessToken, setAccessToken } = useAuthStore()

  useEffect(() => {
    if (!accessToken) return

    const refreshTokens = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
          { credentials: 'include' },
        )

        if (!response.ok) throw new Error('리프레쉬 토큰 발급 실패')

        const { accessToken: newToken } = await response.json()
        setAccessToken(newToken)
      } catch (error) {
        console.log('리프레쉬 토큰 발급 실패:', error)
        setAccessToken(null)
      }
    }

    const intervalId = setInterval(refreshTokens, 14 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [accessToken, setAccessToken])
}

// 백엔드 서버로부터 액세스 토큰을 요청하는 함수
const getAccessToken = async ({
  authCode,
  socialType,
  redirectUri,
}: OAuthRequest): Promise<OAuthResponse> => {
  console.log('Request Payload:', { authCode, socialType, redirectUri }) // 요청 데이터 확인

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      // credentials: 'include', // 쿠키 포함
      body: JSON.stringify({ code: authCode, redirectUri, socialType }),
    },
  )

  if (!response.ok) {
    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers)
    const errorData = await response.json()
    console.error('Error details:', errorData)
    throw new Error(errorData.message || '인증 오류가 발생했습니다.')
  }

  console.log('Response data:', response.json()) // 응답 데이터 확인
  return response.json()
}

export const useAccessToken = () => {
  const router = useRouter()
  const { setAccessToken } = useAuthStore()

  return useMutation({
    mutationFn: getAccessToken,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      // router.replace('/')
    },
    onError: (error) => {
      console.error('로그인 실패', error)
      // router.replace('/')
    },
  })
}
