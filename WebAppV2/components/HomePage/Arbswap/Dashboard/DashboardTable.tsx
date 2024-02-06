import React from 'react'

import StarRating from './StarRating'
import { OfferListing } from '@/constants'
import { useModalStore } from '@/hooks/userStore'
import Link from 'next/link'

type OfferProps = (typeof OfferListing)[number]

function DashboardTable({ seller, payment, amount, price }: OfferProps) {
  const { toggleModal } = useModalStore()

  return (
    <tr>
      <td className="px-4 font-medium text-slate-950">
        <div className="pl-2 text-base">{seller.name}</div>
        <div className="mt-1 flex flex-row rounded-xl bg-white p-1 lg:w-28">
          <StarRating rating={seller.star} />
          <span className="ml-2 text-xs">{seller.star}</span>
        </div>
      </td>
      <td className="px-4 py-5">
        <div className="text-base font-medium">
          <span className="text-slate-950">{payment.method}</span>
          <div className="mt-2 text-indigo-500">{payment.name}</div>
          <span className="text-emerald-400">{payment.check}</span>
        </div>
      </td>
      <td className="px-4 text-base font-medium text-slate-950">{amount}</td>
      <td className="px-4 text-base font-medium text-slate-950">{price}</td>
      <td>
        <Link
          className="rounded-full bg-blue-600 px-6 py-2 outline-none"
          onClick={toggleModal}
          href={'/arbswap/dashboard/payment-method'}
        >
          <span className="text-sm">MAKE AN OFFER</span>
        </Link>
      </td>
    </tr>
  )
}

export default DashboardTable
