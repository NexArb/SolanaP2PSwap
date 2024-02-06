import React from 'react'

const Steps = () => {
  return (
    <div>
      <p className="mx-auto mt-48 text-center text-5xl">
        Simple steps to get started
      </p>
      <div className="mt-24 grid grid-flow-col grid-rows-3 justify-evenly gap-20">
        <div>
          <div className="flex">
            <div className="mr-4">
              <p className="text-5xl opacity-50">01.</p>
            </div>
            <div>
              <p className="text-xl">Quick sign-up</p>
              <p className="mt-3 opacity-60">It`ll take you 1 minutes top</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="mr-4">
              <p className="text-5xl opacity-50">02.</p>
            </div>
            <div>
              <p className="text-xl">Security setup</p>
              <p className="mt-3 opacity-60">It`ll take you 1 minutes top</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="mr-4">
              <p className="text-5xl opacity-50">03.</p>
            </div>
            <div>
              <p className="text-xl">Connect Wallet</p>
              <p className="mt-3 opacity-60">It`ll take you 1 minutes top</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="mr-4">
              <p className="text-5xl opacity-50">04.</p>
            </div>
            <div>
              <p className="text-xl">Start trading</p>
              <p className="mt-3 opacity-60">
                Start trading at your desired rate, and get paid.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="mr-4">
              <p className="text-5xl opacity-50">06.</p>
            </div>
            <div>
              <p className="text-xl">Quick sign-up</p>
              <p className="mt-3 opacity-60">It`ll take you 1 minutes top</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Steps
