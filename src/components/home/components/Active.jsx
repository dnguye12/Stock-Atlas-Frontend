import { useEffect, useState } from "react"
import { getYahooDailyActives } from "../../../services/stock"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
            <div>Loading</div>
        )
    }
    return (
        <div className="overflow-x-auto">
            <h3>Most Active Today</h3>
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
                            <tr className="hover odd:bg-neutral-800 even:bg-neutral-900" key={`gainer-${idx}`}>
                                <td>{active.symbol}</td>
                                <td>{active.name}</td>
                                <td>{active.volume}</td>
                                <td>
                                    <p>{`$${active.price}`}</p>
                                    {
                                        active.percentChange > 0
                                        ? <p><FontAwesomeIcon icon="fa-solid fa-caret-up" /> {`${active.percentChange}`}</p>
                                        : <p><FontAwesomeIcon icon="fa-solid fa-caret-down" /> {`${active.percentChange}`}</p>
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