import { Metadata } from 'next'
import React from 'react'
import { Providers } from '../providers'
import NexBridgeCustomNavbar from '@/components/CustomNavbar/NexBridge'

export const metadata: Metadata = {
  title: 'NexBridge',
  description: 'Next Gen Bridge'
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <section>
      <Providers>
        <div
          style={{
            background: "url('/img/nexbridge.png')",
            backgroundSize: 'cover'
          }}
        >
          <NexBridgeCustomNavbar />
          {children}
        </div>
      </Providers>
    </section>
  )
}
