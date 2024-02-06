import React from 'react'

import { OfferListing } from '@/constants'
import Button from '@/components/CommonComponents/Button'
import { useModalStore } from '@/hooks/userStore'

type OfferProps = (typeof OfferListing)[number]

function DashboardTable({ seller, payment, amount, price }: OfferProps) {
  const { toggleModal } = useModalStore()

  return (
    <tr className="flex items-center justify-center border-b border-solid border-zinc-400">
      <td className="pr-16 font-medium text-slate-950">
        <div className="pl-2 text-base">{seller.name}</div>
      </td>
      <td className="px-8 py-5">
        <div className="text-base font-medium">
          <span className="text-slate-950">{payment.method}</span>
          <div className="mt-2 text-indigo-500">{payment.name}</div>
          <span className="text-emerald-400">{payment.check}</span>
        </div>
      </td>
      <td className="flex flex-col px-8 py-5 text-base font-medium text-slate-950">
        <span>{amount}</span>
        <span>{price}</span>
      </td>
      <td>
        <Button
          className="ml-10 mr-6 border border-emerald-400 bg-emerald-400 bg-opacity-10 px-8 py-2"
          onClick={toggleModal}
        >
          <span className="text-emerald-400 ">ACCEPT</span>
        </Button>
      </td>
      <td>
        <Button
          className="mr-6 border border-red-600 bg-red-600 bg-opacity-10 px-8 py-2"
          onClick={toggleModal}
        >
          <span className="text-red-600">REJECT</span>
        </Button>
      </td>
      <td>
        <Button
          className="mr-5 border border-blue-600 bg-blue-600 bg-opacity-10 px-8 py-2"
          onClick={toggleModal}
        >
          <span className="text-blue-600">REPLY</span>
        </Button>
      </td>
    </tr>
  )
}

export default DashboardTable
