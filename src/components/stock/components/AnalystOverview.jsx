/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnalystOverview = ({ ticker, stockSummary }) => {
    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    const recommendationTrend = stockSummary.recommendationTrend.trend[0]
    const totalAnalyst = recommendationTrend.strongBuy + recommendationTrend.buy + recommendationTrend.hold + recommendationTrend.sell + recommendationTrend.strongSell
    const recommendationKey = stockSummary.financialData.recommendationKey

    const currentPrice = stockSummary.financialData.currentPrice
    const meanPrice = stockSummary.financialData.targetMeanPrice
    const upside = (meanPrice - currentPrice) / currentPrice * 100
    return (
        <div className="my-analystoverview bg-neutral-800 border border-neutral-700 rounded p-4">
            <h3 className="font-semibold text-white mb-3">Analysts Overview</h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-totalAnalyst').showModal()}><h4 className="detail-title">Total Analyst<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-2" /></h4></button>
                    <p className="detail-count">{totalAnalyst}</p>
                    <dialog id="my-analystoverview-totalAnalyst" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Total Analyst</h3>
                            <p className="py-4">The total number of analyst who provided a rating in the past 12 months.</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>

                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-consensusrating').showModal()}><h4 className="detail-title">Consensus Rating<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-2" /></h4></button>
                    <p className={`detail-count ${recommendationKey === "strongBuy" ? 'text-up' :
                        recommendationKey === "buy" ? 'text-up' :
                            recommendationKey === "strongSell" ? 'text-down' :
                                recommendationKey === "sell" ? 'text-down' :
                                    'text-hold'
                        }`}>
                        {recommendationKey.toUpperCase()}
                    </p>
                    <dialog id="my-analystoverview-consensusrating" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Consensus Rating</h3>
                            <p className="py-4">
                                The average analyst rating for <span className="text-white">{ticker}</span> is standardized to align with categories:
                                <span className="text-up"> Strong Buy</span>,
                                <span className="text-up"> Buy</span>,
                                <span className="text-hold"> Hold</span>,
                                <span className="text-down"> Sell</span>, and
                                <span className="text-down"> Strong Sell</span>.
                            </p>

                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-priceTarget').showModal()}><h4 className="detail-title">Price Target<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-2" /></h4></button>
                    <p className="detail-count">${stockSummary.financialData.targetMeanPrice}</p>
                    <dialog id="my-analystoverview-priceTarget" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Price Target</h3>
                            <p className="py-4">The average 12-month price targets.</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>



                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-upside').showModal()}><h4 className="detail-title">Upside<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-2" /></h4></button>
                    <p className={`detail-count ${upside > 0 ? 'text-up' : 'text-down'}`}>{upside.toFixed(2)}%</p>
                    <dialog id="my-analystoverview-upside" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Upside</h3>
                            <p className="py-4">The average price target's percentage difference from the current stock price.</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    )
}

export default AnalystOverview