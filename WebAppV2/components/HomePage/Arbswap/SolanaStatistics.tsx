import React from 'react'
import Image from 'next/image'

const SolanaStatistics = () => {
  return (
    <div>
      <div className="mt-32 flex justify-evenly">
        <div>
          <h1 className="text-center text-5xl">5M+</h1>
          <p className="opacity-50">User worldwide</p>
        </div>
        <div>
          <h1 className="text-center text-5xl">120</h1>
          <p className="opacity-50">Country Supported</p>
        </div>
        <div>
          <h1 className="text-center text-5xl">43M+</h1>
          <p className="opacity-50">Crypto Transactions</p>
        </div>
        <div>
          <h1 className="text-center text-5xl">$470B</h1>
          <p className="opacity-50">Assets on Platform</p>
        </div>
      </div>
      <div className="mt-16 h-[995px] bg-[url('/img/map.png')] bg-cover bg-no-repeat">
        <div className="mt-20 h-[995px] bg-[url('/img/ellipses.png')] bg-cover bg-no-repeat">
          <div className="flex justify-center pl-10 pt-80">
            <Image
              src={'/img/cryptocoin2.png'}
              alt="Crypto Coin 2"
              width={384}
              height={300}
            />
          </div>
          <div className="pt-28">
            <p className="text-center text-2xl tracking-widest text-orange-500">
              SEND AND RECEIEVE
            </p>
            <p className="mt-10 text-center text-5xl">
              Easily send and recieve Solana <br /> from everywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolanaStatistics
