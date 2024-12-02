'use client'

import { useRouter } from 'next/navigation'
import HomeIcon from '@/assets/icon_home.svg'

interface HomeButtonProps {
  returnPath?: string
}

const HomeButton = ({ returnPath }: HomeButtonProps) => {
  const router = useRouter()
  console.log('returnPath', returnPath)
  return (
    <button
      className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-md border-none bg-solid outline-none transition-all hover:bg-gray-100 focus:outline-none"
      onClick={() => router.push(`${returnPath ?? '/'}`)}
    >
      <HomeIcon />
    </button>
  )
}

export default HomeButton
