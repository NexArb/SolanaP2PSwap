'use client'

import React, { useEffect, useState } from 'react'
import redstone from 'redstone-api'
import { ResponsiveLine } from '@nivo/line'

type Coin = {
  symbol: string
  name: string
  color: string
}

interface PriceChartData {
  x: string
  y: number
}

interface PriceChart {
  id: string
  color: string
  data: PriceChartData[]
}

const ExchangeRates = (): React.JSX.Element => {
  return (
    <div className="mt-72">
      <p className="text-center text-5xl">Exchange Rates</p>
      <div className="flex justify-center">
        <div className="grid gap-10 p-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-20">
          <PriceCard symbol="BTC" name="Bitcoin" color="bg-orange-600" />
          <PriceCard symbol="SOL" name="Solana" color="bg-purple-700" />
          <PriceCard symbol="ETH" name="Ethereum" color="bg-blue-500" />
        </div>
      </div>
      <div className="mt-14 flex justify-center"></div>
    </div>
  )
}

const PriceCard = ({ symbol, name, color }: Coin) => {
  const [price, setPrice] = useState('')
  const [lowestPrice, setLowestPrice] = useState('')
  const [priceChartData, setPriceChartData] = useState<PriceChart[]>([])
  useEffect(() => {
    const getPrice = async () => {
      return await redstone.getPrice(symbol.toUpperCase())
    }
    const getPrices = () => {
      return redstone.getHistoricalPrice(symbol, {
        offset: 0,
        limit: 100
      })
    }
    getPrice().then((res) => {
      setPrice(res.value.toFixed(3))
    })
    getPrices().then((res) => {
      setLowestPrice(
        res.sort((p1, p2) => (p1.value < p2.value ? 1 : -1))[0].value.toFixed(3)
      )
      const _priceChartData = []
      const newData = {
        data: res
          .filter((price) => price.value !== 0)
          .slice(0, 20)
          .map((price) => ({
            x: price.value.toFixed(2),
            y: price.timestamp
          })),
        // Check if 'res' has elements before accessing 'symbol'
        id: res.length > 0 ? res[0].symbol : '',
        color: 'hsl(133, 70%, 50%)'
      }
      _priceChartData.push(newData)
      setPriceChartData(_priceChartData)
    })
  }, [symbol])
  return (
    <div className="w-80 rounded-2xl bg-indigo-950 p-5">
      <div className="flex justify-between">
        <div>{name.toUpperCase()}</div>
        <div className="text-sm opacity-50">{symbol.toUpperCase()}/USD</div>
      </div>
      <div className="mt-8">
        <p className="text-2xl">{price} USD</p>
      </div>
      <div className="mt-6  flex justify-between">
        <div className={`${color} my-auto rounded-full px-5 py-1.5`}>
          {lowestPrice > price ? '-' : '+'}{' '}
          {(Math.abs(Number(lowestPrice) - Number(price)) / 100).toFixed(2)}%
        </div>
        <div className="my-auto h-14 w-20">
          <Chart data={priceChartData} />
        </div>
      </div>
    </div>
  )
}

type ChartProps = {
  data: PriceChart[]
}

const Chart = ({ data }: ChartProps) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      pointSize={7}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      isInteractive={false}
      legends={[]}
    />
  )
}

export default ExchangeRates
