/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { getStockLogo, getYahooESG, getYahooQuoteSummary } from "../../services/stock"
import { formatMarketCap } from "../../utils/moneyUtils"
import { formatNumber } from "../../utils/numberUtils";
import { truncateText } from "../../utils/textUtils";

const ESGScore = ({ name, score, percentile, performance }) => {
    return (
        <div className="flex flex-col border border-neutral-700 rounded p-4">
            <h3 className="text-sm text-white font-semibold">{name}</h3>
            <div className="flex mt-2">
                <h4 className="text-white font-semibold">{score}</h4>
                {
                    percentile !== 'N/A' &&
                    <>
                        <div className="divider divider-horizontal"></div>
                        <span className="text-sm">{percentile}</span>
                    </>
                }
            </div>
            {
                performance !== 'N/A' &&
                <span>{performance}</span>
            }
        </div>
    )
}

const StockProfile = ({ ticker, stockQuote }) => {
    const navigate = useNavigate();

    const [logoImg, setLogoImage] = useState('')
    const [stockSummary, setStockSummary] = useState(null)
    const [stockEsg, setStockEsg] = useState(null)
    const [doneLoadingEsg, setDoneLoadingEsg] = useState(false)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await getYahooQuoteSummary(ticker, ['assetProfile', 'incomeStatementHistory', 'quoteType']);
                setStockSummary(summary);
            } catch (error) {
                console.log("Error fetching stock summary: ", error);
                return (
                    <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                        <p className="text-center text-white text-lg font-semibold">Stock profile data is currently not available for {ticker}.</p>
                    </div>
                )
            }
        };

        fetchSummary();
    }, [ticker]);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const logo = await getStockLogo(ticker);
                setLogoImage(`data:image/png;base64,${logo}`);
            } catch (error) {
                console.log("Error fetching stock logo: ", error);
            }
        };

        fetchLogo();
    }, [ticker]);

    useEffect(() => {
        const fetchEsg = async () => {
            try {
                const esg = await getYahooESG(ticker);
                setStockEsg(esg);
                setDoneLoadingEsg(true)
            } catch (error) {
                console.log("Error fetching ESG data: ", error);
            }
        };

        fetchEsg();
    }, [ticker]);

    if (!stockSummary) {
        return (
            <div className="w-full h-96 skeleton border border-neutral-700 bg-neutral-950 rounded"></div>
        )
    }

    return (
        <div className="stock-profile flex flex-col">
            <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                <div className="flex flex-col items-center">
                    <h2 className="font-semibold text-white mb-3 text-2xl">{stockSummary.quoteType.longName}</h2>
                    {
                        (logoImg && !logoImg.toLowerCase().includes('undefined'))
                            ?
                            <img className="w-32 drop-shadow-lg hover:scale-105 transition-transform duration-300 mb-3 rounded" src={logoImg} alt={`${ticker} logo`} />
                            :
                            <div className="avatar placeholder mb-3">
                                <div className="w-32 drop-shadow-lg hover:scale-105 transition-transform duration-300 rounded-full bg-neutral-900">
                                </div>
                            </div>
                    }
                </div>

                <h3 className="font-semibold text-white mb-3">Company Description</h3>
                {
                    (stockSummary.assetProfile && stockSummary.assetProfile.longBusinessSummary)
                        ? <p className="text-base">{stockSummary.assetProfile.longBusinessSummary.trim()}</p>
                        : <p>Company description data is currently not available for {ticker}.</p>
                }
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
                <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                    <h3 className="font-semibold text-white mb-3">Stock Details</h3>
                    <table className="table table-sm">
                        <tbody>
                            <tr>
                                <th>Ticker Symbol</th>
                                <td>{ticker}</td>
                            </tr>
                            <tr>
                                <th>Exchange</th>
                                <td>{stockQuote.fullExchangeName}</td>
                            </tr>
                            <tr>
                                <th>Reporting Currency</th>
                                <td>{stockQuote.currency}</td>
                            </tr>
                            <tr>
                                <th>First trading date</th>
                                <td>{moment(stockQuote.firstTradeDateMilliseconds).format("MMM Do YYYY")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                    <h3 className="font-semibold text-white mb-3">Contact Details</h3>
                    <table className="table table-sm">
                        <tbody>
                            <div className="flex flex-col my-address">
                                <h4>Address</h4>
                                <p>{(stockSummary.assetProfile && stockSummary.assetProfile.address1) && stockSummary.assetProfile.address1}</p>
                                {
                                    (stockSummary.assetProfile && stockSummary.assetProfile.city && stockSummary.assetProfile.state && stockSummary.assetProfile.zip)
                                    && <p>{stockSummary.assetProfile.city}, {stockSummary.assetProfile.state} {stockSummary.assetProfile.zip}</p>
                                }
                                <p>{(stockSummary.assetProfile && stockSummary.assetProfile.country) ? stockSummary.assetProfile.country : '-'}</p>
                            </div>
                            <tr style={{ borderTop: "1px solid rgb(25, 30, 36)" }}>
                                <th>Phone</th>
                                <td>{(stockSummary.assetProfile && stockSummary.assetProfile.phone) ? stockSummary.assetProfile.phone : '-'}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                {
                                    stockSummary.assetProfile && stockSummary.assetProfile.website
                                        ?
                                        <td><a className="text-blue-500" href={`${stockSummary.assetProfile.website}`} target="_blank">{stockSummary.assetProfile.website}</a></td>
                                        :
                                        <td>-</td>
                                }

                            </tr>
                        </tbody>
                    </table>
                </div>
                {
                    stockSummary.assetProfile && stockSummary.assetProfile.fullTimeEmployees &&
                    <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                        <h3 className="font-semibold text-white mb-3">{stockQuote.displayName} Employees</h3>
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Employees</th>
                                    <td>{formatNumber(stockSummary.assetProfile.fullTimeEmployees)}</td>
                                </tr>
                                <tr>
                                    <th>Revenue / Employee</th>
                                    <td>{formatMarketCap(stockSummary.incomeStatementHistory.incomeStatementHistory[0].totalRevenue / stockSummary.assetProfile.fullTimeEmployees, stockQuote.currency)}</td>
                                </tr>
                                <tr>
                                    <th>Profits / Employee</th>
                                    <td>{formatMarketCap(stockSummary.incomeStatementHistory.incomeStatementHistory[0].netIncome / stockSummary.assetProfile.fullTimeEmployees, stockQuote.currency)}</td>
                                </tr>
                                <tr>
                                    <th>Market Cap</th>
                                    <td>{formatMarketCap(stockQuote.marketCap, stockQuote.currency)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                {stockSummary.assetProfile && stockSummary.assetProfile.overallRisk &&
                    <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                        <h3 className="font-semibold text-white mb-3">Corporate Governance</h3>
                        <p className="text-sm px-3"><span className="text-white font-semibold">{stockQuote.displayName}</span>'s ISS Governance QualityScore as of <span className="font-semibold text-white">{moment(stockSummary.assetProfile.governanceEpochDate).format("MMM Do YYYY")}</span> is <span className={`font-semibold ${stockSummary.assetProfile.overallRisk > 6 ? "text-down" : stockSummary.assetProfile.overallRisk < 4 ? "text-up" : "text-hold"}`}>{stockSummary.assetProfile.overallRisk}</span>.</p>
                        <p className="text-sm mb-3 px-3">The pillar scores are:</p>
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Audit Risk</th>
                                    <td className={`font-semibold ${stockSummary.assetProfile.auditRisk > 6 ? "text-down" : stockSummary.assetProfile.auditRisk < 4 ? "text-up" : "text-hold"}`}>{stockSummary.assetProfile.auditRisk}</td>
                                </tr>
                                <tr>
                                    <th>Board Risk</th>
                                    <td className={`font-semibold ${stockSummary.assetProfile.boardRisk > 6 ? "text-down" : stockSummary.assetProfile.boardRisk < 4 ? "text-up" : "text-hold"}`}>{stockSummary.assetProfile.boardRisk}</td>
                                </tr>
                                <tr>
                                    <th>Compensation Risk</th>
                                    <td className={`font-semibold ${stockSummary.assetProfile.compensationRisk > 6 ? "text-down" : stockSummary.assetProfile.compensationRisk < 4 ? "text-up" : "text-hold"}`}>{stockSummary.assetProfile.compensationRisk}</td>
                                </tr>
                                <tr>
                                    <th>Shareholder Rights Risk</th>
                                    <td className={`font-semibold ${stockSummary.assetProfile.shareHolderRightsRisk > 6 ? "text-down" : stockSummary.assetProfile.shareHolderRightsRisk < 4 ? "text-up" : "text-hold"}`}>{stockSummary.assetProfile.shareHolderRightsRisk}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="divider px-3 mb-3"></div>
                        <p className="text-sm px-3">Corporate governance scores courtesy of <a href="https://www.issgovernance.com/esg/ratings/governance-qualityscore/" className="text-blue-500" target="_blank">Institutional Shareholder Services (ISS)</a> Scores indicate decile rank relative to index or region.
                            A decile score of 1 indicates lower governance risk, while a 10 indicates higher governance risk.</p>
                    </div>
                }
                {
                    stockEsg
                    &&
                    <>
                        <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                            <h3 className="font-semibold text-white mb-3">Environment, Social and Governance (ESG) Risk Ratings</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {
                                    stockEsg.esgScore.map((esg, idx) => (
                                        <ESGScore key={idx} name={esg.type} score={esg.score} percentile={esg.percentile} performance={esg.performance} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
                            <h3 className="font-semibold text-white mb-3">ESG Risk Score for Peers</h3>
                            <table className="table table-sm border border-neutral-700 rounded-lg">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Total</th>
                                        <th>E</th>
                                        <th>S</th>
                                        <th>G</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stockEsg.peerScore.map((peer, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    <div className="flex flex-col">
                                                        <h4 className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400 duration-300" onClick={() => navigate(`/stock/${peer.ticker}`)}>{peer.ticker}</h4>
                                                        <p className="text-xs font-semibold">{truncateText(peer.name, 22)}</p>
                                                    </div>
                                                </td>
                                                <td>{peer.totalESGScore}</td>
                                                <td>{peer.environmentalScore}</td>
                                                <td>{peer.socialScore}</td>
                                                <td>{peer.governanceScore}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }
                {
                    !doneLoadingEsg &&
                    <>
                        <div className="skeleton w-full h-60 bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10"></div>
                        <div className="skeleton w-full h-60 bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10"></div>
                    </>
                }
            </div>

            <div className="bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10 mt-4">
                <h3 className="font-semibold text-white mb-3">Key Executives</h3>
                {
                    (stockSummary.assetProfile && stockSummary.assetProfile.companyOfficers)
                        ? <table className="table">
                            <thead>
                                <th></th>
                                <th>Name</th>
                                <th>Title</th>
                                <th className=" lg:table-cell hidden">Age</th>
                                <th>Total Pay</th>
                            </thead>
                            <tbody>
                                {
                                    stockSummary.assetProfile.companyOfficers.map((off, idx) => (
                                        <tr className="hover" key={idx}>
                                            <th>{idx + 1}</th>
                                            <td className="name">{off.name}</td>
                                            <td>{off.title}</td>
                                            <td className="text-center lg:table-cell hidden">{off.age || '-'}</td>
                                            <td className="text-center">{off.totalPay ? formatMarketCap(off.totalPay) : '-'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <p className="text-sm">Key Executives data is currently not available for {ticker}.</p>
                }
            </div>
        </div >
    )
}

export default StockProfile