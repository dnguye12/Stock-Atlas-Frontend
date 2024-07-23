import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getYahooQuote, getYahooQuoteSummary } from "../../services/stock"

import StockAbout from "./components/StockAbout"
import StockHeader from "./components/StockHeader"
import PriceTargets from "./components/PriceTargets"
import AnalystRec from "./components/AnalystRec"
import UpgradesDowngrades from "./components/UpgradesDowngrades"
import BuyConsensus from "./components/BuyConsensus "
import AnalystOverview from "./components/AnalystOverview"

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
                const data = await getYahooQuoteSummary(ticker, ['financialData', 'recommendationTrend', 'upgradeDowngradeHistory'])
                setStockSummary(data)
            } catch (error) {
                console.log("Stock getting quote error: ", error)
            }
        }

        fetchData()
    }, [ticker])

    if (!stockQuote || !stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className="w-full flex">
            <div className="w-full my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />

                <div className="flex flex-col">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
                        <BuyConsensus ticker={ticker} stockSummary={stockSummary} />
                        <AnalystOverview ticker={ticker} stockSummary={stockSummary}/>
                        <PriceTargets stockSummary={stockSummary} />
                        <AnalystRec stockSummary={stockSummary} />
                    </div>
                    <UpgradesDowngrades stockSummary={stockSummary} />
                </div>
            </div>
            <div className="w-1/3 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default StockAnalystRating