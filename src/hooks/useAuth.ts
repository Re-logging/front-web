'use client'

import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status, update } = useSession()

  return {
    session,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    updateSession: update,
  }
}
