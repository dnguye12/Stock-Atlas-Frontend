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
            <h2>About {stockQuote.displayName}</h2>
            <table className="table table-sm table-compact ">
                <tbody>
                    <tr className="border-b border-neutral-800">
                        <td className="text-start lg:border-b lg:border-neutral-800   font-medium">CEO</td>
                        {assetProfile && assetProfile.companyOfficers && assetProfile.companyOfficers.length > 0
                            ? <td className=" lg:border-b lg:border-neutral-800  whitespace-normal">{assetProfile.companyOfficers[0].name}</td>
                            : <td className=" lg:border-b lg:border-neutral-800  whitespace-normal">_</td>
                        }
                        <td className="text-start lg:border-b lg:border-neutral-800   font-medium">Industry</td>
                        <td className=" lg:border-b lg:border-neutral-800  whitespace-normal">{assetProfile.industry}</td>
                    </tr>
                    <tr className=" ">
                        <td className="text-start lg:border-b lg:border-neutral-800   font-medium">Country</td>
                        <td className=" lg:border-b lg:border-neutral-800  whitespace-normal">{stockQuote.region}</td>
                        <td className="text-start lg:border-b lg:border-neutral-800   whitespace-pre-line font-medium">Sector</td>
                        <td className=" lg:border-b lg:border-neutral-800  whitespace-pre-line">{assetProfile.sector}</td>
                    </tr>
                    <tr className=" border-b border-neutral-800">
                        <td className="text-start lg:border-b lg:border-neutral-800   font-medium">Employees</td>
                        <td className=" lg:border-b lg:border-neutral-800 ">{formatNumber(assetProfile.fullTimeEmployees)}</td>
                        <td className="text-start lg:border-b lg:border-neutral-800   font-medium">Exchange</td>
                        <td className=" lg:border-b lg:border-neutral-800 ">{stockQuote.fullExchangeName}</td>
                    </tr>
                    <tr className=" border-b border-neutral-800">
                        <td className="text-start   font-medium">Mkt Cap</td>
                        <td className="">{formatMarketCap(stockQuote.marketCap)}</td>
                        <td className="text-start   font-medium">Avg. Volume</td>
                        <td className="">{formatMarketCap(stockQuote.regularMarketVolume)}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Description</h3>
            <p className=" line-clamp-3">{assetProfile.longBusinessSummary}</p>
            <div className="flex justify-between items-center">
                        <Link to="">Show more</Link>
                        {
                            assetProfile.website && <a href={assetProfile.website} target="_blank">Go to website<FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" /></a>
                        }
            </div>
        </div>
    )
}

export default StockAbout