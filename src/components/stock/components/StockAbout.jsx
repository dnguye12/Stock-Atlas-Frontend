import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import { getYahooQuoteSummary } from "../../../services/stock"
import { formatMarketCap } from "../../../utils/moneyUtils"
import { formatNumber } from "../../../utils/numberUtils"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
const StockAbout = ({ ticker, stockQuote }) => {
    const [assetProfile, setAssetProfile] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAssetProfile = await getYahooQuoteSummary(ticker, ['assetProfile'])
                setAssetProfile(fetchAssetProfile.assetProfile)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [ticker])

    if (!assetProfile) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className=" w-full">
            <h2 className="text-white text-lg font-bold leading-5 mt-7 mb-3">About {stockQuote.displayName}</h2>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">CEO</p>
                    {assetProfile && assetProfile.companyOfficers && assetProfile.companyOfficers.length > 0
                        ? <p className="whitespace-normal text-sm ps-3">{assetProfile.companyOfficers[0].name}</p>
                        : <p className="whitespace-normal text-sm ps-3">_</p>
                    }
                </div>

                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">Industry</p>
                    <p className="whitespace-normal text-sm ps-3">{assetProfile.industry}</p>
                </div>
                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">Country</p>
                    <p className="whitespace-normal text-sm ps-3">{stockQuote.region}</p>
                </div>
                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">Sector</p>
                    <p className="whitespace-normal text-sm ps-3">{assetProfile.sector}</p>
                </div>
                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">Employees</p>
                    <p className="whitespace-normal text-sm ps-3">{formatNumber(assetProfile.fullTimeEmployees)}</p>
                </div>
                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">Exchange</p>
                    <p className="whitespace-normal text-sm ps-3">{stockQuote.fullExchangeName}</p>
                </div>
                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">Mkt Cap</p>
                    <p className="whitespace-normal text-sm ps-3">{formatMarketCap(stockQuote.marketCap)}</p>
                </div>
                <div className="flex items-center border-b border-neutral-800 h-14">
                    <p className="text-white font-medium text-sm ps-4 w-20">Avg. Volume</p>
                    <p className="whitespace-normal text-sm ps-3">{formatMarketCap(stockQuote.regularMarketVolume)}</p>
                </div>
            </div>
            <h3 className="font-bold text-white my-3">Description</h3>
            <p className=" line-clamp-3 text-sm">{assetProfile.longBusinessSummary}</p>
            <div className="flex justify-between items-center mt-5">
                <Link className="my-btn" to="">Show more</Link>
                {
                    assetProfile.website && <a href={assetProfile.website} target="_blank" className="my-btn">Go to website<FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" /></a>
                }
            </div>
        </div>
    )
}

export default StockAbout