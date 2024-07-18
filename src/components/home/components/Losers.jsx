import { useEffect, useState } from "react"
import { getYahooDailyLosers } from "../../../services/stock"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { truncateText } from "../../../utils/textUtils"

const Losers = () => {
    const [losers, setLosers] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyLosers(5)
                setLosers(data)
            } catch (error) {
                console.log("Getting gainers: ", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <div className="overflow-x-auto">
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
                            <tr className="hover cursor-pointer odd:bg-neutral-800 even:bg-neutral-900" key={`gainer-${idx}`}>
                                <td className="symbol">{loser.symbol}</td>
                                <td className="name">{truncateText(loser.name)}</td>
                                <td>{ loser.marketCap}</td>
                                <td>
                                    <p className="price">{loser.price}</p>
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