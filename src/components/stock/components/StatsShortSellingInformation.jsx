/* eslint-disable react/prop-types */

import { formatNumber } from "../../../utils/numberUtils"

const StatsShortSellingInformation = ({ defaultKeyStatistics }) => {
    return (
        <div className="my-buyconsensus bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Margins</h3>
            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>Shorts Share</th>
                        <td><span>{formatNumber(defaultKeyStatistics.sharesShort)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Short % of Shares Out</th>
                        <td><span>{(defaultKeyStatistics.sharesShort / defaultKeyStatistics.sharesOutstanding * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Short % of Float</th>
                        <td><span>{(defaultKeyStatistics.shortPercentOfFloat * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Short Ratio (days to cover)</th>
                        <td><span>{defaultKeyStatistics.shortRatio}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsShortSellingInformation