import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getYahooQuote, getYahooQuoteSummary } from "../../services/stock"

import StockAbout from "./components/StockAbout"
import StockHeader from "./components/StockHeader"
import AnalystPriceTargets from "./components/AnalystPriceTargets"
import AnalystRec from "./components/AnalystRec"
import AnalystUpgradesDowngrades from "./components/AnalystUpgradesDowngrades"
import AnalystBuyConsensus from "./components/AnalystBuyConsensus "
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
            <div className="w-full flex">
                <div className="w-full lg:w-2/3 m-5 skeleton border border-neutral-700 bg-neutral-950 rounded"></div>
                <div className="divider divider-horizontal py-5"></div>
                <div className="hidden lg:block skeleton w-1/3 m-5 border border-neutral-700 bg-neutral-950 rounded">
                </div>
            </div>
        )
    }

    return (
        <div className="w-full flex">
            <div className="w-full xl:w-2/3 my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />

                <div className="flex flex-col">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
                        <AnalystBuyConsensus ticker={ticker} stockQuote={stockQuote} stockSummary={stockSummary} />
                        <AnalystOverview ticker={ticker} stockQuote={stockQuote} stockSummary={stockSummary} />
                        <AnalystPriceTargets stockQuote={stockQuote} stockSummary={stockSummary} />
                        <AnalystRec stockSummary={stockSummary} />
                    </div>
                    <AnalystUpgradesDowngrades stockSummary={stockSummary} />
                </div>
            </div>
            <div className="hidden xl:block w-1/3 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default StockAnalystRating