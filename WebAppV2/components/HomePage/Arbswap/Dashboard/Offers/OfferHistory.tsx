import { OfferListing } from '@/constants'
import React, { Fragment } from 'react'
import HistoryTable from './HistoryTable'

function OfferHistory() {
  return (
    <div className="grid grid-cols-2 gap-4 text-black">
      <div>
        <div className="px-8">
          <span className="text-lg font-medium text-neutral-400">RECEIVED</span>
          <div className="w-full border border-neutral-400"></div>
        </div>
        <div className="custom-scrollbar mx-auto h-[600px] overflow-y-auto bg-zinc-100">
          <table className="mx-auto max-w-full text-black">
            <tbody>
              {OfferListing.map((item) => (
                <Fragment key={item.id}>
                  <HistoryTable {...item} />
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="px-8">
          <span className="text-lg font-medium text-neutral-400">SENT</span>
          <div className="w-full border border-neutral-400"></div>
        </div>
        <div className="custom-scrollbar mx-auto h-[600px] overflow-y-auto bg-zinc-100">
          <table className="mx-auto max-w-full text-black">
            <tbody>
              {OfferListing.map((item) => (
                <Fragment key={item.id}>
                  <HistoryTable {...item} />
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OfferHistory
