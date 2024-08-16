/* eslint-disable react/prop-types */

const StatsMargin = ({ financialData }) => {
    return (
        <div className="my-buyconsensus bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Margins</h3>
            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>Gross Margin</th>
                        <td><span>{(financialData.grossMargins * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Operating Margin</th>
                        <td><span>{(financialData.operatingMargins * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>EBITDA Margin</th>
                        <td><span>{(financialData.ebitdaMargins * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Profit Margin</th>
                        <td><span>{(financialData.profitMargins * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>FCF Margin</th>
                        <td><span>{(financialData.freeCashflow / financialData.totalRevenue * 100).toFixed(2)}%</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsMargin