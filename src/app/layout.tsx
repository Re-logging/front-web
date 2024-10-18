import type { Metadata } from 'next'
import '@/styles/globals.css'
import CommonLayout from '@/components/layouts/CommonLayout'

export const metadata: Metadata = {
  title: 'Re-logging',
  description: 'Re-logging',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <CommonLayout>{children}</CommonLayout>
}
