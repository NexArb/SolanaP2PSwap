import React from 'react'
import Image from 'next/image'
import AppBar from '@/components/CustomNavbar'

function About() {
  return (
    <div className="min-h-screen bg-gradient-about">
      <AppBar />
      <div className="mt-24 flex justify-center">
        <div className="h-36 w-full text-center md:w-1/3">
          <h2 className="mb-5 text-4xl font-bold">About Nexarb</h2>
          <p>
            Advantages include excellent sound quality, and the fact that they
            do not require any batteries. Gamers often prefer wired headphones
            so they never have to worry about batteries dying in the middle of a
            heated match.
          </p>
        </div>
      </div>
      <div className="mt-32 grid grid-cols-3 place-items-center justify-around gap-3 p-10 sm:p-3 md:p-5">
        <div className="h-72 w-full justify-center text-center md:w-64">
          <div className="mb-5 flex justify-center">
            <Image
              src="/img/fa-briefcase.png"
              width={60}
              height={60}
              alt="Briefcase"
            />
          </div>
          <h4 className="mb-5 text-2xl">Many Useful Components</h4>
          <p>
            Startup Framework contains components and complex blocks which can
            be easily be integrated into almost any design.
          </p>
        </div>
        <div className="h-72 w-full justify-center text-center md:w-64">
          <div className="mb-5 flex justify-center">
            <Image
              src="/img/fa-compress.png"
              width={52}
              height={60}
              alt="Compress"
            />
          </div>
          <h4 className="mb-5 text-2xl">
            Responsive <br /> Layout
          </h4>
          <p>
            We haven`t forgotten about responsive layout. With Startup
            Framework, you can create a website with full mobile support.
          </p>
        </div>
        <div className="h-72 w-full justify-center text-center md:w-64">
          <div className="mb-5 flex justify-center">
            <Image
              src="/img/fa-desktop.png"
              width={65}
              height={60}
              alt="Desktop"
            />
          </div>
          <h4 className="mb-5 text-2xl">
            Retina <br /> Ready
          </h4>
          <p>
            Startup Framework works on devices supporting Retina Display. Feel
            the clarity in each pixel.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
