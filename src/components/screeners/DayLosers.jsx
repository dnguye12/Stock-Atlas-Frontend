import { useEffect, useState } from "react"
import { getYahooDailyLosers } from "../../services/stock"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { truncateText } from "../../utils/textUtils";

const Header = () => {
    return (
        <>
            <h1 className=" font-bold text-2xl leading-5 text-white">Daily Biggest Losers</h1>
            <p className="my-3 text-sm">Discover the equities with the greatest losses in the trading day.</p>
            <div className="divider my-3"></div>
        </>
    )
}

const DayLosers = () => {
    const [losers, setLosers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyLosers(100)

                if (data) {
                    setLosers(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                return (
                    <div className="w-full flex">
                        <div className="w-full lg:w-2/3 my-5 p-5 border-r border-r-neutral-700">
                            <h1 className=" font-bold text-2xl leading-5 text-white">Daily Biggest Winners data is currently not available.</h1>
                        </div>
                    </div>
                )
            }
        }
        fetchData()
    }, [])

    if (isLoading) {
        return (
            <div className="w-full flex">
                <div className="w-full my-5 p-5">
                    <Header />
                    <div className="skeleton w-full h-screen rounded border-neutral-700 bg-neutral-900"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="screeners w-full flex">
            <div className="w-full my-5 px-5">
                <Header />
                <div className="overflow-x-auto">
                    <table className="table table-xs md:table-md">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ticker</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>% Change</th>
                                <th>Volume</th>
                                <th>Avg Vol (3 month)</th>
                                <th>Market Cap</th>
                                <th>PE Ratio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                losers.map((loser, idx) => (
                                    <tr key={idx} className="hover">
                                        <td>{idx + 1}</td>
                                        <td className="ticker" onClick={() => navigate(`/stock/${loser.title}`)}>{loser.title}</td>
                                        <td>{truncateText(loser.name, 35)}</td>
                                        <td className="text-white font-semibold">{Number(loser.price).toFixed(2)}</td>
                                        <td className="text-down font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{Number(loser.change).toFixed(2).slice(1)}</td>
                                        <td className="text-down font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{loser.percentChange.slice(1)}</td>
                                        <td>{loser.volume}</td>
                                        <td>{loser.avgVolume}</td>
                                        <td>{loser.marketCap}</td>
                                        <td>{loser.pe || '-'}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DayLosers