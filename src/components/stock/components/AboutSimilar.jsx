/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { getStockLogo, getYahooQuote } from "../../../services/stock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { myToLocaleString } from "../../../utils/numberUtils"
import { currToSymbol } from "../../../utils/moneyUtils"
import { truncateText } from "../../../utils/textUtils"

const AboutSimilar = ({ ticker }) => {
    const [stockQuote, setStockQuote] = useState('')
    const [logoImg, setLogoImage] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const logo = await getStockLogo(ticker)

                if (logo) {
                    setLogoImage(`data:image/png;base64,${logo}`)
                }
            } catch (error) {
                setLogoImage(null)
            }
        }

        fetchLogo()
    }, [ticker])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooQuote(ticker)

                if (data) {
                    setStockQuote(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [ticker])

    if (!stockQuote) {
        return (
            <tr className="hover cursor-pointer transition duration-300">
                <td>
                    <div className="flex items-center ">
                        <div className="rounded-full w-10 h-10 relative bg-neutral-950 border border-neutral-700 flex items-center justify-center mr-2">
                            <div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
                        </div>
                        <div className="flex flex-col">
                            <div className="h-3 w-10 skeleton my-1"></div>
                            <div className="h-3 w-20 skeleton"></div>
                        </div>
                    </div>

                </td>
                <td className="font-bold text-sm text-white"><div className="h-4 w-10 skeleton my-1"></div></td>
                <td><div className="h-4 w-10 skeleton my-1"></div></td>
            </tr>
        )
    }

    return (
        <tr className="hover cursor-pointer transition duration-300" onClick={() => {
            navigate(`/stock/${ticker}`)
        }}>
            <td>
                <div className="flex items-center">
                    <div className="rounded-full w-10 h-10 relative bg-neutral-950 border border-neutral-700 flex items-center justify-center mr-2">
                        {logoImg &&
                            <img className="w-8 h-8" src={logoImg} loading="lazy" style={{ clipPath: "circle(50%)" }} />
                        }
                    </div>
                    <div className="flex flex-col">
                        <p className="text-blue-500 font-semibold">{ticker}</p>
                        <p>{truncateText(stockQuote.shortName, 10)}</p>
                    </div>
                </div>

            </td>
            <td className="font-bold text-sm text-white">{currToSymbol(stockQuote.currency)}{myToLocaleString(stockQuote.regularMarketPrice)}</td>
            {
                stockQuote.regularMarketChangePercent >= 0
                    ?
                    <td className="font-semibold text-sm text-up"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2)}%</td>
                    :
                    <td className="font-semibold text-sm text-down"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2).slice(1)}%</td>
            }
        </tr>
    )
}

export default AboutSimilar