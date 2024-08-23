import { useEffect, useState } from "react"
import { getYahooMostShortedStocks } from "../../services/stock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from 'react-router-dom';
import { truncateText } from "../../utils/textUtils";

const Header = () => {
    return (
        <>
            <h1 className=" font-bold text-2xl leading-5 text-white">Most Shorted Stocks</h1>
            <p className="my-3 text-sm">Discover the most shorted stocks in the market. Analyze trends, identify potential risks, and explore opportunities with a comprehensive list of companies facing significant short interest.</p>
            <div className="divider my-3"></div>
        </>
    )
}
const MostShortedStocks = () => {
    const [list, setList] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooMostShortedStocks(100)

                if (data) {
                    setList(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                return (
                    <div className="w-full flex">
                        <div className="w-full lg:w-2/3 my-5 p-5 border-r border-r-neutral-700">
                            <h1 className=" font-bold text-2xl leading-5 text-white">Most Shorted Stocks data is currently not available.</h1>
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
                                list.map((stock, idx) => (
                                    <tr key={idx} className="hover">
                                        <td>{idx + 1}</td>
                                        <td className="ticker" onClick={() => navigate(`/stock/${stock.title}`)}>{stock.title}</td>
                                        <td>{truncateText(stock.name, 35)}</td>
                                        <td className="text-white font-semibold">{Number(stock.price).toFixed(2).toLocaleString()}</td>
                                        {
                                            stock.change >= 0
                                                ?
                                                (
                                                    <td className="text-up font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{Number(stock.change).toFixed(2)}</td>
                                                )
                                                :
                                                (
                                                    <td className="text-down font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{Number(stock.change).toFixed(2).slice(1)}</td>
                                                )
                                        }
                                        {
                                            stock.change >= 0
                                                ?
                                                (
                                                    <td className="text-up font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stock.percentChange.slice(1)}</td>
                                                )
                                                :
                                                (
                                                    <td className="text-down font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stock.percentChange.slice(1)}</td>
                                                )
                                        }
                                        <td>{stock.volume}</td>
                                        <td>{stock.avgVolume}</td>
                                        <td>{stock.marketCap}</td>
                                        <td>{stock.pe || '-'}</td>
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

export default MostShortedStocks