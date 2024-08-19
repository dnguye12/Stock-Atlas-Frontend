/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OptionsSummary = ({ticker, summaryData}) => {
    return (
        <div className=" bg-neutral-950 border border-neutral-700 rounded p-4 mt-4">
            <h2 className="text-white text-lg font-bold mb-3">{ticker} Options Activity</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col items-start border border-neutral-700 rounded p-4">
                    <button onClick={() => document.getElementById('my-options-totalVolume').showModal()}><h3 className="text-sm text-white font-semibold mb-2">Total Volume<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h3></button>
                    <p className="text-white font-semibold">{summaryData.totalVolume.toLocaleString()}</p>
                    <dialog id="my-options-totalVolume" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Total Volume</h3>
                            <p className="py-4">The total volume is the combined number of puts and calls traded that will expire in the next two years in options trading.</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>

                <div className="flex flex-col items-start border border-neutral-700 rounded p-4">
                    <button onClick={() => document.getElementById('my-options-totalIO').showModal()}><h3 className="text-sm text-white font-semibold mb-2">Total OI<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h3></button>
                    <p className="text-white font-semibold">{summaryData.totalOI.toLocaleString()}</p>
                    <dialog id="my-options-totalIO" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Total OI</h3>
                            <p className="py-4">Total IO, or Total Open Interest (OI), refers to the combined number of outstanding (unsettled) options contracts, both puts and calls, that have not been closed, expired, or exercised for all expiration dates. Open interest gives insight into the liquidity and market activity for the options of a particular stock.</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="flex flex-col items-start border border-neutral-700 rounded p-4">
                    <button onClick={() => document.getElementById('my-options-pcRatio').showModal()}><h3 className="text-sm text-white font-semibold mb-2">P/C Ratio<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h3></button>
                    <p className="text-white font-semibold">{summaryData.PCratios.toFixed(2)}</p>
                    <dialog id="my-options-pcRatio" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">P/C Ratio</h3>
                            <p className="py-4">The put-call ratio assesses market sentiment and potential movements by comparing traded put options to call options.</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="flex flex-col items-start border border-neutral-700 rounded p-4">
                    <button onClick={() => document.getElementById('my-options-oipcRatio').showModal()}><h3 className="text-sm text-white font-semibold mb-2">OI P/C Ratio<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h3></button>
                    <p className="text-white font-semibold">{summaryData.OIPCratios.toFixed(2)}</p>
                    <dialog id="my-options-oipcRatio" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">OI P/C Ratio</h3>
                            <p className="py-4">The open interest put-call ratio measures market sentiment in options trading by comparing the total number of outstanding put options contracts to outstanding call options contracts. A higher ratio suggests bearish sentiment, while a lower ratio indicates bullish sentiment.</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    )
}

export default OptionsSummary