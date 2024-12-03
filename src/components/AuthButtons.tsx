'use client'

import { useEffect, useState } from 'react'
import LoginButton from './LoginButton'
import MyPageButton from './MyPageButton'
import { useAuthStore } from '@/store/authStore'

interface AuthButtonsProps {
  initHasToken: boolean
}

export function AuthButtons({ initHasToken }: AuthButtonsProps) {
  const [hasToken, setHasToken] = useState<boolean>(initHasToken)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    setHasToken(isAuthenticated)
  }, [isAuthenticated])
  return <div>{!hasToken ? <LoginButton /> : <MyPageButton />}</div>
}
