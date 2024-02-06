'use client'

import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'

function NexBridgeCustomNavbar() {
  const { address } = useAccount()

  useEffect(() => {
    if (address) {
      localStorage.setItem('address', address)
    }
  }, [address])

  return (
    <nav className="mb-6 bg-transparent pt-10 dark:bg-transparent">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <Link className="flex items-center" href="/nexbridge">
          <Image
            src="/img/nexarb_bridge.png"
            id="Layer1"
            width="120"
            height="80"
            alt="nexarb bridge image"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border bg-gray-50 bg-transparent p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
            <li className="p-3">
              <Link
                href="/nexbridge"
                className="block rounded text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            {address && (
              <li className="p-3">
                <Link
                  href="/nexbridge/pricing"
                  className="block rounded text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Pricing
                </Link>
              </li>
            )}
            {address && (
              <li className="p-3">
                <Link
                  href="/nexbridge/dasboard/[address]"
                  as={`/nexbridge/dashboard/${address}`}
                  className="block rounded text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="p-1">
              <ConnectKitButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NexBridgeCustomNavbar
