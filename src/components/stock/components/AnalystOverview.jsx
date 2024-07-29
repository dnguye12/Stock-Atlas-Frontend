/* eslint-disable react/prop-types */
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnalystOverview = ({ ticker, stockSummary }) => {
    const { t, i18n } = useTranslation();
    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    const recommendationTrend = stockSummary.recommendationTrend.trend[0]
    const totalAnalyst = recommendationTrend.strongBuy + recommendationTrend.buy + recommendationTrend.hold + recommendationTrend.sell + recommendationTrend.strongSell
    const recommendationKey = stockSummary.financialData.recommendationKey

    const currentPrice = stockSummary.financialData.currentPrice
    const meanPrice = stockSummary.financialData.targetMeanPrice
    const upside = (meanPrice - currentPrice) / currentPrice * 100
    return (
        <div className="my-analystoverview bg-neutral-800 border border-neutral-700 rounded p-4">
            <h3 className="font-semibold text-white mb-3">{t("stock.analyst_rating.Analysts Overview")}</h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-totalAnalyst').showModal()}><h4 className="detail-title">{t("stock.analyst_rating.Total Analyst")}<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className="detail-count">{totalAnalyst}</p>
                    <dialog id="my-analystoverview-totalAnalyst" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("stock.analyst_rating.Total Analyst")}</h3>
                            <p className="py-4">{t("stock.analyst_rating.Total Analyst desc")}</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>

                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-consensusrating').showModal()}><h4 className="detail-title">{t("stock.analyst_rating.Consensus Rating")}<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className={`detail-count ${recommendationKey === "strongBuy" ? 'text-up' :
                        recommendationKey === "buy" ? 'text-up' :
                            recommendationKey === "strongSell" ? 'text-down' :
                                recommendationKey === "sell" ? 'text-down' :
                                    'text-hold'
                        }`}>
                        {recommendationKey.toUpperCase()}
                    </p>
                    <dialog id="my-analystoverview-consensusrating" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("stock.analyst_rating.Consensus Rating")}</h3>
                            <p className="py-4">
                                <Trans
                                    i18nKey="stock.analyst_rating.Consensus Rating desc"
                                    values={{ ticker }}
                                    components={{
                                        1: <span className="text-white" />,
                                        3: <span className="text-up" />,
                                        5: <span className="text-up" />,
                                        7: <span className="text-hold" />,
                                        9: <span className="text-down" />,
                                        11: <span className="text-down" />
                                    }}
                                />
                            </p>

                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-priceTarget').showModal()}><h4 className="detail-title">Price Target<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className="detail-count">${stockSummary.financialData.targetMeanPrice}</p>
                    <dialog id="my-analystoverview-priceTarget" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("stock.analyst_rating.Price Target")}</h3>
                            <p className="py-4">{t("stock.analyst_rating.Price Target desc")}</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>



                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-upside').showModal()}><h4 className="detail-title">Upside<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className={`detail-count ${upside > 0 ? 'text-up' : 'text-down'}`}>{upside.toFixed(2)}%</p>
                    <dialog id="my-analystoverview-upside" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("stock.analyst_rating.Upside")}</h3>
                            <p className="py-4">{t("stock.analyst_rating.Upside desc")}</p>
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

export default AnalystOverview