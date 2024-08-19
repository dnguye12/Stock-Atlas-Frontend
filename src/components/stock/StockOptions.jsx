import { useEffect, useState } from "react"
import { getYahooOptions } from "../../services/stock"
import OptionsSummary from "./components/OptionsSummary";
import OptionsByDate from "./components/OptionsByDate";

const dataSummary = (stockOptions) => {
    let totalVolume = 0
    let totalOI = 0

    let puts = 0
    let calls = 0
    let putsOI = 0
    let callsOI = 0

    stockOptions.forEach(option => {
        option.options[0].calls.forEach(call => {
            if (call.volume) {
                totalVolume += call.volume
                calls += call.volume
            }
            if (call.openInterest) {
                totalOI += call.openInterest
                callsOI += call.openInterest
            }
        })

        option.options[0].puts.forEach(put => {
            if (put.volume) {
                totalVolume += put.volume
                puts += put.volume
            }
            if (put.openInterest) {
                totalOI += put.openInterest
                putsOI += put.openInterest
            }
        })
    })

    return {
        totalVolume,
        totalOI,
        PCratios: puts / calls,
        OIPCratios: putsOI / callsOI
    }
}

/* eslint-disable react/prop-types */
const StockOptions = ({ ticker }) => {
    const [optionsDates, setOptionsDates] = useState(null)
    const [stockOptions, setStockOptions] = useState(null)
    const [summaryData, setSummaryData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooOptions(ticker)

                if (data) {
                    setOptionsDates(data.expirationDates)
                    setStockOptions(data.data)
                    setIsLoading(false)
                    const summary = dataSummary(data.data)
                    setSummaryData(summary)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                return (
                    <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                        <p className="text-center text-white text-lg font-semibold">Options info is currently not available for {ticker}.</p>
                    </div>
                )
            }
        }
        fetchData()
    }, [ticker])

    if (isLoading) {
        return (
            <div className="w-full h-full skeleton border border-neutral-700 bg-neutral-950 rounded mt-4"></div>
        )
    }

    return (
        <div className="stock-options flex flex-col">
            <OptionsSummary ticker={ticker} summaryData={summaryData} />
            <OptionsByDate ticker={ticker} optionsDates={optionsDates} stockOptions={stockOptions}/>
        </div>
    )
}

export default StockOptions