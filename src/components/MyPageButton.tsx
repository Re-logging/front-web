'use client'

import { Button } from '@/components/ui/button'
import { useStatusModal } from '@/hooks/useStatusModal'
import { AuthProvider } from '@/components/AuthProvider'

export default function MyPageButton() {
  const { openModal } = useStatusModal({
    type: 'auth',
    mode: 'mypage',
  })

  return (
    <AuthProvider>
      <Button
        onClick={openModal}
        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
      >
        마이페이지
      </Button>
    </AuthProvider>
  )
}
