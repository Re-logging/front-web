import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { MSWProvider } from './msw-provider'

export const metadata: Metadata = {
  title: 'Re-logging',
  description: 'Re-logging',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="">
        <header></header>
        <MSWProvider>{children}</MSWProvider>
        <footer>푸터</footer>
      </body>
    </html>
  )
}
