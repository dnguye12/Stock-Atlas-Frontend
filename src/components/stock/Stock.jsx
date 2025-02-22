import { useState, useEffect } from "react"
import { getYahooChart, getYahooQuote, getYahooQuoteSummary } from "../../services/stock"
import { getTradingTime, Range1D, Range1W, Range1M, Range1Y, Range5Y, RangeYTD, RangeMax } from "../../utils/timeUtils"
import { useParams, Routes, Route } from "react-router-dom"

import StockHeader from "./components/StockHeader"
import StockAbout from "./components/StockAbout"

import StockStatistics from './StockStatistics';
import StockAnalystRating from './StockAnalystRating';
import StockDividend from './StockDividend';
import StockProfile from './StockProfile';
import StockHome from "./StockHome"
import StockHolderInsider from "./StockHolderInsider"
import StockOptions from "./StockOptions"
import StockNews from "./StockNews"
import StockFinancials from "./StockFinancials"

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
                    let pusher = {}
                    pusher.time = new Date(quote.date).getTime()
                    if (quote.close) {
                        pusher.value = quote.close
                    } else {
                        pusher.value = quote.open
                    }
                    helper.push(pusher)
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

    if (!stockQuote || !chartInterval || !chartQuote || !stockChart) {
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
                <StockHeader chartInterval={chartInterval} chartQuote={chartQuote} ticker={ticker} stockChart={stockChart} stockQuote={stockQuote} />

                <Routes>
                    <Route path='/' element={<StockHome chartInterval={chartInterval} chartQuote={chartQuote} stockChart={stockChart} setChartInterval={setChartInterval} stockQuote={stockQuote} stockSummary={stockSummary} ticker={ticker} />} />
                    <Route path='news' element={<StockNews ticker={ticker} />} />
                    <Route path='financials/*' element={<StockFinancials ticker={ticker} stockQuote={stockQuote}/>} />
                    <Route path='statistics/*' element={<StockStatistics ticker={ticker} stockQuote={stockQuote} />} />
                    <Route path='options' element={<StockOptions ticker={ticker}/>} />
                    <Route path='analyst-ratings' element={<StockAnalystRating ticker={ticker} stockQuote={stockQuote} />} />
                    <Route path='dividends' element={<StockDividend ticker={ticker} stockQuote={stockQuote} />} />
                    <Route path='holderinsider' element={<StockHolderInsider ticker={ticker} />} />
                    <Route path='profile' element={<StockProfile ticker={ticker} stockQuote={stockQuote} />} />
                </Routes>
            </div>
            <div className="hidden lg:block w-1/3 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default Stock