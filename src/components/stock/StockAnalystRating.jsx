import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getYahooQuote, getYahooQuoteSummary } from "../../services/stock"

import StockHeader from "./components/StockHeader"
import PriceTargets from "./components/PriceTargets"

const StockAnalystRating = () => {
    const ticker = useParams().ticker

    const [stockQuote, setStockQuote] = useState(null)
    const [stockSummary, setStockSummary] = useState(null)

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const quote = await getYahooQuote(ticker)
                setStockQuote(quote)
            } catch (error) {
                console.log("Stock getting quote error: ", error)
            }
        }

        fetchQuote()
    }, [ticker])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooQuoteSummary(ticker, ['financialData', 'upgradeDowngradeHistory'])
                setStockSummary(data)
            } catch (error) {
                console.log("Stock getting quote error: ", error)
            }
        }

        fetchData()
    }, [ticker])

    return (
        <div className="w-full flex">
            <div className="w-full my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />

                <div className="flex flex-col">
                    <div className="grid grid-cols-3">
                        <PriceTargets stockSummary={stockSummary}/>
                        <div>2</div>
                        <div></div>
                    </div>
                    <div>3</div>
                </div>
            </div>
        </div>
    )
}

export default StockAnalystRating