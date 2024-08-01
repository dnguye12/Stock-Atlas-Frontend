import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import { getYahooQuoteSummary, getYahooRecommendationBySymbol } from "../../../services/stock"
import { currToSymbol, formatMarketCap } from "../../../utils/moneyUtils"
import { formatNumber, percentageDiff } from "../../../utils/numberUtils"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalizeWord } from "../../../utils/textUtils"
import AboutSimilar from "./AboutSimilar"

/* eslint-disable react/prop-types */
const StockAbout = ({ ticker, stockQuote }) => {
    const [assetProfile, setAssetProfile] = useState(null)
    const [financialData, setFinancialData] = useState(null)
    const [recommendationTrend, setRecommendationTrend] = useState(null)
    const [similarStocks, setSimilarStocks] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAssetProfile = await getYahooQuoteSummary(ticker, ['assetProfile', 'financialData', 'recommendationTrend'])
                setAssetProfile(fetchAssetProfile.assetProfile)
                setFinancialData(fetchAssetProfile.financialData)
                setRecommendationTrend(fetchAssetProfile.recommendationTrend)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [ticker])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooRecommendationBySymbol(ticker)
                setSimilarStocks(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [ticker])

    if (!assetProfile || !financialData || !recommendationTrend || !similarStocks) {
        return (
            <div>...Loading</div>
        )
    }

    const trend = recommendationTrend.trend[0]
    let totalTrend
    if (trend) {
        totalTrend = trend.strongBuy + trend.buy + trend.hold + trend.sell + trend.strongSell
    }

    return (
        <div className=" w-full stock-about">
            <div className="bg-neutral-800 border border-neutral-700 rounded p-4 border-spacing-10 mt-7">
                <h2 className="text-white text-lg font-bold mb-3">About {stockQuote.displayName}</h2>

                <table className="table">
                    <tr>
                        <th>CEO</th>
                        <td>{assetProfile && assetProfile.companyOfficers && assetProfile.companyOfficers.length > 0 ? assetProfile.companyOfficers[0].name : '-'}</td>
                        <th>Industry</th>
                        <td>{assetProfile.industry || '-'}</td>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td>{stockQuote.region || '-'}</td>
                        <th>Sector</th>
                        <td>{assetProfile.sector || '-'}</td>
                    </tr>
                    <tr>
                        <th>Employees</th>
                        <td>{assetProfile.fullTimeEmployees ? formatNumber(assetProfile.fullTimeEmployees) : '-'}</td>
                        <th>Exchange</th>
                        <td>{stockQuote.fullExchangeName || '-'}</td>
                    </tr>
                    <tr>
                        <th>Mkt Cap</th>
                        <td>{stockQuote.marketCap ? formatMarketCap(stockQuote.marketCap, stockQuote.currency) : '-'}</td>
                        <th>Avg. Volume</th>
                        <td>{stockQuote.regularMarketVolume ? formatMarketCap(stockQuote.regularMarketVolume, stockQuote.currency) : '-'}</td>
                    </tr>
                </table>
                <div className="divider mt-0 mb-3"></div>
                <h3 className="font-bold text-white my-3">Description</h3>
                <p className=" line-clamp-3 text-sm">{assetProfile.longBusinessSummary}</p>
                <div className="flex justify-between items-center mt-5">
                    <Link className="my-btn" to={`/stock/${ticker}/profile`}>Show more</Link>
                    {
                        assetProfile.website && <a href={assetProfile.website} target="_blank" className="my-btn">Go to website<FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" /></a>
                    }
                </div>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded p-4 mt-4">
                <h2 className="text-white text-lg font-bold mb-3">Analyst Rating</h2>
                <div className="flex justify-between mb-3">
                    <div>
                        <p className="font-semibold mb-1">Signal</p>
                        <p className={`font-semibold ${financialData.recommendationKey.toLowerCase().includes('buy') ? 'text-up' : financialData.recommendationKey.toLowerCase().includes('sell') ? 'text-down' : 'text-hold'}`}>{capitalizeWord(financialData.recommendationKey)}</p>
                    </div>
                    <div className="text-end">
                        <p className="font-semibold mb-1">Price Target</p>
                        <p className="text-white font-semibold">{currToSymbol(stockQuote.currency)}{financialData.targetMeanPrice}</p>
                    </div>
                </div>
                {
                    financialData.currentPrice <= financialData.targetMeanPrice
                        ?
                        <p>The Stock Price has an upside of <span className="font-semibold text-up">{percentageDiff(financialData.currentPrice, financialData.targetMeanPrice).toFixed(2)}%</span> based on <span className="text-white font-semibold">{financialData.numberOfAnalystOpinions}</span> analysts in the past month.</p>
                        :
                        <p>The Stock Price has an downside of <span className="font-semibold text-down">{percentageDiff(financialData.targetMeanPrice, financialData.currentPrice).toFixed(2)}%</span> based on <span className="text-white font-semibold">{financialData.numberOfAnalystOpinions}</span> analysts in the past month.</p>
                }

                <div className="my-3">
                    <div className="flex flex-col mb-3">
                        <div className="flex justify-between mb-2">
                            <p className="font-semibold text-white">Buy</p>
                            <p className="font-semibold text-white">{((trend.strongBuy + trend.buy) / totalTrend * 100).toFixed(2)}%</p>
                        </div>
                        <progress className="progress progress-success w-full" value={(trend.strongBuy + trend.buy)} max={totalTrend}></progress>
                    </div>
                    <div className="flex flex-col mb-3">
                        <div className="flex justify-between mb-2">
                            <p className="font-semibold text-white">Hold</p>
                            <p className="font-semibold text-white">{((trend.hold) / totalTrend * 100).toFixed(2)}%</p>
                        </div>
                        <progress className="progress progress-warning w-full" value={(trend.hold)} max={totalTrend}></progress>
                    </div>
                    <div className="flex flex-col mb-3">
                        <div className="flex justify-between mb-2">
                            <p className="font-semibold text-white">Sell</p>
                            <p className="font-semibold text-white">{((trend.strongSell + trend.sell) / totalTrend * 100).toFixed(2)}%</p>
                        </div>
                        <progress className="progress progress-error w-full" value={(trend.strongSell + trend.sell)} max={totalTrend}></progress>
                    </div>
                </div>
                <Link className="my-btn w-full mt-5" to={`/stock/${ticker}/analyst-ratings`}>Analyst Ratings</Link>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded p-4 mt-4">
                <h2 className="text-white text-lg font-bold mb-3">Similar Stocks</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            similarStocks.recommendedSymbols.map((stock, idx) => (
                                <AboutSimilar key={idx} ticker={stock.symbol} />

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StockAbout