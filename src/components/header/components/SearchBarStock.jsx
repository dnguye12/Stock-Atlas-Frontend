import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { getStockLogo, getYahooQuote } from "../../../services/stock"
import { capitalizeWord } from "../../../utils/textUtils"

/* eslint-disable react/prop-types */
const SearchBarStock = ({ ticker, setSearchInput }) => {
    const [stockQuote, setStockQuote] = useState(null)
    const [logoImg, setLogoImage] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logo, quote] = await Promise.all([
                    getStockLogo(ticker),
                    getYahooQuote(ticker)
                ])
                if (logo) {
                    setLogoImage(`data:image/png;base64,${logo}`)
                }
                if (quote) {
                    setStockQuote(quote)
                }
            } catch (error) {
                setLogoImage(null)
                console.log(error)
            }
        }

        fetchData()
    }, [ticker])

    if (!stockQuote) {
        return (
            <tr className="hover cursor-pointer transition duration-300" onClick={() => {
                setSearchInput('')
                document.getElementById('my_search_modal').close()
            }
            }>
                <td className="w-12 px-0">
                    <div className="rounded-full w-10 h-10 relative bg-neutral-950 border border-neutral-700 flex items-center justify-center mr-2">
                        <div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
                    </div>
                </td>
                <td className="ps-0 flex flex-col justify-start">
                    <div className="h-3 w-10 skeleton my-1"></div>
                    <div className="h-3 w-full skeleton"></div>
                </td>
                <td>
                    <div className="flex justify-end">
                        <div className="h-4 w-10 skeleton my-1"></div>
                    </div>
                </td>

            </tr>
        )
    }

    return (
        <tr className="hover cursor-pointer transition duration-300" onClick={() => {
            document.getElementById('my_search_modal').close()
            navigate(`/stock/${ticker}`)
        }
        }>
            <td className="w-12 px-0">
                <div className="rounded-full w-10 h-10 relative bg-neutral-950 border border-neutral-700 flex items-center justify-center mr-2">
                    {logoImg &&
                        <img className="w-8 h-8" src={logoImg} loading="lazy" style={{ clipPath: "circle(50%)" }} />
                    }
                </div>
            </td>
            <td className="ps-0 flex flex-col justify-start">
                <p className="text-sm font-semibold text-blue-500">{ticker}</p>
                <p className="text-xs font-normal text-white">{stockQuote.shortName}</p>
            </td>
            <td>
                <p className="text-end text-sm font-semibold text-white">{stockQuote.quoteType.toLowerCase().includes("equity") ? "Stock" : capitalizeWord(stockQuote.quoteType.toLowerCase())}</p>
            </td>
        </tr>
    )
}

export default SearchBarStock