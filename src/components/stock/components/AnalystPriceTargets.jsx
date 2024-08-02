/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { myToLocaleString } from '../../../utils/numberUtils';
import { currToSymbol } from '../../../utils/moneyUtils';

const AnalystPriceTargets = ({ stockQuote, stockSummary }) => {
    const { t, i18n } = useTranslation();
    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    const currentPrice = stockSummary.financialData.currentPrice;
    const targetLowPrice = stockSummary.financialData.targetLowPrice;
    const targetMeanPrice = stockSummary.financialData.targetMeanPrice;
    const targetHighPrice = stockSummary.financialData.targetHighPrice;

    const compLow = currentPrice >= targetLowPrice
    const compMean = currentPrice >= targetMeanPrice
    const compHigh = currentPrice >= targetHighPrice

    let helper1 = ((currentPrice - targetLowPrice) / (targetHighPrice - targetLowPrice)) * 100
    if (helper1 > 100) {
        helper1 = 100
    }
    let helper2 = ((targetMeanPrice - targetLowPrice) / (targetHighPrice - targetLowPrice)) * 100

    return (
        <div className="my-analysis bg-neutral-950 border border-neutral-700 rounded p-4 sm:min-w-96">
            <h3 className="font-semibold text-white mb-3">{t('stock.analyst_price_targets.Analyst Price Targets')}</h3>
            <div className="hidden sm:block w-full relative min-h-32 mb-5">
                <div className="my-bar"></div>
                <div className="priceContainer priceContainerLow left-0">
                    <div className="dot lowdot ">
                    </div>
                    <div className="label lowLabel items-start">
                        <span className="price ">{targetLowPrice.toFixed(2)}</span>
                        <span className="title">{t('stock.analyst_price_targets.Low')}</span>
                    </div>
                </div>
                <div className="priceContainer priceContainerAverage " style={{ left: `${helper2}%` }}>
                    <div className="labelExtend averageLabel" style={{ marginLeft: `calc(6 / 2.3* -1* 1ch)`, minWidth: `calc(6* 1ch)` }}>
                        <span className="price">{targetMeanPrice.toFixed(2)}</span>
                        <span>{t('stock.analyst_price_targets.Average')}</span>
                    </div>
                    <div className="line lineAverage"></div>
                    <div className="dot dotaverage"></div>
                </div>
                {
                    compLow
                        ?
                        <div className="priceContainer priceContainerCurrent" style={{ left: `${helper1}%` }}>
                            <div className="dot dotcurrent"></div>
                            <div className="line lineCurrent"></div>
                            <div className="labelExtend currentLabel" style={{ marginLeft: `calc(6 / 2.3* -1* 1ch)`, minWidth: `calc(6* 1ch)` }}>
                                <span className="price">{currentPrice}</span>
                                <span>{t('stock.analyst_price_targets.Current')}</span>
                            </div>
                        </div>
                        :
                        <div className="priceContainer priceContainerCurrent" style={{ left: `0%` }}>
                            <div className="dot dotcurrent"></div>
                            <div className="line lineCurrent"></div>
                            <div className="labelExtend currentLabel" style={{ marginLeft: `calc(0 / 2.3* -1* 1ch)`, minWidth: `calc(6* 1ch)` }}>
                                <span className="price">{currentPrice}</span>
                                <span>{t('stock.analyst_price_targets.Current')}</span>
                            </div>
                        </div>
                }
                <div className="priceContainer priceContainerHigh right-0 items-end">
                    <div className="dot highdot"></div>
                    <div className="label highLabel items-end">
                        <span className="price">{targetHighPrice.toFixed(2)}</span>
                        <span className="title">{t('stock.analyst_price_targets.High')}</span>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <h4 className="font-semibold text-white mb-3">{t('stock.analyst_price_targets.Percentage diff')}</h4>
                <table className="table table-sm border border-neutral-700 rounded-lg">
                    <thead>
                        <tr>
                            <th>{t('stock.analyst_price_targets.Current Price')}</th>
                            <th>{t('stock.analyst_price_targets.Low')}</th>
                            <th>{t('stock.analyst_price_targets.Average')}</th>
                            <th>{t('stock.analyst_price_targets.High')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{currToSymbol(stockQuote.currency)}{myToLocaleString(currentPrice)}</th>
                            <td className={compLow ? "text-down" : "text-up"}>{targetLowPrice.toFixed(2)}</td>
                            <td className={compMean ? "text-down" : "text-up"}>{targetMeanPrice.toFixed(2)}</td>
                            <td className={compHigh ? "text-down" : "text-up"}>{targetHighPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th></th>
                            <td className={compLow ? "text-down" : "text-up"}>
                                {((targetLowPrice - currentPrice) / currentPrice * 100).toFixed(2)}%
                            </td>
                            <td className={compMean ? "text-down" : "text-up"}>
                                {((targetMeanPrice - currentPrice) / currentPrice * 100).toFixed(2)}%
                            </td>
                            <td className={compHigh ? "text-down" : "text-up"}>
                                {((targetHighPrice - currentPrice) / currentPrice * 100).toFixed(2)}%
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AnalystPriceTargets