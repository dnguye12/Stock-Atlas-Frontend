/* eslint-disable react/prop-types */
const PriceTargets = ({ stockSummary }) => {
    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className="my-analysis bg-neutral-800 border border-neutral-700 rounded p-4">
            <h3 className="font-semibold text-white mb-3">Analyst Price Targets</h3>
            <div className="w-full relative min-h-32 mb-5">
                <div className="my-bar"></div>
                <div className="priceContainer priceContainerLow left-0">
                    <div className="dot lowdot ">
                    </div>
                    <div className="label lowLabel items-start">
                        <span className="price ">145.00</span>
                        <span className="title">Low</span>
                    </div>
                </div>
                <div className="priceContainer priceContainerAverage " style={{ left: "73.68333333333335%" }}>
                    <div className="labelExtend averageLabel" style={{ marginLeft: `calc(7 / 2.3* -1* 1ch)`, minWidth: `calc(7* 1ch)` }}>
                        <span className="price">189.21</span>
                        <span>Average</span>
                    </div>
                    <div className="line lineAverage"></div>
                    <div className="dot dotaverage"></div>
                </div>
                <div className="priceContainer priceContainerCurrent" style={{ left: "56.17033333333331%" }}>
                    <div className="dot dotcurrent"></div>
                    <div className="line lineCurrent"></div>
                    <div className="labelExtend currentLabel" style={{ marginLeft: `calc(6 / 2.3* -1* 1ch)`, minWidth: `calc(6* 1ch)` }}>
                        <span className="price">179.39</span>
                        <span>Current</span>
                    </div>
                </div>
                <div className="priceContainer priceContainerHigh right-0 items-end">
                    <div className="dot highdot"></div>
                    <div className="label highLabel items-end">
                        <span className="price">205.00</span>
                        <span className="title">High</span>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
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
                            <th>179.39</th>
                            <td>145.50</td>
                            <td>205.51</td>
                            <td>238.00</td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>-18.89%</td>
                            <td>11.52%</td>
                            <td>32.67%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PriceTargets