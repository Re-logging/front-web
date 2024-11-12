'use client'

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const MyPageButton = () => {
  return (
    <>
      <Link href="mypage">
        <Button className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text">
          마이페이지
        </Button>
      </Link>
    </>
  )
}

export default MyPageButton
