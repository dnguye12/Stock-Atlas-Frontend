import { useEffect, useState } from "react"
import { getYahooDailyGainers } from "../../services/stock"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatNumber } from "../../utils/numberUtils";
import { formatMarketCap } from "../../utils/moneyUtils";
import { truncateText } from "../../utils/textUtils";

const Header = () => {
    return (
        <>
            <h1 className=" font-bold text-2xl leading-5 text-white">Daily Biggest Winners</h1>
            <p className="my-3 text-sm">Discover the equities with the greatest gains in the trading day.</p>
            <div className="divider my-3"></div>
        </>
    )
}

const DayGainers = () => {
    const [gainers, setGainers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyGainers(100)

                if (data) {
                    setGainers(data)
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
                                gainers.quotes.map((gainer, idx) => (
                                    <tr key={idx} className="hover">
                                        <td>{idx + 1}</td>
                                        <td className="ticker" onClick={() => navigate(`/stock/${gainer.symbol}`)}>{gainer.symbol}</td>
                                        {
                                            gainer.shortName
                                                ?
                                                <td>{truncateText(gainer.shortName, 35)}</td>
                                                :
                                                <td>{truncateText(gainer.longName, 35)}</td>
                                        }
                                        <td className="text-white font-semibold">{gainer.regularMarketPrice.toFixed(2)}</td>
                                        <td className="text-up font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{gainer.regularMarketChange.toFixed(2)}</td>
                                        <td className="text-up font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{gainer.regularMarketChangePercent.toFixed(2)}%</td>
                                        <td>{formatNumber(gainer.regularMarketVolume)}</td>
                                        <td>{formatNumber(gainer.averageDailyVolume3Month)}</td>
                                        <td>{formatMarketCap(gainer.marketCap, gainer.currency)}</td>
                                        <td>{gainer.trailingPE ? gainer.trailingPE.toFixed(2): '-'}</td>
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

export default DayGainers