import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { getYahooMostShortedStocks } from "../../../services/stock"
import { truncateText } from "../../../utils/textUtils"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Shorteds = () => {
    const [shorteds, setShorteds] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooMostShortedStocks(5)
                if (data) {
                    setShorteds(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log("Getting daily actives: ", error)
            }
        }

        fetchData()
    }, [])

    if (isLoading) {
        return (
            <div>
                <h3><FontAwesomeIcon icon="fa-solid fa-chart-line" className="mr-2" />Top Shorted Today</h3>
                <div className="skeleton"></div>
            </div>

        )
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center w-full mb-3">
                <h3><FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" className="mr-2" />Top Shorted Today</h3>
                <button onClick={() => navigate(`/most-shorted-stocks`)} className="btn home-btn bg-neutral-50 text-neutral-900 hover:bg-neutral-300 transition-colors duration-300">View More <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" /></button>
            </div>

            <table className="table">
                <thead>
                    <tr className="bg-neutral-900">
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Volume</th>
                        <th>Today</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        shorteds.map((shorted, idx) => (
                            <tr onClick={() => navigate(`/stock/${shorted.title}`)} className="hover transition duration-300 cursor-pointer odd:bg-neutral-950 even:bg-neutral-900" key={`gainer-${idx}`}>
                                <td className="symbol">{shorted.title}</td>
                                <td className="name">{truncateText(shorted.name)}</td>
                                <td>{shorted.volume}</td>
                                <td>
                                    <p className="price">{`$${Number(shorted.price).toFixed(2)}`}</p>
                                    {
                                        shorted.percentChange.charAt(0) === '+'
                                            ? <p className="change text-up"><FontAwesomeIcon icon="fa-solid fa-caret-up" /> {`${shorted.percentChange.substring(1)}`}</p>
                                            : <p className="change text-down"><FontAwesomeIcon icon="fa-solid fa-caret-down" /> {`${shorted.percentChange.substring(1)}`}</p>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Shorteds