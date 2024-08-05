import { useParams } from "react-router-dom"

import StockHeader from "./components/StockHeader"

const StockStatistics = ({stockQuote}) => {
    const ticker = useParams().ticker

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