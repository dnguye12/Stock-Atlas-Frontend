/* eslint-disable react/prop-types */
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from "moment"
import { truncateText } from "../../../utils/textUtils"

const getType = (transactionText) => {
    let helper = transactionText.toLowerCase();

    const checkIncludesAnyWord = (str, wordArray) => {
        return wordArray.some(word => str.includes(word));
    }

    if (checkIncludesAnyWord(helper, ["purchase", "exercise"])) {
        return "Bought";
    } else if (checkIncludesAnyWord(helper, ["sale"])) {
        return "Sold";
    } else if (checkIncludesAnyWord(helper, ["award", "grant", "gift"])) {
        return "Grant";
    } else {
        return "-";
    }
}

const isWithinSixMonths = (now, other) => {
    const otherDate = moment(other)
    const helper = moment().subtract(6, 'months')

    return otherDate.isBetween(helper, now, 'month', '[]')
}

const HolderInsiderTransactions = ({ insiderTransactions }) => {
    const [loadMore, setLoadMore] = useState(false)
    const [loadMoreData, setLoadMoreData] = useState([])

    const now = moment()
    let totalBought = 0
    let totalSold = 0
    let total = 0
    let helper
    if (insiderTransactions && insiderTransactions.transactions && insiderTransactions.transactions.length > 0) {
        for (let i = 0; i < insiderTransactions.transactions.length; i++) {
            const trans = insiderTransactions.transactions[i]
            if (!isWithinSixMonths(now, trans.startDate)) {
                break
            }
            total += trans.shares
            helper = getType(trans.transactionText)
            if (helper === "Bought") {
                totalBought += trans.shares
            }
            else if (helper === "Sold") {
                totalSold += trans.shares
            }
        }
    }

    //For infinite scroll
    let helper1 = 0
    let helper2 = []

    while (helper2.length < insiderTransactions.transactions.length && helper2.length < 10) {
        const tran = insiderTransactions.transactions[helper1]
        helper2.push(tran)
        helper1++
    }

    const fetchMoreData = () => {
        setTimeout(() => {
            const moreItems = insiderTransactions.transactions.slice(loadMoreData.length, loadMoreData.length + 10)

            setLoadMoreData(loadMoreData.concat(moreItems));
        }, 500);
    }

    return (
        <>
            {
                insiderTransactions && insiderTransactions.transactions && insiderTransactions.transactions.length > 0
                &&
                <div className="holderinsider bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10 mt-4">
                    <h3 className="font-semibold text-white mb-3">Insider Transactions Reported</h3>

                    <div className="w-full grid grid-cols-3 gap-4 mb-8">
                        <div className="flex justify-between items-center border border-neutral-700 rounded p-4 border-spacing-10">
                            <div>
                                <p className="text-sm font-semibold">Buy/Sell Ratio</p>
                                <p className="text-white font-semibold">{
                                    totalBought === 0
                                        ?
                                        "Sold only"
                                        :
                                        totalSold === 0
                                            ?
                                            "Bought only"
                                            :
                                            (totalBought / totalSold).toFixed(2)
                                }</p>
                            </div>
                            <div className="radial-progress font-bold text-sm text-up" style={{ "--value": totalBought / (totalBought + totalSold) * 100, }} role="progressbar">
                                {(totalBought / (totalBought + totalSold)).toFixed(2)}
                            </div>
                        </div>
                        <div className="flex justify-between items-center border border-neutral-700 rounded p-4 border-spacing-10">
                            <div>
                                <p className="text-sm font-semibold">Bought Shares</p>
                                <p className="text-white font-semibold">{totalBought.toLocaleString()}</p>
                            </div>
                            <div className="radial-progress font-bold text-sm text-up" style={{ "--value": totalBought / total * 100, }} role="progressbar">
                                {(totalBought / total * 100).toFixed(2)}%
                            </div>
                        </div>
                        <div className="flex justify-between items-center border border-neutral-700 rounded p-4 border-spacing-10">
                            <div>
                                <p className="text-sm font-semibold">Sold Shares</p>
                                <p className="text-white font-semibold">{totalSold.toLocaleString()}</p>
                            </div>
                            <div className="radial-progress font-bold text-sm text-down" style={{ "--value": totalSold / total * 100, }} role="progressbar">
                                {(totalSold / total * 100).toFixed(2)}%
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-center">
                        <table className={`table mb-5 ${loadMore && "hidden"}`}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Person</th>
                                    <th>Date Reported</th>
                                    <th>Shares</th>
                                    <th>Price</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    helper2.map((tran, idx) => {
                                        helper = getType(tran.transactionText)
                                        return (
                                            <tr key={idx} className="hover">
                                                <td>{idx + 1}</td>
                                                <td className="name">
                                                    <div className="flex flex-col">
                                                        <p>{tran.filerName}</p>
                                                        <p>{truncateText(tran.filerRelation, 30)}</p>
                                                    </div>
                                                </td>
                                                <td>{moment(tran.startDate).format("MMM Do, YYYY")}</td>
                                                <td>{tran.shares ? tran.shares.toLocaleString() : "-"}</td>
                                                <td>{(tran.value && tran.shares) ? (tran.value / tran.shares).toFixed(2) : "-"}</td>
                                                <td>{
                                                    helper === "Bought"
                                                        ?
                                                        (
                                                            (() => {
                                                                return (
                                                                    <p className="text-up font-semibold">{helper}</p>
                                                                )
                                                            })()
                                                        )
                                                        :
                                                        helper === "Sold"
                                                            ?
                                                            (
                                                                (() => {
                                                                    return (
                                                                        <p className="text-down font-semibold">{helper}</p>
                                                                    )
                                                                })()
                                                            )
                                                            :
                                                            helper === "Grant"
                                                                ?
                                                                (
                                                                    (() => {
                                                                        return (
                                                                            <p className="text-hold font-semibold">{helper}</p>
                                                                        )
                                                                    })()
                                                                )
                                                                :
                                                                <p className="font-semibold">{helper}</p>
                                                }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <InfiniteScroll
                            dataLength={loadMoreData.length}
                            next={fetchMoreData}
                            hasMore={loadMoreData.length < insiderTransactions.transactions.length}
                            loader={
                                <div className="w-full flex justify-center py-5">
                                    <span className="loading loading-spinner loading-md"></span>
                                </div>
                            }
                            className={`${!loadMore && "hidden"}`}
                        >
                            <table className="table mb-5">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Person</th>
                                        <th>Date Reported</th>
                                        <th>Shares</th>
                                        <th>Price</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loadMoreData.map((tran, idx) => {
                                            helper = getType(tran.transactionText)
                                            return (
                                                <tr key={idx} className="hover">
                                                    <td>{idx + 1}</td>
                                                    <td className="name">
                                                        <div className="flex flex-col">
                                                            <p>{tran.filerName}</p>
                                                            <p>{truncateText(tran.filerRelation, 30)}</p>
                                                        </div>
                                                    </td>
                                                    <td>{moment(tran.startDate).format("MMM Do, YYYY")}</td>
                                                    <td>{tran.shares ? tran.shares.toLocaleString() : "-"}</td>
                                                    <td>{(tran.value && tran.shares) ? (tran.value / tran.shares).toFixed(2) : "-"}</td>
                                                    <td>{
                                                        helper === "Bought"
                                                            ?
                                                            (
                                                                (() => {
                                                                    return (
                                                                        <p className="text-up font-semibold">{helper}</p>
                                                                    )
                                                                })()
                                                            )
                                                            :
                                                            helper === "Sold"
                                                                ?
                                                                (
                                                                    (() => {
                                                                        return (
                                                                            <p className="text-down font-semibold">{helper}</p>
                                                                        )
                                                                    })()
                                                                )
                                                                :
                                                                helper === "Grant"
                                                                    ?
                                                                    (
                                                                        (() => {
                                                                            return (
                                                                                <p className="text-hold font-semibold">{helper}</p>
                                                                            )
                                                                        })()
                                                                    )
                                                                    :
                                                                    <p className="font-semibold">{helper}</p>
                                                    }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </InfiniteScroll>
                        {
                            !loadMore && <button className="btn" onClick={() => { setLoadMore(true) }}><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-2" />More insider transactions history</button>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default HolderInsiderTransactions