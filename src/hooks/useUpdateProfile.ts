import { useAuthStore } from '@/store/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateProfileRequest {
  nickname: string
  image?: string
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,

        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        },
      )

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
