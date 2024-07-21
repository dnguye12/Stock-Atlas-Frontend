import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getYahooQuote } from "../../services/stock"

import StockHeader from "./components/StockHeader"

const StockStatistics = () => {
    const ticker = useParams().ticker

    const [stockQuote, setStockQuote] = useState(null)

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
    }, [])
    return (
        <div className="w-full flex">
            <div className="w-full my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />
                <h1>qdojidqjqdjqzdqdkpodqkpqdkqd</h1>
            </div>
        </div>

    )
}

export default StockStatistics