import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getYahooDividendHistory, getYahooQuote, getYahooQuoteSummary } from "../../services/stock"

import StockHeader from "./components/StockHeader"
import StockAbout from "./components/StockAbout"
import DividendOverview from "./components/DividendOverview"
import DividendGrowth from "./components/DividendGrowth"
import { process_div } from "./utils/dividendUtils"
import DividendHistory from "./components/DividendHistory"
import DividendScore from "./components/DividendScore"

const StockDividend = () => {
    const ticker = useParams().ticker

    const [stockQuote, setStockQuote] = useState(null)
    const [stockChart, setStockChart] = useState(null)
    const [stockSummary, setStockSummary] = useState(null)
    const [divData, setDivData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [quote, chart, summary] = await Promise.all([
                    getYahooQuote(ticker),
                    getYahooDividendHistory(ticker),
                    getYahooQuoteSummary(ticker, ['assetProfile', "summaryDetail",  "financialData", "defaultKeyStatistics"])
                ]);
                setStockQuote(quote);
                setStockChart(chart);
                setDivData(process_div(chart, summary));
                setStockSummary(summary)
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [ticker]);

    if (!stockQuote || !stockChart || !divData || !stockSummary) {
        return <div>...Loading</div>;
    }

    return (
        <div className="stock-dividend w-full flex">
            <div className="w-full xl:w-2/3 my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />
                <div className="grid grid-cols-1 gap-4">
                    <DividendScore ticker={ticker} stockQuote={stockQuote} divData={divData} stockSummary={stockSummary}/>
                    <DividendOverview stockQuote={stockQuote} divData={divData} stockSummary={stockSummary}/>
                    <DividendGrowth divData={divData} />
                    <DividendHistory stockChart={stockChart} stockQuote={stockQuote}/>
                </div>

            </div>
            <div className="hidden xl:block w-1/3 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default StockDividend