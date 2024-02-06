'use client'

import BridgeOptions from '@/components/NexBridgeDashboard/BridgeOptions'
import ComposeBridge from '@/components/NexBridgeDashboard/ComposeBridge'
import React, { useState } from 'react'

const Dashboard = () => {
  const buttons = [
    { key: 'compose', value: 'Compose' },
    { key: 'bridgeOptions', value: 'Bridge Options' }
  ]

  const [initialActiveButton, setInitialActiveButton] = useState(buttons[0].key)

  const handleButtonClick = (props: any) => {
    setInitialActiveButton(props)
  }

  return (
    <div className="dashboard flexCenter my-40 font-semibold">
      <div className="h-full justify-center rounded-2xl bg-gray-700/50 py-4 shadow-lg backdrop-blur-md md:min-w-[720px] lg:min-w-[920px] xl:min-w-[1155px]">
        <div className="mx-12 my-10 grid grid-cols-1 gap-8 px-4 md:mx-40 md:grid-cols-2 ">
          {buttons.map((button) => (
            <button
              key={button.key}
              onClick={() => handleButtonClick(button.key)}
              className={`${
                initialActiveButton === button.key
                  ? 'bg-emerald-400  text-indigo-950'
                  : 'border border-emerald-500 bg-transparent text-emerald-500'
              } h-14 rounded-full `}
            >
              {button.value}
            </button>
          ))}
        </div>
        {initialActiveButton === 'compose' && <ComposeBridge />}
        {initialActiveButton === 'bridgeOptions' && <BridgeOptions />}
      </div>
    </div>
  )
}

export default Dashboard
