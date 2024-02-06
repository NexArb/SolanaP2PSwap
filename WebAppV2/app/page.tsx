import React from 'react'
import HomePage from '@/components/HomePage'
import HomeFooter from '@/components/CustomFooter/HomeFooter'

export default function Home() {
  return (
    <div className="bg-gradient-main text-white">
      <HomePage />
      <HomeFooter />
    </div>
  )
}
