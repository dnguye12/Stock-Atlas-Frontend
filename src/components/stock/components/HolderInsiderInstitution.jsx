import moment from "moment"
import { formatNumber } from "../../../utils/numberUtils"

/* eslint-disable react/prop-types */
const HolderInsiderInstitution = ({ institutionOwnership }) => {
    return (
        <>
            {
                institutionOwnership && institutionOwnership.ownershipList && institutionOwnership.ownershipList.length > 0
                &&
                <div className='holderinsider bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10 mt-4'>
                    <h3 className="font-semibold text-white mb-3">Top Institutional Holders</h3>
                    <table className="table table-sm sm:table-md border border-neutral-700">
                        <thead>
                            <tr>
                                <th className="hidden sm:table-cell"></th>
                                <th>Holder</th>
                                <th className="hidden sm:table-cell">Date Reported</th>
                                <th>% Held</th>
                                <th>% Change</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                institutionOwnership.ownershipList.sort((a, b) => b.position - a.position).map((holder, idx) => (
                                    idx < 10 &&
                                    <tr key={idx}>
                                        <td className="hidden sm:table-cell">{idx + 1}</td>
                                        <td className="name">{holder.organization}</td>
                                        <td className="hidden sm:table-cell">{holder.reportDate ? moment(holder.reportDate).format("MMM Do, YYYY") : "-"}</td>
                                        <td className="pos">{holder.pctHeld ? (holder.pctHeld * 100).toFixed(2) : "-"}</td>
                                        <td className={`font-semibold ${holder.pctChange > 0 ? "text-up" : holder.pctChange === 0 ? "text-hold" : "text-down"}`}>{holder.pctChange ? (holder.pctChange * 100).toFixed(2) : "-"}</td>
                                        <td className="pos">{holder.value ? formatNumber(holder.value) : "-"}</td>
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

export default HolderInsiderInstitution