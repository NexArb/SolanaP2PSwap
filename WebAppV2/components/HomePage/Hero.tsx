import React from 'react'

import Button from '@/components/CommonComponents/Button'
import CustomNavbar from '@/components/CustomNavbar'

function Hero() {
  return (
    <section
      style={{
        backgroundImage: "url('/img/hero-bg-small.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
      className="flex w-full flex-col"
    >
      <CustomNavbar />
      <div className="flex min-h-[100vh] w-full flex-col items-end justify-center pb-[7vh]">
        <div className="mx-auto mb-6 text-center text-7xl font-bold leading-[86px] lg:w-[692px]">
          Digital Solutions for the Future
        </div>
        <div className="mx-auto mb-16 text-center text-2xl font-medium leading-loose lg:w-[794.88px]">
          Startup Framework gives you complete freedom over your creative
          process — you don’t have to think about any technical aspects. There
          are no limits and absolutely no coding.{' '}
        </div>
        <Button className="mx-auto mt-4 h-14 w-60 rounded-full bg-gradient-button">
          <span className="text-lg">Let's Meet</span>
        </Button>
      </div>
    </section>
  )
}

export default Hero
