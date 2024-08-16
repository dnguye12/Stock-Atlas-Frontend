/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getYahooDividendHistory, getYahooQuoteSummary } from "../../services/stock"

import DividendOverview from "./components/DividendOverview"
import DividendGrowth from "./components/DividendGrowth"
import { process_div } from "./utils/dividendUtils"
import DividendHistory from "./components/DividendHistory"
import DividendScore from "./components/DividendScore"

const StockDividend = ({ticker, stockQuote}) => {

    const [stockChart, setStockChart] = useState(null)
    const [stockSummary, setStockSummary] = useState(null)
    const [divData, setDivData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [chart, summary] = await Promise.all([
                    getYahooDividendHistory(ticker),
                    getYahooQuoteSummary(ticker, ['assetProfile', "summaryDetail", "financialData", "defaultKeyStatistics"])
                ]);
                setStockChart(chart);
                setDivData(process_div(chart, summary));
                setStockSummary(summary)
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [ticker]);

    if (!stockChart || !divData || !stockSummary) {
        return (
            <div className="w-full h-full skeleton border border-neutral-700 bg-neutral-950 rounded"></div>
        )
    }

    return (
        <div className="stock-dividend grid grid-cols-1 gap-4 mt-7">
            <DividendScore ticker={ticker} stockQuote={stockQuote} divData={divData} stockSummary={stockSummary} />
            <DividendOverview stockQuote={stockQuote} divData={divData} stockSummary={stockSummary} />
            <DividendGrowth divData={divData} />
            <DividendHistory stockChart={stockChart} stockQuote={stockQuote} />
        </div>
    )
}

export default StockDividend