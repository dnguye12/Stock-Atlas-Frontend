/* eslint-disable react/prop-types */
import moment from "moment"
import { useState } from "react"

const OptionsByDate = ({ ticker, optionsDates, stockOptions }) => {
    const [currentDate, setCurrentDate] = useState(optionsDates[0])
    const [dateIndex, setDateIndex] = useState(0)
    const [currentStrike, setCurrentStrike] = useState(null)
    return (
        <div className="hidden md:block stock-options bg-neutral-950 border border-neutral-700 rounded p-4 mt-4">
            <h2 className="text-white text-lg font-bold mb-3">{ticker} Options Activity by expiring date</h2>

            <div className="mb-3 flex justify-between">
                <div>
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="my-btn m-1">{moment(currentDate).format("MMM Do, YYYY")}</div>
                        <ul tabIndex={0} className="dropdown-content bg-neutral-800 rounded-box z-[10] w-52 shadow max-h-64 overflow-y-auto">
                            {
                                optionsDates.map((date, idx) => (
                                    <li key={idx} className="w-full hover:bg-neutral-700 px-3 py-2 transition duration-300 z-[10]">
                                        <p className={`block w-full cursor-pointer ${currentDate === date && 'font-semibold text-white'}`} onClick={() => {
                                            setCurrentDate(date)
                                            setDateIndex(idx)
                                        }}>{moment(date).format("MMM Do, YYYY")}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="my-btn m-1">All Strike Prices</div>
                        <ul tabIndex={0} className="dropdown-content bg-neutral-800 rounded-box z-[10] w-52 shadow max-h-64 overflow-y-auto">
                            <li className="w-full hover:bg-neutral-700 px-3 py-2 transition duration-300 z-[10]"><p className={`block w-full cursor-pointer ${!currentStrike && 'font-semibold text-white'}`} onClick={() => {
                                setCurrentStrike(null)
                            }}>All Strike Prices</p></li>
                            {
                                stockOptions[dateIndex].strikes.map((strike, idx) => (
                                    <li key={idx} className="w-full hover:bg-neutral-700 px-3 py-2 transition duration-300 z-[1]">
                                        <p className={`block w-full cursor-pointer ${strike === currentStrike && 'font-semibold text-white'}`} onClick={() => {
                                            setCurrentStrike(strike)
                                        }}>{strike}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div>
                    <p className="text-white bg-blue-500 bg-opacity-20 text-base font-semibold my-btn border-none rounded-none hover:bg-blue-500 hover:bg-opacity-20 cursor-default">In the money</p>
                </div>
            </div>
            <details open className="collapse collapse-arrow rounded border border-neutral-700 mb-3">
                <summary className="collapse-title text-white text-lg font-bold  bg-neutral-700">
                    Calls
                </summary>
                <div className="collapse-content">
                    <div className="overflow-x-auto">
                        <table className="table table-sm mt-3">
                            <thead>
                                <th>Last Trade Date</th>
                                <th>Strike</th>
                                <th>Last Price</th>
                                <th>Bid</th>
                                <th>Ask</th>
                                <th>Change</th>
                                <th>% Change</th>
                                <th>Volume</th>
                                <th>OI</th>
                                <th>Volatility</th>
                            </thead>
                            <tbody>
                                {
                                    currentStrike === null
                                        ?
                                        stockOptions[dateIndex].options[0].calls.map((call, idx) => (
                                            <tr className={`${call.inTheMoney && 'bg-blue-500 bg-opacity-20 text-white'}`} key={idx}>
                                                <td>{moment(call.lastTradeDate).format('MM/DD/YYYY hh:mm')}</td>
                                                <td>{call.strike !== null && call.strike !== undefined ? call.strike : '-'}</td>
                                                <td>{call.lastPrice !== null && call.lastPrice !== undefined ? call.lastPrice.toFixed(2) : '-'}</td>
                                                <td>{call.bid !== null && call.bid !== undefined ? call.bid.toFixed(2) : '-'}</td>
                                                <td>{call.ask !== null && call.ask !== undefined ? call.ask.toFixed(2) : '-'}</td>
                                                <td>{call.change !== null && call.change !== undefined ? call.change.toFixed(2) : '-'}</td>
                                                <td>{call.percentChange !== null && call.percentChange !== undefined ? call.percentChange.toFixed(2) + '%' : '-'}</td>
                                                <td>{call.volume !== null && call.volume !== undefined ? call.volume.toLocaleString() : '-'}</td>
                                                <td>{call.openInterest !== null && call.openInterest !== undefined ? call.openInterest.toLocaleString() : '-'}</td>
                                                <td>{call.impliedVolatility !== null ? call.impliedVolatility.toFixed(2) + '%' : '-'}</td>
                                            </tr>
                                        ))
                                        :
                                        stockOptions[dateIndex].options[0].calls.filter(call => call.strike === currentStrike).map((call, idx) => (
                                            <tr className={`${call.inTheMoney && 'bg-blue-500 bg-opacity-20 text-white'}`} key={idx}>
                                                <td>{moment(call.lastTradeDate).format('MM/DD/YYYY hh:mm')}</td>
                                                <td>{call.strike !== null && call.strike !== undefined ? call.strike : '-'}</td>
                                                <td>{call.lastPrice !== null && call.lastPrice !== undefined ? call.lastPrice.toFixed(2) : '-'}</td>
                                                <td>{call.bid !== null && call.bid !== undefined ? call.bid.toFixed(2) : '-'}</td>
                                                <td>{call.ask !== null && call.ask !== undefined ? call.ask.toFixed(2) : '-'}</td>
                                                <td>{call.change !== null && call.change !== undefined ? call.change.toFixed(2) : '-'}</td>
                                                <td>{call.percentChange !== null && call.percentChange !== undefined ? call.percentChange.toFixed(2) + '%' : '-'}</td>
                                                <td>{call.volume !== null && call.volume !== undefined ? call.volume.toLocaleString() : '-'}</td>
                                                <td>{call.openInterest !== null && call.openInterest !== undefined ? call.openInterest.toLocaleString() : '-'}</td>
                                                <td>{call.impliedVolatility !== null ? call.impliedVolatility.toFixed(2) + '%' : '-'}</td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </details>

            <details open className="collapse collapse-arrow rounded border border-neutral-700 mb-3">
                <summary className="collapse-title text-white text-lg font-bold  bg-neutral-700">
                    Puts
                </summary>
                <div className="collapse-content">
                    <div className="overflow-x-auto">
                        <table className="table table-sm mt-3">
                            <thead>
                                <th>Last Trade Date</th>
                                <th>Strike</th>
                                <th>Last Price</th>
                                <th>Bid</th>
                                <th>Ask</th>
                                <th>Change</th>
                                <th>% Change</th>
                                <th>Volume</th>
                                <th>OI</th>
                                <th>Volatility</th>
                            </thead>
                            <tbody>
                                {
                                    currentStrike === null
                                        ?
                                        stockOptions[dateIndex].options[0].calls.map((call, idx) => (
                                            <tr className={`${call.inTheMoney && 'bg-blue-500 bg-opacity-20 text-white'}`} key={idx}>
                                                <td>{moment(call.lastTradeDate).format('MM/DD/YYYY hh:mm')}</td>
                                                <td>{call.strike !== null && call.strike !== undefined ? call.strike : '-'}</td>
                                                <td>{call.lastPrice !== null && call.lastPrice !== undefined ? call.lastPrice.toFixed(2) : '-'}</td>
                                                <td>{call.bid !== null && call.bid !== undefined ? call.bid.toFixed(2) : '-'}</td>
                                                <td>{call.ask !== null && call.ask !== undefined ? call.ask.toFixed(2) : '-'}</td>
                                                <td>{call.change !== null && call.change !== undefined ? call.change.toFixed(2) : '-'}</td>
                                                <td>{call.percentChange !== null && call.percentChange !== undefined ? call.percentChange.toFixed(2) + '%' : '-'}</td>
                                                <td>{call.volume !== null && call.volume !== undefined ? call.volume.toLocaleString() : '-'}</td>
                                                <td>{call.openInterest !== null && call.openInterest !== undefined ? call.openInterest.toLocaleString() : '-'}</td>
                                                <td>{call.impliedVolatility !== null ? call.impliedVolatility.toFixed(2) + '%' : '-'}</td>
                                            </tr>
                                        ))
                                        :
                                        stockOptions[dateIndex].options[0].calls.filter(call => call.strike === currentStrike).map((call, idx) => (
                                            <tr className={`${call.inTheMoney && 'bg-blue-500 bg-opacity-20 text-white'}`} key={idx}>
                                                <td>{moment(call.lastTradeDate).format('MM/DD/YYYY hh:mm')}</td>
                                                <td>{call.strike !== null && call.strike !== undefined ? call.strike : '-'}</td>
                                                <td>{call.lastPrice !== null && call.lastPrice !== undefined ? call.lastPrice.toFixed(2) : '-'}</td>
                                                <td>{call.bid !== null && call.bid !== undefined ? call.bid.toFixed(2) : '-'}</td>
                                                <td>{call.ask !== null && call.ask !== undefined ? call.ask.toFixed(2) : '-'}</td>
                                                <td>{call.change !== null && call.change !== undefined ? call.change.toFixed(2) : '-'}</td>
                                                <td>{call.percentChange !== null && call.percentChange !== undefined ? call.percentChange.toFixed(2) + '%' : '-'}</td>
                                                <td>{call.volume !== null && call.volume !== undefined ? call.volume.toLocaleString() : '-'}</td>
                                                <td>{call.openInterest !== null && call.openInterest !== undefined ? call.openInterest.toLocaleString() : '-'}</td>
                                                <td>{call.impliedVolatility !== null ? call.impliedVolatility.toFixed(2) + '%' : '-'}</td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </details>
        </div>
    )
}

export default OptionsByDate