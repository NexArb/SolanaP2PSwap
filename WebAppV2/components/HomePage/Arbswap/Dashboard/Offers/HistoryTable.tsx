import React from 'react'

import { OfferListing } from '@/constants'
import Image from 'next/image'

type OfferProps = (typeof OfferListing)[number]

function DashboardTable({ payment, amount, price }: OfferProps) {
  return (
    <tr className="flex items-center justify-center overflow-hidden text-base font-medium">
      <td>
        <div className="inline-flex">
          <span className="p-2">{payment.name}</span>
          <Image
            src={'/img/arrow.svg'}
            alt="arrow image"
            width={20}
            height={2}
          />
          <span className="p-2">Your Wallet</span>
        </div>
      </td>
      <td className="mt-6 flex flex-col font-medium text-slate-950">
        <span>{amount}</span>
        <span className="p-1">{price}</span>
      </td>
      <td
        className={`pl-4 ${
          payment.check === 'APPROVED' ? 'text-emerald-400' : 'text-red-500'
        }`}
      >
        {payment.check === 'APPROVED' ? 'ACCEPTED' : 'REJECTED'}
      </td>
    </tr>
  )
}

export default DashboardTable
