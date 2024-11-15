import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type AuthProviderType = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const { accessToken } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) {
      router.replace('?auth=login')
    }
  }, [accessToken, router])

  if (!accessToken) return null

  return children
}
