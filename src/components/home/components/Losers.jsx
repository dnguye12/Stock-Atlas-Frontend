import { useEffect, useState } from "react"
import { getYahooDailyLosers } from "../../../services/stock"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
                            <tr className="hover odd:bg-neutral-800 even:bg-neutral-900" key={`gainer-${idx}`}>
                                <td>{loser.symbol}</td>
                                <td>{loser.name}</td>
                                <td>{ loser.marketCap}</td>
                                <td>
                                    <p>{loser.price}</p>
                                    <p><FontAwesomeIcon icon="fa-solid fa-caret-down" /> {loser.percentChange}</p>
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