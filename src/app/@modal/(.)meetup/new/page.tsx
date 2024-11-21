'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function MeetupFormModal() {
  const router = useRouter()

  // const [userInfo, setUserInfo] = useState<User>(user)
  // const [imageFile, setImageFile] = useState<File | null>(null)
  // const [previewUrl, setPreviewUrl] = useState<string>(user.image || '')
  // const { updateProfile } = useUpdateProfile()
  // const { toast } = useToast()

  // const handleEditProfile = () => {
  //   setIsEditing(false)
  // }

  // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     try {
  //       validateImage(file)
  //       setImageFile(file)
  //       const url = URL.createObjectURL(file)
  //       // setPreviewUrl(url)
  //     } catch (error) {
  //       alert(
  //         (error as Error)?.message?.toString() ||
  //           '이미지 업로드에 실패했습니다.',
  //       )
  //     }
  //   }
  // }
  // // 이미지 삭제 핸들러
  // const handleImageRemove = () => {
  //   setImageFile(null)
  //   setPreviewUrl(user.image || '')
  // }
  // const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setUserInfo((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }))
  // }

  // const handleUpdateSubmit = async () => {
  //   try {
  //     await updateProfile.mutateAsync({
  //       nickname: userInfo.nickname,
  //       image: imageFile,
  //     })
  //     toast({
  //       title: '프로필이 수정되었습니다.',
  //       description: '프로필이 성공적으로 수정되었습니다.',
  //       variant: 'default',
  //       duration: 3000,
  //     })
  //     setIsEditing(false)
  //   } catch (error) {
  //     toast({
  //       title: '프로필 수정에 실패하였습니다.',
  //       variant: 'destructive',
  //       duration: 3000,
  //     })
  //     console.error('프로필 업데이트 오류:', error)
  //   }
  // }

  // useEffect(() => {
  //   return () => {
  //     // 미리보기 URL 정리
  //     if (previewUrl && previewUrl !== user.image) {
  //       URL.revokeObjectURL(previewUrl)
  //     }
  //   }
  // }, [previewUrl, user.image])

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent className="h-dvh w-full max-w-[560px] bg-white p-0 laptop:max-h-[689px]">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-lg font-semibold">
                플로깅 모임 만들기
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-4">
          <p className="mb-6 text-sm text-gray-600">
            리로깅 내에서 활동하실 닉네임과 프로필사진을 설정해주세요.
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                닉네임 <span className="text-green">*</span>
              </Label>
              <Input
                className="h-10 w-full"
                value={1}
                name="nickname"
                // onChange={handleChangeInput}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-4">
          <div className="mx-auto flex w-full max-w-[400px] items-end gap-2">
            <Button
              variant="secondary"
              // onClick={handleEditProfile}
              className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
            >
              취소
            </Button>
            <Button
              className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90 disabled:opacity-50"
              // onClick={handleUpdateSubmit}
              // disabled={updateProfile.isPending || !userInfo.nickname}
            >
              등록하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
