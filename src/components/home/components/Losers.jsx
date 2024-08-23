import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { getYahooDailyLosers } from "../../../services/stock"
import { truncateText } from "../../../utils/textUtils"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Losers = () => {
    const [losers, setLosers] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyLosers(5)
                if (data) {
                    setLosers(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log("Getting gainers: ", error)
            }
        }

        fetchData()
    }, [])

    if (isLoading) {
        return (
            <div>
                <div className="skeleton"></div>
            </div>

        )
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center w-full mb-3">
                <h3><FontAwesomeIcon icon="fa-solid fa-person-falling-burst" className="mr-2" />Top <span className=" font-bold text-down">Losers</span> Today</h3>
                <button onClick={() => navigate(`/day-losers`)} className="btn home-btn bg-neutral-50 text-neutral-900 hover:bg-neutral-300 transition-colors duration-300">View More <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" /></button>
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
                        losers.map((loser, idx) => (
                            <tr onClick={() => navigate(`/stock/${loser.title}`)} className="hover transition duration-300 cursor-pointer odd:bg-neutral-950 even:bg-neutral-900" key={`gainer-${idx}`}>
                                <td className="symbol">{loser.title}</td>
                                <td className="name">{truncateText(loser.name)}</td>
                                <td>${loser.marketCap}</td>
                                <td>
                                    <p className="price">${loser.price}</p>
                                    <p className="change text-down"><FontAwesomeIcon icon="fa-solid fa-caret-down" /> {loser.percentChange.substring(1)}</p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Losers