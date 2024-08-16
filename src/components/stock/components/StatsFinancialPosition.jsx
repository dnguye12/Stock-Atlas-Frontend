/* eslint-disable react/prop-types */
const StatsFinancialPosition = ({ financialData }) => {
    return (
        <div className="my-buyconsensus bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Financial Position</h3>
            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>Current Ratio</th>
                        <td><span>{financialData.currentRatio}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Quick Ratio</th>
                        <td><span>{financialData.quickRatio}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Debt To Equity</th>
                        <td><span>{financialData.debtToEquity}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Debt To EBITDA</th>
                        <td><span>{(financialData.totalDebt / financialData.ebitda).toFixed(3)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Debt To FCF</th>
                        <td><span>{(financialData.totalDebt / financialData.freeCashflow).toFixed(3)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsFinancialPosition