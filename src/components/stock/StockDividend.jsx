import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getYahooQuote } from "../../services/stock"

import StockHeader from "./components/StockHeader"
import StockAbout from "./components/StockAbout"

const StockDividend = () => {
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
    }, [ticker])

    if(!stockQuote) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className="w-full flex">
            <div className="w-full my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />
            </div>
            <div className="w-1/3 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default StockDividend