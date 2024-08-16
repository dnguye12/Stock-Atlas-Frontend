/* eslint-disable react/prop-types */

import { formatMarketCap } from "../../../utils/moneyUtils"

const StatsFinancialEfficiency = ({ assetProfile, financialData, incomeStatementHistory, price }) => {
    return (
        <div className="my-buyconsensus bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Financial Efficiency</h3>
            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>Return on Equity (ROE)</th>
                        <td><span>{(financialData.returnOnEquity * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Return on Assets (ROA)</th>
                        <td><span>{(financialData.returnOnAssets * 100).toFixed(2)}%</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Revenue Per Employee</th>
                        <td><span>{formatMarketCap(financialData.totalRevenue / assetProfile.fullTimeEmployees, price.currency)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Profit Per Employee</th>
                        <td><span>{formatMarketCap(incomeStatementHistory.incomeStatementHistory[0].netIncome / assetProfile.fullTimeEmployees, price.currency)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Employee Count</th>
                        <td><span>{assetProfile.fullTimeEmployees.toLocaleString()}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsFinancialEfficiency