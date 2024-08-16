/* eslint-disable react/prop-types */

import { currToSymbol } from "../../../utils/moneyUtils"

const StatsPrice = ({ price, summaryDetail }) => {
    return (
        <div className="my-buyconsensus bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Stock Price Statistics</h3>
        
            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>Beta (5Y)</th>
                        <td><span>{summaryDetail.beta.toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Current Price</th>
                        <td><span>{currToSymbol(summaryDetail.currency)}{price.regularMarketPrice}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>52-Week Price Range</th>
                        <td><span>{currToSymbol(summaryDetail.currency)}{summaryDetail.fiftyTwoWeekLow} - {currToSymbol(summaryDetail.currency)}{summaryDetail.fiftyTwoWeekHigh}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>50-Day Moving Average</th>
                        <td><span>{currToSymbol(summaryDetail.currency)}{summaryDetail.fiftyDayAverage.toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>200-Day Moving Average</th>
                        <td><span>{currToSymbol(summaryDetail.currency)}{summaryDetail.twoHundredDayAverage.toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Average Volume (10 Days)</th>
                        <td><span>{summaryDetail.averageVolume10days.toLocaleString()}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsPrice