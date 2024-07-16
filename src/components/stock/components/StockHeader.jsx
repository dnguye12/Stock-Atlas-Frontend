/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

import { Link } from 'react-router-dom'
import { getStockLogo } from "../../../services/stock"

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
            <div className="avatar mr-2">
                <div className="w-6 h-6 rounded-full ">
                    <img src={logoImg} alt={ticker} />
                </div>
            </div>
            <div>
                <p>{ticker} - {stockQuote.quoteSourceName} - {stockQuote.currency}</p>
                <p>{stockQuote.longName}</p>
            </div>

            <div className="navbar bg-base-100">
                <Link to={`/stock/${ticker}`} className="btn btn-ghost text-xl">Overview</Link>
                <Link to={`/stock/${ticker}/statistics`} className="btn btn-ghost text-xl">Statistics</Link>
            </div>
        </div>
    )
}

export default StockHeader