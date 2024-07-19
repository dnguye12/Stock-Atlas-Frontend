import { useEffect, useState } from "react"
import { getYahooDailyActives } from "../../../services/stock"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { truncateText } from "../../../utils/textUtils"

const Active = () => {
    const [actives, setActives] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyActives(5)
                setActives(data)
            } catch (error) {
                console.log("Getting daily actives: ", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading) {
        return (
            <div>
                <h3><FontAwesomeIcon icon="fa-solid fa-chart-line" className="mr-2" />Most Active Today</h3>
                <div className="skeleton"></div>
            </div>

        )
    }

    return (
        <div className="overflow-x-auto">
            <h3><FontAwesomeIcon icon="fa-solid fa-chart-line" className="mr-2" />Most Active Today</h3>
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
                        actives.map((active, idx) => (
                            <tr className="hover cursor-pointer odd:bg-neutral-800 even:bg-neutral-900" key={`gainer-${idx}`}>
                                <td className="symbol">{active.symbol}</td>
                                <td className="name">{truncateText(active.name)}</td>
                                <td>{active.volume}</td>
                                <td>
                                    <p className="price">{`$${active.price}`}</p>
                                    {
                                        active.percentChange.charAt(0) === '+'
                                            ? <p className="change text-up"><FontAwesomeIcon icon="fa-solid fa-caret-up" /> {`${active.percentChange.substring(1)}`}</p>
                                            : <p className="change text-down"><FontAwesomeIcon icon="fa-solid fa-caret-down" /> {`${active.percentChange.substring(1)}`}</p>
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

export default Active