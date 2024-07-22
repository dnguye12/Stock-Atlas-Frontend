/* eslint-disable react/prop-types */
const PriceTargets = ({ stockSummary }) => {
    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    const currentPrice = stockSummary.financialData.currentPrice;
    const targetLowPrice = stockSummary.financialData.targetLowPrice;
    const targetMeanPrice = stockSummary.financialData.targetMeanPrice;
    const targetHighPrice = stockSummary.financialData.targetHighPrice;

    const compLow = currentPrice >= targetLowPrice
    const compMean = currentPrice >= targetMeanPrice
    const compHigh = currentPrice >= targetHighPrice

    let helper1 = ((currentPrice - targetLowPrice) / (targetHighPrice - targetLowPrice)) * 100
    if(helper1 > 100) {
        helper1 = 100
    } 
    let helper2 = ((targetMeanPrice - targetLowPrice) / (targetHighPrice - targetLowPrice)) * 100

    return (
        <div className="my-analysis bg-neutral-800 border border-neutral-700 rounded p-4 min-w-96">
            <h3 className="font-semibold text-white mb-3">Analyst Price Targets</h3>
            <div className="w-full relative min-h-32 mb-5">
                <div className="my-bar"></div>
                <div className="priceContainer priceContainerLow left-0">
                    <div className="dot lowdot ">
                    </div>
                    <div className="label lowLabel items-start">
                        <span className="price ">{targetLowPrice.toFixed(2)}</span>
                        <span className="title">Low</span>
                    </div>
                </div>
                <div className="priceContainer priceContainerAverage " style={{ left: `${helper2}%` }}>
                    <div className="labelExtend averageLabel" style={{ marginLeft: `calc(6 / 2.3* -1* 1ch)`, minWidth: `calc(6* 1ch)` }}>
                        <span className="price">{targetMeanPrice.toFixed(2)}</span>
                        <span>Average</span>
                    </div>
                    <div className="line lineAverage"></div>
                    <div className="dot dotaverage"></div>
                </div>
                {
                    compLow
                    ?
                <div className="priceContainer priceContainerCurrent" style={{ left: `${helper1}%` }}>
                    <div className="dot dotcurrent"></div>
                    <div className="line lineCurrent"></div>
                    <div className="labelExtend currentLabel" style={{ marginLeft: `calc(6 / 2.3* -1* 1ch)`, minWidth: `calc(6* 1ch)` }}>
                        <span className="price">{currentPrice}</span>
                        <span>Current</span>
                    </div>
                </div>
                :
                <div className="priceContainer priceContainerCurrent" style={{ left: `0%` }}>
                    <div className="dot dotcurrent"></div>
                    <div className="line lineCurrent"></div>
                    <div className="labelExtend currentLabel" style={{ marginLeft: `calc(0 / 2.3* -1* 1ch)`, minWidth: `calc(6* 1ch)` }}>
                        <span className="price">{currentPrice}</span>
                        <span>Current</span>
                    </div>
                </div>
                }
                <div className="priceContainer priceContainerHigh right-0 items-end">
                    <div className="dot highdot"></div>
                    <div className="label highLabel items-end">
                        <span className="price">{targetHighPrice.toFixed(2)}</span>
                        <span className="title">High</span>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <h4 className="font-semibold text-white mb-3">Percentage differences to Current Price</h4>
                <table className="table table-sm border border-neutral-700 rounded-lg">
                    <thead>
                        <tr>
                            <th>Current Price</th>
                            <th>Low</th>
                            <th>Average</th>
                            <th>High</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{currentPrice}</th>
                            <td className={compLow ? "text-down" : "text-up"}>{targetLowPrice.toFixed(2)}</td>
                            <td className={compMean ? "text-down" : "text-up"}>{targetMeanPrice.toFixed(2)}</td>
                            <td className={compHigh ? "text-down" : "text-up"}>{targetHighPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th></th>
                            <td className={compLow ? "text-down" : "text-up"}>
                                {((targetLowPrice - currentPrice) / currentPrice * 100).toFixed(2)}%
                            </td>
                            <td className={compMean ? "text-down" : "text-up"}>
                                {((targetMeanPrice - currentPrice) / currentPrice * 100).toFixed(2)}%
                            </td>
                            <td className={compHigh ? "text-down" : "text-up"}>
                                {((targetHighPrice - currentPrice) / currentPrice * 100).toFixed(2)}%
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PriceTargets