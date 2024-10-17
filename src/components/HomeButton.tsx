'use client'

import { useRouter } from 'next/navigation'

const HomeButton = () => {
  const router = useRouter()
  return <button onClick={() => router.push('/')}>홈</button>
}

export default HomeButton
