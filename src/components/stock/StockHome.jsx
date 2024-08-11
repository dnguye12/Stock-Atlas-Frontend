/* eslint-disable react/prop-types */
import RangeButtons from "./components/RangeButtons"
import StockChart from "./components/StockChart"
import StockHomeNews from "./components/StockHomeNews"
import StockStat from "./components/StockStat"
import StockUpSell from "./components/StockUpSell"

const StockHome = ({chartInterval, chartQuote, stockChart, setChartInterval,stockQuote, stockSummary,ticker}) => {
    return (
        <div className="mt-3">
            <RangeButtons chartInterval={chartInterval} setChartInterval={setChartInterval} />
            <StockChart key={`${chartInterval}-${chartQuote.length}`} data={chartQuote} prevClose={stockChart.meta.previousClose} chartInterval={chartInterval} />
            <StockStat stockQuote={stockQuote} stockSummary={stockSummary} />
            <StockUpSell ticker={ticker} />
            <StockHomeNews ticker={ticker} />
        </div>
    )
}

export default StockHome