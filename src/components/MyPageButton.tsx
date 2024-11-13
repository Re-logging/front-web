'use client'

import { Button } from '@/components/ui/button'
import { useStatusModal } from '@/hooks/useStatusModal'

export default function MyPageButton() {
  const { openModal } = useStatusModal({
    type: 'auth',
    mode: 'mypage',
  })

  return (
    <Button
      onClick={openModal}
      className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
    >
      마이페이지
    </Button>
  )
}
