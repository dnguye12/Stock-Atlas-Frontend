/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { getYahooChart } from "../../../services/stock"
import { getTradingTime } from "../../../utils/timeUtils"

import IndexChart from "./IndexChart";
import { Range1D } from "../../../utils/timeUtils";

import { myToLocaleString } from "../../../utils/numberUtils";

const Index = ({ name, ticker }) => {
    const [quotes, setQuotes] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const { day, hour } = getTradingTime('US')

    //isTradingTime
    // Saturday: get Friday data
    // Sunday: get Friday data
    // Monday pre: get Friday data
    // else
    //          pre hour: get yesterday data
    //          post hour: get today to tomorrow data

    // US Market 9:30-16:00 EDT
    let { period1, period2 } = Range1D(day, hour)

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
    }, [ticker, period1, period2])

    if (isLoading) {
        return (
            <div className="skeleton w-full rounded border border-neutral-700 bg-neutral-900" style={{ height: 58 }}></div>
        )
    }

    const myData = [];
    if (quotes && quotes.quotes) {
        quotes.quotes.forEach(quote => {
            if (quote.open) {
                myData.push({
                    time: new Date(quote.date).getTime(),
                    value: quote.open
                });
            }
        })
    }

    let startValue, endValue;
    if (myData.length > 0) {
        startValue = quotes.meta.previousClose
        endValue = quotes.quotes[quotes.quotes.length - 1].close
    }

    return (
        <div className="flex items-center justify-between space-x-2 rounded border p-3 cursor-pointer border-neutral-700 shadow-sm bg-neutral-800 hover:bg-neutral-700 hover:scale-105" style={{ transition: "transform 350ms, background-color 350ms" }}>
            <div className="flex flex-col items-start justify-start">
                <p className=" whitespace-nowrap text-sm font-semibold leading-tight text-white" to={`/stock/${ticker}`}>{name}</p>
                <p className=" whitespace-nowrap text-sm leading-tight my-1">${myToLocaleString(quotes.meta.regularMarketPrice)}</p>
                {
                    startValue && endValue
                    && (startValue < endValue
                        ?
                        <p className="text-sm font-semibold flex items-center text-up"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-caret-up" /> {((endValue - startValue) / startValue * 100).toFixed(2)}%</p>
                        :
                        <p className="text-sm font-semibold flex items-center text-down"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-caret-down" /> {((startValue - endValue) / startValue * 100).toFixed(2)}%</p>
                    )
                }
            </div>
            <div className="w-full lg:h-[64px]">
                <IndexChart data={myData} prevClose={startValue}></IndexChart>
            </div>
        </div>
    )
}

export default Index