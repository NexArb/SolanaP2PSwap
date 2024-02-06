'use client'

import PriceBox from '@/components/NexBridgePricing/PriceBox'
import { packages } from '@/constants'
import React from 'react'

interface Package {
  title: string
  description: string[]
  price: string
}
function NexBridgePricingPage() {
  return (
    <div className="flex justify-center p-32">
      <div className="grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((packageItem: Package) => (
          <PriceBox key={packageItem.title} package={packageItem} />
        ))}
      </div>
    </div>
  )
}

export default NexBridgePricingPage
