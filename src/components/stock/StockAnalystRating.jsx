/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getYahooQuoteSummary } from "../../services/stock"

import AnalystPriceTargets from "./components/AnalystPriceTargets"
import AnalystRec from "./components/AnalystRec"
import AnalystUpgradesDowngrades from "./components/AnalystUpgradesDowngrades"
import AnalystBuyConsensus from "./components/AnalystBuyConsensus "
import AnalystOverview from "./components/AnalystOverview"

const StockAnalystRating = ({ticker, stockQuote}) => {
    const [stockSummary, setStockSummary] = useState(null)

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

    if (!stockSummary) {
        return (
            <div className="w-full lg:w-2/3 m-5 skeleton border border-neutral-700 bg-neutral-950 rounded"></div>
        )
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
                <AnalystBuyConsensus ticker={ticker} stockQuote={stockQuote} stockSummary={stockSummary} />
                <AnalystOverview ticker={ticker} stockQuote={stockQuote} stockSummary={stockSummary} />
                <AnalystPriceTargets stockQuote={stockQuote} stockSummary={stockSummary} />
                <AnalystRec stockSummary={stockSummary} />
            </div>
            <AnalystUpgradesDowngrades stockSummary={stockSummary} />
        </div>
    )
}

export default StockAnalystRating