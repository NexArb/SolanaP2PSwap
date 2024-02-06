import { OfferListing } from '@/constants'
import React, { Fragment } from 'react'
import OffersTable from './OffersTable'

function IncomingOffers() {
  return (
    <div>
      <div className="inline-grid grid-cols-6 border-b border-neutral-400 text-lg font-medium text-neutral-400">
        <div className="ml-3 px-2 pb-1 pt-2">From</div>
        <div className="mr-2 pb-1 pt-2">Method</div>
        <div className="ml-2 px-10 pb-1 pt-2 ">Amount</div>
      </div>
      <div className="custom-scrollbar mx-auto h-[600px] overflow-y-auto bg-zinc-100 backdrop-blur-[100px]">
        <table className="mx-auto max-w-full text-black">
          <tbody>
            {OfferListing.map((item) => (
              <Fragment key={item.id}>
                <OffersTable {...item} />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IncomingOffers
