/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useOAuth } from '@/hooks/useOAuth'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OAuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { mutate: login } = useOAuth()
  const redirectUri = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI
  useEffect(() => {
    const authCode = searchParams.get('code')
    if (!authCode) {
      router.replace('/login?error=no_code')
      return
    }
    if (!redirectUri) {
      router.replace('/login?error=no_redirect_uri')
      return
    }
    login({ authCode, redirectUri, socialType: 'KAKAO' })
    // TODO : 카카오 및 구글 로그인 분기 처리 필요
  }, [searchParams, redirectUri])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">로그인 처리 중...</h2>
        <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  )
}
