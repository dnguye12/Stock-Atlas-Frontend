/* eslint-disable react/prop-types */
import { formatNumber } from "../../../utils/numberUtils"
const HolderInsiderInsider = ({ insiderHolders }) => {
    return (
        <>
            {
                insiderHolders && insiderHolders.holders && insiderHolders.holders.length > 0
                &&
                <div className="holderinsider bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10 mt-4">
                    <h3 className="font-semibold text-white mb-3">Top Insider Holders</h3>

                    <p className="text-sm mb-3">Insider roster data is derived solely from the last 24 months of Form 3 & Form 4 SEC filings.</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Individual or Entity</th>
                                <th>Position</th>
                                <th>Shares Owned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                insiderHolders.holders.filter((a) => a.positionDirect).sort((a, b) => b.positionDirect - a.positionDirect).map((holder, idx) => (
                                    idx < 10 &&
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td className="name">{holder.name || '-'}</td>
                                        <td>{holder.relation || '-'}</td>
                                        <td className="pos">{formatNumber(holder.positionDirect)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default HolderInsiderInsider