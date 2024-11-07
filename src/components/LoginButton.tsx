import React from 'react'
import { Button } from './ui/button'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useSession } from 'next-auth/react'

const LoginButton = () => {
  const { openModal } = useLoginModal()
  const { data: session } = useSession()

  if (session) {
    return (
      <Button className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text">
        로그아웃
      </Button>
    )
  }
  return (
    <Button
      onClick={openModal}
      className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
    >
      로그인
    </Button>
  )
}

export default LoginButton
