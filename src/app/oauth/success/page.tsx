'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OAuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { update } = useSession()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    console.log('🌱 Received access token:', accessToken)
    if (accessToken) {
      // NextAuth 세션에 토큰 저장
      update({ accessToken })
        .then(() => {
          console.log('🐯Session updated with token')
          router.replace('/')
        })
        .catch((error) => {
          console.error('🐯Failed to update session:', error)
        })
    }
  }, [searchParams, router, update])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">로그인 처리 중...</h2>
        <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  )
}
