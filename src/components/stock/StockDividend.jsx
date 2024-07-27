import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getYahooDividendHistory, getYahooQuote, getYahooQuoteSummary } from "../../services/stock"

import StockHeader from "./components/StockHeader"
import StockAbout from "./components/StockAbout"
import DividendOverview from "./components/DividendOverview"
import DividendGrowth from "./components/DividendGrowth"
import { process_div } from "./utils/dividendUtils"
import DividendHistory from "./components/DividendHistory"

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
                    getYahooQuoteSummary(ticker, ["summaryDetail"])
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

    console.log(divData)

    return (
        <div className="stock-dividend w-full flex">
            <div className="w-full lg:w-3/4 my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />
                <div className="grid grid-cols-1 gap-4">
                    <DividendOverview stockQuote={stockQuote} divData={divData} stockSummary={stockSummary}/>
                    <DividendGrowth divData={divData} />
                    <DividendHistory stockChart={stockChart}/>
                </div>

            </div>
            <div className="hidden lg:block w-1/4 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default StockDividend