import type { Metadata } from 'next'
import CommonLayout from '@/components/layouts/CommonLayout'
import ReactQueryProviders from '@/utils/ReactQueryProvider'
import { MswComponent } from '@/components/msw.component'

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
    <CommonLayout>
      <MswComponent />
      <ReactQueryProviders>{children}</ReactQueryProviders>
    </CommonLayout>
  )
}
