'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { links } from '@/constants'

function AppBar() {
  const [nav, setNav] = useState(false)

  return (
    <nav className="z-20 p-10">
      <div className="flex items-center justify-evenly p-0">
        <button
          type="button"
          aria-label="nav"
          onClick={() => setNav(!nav)}
          className="z-10 pr-4 text-gray-500 md:hidden"
        >
          <div className="justify-end space-y-2">
            <span
              className={`block h-1 w-9 rounded-sm bg-white 
                    transition-all duration-300 ease-out ${
                      nav ? 'translate-y-1.5 rotate-45' : '-translate-y-0.5'
                    }`}
            />
            <span
              className={`mx-3 block h-1 w-6 rounded-sm bg-white 
                    transition-all duration-300 ease-out ${
                      nav ? 'hidden' : '-translate-y-0.5'
                    }`}
            />
            <span
              className={`-mx-1 block h-1 w-10 rounded-sm bg-white 
                    transition-all duration-300 ease-out ${
                      nav
                        ? 'mx-0 w-9 -translate-y-1.5 -rotate-45'
                        : '-translate-y-0.5'
                    }`}
            />
          </div>
        </button>

        <div className="mr-0.5 mt-3">
          <Link href="/">
            <Image
              src="/img/nexarb_logo.png"
              width={170}
              height={38}
              alt="Nexarb Logo"
            />
          </Link>
        </div>
        <div className="mt-4 hidden items-center text-base font-semibold md:flex">
          <Link className="px-2 lg:px-5" href="/about">
            About Us
          </Link>
          <Link className="px-2 lg:px-5" href="/team">
            Our Team
          </Link>
          <Link className="px-2 lg:px-5" href="/contact">
            Contact
          </Link>
          <Link className="px-1 lg:px-3" href="/arbswap">
            <div className="rounded-full bg-gradient-button p-px">
              <div className="rounded-full bg-gradient-about px-4 py-1 text-center">
                ArbSwap
              </div>
            </div>
          </Link>
          <Link className="px-1 lg:px-3" href="/nexbridge">
            <div className="mx-2 rounded-full bg-gradient-button p-px">
              <div className="rounded-full bg-gradient-about px-4 py-1 text-center">
                NexBridge
              </div>
            </div>
          </Link>
          <Link className="px-1 lg:px-3" href="/join-us">
            <div className="rounded-full bg-blue-500 px-5 py-1">
              <span className="text-sm font-medium">Join Us</span>
            </div>
          </Link>
        </div>

        {nav && (
          <ul className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-gradient-main">
            {links.map(({ id, link }) => (
              <li key={id} className="cursor-pointer py-4 text-4xl capitalize">
                <Link onClick={() => setNav(!nav)} href={link}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default AppBar
