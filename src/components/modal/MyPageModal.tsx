'use client'

import { CommonModal } from '@/components/modal/CommonModal'
import { Button } from '@/components/ui/button'
import { useStatusModal } from '@/hooks/useStatusModal'
import { useRouter } from 'next/navigation'
import ProfileIcon from '@/assets/icon_profile.svg'
import SettingIcon from '@/assets/icon_setting.svg'
import { useAuthStore } from '@/store/authStore'

export function MyPageModal() {
  const router = useRouter()
  const { isOpen, closeModal } = useStatusModal({
    type: 'auth',
    mode: 'mypage',
  })
  const { user, clearAuth } = useAuthStore()
  const handleLocationClick = (location: string) => {
    closeModal()
    router.push(`/${location}`)
  }

  const handleLogout = async () => {
    await clearAuth()
    closeModal()
  }

  console.log
  return (
    // <div className="">
    <CommonModal
      open={isOpen}
      onClose={handleLogout}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
      title={`${user?.name} 님`}
      closeButtonLabel="로그아웃"
      className="flex h-dvh w-full flex-col justify-center bg-white laptop:max-h-[280px] laptop:max-w-[368px]"
      buttonClassName="bg-white border-none  justify-end text-base"
    >
      <Button
        onClick={() => handleLocationClick('profile')}
        className="bg-hover flex justify-start rounded-md bg-white px-3 py-2 text-base font-medium text-textStrong"
      >
        <ProfileIcon /> 프로필 관리 및 수정
      </Button>
      <Button
        onClick={() => handleLocationClick('account')}
        className="flex justify-start rounded-md bg-white px-3 py-2 text-base font-medium text-textStrong"
      >
        <SettingIcon /> 계정 관리 및 수정
      </Button>
    </CommonModal>
    // </div>
  )
}
