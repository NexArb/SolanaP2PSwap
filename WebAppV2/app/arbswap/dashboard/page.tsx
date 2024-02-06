'use client'

import React, { Fragment } from 'react'

import Button from '@/components/CommonComponents/Button'
import { OfferListing } from '@/constants'
import DashboardTable from '@/components/HomePage/Arbswap/Dashboard/DashboardTable'
import getFormattedDateTime from '@/hooks/useCurrentDate'
import NexarbDropdown from '@/components/CustomDropdown'
// import useRedirectIfModalOpen from '@/hooks/useRedirectIfModalOpen'

function page() {
  // useRedirectIfModalOpen()

  return (
    <section className="flexCenter gap-6 pt-12">
      {/* Left Rectangle */}
      <div className="h-[739px] rounded-3xl border bg-zinc-100 p-9 backdrop-blur-3xl">
        <div className="text-[32px] font-bold text-slate-950">Buy SOL</div>
        <div className="mt-8 text-xl text-neutral-500">1 SOL = 24,342 USD</div>
        <div className="mt-3 text-xl text-neutral-500">
          <span>{getFormattedDateTime()}</span>
        </div>
        <form className="mt-8 flex w-full flex-col rounded-lg">
          <NexarbDropdown/>
          <select
            className="rounded-3xl border border-zinc-300 bg-white text-neutral-500"
            name="name"
            defaultValue={'DEFAULT'}
          >
            <option hidden disabled value="DEFAULT">
              Payment Method
            </option>
            <option value="xd">xd</option>
            <option value="xd">xd</option>
          </select>
          <select
            className="mt-7 rounded-3xl border border-zinc-300 bg-white text-neutral-500"
            name="name"
            defaultValue={'DEFAULT'}
          >
            <option hidden disabled value="DEFAULT">
              Amount
            </option>
            <option value="xd">xd</option>
            <option value="xd">xd</option>
          </select>
          <span className="ml-3 mt-1 text-sm text-neutral-400">
            Minimum : 10 USD
          </span>
          <select
            className="mt-5 rounded-3xl border border-zinc-300 bg-white text-neutral-500"
            name="name"
            defaultValue={'DEFAULT'}
          >
            <option hidden disabled value="DEFAULT">
              Offer Location
            </option>
            <option value="xd">xd</option>
            <option value="xd">xd</option>
          </select>
          <select
            className="mt-7 rounded-3xl border border-zinc-300 bg-white text-neutral-500"
            name="name"
            defaultValue={'DEFAULT'}
          >
            <option hidden disabled value="DEFAULT">
              Offer Owner Location
            </option>
            <option value="xd">xd</option>
            <option value="xd">xd</option>
          </select>
          <div className="mt-7 flex flex-row justify-around">
            <span className="text-xl font-medium text-neutral-500">
              Verified Users Only
            </span>
            <label htmlFor="c1">
              <div className="flexCenter group rounded-[10px]">
                <input
                  id="c1"
                  type="checkbox"
                  className="h-6 w-6 cursor-pointer appearance-none rounded-[10px] bg-teal-400 text-teal-400 focus:ring-teal-100"
                />
              </div>
            </label>
          </div>
          <div className="flexCenter mt-32 flex-1">
            <Button className="h-12 w-60 bg-gradient-button">
              <span className="text-lg">Search for Offers</span>
            </Button>
          </div>
        </form>
      </div>
      {/* Right Rectangle */}
      <div className="max-h-[739px] max-w-4xl flex-grow scroll-p-96 overflow-hidden rounded-3xl border bg-zinc-100 px-7  backdrop-blur-[100px]">
        <div className="text-black">
          <div className="m-5 border-b border-black text-lg font-medium text-neutral-400">
            <span className="mr-5">Seller Information</span>
            <span className="mr-12">Payment Method</span>
            <span className="mr-24">Amount</span>
            <span className="">Price</span>
          </div>
        </div>
        <div className="custom-scrollbar mx-auto flex h-[739px] w-[850px] flex-col overflow-y-auto rounded-3xl bg-zinc-100 py-3">
          <table>
            <tbody>
              {OfferListing.map((item) => (
                <Fragment key={item.id}>
                  <DashboardTable {...item} />
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default page
