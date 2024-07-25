/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

import { Link } from 'react-router-dom'
import { getStockLogo } from "../../../services/stock"
import { myToLocaleString } from "../../../utils/numberUtils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StockHeader = ({ ticker, stockQuote }) => {
    const [logoImg, setLogoImage] = useState('')

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

    if (!stockQuote) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className="flex justify-center flex-col">
            <div className="flex items-center px-5">
                <div className="avatar mr-2">
                    <div className="w-6 h-6 rounded-full ">
                        <img src={logoImg} alt={ticker} />
                    </div>
                </div>
                <div>
                    <p className=" font-bold text-lg leading-5 text-white">{stockQuote.longName} ({ticker})</p>
                    <p className=" text-sm">{stockQuote.quoteSourceName} - {stockQuote.currency}</p>
                </div>
            </div>
            <div className="flex items-center px-5 mt-2">
                <p className=" font-bold text-xl leading-5 text-white mr-2">{myToLocaleString(stockQuote.regularMarketPrice)}</p>
                {
                    stockQuote.regularMarketChange < 0
                        ?
                        <p className="text-down font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stockQuote.regularMarketChange.toFixed(2).substring(1)} (<FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2).substring(1)}%)</p>
                        :
                        <p className="text-up font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stockQuote.regularMarketChange.toFixed(2)} (<FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2)}%)</p>
                }
            </div>
            <div className="divider my-2"></div>
            <div className="navbar bg-base-100">
                <Link to={`/stock/${ticker}`} className="btn btn-ghost text-xl">Overview</Link>
                <Link to={`/stock/${ticker}/statistics`} className="btn btn-ghost text-xl">Statistics</Link>
                <Link to={`/stock/${ticker}/analyst-ratings`} className="btn btn-ghost text-xl">Analyst Ratings</Link>
                {
                    stockQuote.dividendDate && <Link to={`/stock/${ticker}/dividends`} className="btn btn-ghost text-xl">Dividends</Link>
                }
            </div>
            <div className="divider my-2"></div>
        </div>
    )
}

export default StockHeader