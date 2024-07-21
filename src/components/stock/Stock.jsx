import { useState, useEffect } from "react"
import { getYahooChart, getYahooQuote } from "../../services/stock"
import { getTradingTime, Range1D, Range1W, Range1M, Range1Y, Range5Y, RangeYTD, RangeMax } from "../../utils/timeUtils"
import { useParams } from "react-router-dom"

import RangeButtons from "./components/RangeButtons"
import StockChart from "./components/StockChart"
import StockHeader from "./components/StockHeader"
import StockAbout from "./components/StockAbout"
import StockAnalystRating from "./StockAnalystRating"

const Stock = () => {
    const ticker = useParams().ticker
    // Stock general data
    const [stockQuote, setStockQuote] = useState(null)
    const [stockChart, setStockChart] = useState(null)

    // Interval of chart
    const [chartInterval, setChartInterval] = useState('1D')

    // Quotes to make the chart line
    const [chartQuote, setChartQuote] = useState(null)

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
    }, [])

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

    if (!stockQuote) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className="w-full flex">
            <div className="w-full my-5 p-5 border-r border-r-neutral-700">
                <StockHeader ticker={ticker} stockQuote={stockQuote} />
                <RangeButtons setChartInterval={setChartInterval} />
                {
                    chartQuote && stockChart &&
                    <div className=" w-full">
                        <StockChart key={`${chartInterval}-${chartQuote.length}`} data={chartQuote} prevClose={stockChart.meta.previousClose} chartInterval={chartInterval} />
                    </div>
                }
            </div>
            <div className="w-1/3 p-3">
                <StockAbout ticker={ticker} stockQuote={stockQuote} />
            </div>
        </div>
    )
}

export default Stock