import React from 'react'
import SwapCard from './SwapCard'

const Intro = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <div className="lg:w-1/2 lg:pl-24">
        <h1 className="text-4xl lg:text-7xl">
          Fastest & secure transfer Solana
        </h1>
        <p className="mt-4 text-base lg:mt-5 lg:max-w-lg lg:text-xl">
          Join our peer-to-peer trading platform and use the fastest and most
          secure payment method for buying and selling Solana with users just
          like you.
        </p>
        <button className="mt-6 rounded-full bg-blue-600 px-6 py-3 lg:mt-10 lg:px-8 lg:py-4">
          Get Started
        </button>
      </div>
      <div className="mt-6 lg:mt-0 lg:w-1/2 lg:pl-12">
        <SwapCard />
      </div>
    </div>
  )
}

export default Intro
