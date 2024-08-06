/* eslint-disable react/prop-types */
import moment from "moment"

import { formatNumber } from "../../../utils/numberUtils"
import { formatMarketCap } from "../../../utils/moneyUtils"
const StockStat = ({ stockQuote, stockSummary }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 text-xs mt-5">
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Previous Close</p>
                <p className="font-semibold text-white">{stockQuote.regularMarketPreviousClose || '-'}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Day's Range</p>
                {(stockQuote.regularMarketDayLow && stockQuote.regularMarketDayHigh)
                    ? <p className="font-semibold text-white">{stockQuote.regularMarketDayLow} - {stockQuote.regularMarketDayHigh}</p>
                    : <p className="font-semibold text-white">-</p>
                }
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Open</p>
                <p className="font-semibold text-white">{stockQuote.regularMarketOpen || '-'}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>52 Week Range</p>
                {
                    (stockQuote.fiftyTwoWeekLow && stockQuote.fiftyTwoWeekHigh)
                        ?
                        <p className="font-semibold text-white">{stockQuote.fiftyTwoWeekLow.toFixed(2)} - {stockQuote.fiftyTwoWeekHigh.toFixed(2)}</p>
                        :
                        <p className="font-semibold text-white">-</p>
                }

            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Forward Dividend & Yield</p>
                <p className="font-semibold text-white">{stockQuote.trailingAnnualDividendRate ? stockQuote.trailingAnnualDividendRate.toFixed(2) : '-'}({stockQuote.trailingAnnualDividendRate && (stockQuote.trailingAnnualDividendYield * 100).toFixed(2)}%)</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Dividend Date</p>
                <p className="font-semibold text-white">{stockQuote.dividendDate ? moment(stockQuote.dividendDate).format('MMM Do, yyyy') : "-"}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Volume</p>
                <p className="font-semibold text-white">{stockSummary && (stockSummary.summaryDetail.volume ? formatNumber(stockSummary.summaryDetail.volume) : "-")}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Avg. Volume</p>
                <p className="font-semibold text-white">{stockQuote.averageDailyVolume3Month ? formatNumber(stockQuote.averageDailyVolume3Month) : "-"}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>PE Ratio (TTM)</p>
                <p className="font-semibold text-white">{stockQuote.trailingPE ? stockQuote.trailingPE.toFixed(2) : "-"}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Market Cap</p>
                <p className="font-semibold text-white">{stockQuote.marketCap ? formatMarketCap(stockQuote.marketCap, stockQuote.currency) : "-"}</p>
            </div>



            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Earnings Date</p>
                <p className="font-semibold text-white">{stockQuote.earningsTimestamp ? moment(stockQuote.earningsTimestamp).format('MMM Do, yyyy') : "-"}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Beta (5Y Monthly)</p>
                <p className="font-semibold text-white">{stockSummary && (stockSummary.summaryDetail.beta ? stockSummary.summaryDetail.beta.toFixed(2) : "-")}</p>
            </div>

            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Bid</p>
                {
                    (stockQuote.bid && stockQuote.bidSize)
                        ? <p className="font-semibold text-white">{stockQuote.bid} x {stockQuote.bidSize * 100}</p>
                        : <p className="font-semibold text-white">-</p>
                }
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>Ask</p>
                {
                    (stockQuote.ask && stockQuote.askSize)
                        ?
                        <p className="font-semibold text-white">{stockQuote.ask} x {stockQuote.askSize * 100}</p>
                        :
                        <p className="font-semibold text-white">-</p>
                }
            </div>




            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>EPS (TTM)</p>
                <p className="font-semibold text-white">{stockQuote.epsTrailingTwelveMonths ? stockQuote.epsTrailingTwelveMonths.toFixed(2) : "-"}</p>
            </div>
            <div className="flex justify-between border-b border-b-neutral-700 py-1">
                <p>1y Target Est</p>
                <p className="font-semibold text-white">{stockSummary && (stockSummary.financialData.targetMeanPrice || '-')}</p>
            </div>
        </div>
    )
}

export default StockStat