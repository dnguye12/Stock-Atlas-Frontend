import { currToSymbol } from "../../../utils/moneyUtils"

/* eslint-disable react/prop-types */
const DividendHistory = ({ stockChart, stockQuote }) => {
    return (
        <div className="dividend-overview bg-neutral-800 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Dividends History</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-white text-sm font-semibold">Ex-Dividend Date</th>
                            <th className="text-white text-sm font-semibold">Cash Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockChart.length > 1
                            ?
                            [...stockChart].reverse().map((event, idx) => 
                                (
                                    <tr className="hover" key={idx}>
                                        <td>{event.date.format("MMM Do YYYY")}</td>
                                        <td className="text-white font-semibold">{currToSymbol(stockQuote.currency)}{event.amount}</td>
                                    </tr>
                                )
                            )
                            :
                            <tr className="hover">
                                <td>{stockChart[0].date.format("MMM Do YYYY")}</td>
                                <td className="text-white font-semibold">{currToSymbol(stockQuote.currency)}{stockChart[0].amount}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DividendHistory