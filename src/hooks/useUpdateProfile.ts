import { useAuthStore } from '@/store/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateProfileRequest {
  nickname: string
  image?: File | null
}

interface UpdateProfileResponse {
  name: string
  nickname: string
  email: string
  image: string
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { setAuth } = useAuthStore()

  // 계정 정보 수정
  const updateProfile = useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const formData = new FormData()
      formData.append('nickname', data.nickname)
      if (data.image instanceof File) {
        formData.append('image', data.image)
      } else {
        formData.append('image', 'null')
      }
      const response = await fetch(`/api/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('프로필 수정에 실패했습니다.')
      }

      return response.json() as Promise<UpdateProfileResponse>
    },
    onSuccess: (updatedUser) => {
      setAuth(updatedUser)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  return {
    updateProfile,
  }
}
