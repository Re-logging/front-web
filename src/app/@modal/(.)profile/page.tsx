'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Pencil } from 'lucide-react'
import { DEFAULT_IMAGE } from '@/types/INews'
import { useState } from 'react'
import EditIcon from '@/assets/icon_edit.svg'

type EditingProfileProps = {
  setIsEditing: (value: boolean) => void
  handleClose: () => void
}

function BeforeEditingProfile({
  setIsEditing,
  handleClose,
}: EditingProfileProps) {
  const handleEditProfile = () => {
    setIsEditing(true)
  }
  return (
    <DialogContent className="w-full max-w-[560px] bg-white p-0">
      <DialogHeader className="p-6 pb-2">
        <div className="flex items-center justify-center">
          <DialogTitle className="text-center font-semibold">
            프로필 관리
          </DialogTitle>
        </div>
      </DialogHeader>

      <div className="px-6 pb-4">
        <p className="mb-6 text-sm text-gray-600">
          리로깅 내에서 활동하실 닉네임과 프로필사진을 설정해주세요.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-sm font-medium">
              닉네임 <span className="text-green">*</span>
            </Label>
            <Input
              disabled
              id="nickname"
              placeholder="야채비빔밥2024"
              className="w-full bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">프로필이미지</Label>
              <Label className="textLight text-textLight">
                이미지 미첨부시 랜덤이미지가 적용됩니다.
              </Label>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="relative h-32 w-32 rounded-md bg-gray-100">
                <Image
                  src={DEFAULT_IMAGE}
                  alt="Profile"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="px-6 py-4">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-2">
          <Button
            className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
            onClick={handleEditProfile}
          >
            수정하기
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
          >
            닫기
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

function AfterEditingProfile({ setIsEditing }: EditingProfileProps) {
  const handleEditProfile = () => {
    setIsEditing(false)
  }
  return (
    <DialogContent className="w-full max-w-[560px] bg-white p-0">
      <DialogHeader className="p-6 pb-2">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <EditIcon />
            <DialogTitle className="text-lg font-semibold">
              프로필 수정
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
              placeholder="야채비빔밥2024"
              className="h-10 w-full bg-gray-50"
              defaultValue="야채비빔밥2024"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">프로필이미지</Label>
              <Label className="text-sm font-medium text-textLight">
                이미지 미첨부시 랜덤이미지가 적용됩니다.
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-image"
              />
              <Label
                htmlFor="profile-image"
                className="flex h-10 w-full cursor-pointer items-center rounded-md border border-dashed border-gray-300 px-3 text-sm text-gray-500 hover:border-gray-400"
              >
                이미지를 첨부해주세요
              </Label>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="p-6 pt-4">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-2">
          <Button className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90">
            적용하기
          </Button>
          <Button
            variant="secondary"
            onClick={handleEditProfile}
            className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
          >
            취소
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}
export default function ProfileModalPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const handleExitButton = () => {
    router.back()
  }
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      {isEditing ? (
        <AfterEditingProfile
          setIsEditing={setIsEditing}
          handleClose={handleExitButton}
        />
      ) : (
        <BeforeEditingProfile
          setIsEditing={setIsEditing}
          handleClose={handleExitButton}
        />
      )}
    </Dialog>
  )
}
