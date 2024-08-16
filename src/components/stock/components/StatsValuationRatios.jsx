/* eslint-disable react/prop-types */
const StatsValuationRatios = ({ defaultKeyStatistics, financialData, summaryDetail }) => {
    return (
        <div className="my-buyconsensus bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Valuation Ratios</h3>

            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>PE Ratio</th>
                        <td><span>{summaryDetail.trailingPE.toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Forward PE</th>
                        <td><span>{summaryDetail.forwardPE.toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>PS Ratio</th>
                        <td><span>{summaryDetail.priceToSalesTrailing12Months.toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>PB Ratio</th>
                        <td><span>{defaultKeyStatistics.priceToBook.toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>P/FCF Ratio</th>
                        <td><span>{(summaryDetail.marketCap / financialData.freeCashflow).toFixed(2)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>PEG Ratio</th>
                        <td><span>{defaultKeyStatistics.pegRatio.toFixed(2)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsValuationRatios