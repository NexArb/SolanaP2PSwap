import React from 'react'
import { Metadata } from 'next'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'NexBridge',
  description: 'Next Gen Bridge'
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
  auth: React.ReactNode
}>

export default function DashboardLayout({ children, auth }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`text-white`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
