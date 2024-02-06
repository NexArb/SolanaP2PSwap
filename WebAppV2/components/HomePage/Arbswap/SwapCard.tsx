'use client'
import React, { useState } from 'react'

const SwapCard = () => {
  const [selectedOption, setSelectedOption] = useState('buy')

  return (
    <div className="flex justify-center">
      <div className="w-96 rounded-3xl bg-gray-900 p-6 backdrop-blur-lg lg:w-96 lg:p-10">
        <div className="flex flex-col justify-between rounded-full border border-white lg:flex-row lg:items-center">
          <button
            className={`w-full rounded-t-full p-2 text-white lg:w-48 lg:rounded-l-full ${
              selectedOption === 'buy'
                ? 'bg-blue-600'
                : 'bg-transparent text-blue-600'
            }`}
            onClick={() => setSelectedOption('buy')}
          >
            Buy SOL
          </button>
          <button
            className={`w-full rounded-b-full p-2 text-white lg:w-48 lg:rounded-r-full ${
              selectedOption === 'sell'
                ? 'bg-blue-600'
                : 'bg-transparent text-blue-600'
            }`}
            onClick={() => setSelectedOption('sell')}
          >
            Sell SOL
          </button>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between text-white lg:mt-10 lg:flex-row">
          <span className="mb-2 lg:mb-0">1 SOL = 24,342 USD</span>
          <span>12.10.2023 - 22:12</span>
        </div>
        <select
          className="mt-5 w-full rounded-full bg-gray-900 px-5 py-3 text-white backdrop-blur-sm"
          defaultValue={'coin'}
          name="coin"
          id="coin"
        >
          <option value="coin">Coin</option>
          {/* Add additional coin options here */}
        </select>
        <div className="relative mt-5">
          <input
            className="w-full rounded-full bg-gray-900 px-5 py-3 text-white backdrop-blur-sm"
            placeholder="Amount"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="rounded-full bg-green-400 px-4 py-1 font-bold text-black">
              USD
            </span>
          </div>
        </div>
        <p className="ml-1 mt-3 text-xs text-gray-400 lg:ml-5">
          Minimum : 10 USD
        </p>
        <div className="mt-5 flex justify-center">
          <button
            className="rounded-full bg-gradient-to-l from-green-500 via-blue-500 to-purple-500 px-8 py-3 text-white"
            type="submit"
          >
            Search For Offers
          </button>
        </div>
      </div>
    </div>
  )
}
export default SwapCard
