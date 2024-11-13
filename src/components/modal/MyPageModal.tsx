'use client'

import { CommonModal } from '@/components/modal/CommonModal'
import { Button } from '@/components/ui/button'
import { useStatusModal } from '@/hooks/useStatusModal'
import { useRouter } from 'next/navigation'

export function MyPageModal() {
  const router = useRouter()
  const { isOpen, closeModal } = useStatusModal({
    type: 'auth',
    mode: 'mypage',
  })

  const handleLocationClick = (location: string) => {
    closeModal()
    router.push(`/${location}`)
  }

  return (
    <CommonModal
      open={isOpen}
      onClose={closeModal}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
      title="야채비빔밥1 님"
      className="h-full max-h-[280px] w-full max-w-[368px] bg-white"
    >
      <Button
        onClick={() => handleLocationClick('profile')}
        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
      >
        프로필 관리 및 수정
      </Button>
      <Button
        onClick={() => handleLocationClick('account')}
        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
      >
        계정 관리 및 수정
      </Button>
    </CommonModal>
  )
}
