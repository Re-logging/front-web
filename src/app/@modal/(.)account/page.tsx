'use client'

import { CommonModal } from '@/components/modal/CommonModal'
import { useRouter } from 'next/navigation'

export default function ProfileModalRoute() {
  const router = useRouter()

  return (
    <CommonModal
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
      title="계정 관리"
      className="h-full max-h-[500px] w-full max-w-[600px] bg-white"
    >
      {/*  TODO  프로필 모달 내용  추가*/}
    </CommonModal>
  )
}
