import { useEffect, useState } from "react"
import { getYahooInsights } from "../../../services/stock"
import moment from 'moment';

// eslint-disable-next-line react/prop-types
const StockUpSell = ({ ticker }) => {
    const [stockInsights, setStockInsights] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooInsights(ticker, 1000)
                if (data) {
                    setStockInsights(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [ticker])

    if (!stockInsights) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className="bg-neutral-950 border border-neutral-700 rounded p-4 mt-4">
            <h2 className="text-white text-lg font-bold mb-3">Bull Case vs Bear Case</h2>
            {(stockInsights && stockInsights.upsell && stockInsights.upsell.msBullishSummary)
                ?
                <>
                    <p className="text-sm mb-3">Before investing, you should consider both sides. We provide analyst report summaries that
                        highlight the positive and negative perspectives on {ticker}.</p>
                    <p className="text-end italic text-sm mb-3">Updated on {moment(stockInsights.upsell.msBullishBearishSummariesPublishDate).format("MMM Do YYYY")}</p>
                    <ul className="w-full px-3 py-1 border-l-4 border-l-up mb-3">
                        {
                            stockInsights.upsell.msBullishSummary.map((sum, idx) => (
                                <li className="text-sm text-white font-medium mb-2" key={idx}>- {sum}</li>
                            ))
                        }
                    </ul>

                    <div className="w-full px-3 py-1 border-l-4 border-l-down">
                        {
                            stockInsights.upsell.msBearishSummary.map((sum, idx) => (
                                <p className="text-sm text-white font-medium mb-2" key={idx}>- {sum}</p>
                            ))
                        }
                    </div>
                </>
                :
                <>
                    <p className="text-base">No analyst report summaries available for <span className="text-white font-semibold">{ticker}</span>.</p>
                </>
            }
        </div>
    )
}

export default StockUpSell