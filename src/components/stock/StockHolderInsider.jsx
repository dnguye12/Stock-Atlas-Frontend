/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { getYahooQuoteSummary } from "../../services/stock"

import HolderInsiderInsider from "./components/HolderInsiderInsider"
import HolderInsiderMajorHolders from "./components/HolderInsiderMajorHolders"
import HolderInsiderInstitution from "./components/HolderInsiderInstitution"
import HolderInsiderTransactions from "./components/HolderInsiderTransactions"

const StockHolderInsider = ({ ticker }) => {
    const [stockSummary, setStockSummary] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooQuoteSummary(ticker, ["insiderHolders", "insiderTransactions", "institutionOwnership", "majorHoldersBreakdown"])

                if (data) {
                    setStockSummary(data)
                }
            } catch (error) {
                console.log("Error getting stock insider", error)

                return (
                    <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                        <p className="text-center text-white text-lg font-semibold">Stock insider data is currently not available for {ticker}.</p>
                    </div>
                )
            }
        }
        fetchData()
    }, [ticker])

    if (!stockSummary) {
        return (
            <div className="w-full h-96 skeleton border border-neutral-700 bg-neutral-950 rounded"></div>
        )
    }

    return (
        <div className="flex flex-col w-full mt-3">
            <HolderInsiderMajorHolders ticker={ticker} majorHoldersBreakdown={stockSummary.majorHoldersBreakdown} />
            <HolderInsiderInstitution ticker={ticker} institutionOwnership={stockSummary.institutionOwnership} />
            <HolderInsiderInsider ticker={ticker} insiderHolders={stockSummary.insiderHolders} />
            <HolderInsiderTransactions insiderTransactions={stockSummary.insiderTransactions} />
        </div>
    )
}

export default StockHolderInsider