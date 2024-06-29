import { useEffect, useState } from "react"
import { getYahooDailyGainers } from "../../../services/stock"
import { formatMarketCap } from "../../../utils/moneyUtils"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Gainers = () => {
    const [gainers, setGainers] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyGainers(5)
                setGainers(data.quotes)
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
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Market Cap</th>
                        <th>Today</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gainers.map((gainer, idx) => (
                            <tr key={`gainer-${idx}`}>
                                <td>{gainer.symbol}</td>
                                {gainer.displayName
                                    ? <td>{gainer.displayName}</td>
                                    : <td>{gainer.shortName}</td>}
                                <td>{ formatMarketCap(gainer.marketCap)}</td>
                                <td>
                                    <p>{`$${gainer.regularMarketPrice.toFixed(2)}`}</p>
                                    <p><FontAwesomeIcon icon="fa-solid fa-caret-up" /> {`+${gainer.regularMarketChangePercent.toFixed(2)}%`}</p>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    <tr className="hover">
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Gainers