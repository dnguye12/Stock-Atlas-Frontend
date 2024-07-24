/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { percentageDiff } from "../../../utils/numberUtils"
/*
Price Target Deviation Score (PTDS)
PTDS=min(max( 
(High Target−Low Target) /
(Current Price−Low Target)
 ,0),1)×50

PTDS Scale and Interpretation:
0-10:

The current price is at or below the low target.
Indicates potential undervaluation, high caution, or pessimism.
Could be an opportunity if the market is undervaluing the stock, but also a warning of potential issues.
11-20:

The current price is between the low target and the average target.
Indicates moderate caution or a balanced view.
Suggests the stock might be fairly valued but with limited immediate upside.
21-30:

The current price is around the average target.
Indicates fair valuation according to analysts.
Suggests a balanced outlook with moderate growth potential.
31-40:

The current price is between the average target and the high target.
Indicates optimism and a moderate potential for growth.
Suggests positive sentiment, but also a need for performance to meet high expectations.
41-50:

The current price is at or above the high target.
Indicates high optimism or potential overvaluation.
Can be good if the stock continues to perform well, but also signals a risk if expectations are not met.
*/
const ptds = (currentPrice, lowTarget, meanTarget, highTarget) => {
    let score = 50; // Starting score

    if (currentPrice < lowTarget) {
        score -= 50 * (lowTarget - currentPrice) / lowTarget; // Heavy penalty
    } else if (currentPrice > highTarget) {
        score -= 50 * (currentPrice - highTarget) / highTarget; // Heavy penalty
    } else if (currentPrice >= lowTarget && currentPrice < meanTarget) {
        score += 25 * (currentPrice - lowTarget) / (meanTarget - lowTarget); // Buff
    } else if (currentPrice > meanTarget && currentPrice <= highTarget) {
        score -= 25 * (currentPrice - meanTarget) / (highTarget - meanTarget); // Slight nerf
    }

    // Ensure score is within 0-100 range
    score = Math.max(0, Math.min(100, score));

    return score / 2;
}

const Rate_ptds = ({ currentPrice, lowTarget, meanTarget, highTarget }) => {
    let helper = ptds(currentPrice, lowTarget, highTarget)

    return (
        <>
            {
                currentPrice < meanTarget
                    ?
                    <tr>
                        <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                        <td><p>Analysts have set a mean price target forecast of <span className="text-white">${meanTarget}</span>. This target is <span className="text-up">{percentageDiff(currentPrice, meanTarget).toFixed(2)}%</span> above the current price.</p></td>
                    </tr>

                    :
                    <tr>
                        <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                        <td><p>Analysts have set a mean price target forecast of <span className="text-white">${meanTarget}</span>. This target is <span className="text-down">{percentageDiff(currentPrice, meanTarget).toFixed(2)}%</span> below the current price.</p></td>
                    </tr>

            }
            {
                helper <= 10
                    ?
                    <tr>
                        <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                        <td>
                            <p>Current price indicates <span className="text-down">high caution</span>, <span className="text-down">pessimism</span> or <span className="text-up">potential undervaluation</span>. </p>
                            <p>This is a warning of <span className="text-down">potential issues</span>, but could also be an opportunity if the market is undervaluing the stock.</p>
                        </td>
                    </tr>
                    :
                    helper <= 20
                        ?
                        <tr>
                            <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                            <td>
                                <p>Current price indicates <span className="text-down">moderate caution</span>, or <span className="text-hold">a balanced view</span>. </p>
                                <p>This suggests the stock might be <span className="text-hold">fairly valued</span> but with <span className="text-hold">limited immediate upside</span>.</p>
                            </td>
                        </tr>
                        :
                        helper <= 30
                            ?
                            <tr>
                                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                                <td>
                                    <p>Current price indicates <span className="text-hold">fair valuation</span> according to analysts. </p>
                                    <p>This suggests <span className="text-hold">a balanced outlook</span> with <span className="text-up">moderate growth potential</span>.</p>
                                </td>
                            </tr>
                            :
                            helper <= 40
                                ?
                                <tr>
                                    <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                                    <td>
                                        <p>Current price indicates <span className="text-up">optimism</span> and a <span className="text-up">moderate potential for growth</span>.</p>
                                        <p>This suggests <span className="text-up">positive sentiment</span>, but also <span className="text-down">a need for performance to meet high expectations</span>.</p>
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                                    <td>
                                        <p>Current price indicates <span className="text-up">high optimism</span>, or <span className="text-down">potential overvaluation</span>.</p>
                                        <p>This <span className="text-up">can be good if the stock continues to perform well</span>, but also signals <span className="text-down">a risk if expectations are not met</span>.</p>
                                    </td>
                                </tr>
            }
        </>
    )
}

/*
Analyst Consensus Score (ACS)
High ACS (> 40)

Predominance of "Buy" and "Strong Buy" recommendations.
Indicates strong positive sentiment among analysts.
Suggests confidence in the stock's potential for growth.
Normal ACS (20 - 40)

Mixture of "Buy", "Hold", and possibly some "Sell" recommendations.
Indicates moderate or mixed sentiment.
Reflects a balanced outlook with some reservations about growth.
Low ACS (< 20)

Predominance of "Hold", "Sell", and "Strong Sell" recommendations.
Indicates weak or negative sentiment among analysts.
Suggests lack of confidence in the stock's potential or expectation of decline.
*/
const acs = (recommendationTrend) => {
    const total = recommendationTrend.strongBuy + recommendationTrend.buy + recommendationTrend.hold + recommendationTrend.sell + recommendationTrend.strongSell
    return ((4 * recommendationTrend.strongBuy + 3 * recommendationTrend.buy + 2 * recommendationTrend.hold + 1 * recommendationTrend.sell + 0 * recommendationTrend.strongSell) / (4 * total) * 50)
}

const Rate_acs = ({score_acs}) => {
    const helper = score_acs
    return (
        <>
            {
                helper < 20
                    ?
                    <tr>
                        <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                        <td>
                            <p>Analyst consensus indicates <span className="text-down">Weak</span> or <span className="text-down">negative sentiment</span> among analysts.</p>
                            <p>Suggests <span className="text-down">lack of confidence</span> in the stock potential or <span className="text-down">expectation of decline</span>.</p>
                        </td>
                    </tr>
                    :
                    helper <= 40
                        ?
                        <tr>
                            <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                            <td>
                                <p>Analyst consensus indicates <span className="text-hold">Moderate</span> or <span className="text-hold">mixed sentiment</span> among analysts.</p>
                                <p>Reflects a <span className="text-hold">balanced outlook</span> with some reservations about growth.</p>
                            </td>
                        </tr>
                        :
                        <tr>
                            <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                            <td>
                                <p>Analyst consensus indicates <span className="text-up">strong positive</span> sentiment among analysts.</p>
                                <p>Suggests <span className="text-up">confidence</span> in the stock potential for growth.</p>
                            </td>
                        </tr>
            }
        </>
    )
}

/*
Interpretation of the Final Grade
80-100: Excellent stock, strong buy recommendation, high potential for growth.
60-79: Good stock, buy recommendation, moderate to high potential.
40-59: Average stock, hold recommendation, balanced outlook.
20-39: Below average stock, sell recommendation, caution advised.
0-19: Poor stock, strong sell recommendation, high risk of decline.
*/

const Rate_score = ({ score }) => {
    const helper = score
    return (
        <>
            {
                helper < 20
                    ?
                    <tr>
                        <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                        <td>
                            <p className="text-down font-semibold">Poor stock, strong sell recommendation, high risk of decline.</p>
                        </td>
                    </tr>
                    :
                    helper < 40
                        ?
                        <tr>
                            <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                            <td>
                                <p className="text-down font-semibold">Below average stock, sell recommendation, caution advised.</p>
                            </td>
                        </tr>
                        :
                        helper < 60
                            ?
                            <tr>
                                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                                <td>
                                    <p className="text-hold font-semibold">Average stock, hold recommendation, balanced outlook.</p>
                                </td>
                            </tr>
                            :
                            helper < 80
                                ?
                                <tr>
                                    <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                                    <td>
                                        <p className="text-up font-semibold">Good stock, buy recommendation, moderate to high potential.</p>
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                                    <td>
                                        <p className="text-up font-semibold">Excellent stock, strong buy recommendation, high potential for growth.</p>
                                    </td>
                                </tr>
            }
        </>
    )
}
const BuyConsensus = ({ ticker, stockSummary }) => {

    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    const score_ptds = ptds(stockSummary.financialData.currentPrice, stockSummary.financialData.targetLowPrice, stockSummary.financialData.targetMeanPrice,stockSummary.financialData.targetHighPrice)
    const score_acs = acs(stockSummary.recommendationTrend.trend[0])
    const score = score_ptds + score_acs
    return (
        <div className="my-buyconsensus bg-neutral-800 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Stock score</h3>
            <div className="flex flex-col items-center mb-3">
                <div className={`radial-progress font-bold mb-6 ${score >= 60 ? 'text-up' : score >= 40 ? 'text-hold' : 'text-down'
                    }`} style={{ '--value': score }} role="progressbar">
                    {score.toFixed(2)}
                </div>
                <p>We assigns a score of <span className={`font-semibold ${score >= 60 ? 'text-up' : score >= 40 ? 'text-hold' : 'text-down'}`}>{score.toFixed(2)}</span><span className="text-white font-semibold">/100</span> to <span className="text-white font-semibold">{ticker}</span></p>
            </div>
            <table className="table">
                <tbody>
                    <Rate_score score={score} />
                    <Rate_ptds currentPrice={stockSummary.financialData.currentPrice} lowTarget={stockSummary.financialData.targetLowPrice} meanTarget={stockSummary.financialData.targetMeanPrice} highTarget={stockSummary.financialData.targetHighPrice} />
                    <Rate_acs score_acs={score_acs} />
                </tbody>
            </table>
        </div>
    )
}

export default BuyConsensus 