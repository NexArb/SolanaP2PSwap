'use client'
import Link from 'next/link'
import React from 'react'
import EditBridgeModal from './EditBridgeModal'

type Item = {
  id: number
  from: string
  to: string
  method: string
  bridgeName: string
}
const dummyData: Item[] = [
  {
    id: 1,
    bridgeName: 'BRIDGE 1 - 2023 - 11 - 12',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 2,
    bridgeName: 'BRIDGE 2 - 2023 - 11 - 13',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 3,
    bridgeName: 'BRIDGE 3 - 2023 - 09 - 08',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 4,
    bridgeName: 'BRIDGE 4 - 2023 - 12 - 05',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 5,
    bridgeName: 'BRIDGE 5 - 2023 - 10 - 20',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 6,
    bridgeName: 'BRIDGE 6 - 2023 - 08 - 15',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 7,
    bridgeName: 'BRIDGE 7 - 2023 - 11 - 12',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 8,
    bridgeName: 'BRIDGE 8 - 2023 - 11 - 12',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 9,
    bridgeName: 'BRIDGE 9 - 2023 - 11 - 12',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  },
  {
    id: 10,
    bridgeName: 'BRIDGE 10 - 2023 - 11 - 12',
    from: '989-648-46DDS5-SAA5F-SS',
    to: '877-699-96ASF6-A7SS-AF699',
    method: 'NEAR'
  }
]

const BridgeOptions = () => {
  const [selectedBridge, setSelectedBridge] = React.useState<{
    id?: number
    from?: string
    to?: string
    method?: string
    bridgeName?: string
  }>({})

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  if (!isModalOpen) {
    return (
      <div className="flexCenter mx-20  bg-gray-600/60 ">
        <ul className="flex max-h-[320px] w-full flex-col justify-between overflow-auto md:max-h-[420px]">
          {dummyData.map((item: Item, index: number) => (
            <li
              className={` w-full bg-gray-600 px-16 ${
                index % 2 === 0 ? 'bg-opacity-70' : 'bg-opacity-20'
              }`}
              key={item.id}
            >
              <div className="flex h-16 w-full items-center justify-between text-white">
                <Link href="#" className="cursor-pointer">
                  {item.bridgeName}
                </Link>
                <div className="flex justify-around gap-x-4 lg:gap-x-16">
                  <button
                    className="mx-2 flex items-center gap-2"
                    onClick={() => {
                      setSelectedBridge(dummyData[index])
                      setIsModalOpen(true)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    EDIT
                  </button>
                  <button
                    className="flex gap-2"
                    onClick={() => console.log('delete click')}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    DELETE
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <EditBridgeModal
        selectedBridge={selectedBridge}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    )
  }
}

export default BridgeOptions
