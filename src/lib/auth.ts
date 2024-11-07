import { auth } from '@/auth'
// import { fetchWithAuth } from '@/lib/fetch'

export async function getSession() {
  return await auth()
}
