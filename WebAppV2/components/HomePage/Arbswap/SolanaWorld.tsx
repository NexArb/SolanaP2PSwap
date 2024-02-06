import React from 'react'
import Image from 'next/image'

const SolanaWorld = () => {
  return (
    <div className="mt-72">
      <div className="flex justify-center">
        <Image
          src={'/img/solana-world.png'}
          alt="Solana World"
          width={1255}
          height={715}
        />
      </div>
      <div className="flex justify-center">
        <p className="text-center text-5xl">
          Get ready to explore the <br /> Solana world
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <p>
          Join <b>NexArb</b> to get the latest news and start trading now.
        </p>
      </div>
      <div className="mt-20 flex justify-center">
        <button className="rounded-full bg-blue-600 px-10 py-4">
          Sign Up Now
        </button>
      </div>
    </div>
  )
}

export default SolanaWorld
