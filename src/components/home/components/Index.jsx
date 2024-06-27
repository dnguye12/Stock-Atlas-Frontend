/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

import { getYahooChart } from "../../../services/stock"
import { isTradingTime } from "../../../utils/timeUtils"

import IndexChart from "./IndexChart";

const Index = ({ name, ticker }) => {
    const [quotes, setQuotes] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const tradingPeriod = isTradingTime('US')
    let period1, period2
    if (tradingPeriod === 0 || tradingPeriod === 1) {
        period1 = new Date(Date.now() - 86400000).toISOString().slice(0, 10) // yesterday
        period2 = new Date().toISOString().slice(0, 10) // today
    } else if (tradingPeriod === 2 || tradingPeriod === 3) {
        period1 = new Date().toISOString().slice(0, 10) // today
        period2 = new Date(Date.now() + 86400000).toISOString().slice(0, 10) // tomorrow
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooChart(ticker, period1, period2, "15m")
                setQuotes(data)
            } catch (error) {
                console.log("Index: ", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [ticker])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const myData = quotes.quotes.map(quote => ({
        time: new Date(quote.date).getTime(),
        value: quote.open
    }))

    return (
        <div className="flex items-center justify-between space-x-2 rounded border border-neutral-700 p-1.5 shadow-sm bg-neutral-800 hover:bg-neutral-700 lg-px-2">
            <div>
                <p className=" whitespace-nowrap text-sm font-semibold leading-tight">{name}</p>
            </div>
            <div className="w-full lg:h-[44px]">
                <IndexChart data={myData}></IndexChart>
            </div>
        </div>
    )
}

export default Index