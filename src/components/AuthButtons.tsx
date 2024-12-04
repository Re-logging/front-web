'use client'

import LoginButton from './LoginButton'
import MyPageButton from './MyPageButton'

interface AuthButtonsProps {
  initHasToken: boolean
}

export function AuthButtons({ initHasToken }: AuthButtonsProps) {
  return <div>{!initHasToken ? <LoginButton /> : <MyPageButton />}</div>
}
