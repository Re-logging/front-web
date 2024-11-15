// app/oauth/success/[provider]/page.tsx
'use client'

import { useAccessToken } from '@/hooks/useOAuth'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type SocialType = 'KAKAO' | 'GOOGLE'

export default function OAuthSuccessPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { mutate: login } = useAccessToken()
  const currentProvider = params.id as string
  const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}/${currentProvider}`

  useEffect(() => {
    const handleOAuthLogin = async () => {
      try {
        const code = searchParams.get('code')
        if (!code) {
          console.error('인증 코드가 없습니다.')
          router.replace('/login?error=no_code')
          return
        }

        await login({
          authCode: code,
          redirectUri,
          socialType: currentProvider?.toUpperCase() as SocialType,
        })
      } catch (error) {
        console.error('OAuth 처리 중 오류 발생:', error)
        router.replace('/login?error=oauth_failed')
      }
    }

    handleOAuthLogin()
  }, [
    searchParams,
    currentProvider,
    router,
    login,
    params.provider,
    redirectUri,
  ])

  // 로딩 상태 표시를 위한 UI 추가
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">로그인 처리 중...</h2>
        <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
        {/* 로딩 스피너 추가 */}
        <div className="mt-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    </div>
  )
}
