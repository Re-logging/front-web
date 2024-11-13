'use client'
import { CommonModal } from '@/components/modal/CommonModal'
import { Button } from '@/components/ui/button'
import { useCommonModal } from '@/hooks/useCommonModal'
import { useRouter } from 'next/navigation'

const Mypage = () => {
  const { isOpen, close, setIsOpen } = useCommonModal()
  const router = useRouter()
  return (
    <div>
      <CommonModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="야채비빔밥 님"
        className="h-full max-h-[280px] w-full max-w-[368px] bg-white"
      >
        <Button
          onClick={() => {
            close()
            router.push('/profile')
          }}
          className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
        >
          프로필 관리 및 수정
        </Button>
        <Button
          onClick={() => {
            close()
            router.push('/profile')
          }}
          className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
        >
          계정 관리 및 수정
        </Button>
      </CommonModal>
    </div>
  )
}

export default Mypage
