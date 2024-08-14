/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { getYahooRatiosAnnual, getYahooRatiosQuarterly } from "../../../services/stock"

const FinancialsRatios = ({ ticker }) => {
    const [showAnnual, setShowAnnual] = useState(true)
    const [annualData, setAnnualData] = useState(null)
    const [loadingAnnual, setLoadingAnnual] = useState(true)
    const [quarterData, setQuarterData] = useState(null)
    const [loadingQuarter, setLoadingQuarter] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooRatiosAnnual(ticker)

                if (data) {
                    setAnnualData(data)
                    setLoadingAnnual(false)
                }
            } catch (error) {
                setLoadingAnnual(false)
                console.log(error)
            }
        }
        fetchData()
    }, [ticker])

    useEffect(() => {
        const fetchData = async () => {
            if (!loadingAnnual) {
                try {
                    const data = await getYahooRatiosQuarterly(ticker)

                    if (data) {
                        setQuarterData(data)
                        setLoadingQuarter(false)
                    }
                } catch (error) {
                    setLoadingQuarter(false)
                    console.log(error)
                }
            }
        }
        fetchData()
    }, [ticker, loadingAnnual])

    if ((loadingAnnual && showAnnual) || (loadingQuarter && !showAnnual)) {
        return (
            <div className="skeleton w-full h-full min-h-screen rounded bg-neutral-950 border border-neutral-700"></div>
        )
    }

    if ((!annualData && !loadingAnnual) || (!quarterData && !loadingQuarter)) {
        return (
            <div>
                <p className="text-center text-white text-lg font-semibold mt-5">Ratios data is currently not available for {ticker}.</p>
            </div>
        )
    }

    return (
        <div className="">
            <div className="w-full flex justify-between">
                <div className="flex flex-col justify-center">
                    <p className="text-sm">All numbers in thousands</p>
                </div>
                <div>
                    <button className={`btn btn-ghost rounded-none ${showAnnual && "text-white border-b-2 border-b-up"}`} onClick={() => setShowAnnual(true)}>Annual</button>
                    <button className={`btn btn-ghost rounded-none ms-2 ${!showAnnual && "text-white border-b-2 border-b-up"}`} onClick={() => setShowAnnual(false)}>Quarterly</button>
                </div>
            </div>
            {
                showAnnual &&
                <div className="overflow-x-auto mt-5">
                    <table className="table table-sm finan-table">
                        <thead>
                            <tr>
                                {
                                    annualData.header.map((dat, idx) => (
                                        <th key={idx}>{dat}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                annualData.body.map((dat, idx) => (
                                    <tr key={idx}>
                                        <th>{dat[0]}</th>
                                        {
                                            dat.slice(1).map((dat2, idx2) => (
                                                <td key={idx2}>{dat2}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                !showAnnual &&
                <div className="overflow-x-auto mt-5">
                    <table className="table table-sm finan-table">
                        <thead>
                            <tr>
                                {
                                    quarterData.header.map((dat, idx) => (
                                        <th key={idx}>{dat}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                quarterData.body.map((dat, idx) => (
                                    <tr key={idx}>
                                        <th>{dat[0]}</th>
                                        {
                                            dat.slice(1).map((dat2, idx2) => (
                                                <td key={idx2}>{dat2}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default FinancialsRatios