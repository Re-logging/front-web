import { useAuthStore } from '@/store/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface UpdateAccountRequest {
  name: string
}

interface UpdateAccountResponse {
  name: string
  nickname: string
  email: string
  image: string
}

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setAuth, clearAuth } = useAuthStore()

  // 계정 정보 수정
  const updateAccount = useMutation({
    mutationFn: async (data: UpdateAccountRequest) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/account`,

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
        throw new Error('계정 수정에 실패했습니다.')
      }

      return response.json() as Promise<UpdateAccountResponse>
    },
    onSuccess: (updatedUser) => {
      setAuth(updatedUser)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  // 계정 삭제
  const deleteAccount = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/withdrawal`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      )

      if (!response.ok) {
        throw new Error('회원 탈퇴에 실패했습니다.')
      }

      return response.json()
    },
    onSuccess: () => {
      clearAuth()
      queryClient.clear()
      router.push('/')
    },
  })
  return {
    updateAccount,
    deleteAccount,
  }
}
