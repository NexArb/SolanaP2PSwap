import React from 'react'

interface PriceBoxProps {
  package: {
    title: string
    description: string[]
    price: string
  }
}

function PriceBox({ package: packageItem }: PriceBoxProps) {
  return (
    <div className="h-full max-w-sm space-y-10 p-2 text-white">
      <div className="rounded-full bg-gray-800/80 p-5 text-center backdrop-blur-2xl">
        <h2 className="text-center text-4xl font-semibold not-italic text-teal-500 ">
          {packageItem.title}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-9 rounded-[38px] bg-gray-800 p-12 backdrop-blur-2xl">
        <ul className="list-disc space-y-4 md:h-96">
          {packageItem.description.map((item) => (
            <li className="text-sm" key={packageItem.price}>
              {item}
            </li>
          ))}
        </ul>
        <h1 className="text-5xl font-semibold">€ {packageItem.price}</h1>

        <button className="text-md rounded-full bg-emerald-500 px-20 py-4 font-semibold text-slate-950">
          PURCHASE
        </button>
      </div>
    </div>
  )
}

export default PriceBox
