/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

import { Link, useLocation } from 'react-router-dom'
import { getStockLogo } from "../../../services/stock"
import { myToLocaleString, percentageDiff } from "../../../utils/numberUtils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StockHeader = ({ chartInterval, chartQuote,  stockQuote, ticker }) => {
    const [logoImg, setLogoImage] = useState('')
    const location = useLocation();

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const logo = await getStockLogo(ticker)

                if (logo) {
                    setLogoImage(`data:image/png;base64,${logo}`)
                }
            } catch (error) {
                setLogoImage('')
            }
        }

        fetchLogo()
    }, [ticker])

    if (!stockQuote || !chartQuote) {
        return (
            <div>...Loading</div>
        )
    }

    let startValue = chartQuote[0].value
    let endValue = chartQuote[chartQuote.length - 1].value

    console.log(stockQuote)

    return (
        <div className="stock-header flex justify-center flex-col">
            <div className="flex items-center px-5">
                {
                    logoImg
                        ?
                        <div className="avatar mr-2">
                            <div className="w-8 h-8 rounded-full ">
                                <img className="bg-neutral-900 drop-shadow-lg" src={logoImg} alt={ticker} />
                            </div>
                        </div>
                        :
                        <div className="avatar placeholder mr-2">
                            <div className="bg-neutral-900 w-8 h-8 rounded-full">
                            </div>
                        </div>
                }
                <div>
                    <p className=" font-bold text-lg leading-5 text-white">{stockQuote.longName} ({ticker})</p>
                    <p className=" text-sm">{stockQuote.quoteSourceName} - {stockQuote.currency}</p>
                </div>
            </div>
            <div className="flex items-center px-5 mt-2">
                <p className=" font-bold text-xl leading-5 text-white mr-2">{myToLocaleString(stockQuote.regularMarketPrice)}</p>
                {
                    chartInterval === '1D'
                        ?
                        (
                            stockQuote.regularMarketChange < 0
                                ?
                                <p className="text-down font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stockQuote.regularMarketChange.toFixed(2).substring(1)} (<FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2).substring(1)}%)</p>
                                :
                                <p className="text-up font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stockQuote.regularMarketChange.toFixed(2)} (<FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2)}%)</p>
                        )
                        :
                        (
                            endValue < startValue
                                ?
                                <p className="text-down font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{(startValue - endValue).toFixed(2)} (<FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{percentageDiff(startValue, endValue).toFixed(2).substring(1)}%)</p>
                                :
                                <p className="text-up font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{(endValue - startValue).toFixed(2)} (<FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{percentageDiff(startValue, endValue).toFixed(2)}%)</p>
                        )
                }
            </div>
            <div className="divider my-3"></div>
            <div className="navbar">
                <Link to={`/stock/${ticker}`} className={`btn btn-ghost ${location.pathname === `/stock/${ticker}` ? 'active' : ''}`}>Overview</Link>
                <Link to={`/stock/${ticker}/statistics`} className={`btn btn-ghost ${location.pathname === `/stock/${ticker}/statistics` ? 'active' : ''}`}>Statistics</Link>
                <Link to={`/stock/${ticker}/analyst-ratings`} className={`btn btn-ghost ${location.pathname === `/stock/${ticker}/analyst-ratings` ? 'active' : ''}`}>Analyst Ratings</Link>
                {
                    (stockQuote.dividendDate && stockQuote.trailingAnnualDividendRate) ? <Link to={`/stock/${ticker}/dividends`} className={`btn btn-ghost ${location.pathname === `/stock/${ticker}/dividends` ? 'active' : ''}`}>Dividends</Link> : null
                }
                <Link to={`/stock/${ticker}/profile`} className={`btn btn-ghost ${location.pathname === `/stock/${ticker}/profile` ? 'active' : ''}`}>Profile</Link>
            </div>
            <div className="divider my-3"></div>
        </div>
    )
}

export default StockHeader