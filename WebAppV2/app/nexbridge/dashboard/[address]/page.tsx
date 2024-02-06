'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'

const Dashboard = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const params = useParams()
  const userAddress = params?.address?.toString()
  const router = useRouter()

  useEffect(() => {
    if (isDisconnected && isConnecting) {
      router.replace('/nexbridge')
    } else if (userAddress && userAddress !== address) {
      // Causes code smell
      // router.replace('/nexbridge')
    }
  }, [isDisconnected, isConnecting, address, userAddress, router])

  return <></>
}

export default Dashboard
