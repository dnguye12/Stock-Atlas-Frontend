import { useState, useEffect } from "react"
import { getYahooChart, getYahooQuote, getYahooQuoteSummary } from "../../services/stock"
import { getTradingTime, Range1D, Range1W, Range1M, Range1Y, Range5Y, RangeYTD, RangeMax } from "../../utils/timeUtils"
import { useParams } from "react-router-dom"

import RangeButtons from "./components/RangeButtons"
import StockChart from "./components/StockChart"
import StockHeader from "./components/StockHeader"
import StockAbout from "./components/StockAbout"
import { formatMarketCap } from "../../utils/moneyUtils"
import moment from "moment"
import { formatNumber } from "../../utils/numberUtils"

const Stock = () => {
    const ticker = useParams().ticker
    // Stock general data
    const [stockQuote, setStockQuote] = useState(null)
    const [stockChart, setStockChart] = useState(null)

    // Interval of chart
    const [chartInterval, setChartInterval] = useState('1D')

    // Quotes to make the chart line
    const [chartQuote, setChartQuote] = useState(null)

    const [stockSummary, setStockSummary] = useState(null)

    //Get the general detail of the stock first
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

    //Once we have the detail of the stock, search up the ticker using Yahoo.chart
    //'1D', '1W', '1M', 'YTD', '1Y', '5Y', 'Max
    useEffect(() => {
        const fetchData = async () => {
            if (stockQuote) {
                let period1, period2;
                if (stockQuote.region === 'US') {
                    if (chartInterval === '1D') {
                        const { day, hour } = getTradingTime('US')

                        let { period1: helper1, period2: helper2 } = Range1D(day, hour)
                        period1 = helper1
                        period2 = helper2
                    } else if (chartInterval === '1W') {
                        let { period1: helper1, period2: helper2 } = Range1W()
                        period1 = helper1
                        period2 = helper2
                    } else if (chartInterval === '1M') {
                        let { period1: helper1, period2: helper2 } = Range1M()
                        period1 = helper1
                        period2 = helper2
                    } else if (chartInterval === 'YTD') {
                        let { period1: helper1, period2: helper2 } = RangeYTD()
                        period1 = helper1
                        period2 = helper2
                    } else if (chartInterval === '1Y') {
                        let { period1: helper1, period2: helper2 } = Range1Y()
                        period1 = helper1
                        period2 = helper2
                    } else if (chartInterval === '5Y') {
                        let { period1: helper1, period2: helper2 } = Range5Y()
                        period1 = helper1
                        period2 = helper2
                    } else if (chartInterval === 'Max') {
                        let { period1: helper1, period2: helper2 } = RangeMax(stockQuote.firstTradeDateMilliseconds)
                        period1 = helper1
                        period2 = helper2
                    }

                    if (period1 && period2) {
                        let data;
                        if (chartInterval === '1D') {
                            data = await getYahooChart(ticker, period1, period2, '5m')
                        } else if (chartInterval === '1W') {
                            data = await getYahooChart(ticker, period1, period2, '30m')
                        }
                        else if (chartInterval === '1M') {
                            data = await getYahooChart(ticker, period1, period2, '1d')
                        }
                        else if (chartInterval === '1Y' || chartInterval === 'YTD') {
                            data = await getYahooChart(ticker, period1, period2, '1d')
                        }
                        else if (chartInterval === '5Y' || chartInterval === 'Max') {
                            data = await getYahooChart(ticker, period1, period2, '1wk')
                        }
                        setStockChart(data)
                    }
                }
            }
        }

        fetchData()
    }, [chartInterval, stockQuote, ticker])

    //Once we get the chart info, convert it to the form by lightweight chart
    useEffect(() => {
        if (stockChart) {
            const helper = []
            stockChart.quotes.forEach(quote => {
                if (quote.open) {
                    if (chartInterval === '1D') {
                        helper.push({
                            time: new Date(quote.date).getTime(),
                            value: quote.open
                        });
                    } else {
                        helper.push({
                            time: new Date(quote.date).getTime(),
                            value: quote.open
                        });
                    }
                }
            })
            setChartQuote(helper)
        }
    }, [chartInterval, stockChart])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getYahooQuoteSummary(ticker, ['financialData', 'summaryDetail'])
            setStockSummary(data)
        }

        fetchData()
    }, [ticker])

    if (!stockQuote) {
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
            <div className="w-full lg:w-2/3 my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />
                <RangeButtons chartInterval={chartInterval} setChartInterval={setChartInterval} />
                {
                    chartQuote && stockChart &&
                    (
                        <div className=" w-full">
                            <StockChart key={`${chartInterval}-${chartQuote.length}`} data={chartQuote} prevClose={stockChart.meta.previousClose} chartInterval={chartInterval} />


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
                                            <p className="font-semibold text-white">{stockQuote.fiftyTwoWeekLow} - {stockQuote.fiftyTwoWeekHigh}</p>
                                            :
                                            <p className="font-semibold text-white">-</p>
                                    }

                                </div>
                                <div className="flex justify-between border-b border-b-neutral-700 py-1">
                                    <p>Forward Dividend & Yield</p>
                                    <p className="font-semibold text-white">{stockQuote.trailingAnnualDividendRate ? stockQuote.trailingAnnualDividendRate.toFixed(2) : '-'}({stockQuote.trailingAnnualDividendYield && (stockQuote.trailingAnnualDividendYield * 100).toFixed(2)}%)</p>
                                </div>
                                <div className="flex justify-between border-b border-b-neutral-700 py-1">
                                    <p>Dividend Date</p>
                                    <p className="font-semibold text-white">{stockQuote.dividendDate ? moment(stockQuote.dividendDate).format('MMM Do, yyyy') : "-"}</p>
                                </div>
                                <div className="flex justify-between border-b border-b-neutral-700 py-1">
                                    <p>Volume</p>
                                    <p className="font-semibold text-white">{stockSummary.summaryDetail.volume ? formatNumber(stockSummary.summaryDetail.volume) : "-"}</p>
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
                                    <p className="font-semibold text-white">{stockSummary.summaryDetail.beta ? stockSummary.summaryDetail.beta.toFixed(2) : "-"}</p>
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
                                    <p className="font-semibold text-white">{stockSummary.financialData.targetMeanPrice || '-'}</p>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
            <div className="hidden lg:block w-1/3 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default Stock