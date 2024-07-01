/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { getYahooChart } from "../../../services/stock"
import { getTradingTime } from "../../../utils/timeUtils"

import IndexChart from "./IndexChart";

const Index = ({ name, ticker }) => {
    const [quotes, setQuotes] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const { day, hour } = getTradingTime('US')
    console.log(day + " " + hour)

    //isTradingTime
    // 0 Saturday
    // 1 Sunday
    // 2 pre market
    // 3 trading time
    // 4 post market

    // US Market 9:30-16:00 EDT
    let period1, period2
    if (day === "Saturday") {
        period1 = new Date(Date.now() - 86400000).toISOString().slice(0, 10) // Friday - yesterday
        period2 = new Date().toISOString().slice(0, 10) // Saturday - today
    } else if (day === "Sunday") {
        period1 = new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10) // Friday - 2 days ago
        period2 = new Date().toISOString().slice(0, 10) // Saturday - yesterday
    } else if (day === "Monday" && hour === "pre") {
        period1 = new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10) // Friday - 3 days ago
        period2 = new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10) // Saturday - 2 days ago
    } else {
        period1 = new Date().toISOString().slice(0, 10) // today
        period2 = new Date(Date.now() + 86400000).toISOString().slice(0, 10) // tomorrow
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooChart(ticker, period1, period2, "1m")
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
            <div className="skeleton w-full rounded border border-neutral-700 bg-neutral-900" style={{ height: 58 }}></div>
        )
    }

    const myData = [];
    quotes.quotes.forEach(quote => {
        if (quote.open) {
            myData.push({
                time: new Date(quote.date).getTime(),
                value: quote.open
            });
        }
    })

    const startValue = quotes.meta.previousClose
    const endValue = quotes.quotes[quotes.quotes.length - 1].close

    return (
        <div className="flex items-center justify-between space-x-2 rounded border border-neutral-700 p-1.5 shadow-sm bg-neutral-800 hover:bg-neutral-700 lg-px-2">
            <div className="flex flex-col items-start justify-center">
                <p className=" whitespace-nowrap text-sm font-semibold leading-tight">{name}</p>

                {
                    startValue < endValue
                        ?
                        <p className="flex items-center text-up"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-caret-up" /> {((endValue - startValue) / startValue * 100).toFixed(2)}%</p>
                        :
                        <p className="flex items-center text-down"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-caret-down" /> {((startValue - endValue) / startValue * 100).toFixed(2)}%</p>
                }

            </div>
            <div className="w-full lg:h-[44px]">
                <IndexChart data={myData} prevClose={startValue}></IndexChart>
            </div>
        </div>
    )
}

export default Index