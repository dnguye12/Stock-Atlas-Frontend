import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { getYahooDailyGainers } from "../../../services/stock"
import { formatMarketCap } from "../../../utils/moneyUtils"
import { truncateText } from "../../../utils/textUtils"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Gainers = () => {
    const [gainers, setGainers] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyGainers(5)
                if (data && data.quotes) {
                    setGainers(data.quotes)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log("Getting gainers: ", error)
            }
        }

        fetchData()
    }, [])

    if (isLoading || !gainers) {
        return (
            <div>
                <div className="skeleton"></div>
            </div>

        )
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center w-full mb-3">
                <h3><FontAwesomeIcon icon="fa-solid fa-crown" className="mr-2" />Top <span className=" font-bold text-up">Gainers</span> Today</h3>
                <button onClick={() => navigate(`/day-gainers`)} className="btn home-btn bg-neutral-50 text-neutral-900 hover:bg-neutral-300 transition-colors duration-300">View More <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" /></button>
            </div>
            <table className="table">
                <thead>
                    <tr className="bg-neutral-900">
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Market Cap</th>
                        <th>Today</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gainers.map((gainer, idx) => (
                            <tr onClick={() => navigate(`/stock/${gainer.symbol}`)} className="hover transition duration-300 cursor-pointer odd:bg-neutral-950 even:bg-neutral-900" key={`gainer-${idx}`}>
                                <td className="symbol">{gainer.symbol}</td>
                                {gainer.displayName
                                    ? <td className="name">{truncateText(gainer.displayName)}</td>
                                    : <td className="name">{truncateText(gainer.shortName)}</td>}
                                <td>{formatMarketCap(gainer.marketCap)}</td>
                                <td>
                                    <p className="price">{`$${gainer.regularMarketPrice.toFixed(2)}`}</p>
                                    <p className="change text-up"><FontAwesomeIcon icon="fa-solid fa-caret-up" /> {`${gainer.regularMarketChangePercent.toFixed(2)}%`}</p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Gainers