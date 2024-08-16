import { useEffect, useState } from "react"
import { getYahooQuoteSummary } from "../../services/stock"
import StatsTotalValuation from "./components/StatsTotalValuation"
import StatsScores from "./components/StatsScores"
import StatsPrice from "./components/StatsPrice"
import StatsValuationRatios from "./components/StatsValuationRatios"
import StatsFinancialPosition from "./components/StatsFinancialPosition"
import StatsFinancialEfficiency from "./components/StatsFinancialEfficiency"
import StatsMargin from "./components/StatsMargin"
import StatsShortSellingInformation from "./components/StatsShortSellingInformation"

/* eslint-disable react/prop-types */
const StockStatistics = ({ ticker }) => {
    const [stockSummary, setStockSummary] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooQuoteSummary(ticker, ['assetProfile', 'defaultKeyStatistics', 'financialData', 'incomeStatementHistory', 'price', 'summaryDetail'])

                if (data) {
                    setStockSummary(data)
                }
            } catch (error) {
                console.log(error)

                return (
                    <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                        <p className="text-center text-white text-lg font-semibold">Statistics info is currently not available for {ticker}.</p>
                    </div>
                )
            }
        }
        fetchData()
    }, [ticker])

    if (!stockSummary) {
        return (
            <div className="w-full h-full skeleton border border-neutral-700 bg-neutral-950 rounded"></div>
        )
    }

    return (
        <div className="stock-stat w-full flex flex-col mt-7">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
                <StatsTotalValuation defaultKeyStatistics={stockSummary.defaultKeyStatistics} summaryDetail={stockSummary.summaryDetail} />
                <StatsScores ticker={ticker} />
                <StatsPrice price={stockSummary.price} summaryDetail={stockSummary.summaryDetail} />
                <StatsValuationRatios defaultKeyStatistics={stockSummary.defaultKeyStatistics} financialData={stockSummary.financialData} summaryDetail={stockSummary.summaryDetail} />
                <StatsFinancialPosition financialData={stockSummary.financialData}/>
                <StatsFinancialEfficiency assetProfile={stockSummary.assetProfile} financialData={stockSummary.financialData} incomeStatementHistory={stockSummary.incomeStatementHistory} price={stockSummary.price}/>
                <StatsMargin financialData={stockSummary.financialData} />
                <StatsShortSellingInformation defaultKeyStatistics={stockSummary.defaultKeyStatistics} />
            </div>
        </div>
    )
}

export default StockStatistics