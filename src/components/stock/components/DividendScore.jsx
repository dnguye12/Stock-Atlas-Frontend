/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
/*
Dividend History (DH)
Dividend Streak (DS)
Dividend Growth Streak (DGS)
Number of Dividend Cuts (DC)

10: Extremely reliable dividend history with no cuts and long growth and payment streaks.
7-9: Very reliable dividend history with minor issues.
4-6: Moderately reliable, with some concerns over growth or minor cuts.
1-3: Questionable reliability, with frequent cuts or very short streaks.
0: Very unreliable, with numerous cuts and short or non-existent streaks.
*/
const Score_Dividend_History = (current_streak, grow_streak, cut_count) => {
    let ds, dgs, dc;
    if (current_streak >= 20) {
        ds = 10
    } else if (current_streak < 15) {
        ds = (current_streak / 15) * 8
    } else {
        ds = 8
    }

    if (grow_streak >= 20) {
        dgs = 10
    } else if (grow_streak < 15) {
        dgs = (grow_streak / 15) * 8
    } else {
        dgs = 8
    }

    if (cut_count === 0) {
        dc = 0
    } else if (cut_count >= 5) {
        dc = -10
    } else {
        dc = -2 * cut_count
    }

    return (ds + dgs + dc)
}

const Rate_Dividend_History = ({ score }) => {
    if (score < 1) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>Very <span>unreliable</span>, with <span>numerous cuts</span> and <span>short or non-existent streaks</span>.</p></td>
            </tr>
        )
    } else if (score < 4) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Questionable reliability</span>, with <span>frequent cuts</span> or <span>very short streaks</span>.</p></td>
            </tr>
        )
    } else if (score < 7) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td className="med"><p><span>Moderately reliable</span>, with some <span>concerns over growth</span> or <span>minor cuts</span>.</p></td>
            </tr>
        )
    } else if (score <= 9) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p><span>Very reliable</span> dividend history with minor issues.</p></td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p><span>Extremely reliable</span> dividend history with no cuts and long growth and payment streaks.</p></td>
            </tr>
        )
    }
}

/*
Dividend Yield (DY)
High and sustainable yield (4-6%): 10
Moderate yield (2-4%): 7
Low yield (<2%): 4
Unsustainable: 0
*/
const Score_Dividend_Yield = (dividendYield) => {
    let res;
    if (dividendYield > 4 && dividendYield <= 6) {
        res = 10;
    } else if (dividendYield >= 2 && dividendYield <= 4) {
        res = 7;
    } else if (dividendYield >= 0 && dividendYield < 2) {
        res = 4;
    } else {
        res = 0;
    }
    return res;
}

const Rate_Dividend_Yield = ({ score }) => {
    if (score === 10) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p><span>High and sustainable yield (4-6%).</span></p></td>
            </tr>
        )
    } else if (score === 7) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td className="med"><p><span>Moderate yield (2-4%).</span></p></td>
            </tr>
        )
    } else if (score === 4) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Low yield ({'<'}2%).</span></p></td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Unsustainable yield.</span></p></td>
            </tr>
        )
    }
}

/*
Loss Making (Less than 0%)

Grade: 0
Description: Negative payout ratio due to expected negative earnings.
Very Unsustainable (More than 150%)

Grade: 1
Description: Payout ratio exceeds 150%, indicating very unsustainable dividends.
Unsustainable (95% to 150%)

Grade: 2
Description: Payout ratio between 95% and 150%, unsustainable long-term.
Very High (75% to 95%)

Grade: 3
Description: Payout ratio between 75% and 95%, very high and risky for dividend sustainability.
High (55% to 75%)

Grade: 5
Description: Payout ratio between 55% and 75%, high but reasonable.
Healthy (35% to 55%)

Grade: 7
Description: Payout ratio between 35% and 55%, balanced and sustainable.
Good (0% to 35%)

Grade: 9
Description: Payout ratio between 0% and 35%, considered good and stable.
No Dividend (0%)

Grade: 10
Description: No dividends paid, all earnings retained for growth.
*/
const Score_Payout_Ratio = (payout_ratio) => {
    if (payout_ratio < 0) {
        return 0; // Loss Making
    } else if (payout_ratio > 150) {
        return 1; // Very Unsustainable
    } else if (95 <= payout_ratio && payout_ratio <= 150) {
        return 2; // Unsustainable
    } else if (75 <= payout_ratio && payout_ratio < 95) {
        return 3; // Very High
    } else if (55 <= payout_ratio && payout_ratio < 75) {
        return 5; // High
    } else if (35 <= payout_ratio && payout_ratio < 55) {
        return 7; // Healthy
    } else if (0 <= payout_ratio && payout_ratio < 35) {
        return 9; // Good
    } else {
        return 10; // No Dividend
    }
}

const Score_REIT_Payout_Ratio = (payout_ratio) => {
    if (payout_ratio < 0) {
        return 0; // Loss Making
    } else if (payout_ratio > 300) {
        return 1; // Very Unsustainable
    } else if (200 <= payout_ratio && payout_ratio <= 300) {
        return 2; // Unsustainable
    } else if (150 <= payout_ratio && payout_ratio < 200) {
        return 3; // Very High
    } else if (100 <= payout_ratio && payout_ratio < 150) {
        return 5; // High
    } else if (60 <= payout_ratio && payout_ratio < 100) {
        return 7; // Healthy
    } else if (0 <= payout_ratio && payout_ratio < 60) {
        return 9; // Good
    } else {
        return 10; // No Dividend
    }
}

const Rate_Payout_Ratio = ({ score }) => {
    if (score === 10) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td><p>No dividends paid, all earnings retained for growth.</p></td>
            </tr>
        )
    } else if (score === 9) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p><span>Good and stable</span> payout ratio.</p></td>
            </tr>
        )
    } else if (score === 7) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p><span>Balanced and sustainable</span> payout ratio.</p></td>
            </tr>
        )
    } else if (score === 5) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td className="med"><p><span>High but reasonable</span> payout ratio.</p></td>
            </tr>
        )
    } else if (score === 3) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Very high and risky for dividend sustainability</span> payout ratio.</p></td>
            </tr>
        )
    } else if (score === 2) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Unsustainable long-term</span> payout ratio.</p></td>
            </tr>
        )
    } else if (score === 1) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Very unsustainable long-term</span> payout ratio.</p></td>
            </tr>
        )
    } else if (score === 0) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Negative payout ratio due to expected negative earnings.</span></p></td>
            </tr>
        )
    }
}

/*
Low Debt-to-Equity (< 0.5)

Score: 10
Interpretation: Indicates strong financial health and low reliance on debt, very safe for dividends.
Moderate Debt-to-Equity (0.5 - 1)

Score: 8
Interpretation: Indicates moderate financial leverage, generally safe for dividends.
High Debt-to-Equity (1 - 2)

Score: 5
Interpretation: Indicates significant financial leverage, but manageable for financially strong companies.
Very High Debt-to-Equity (2 - 3)

Score: 3
Interpretation: Indicates high reliance on debt, higher risk for dividends, but might be sustainable for companies with strong cash flows.
Extremely High Debt-to-Equity (> 3)

Score: 0
Interpretation: Indicates very high financial risk, dividends at significant risk unless supported by exceptionally strong cash flows and financial performance.
*/
const Score_Debt_Ratio = (debtToEquity) => {
    if (debtToEquity < 50) {
        return 10;
    } else if (debtToEquity >= 50 && debtToEquity < 100) {
        return 8;
    } else if (debtToEquity >= 100 && debtToEquity < 200) {
        return 5;
    } else if (debtToEquity >= 200 && debtToEquity < 300) {
        return 3;
    } else {
        return 0;
    }
}

const Rate_Debt_Ratio = ({ score }) => {
    if (score === 10) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p>Debt-to-Equity indicates <span>strong financial health</span> and <span>low reliance on debt</span>, <span>very safe</span> for dividends.</p></td>
            </tr>
        )
    } else if (score === 8) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td className="med"><p>Debt-to-Equity indicates <span>moderate financial leverage</span>, generally <span>safe</span> for dividends.</p></td>
            </tr>
        )
    } else if (score === 5) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>Debt-to-Equity indicates <span>significant financial leverage</span>, but manageable for financially strong companies.</p></td>
            </tr>
        )
    } else if (score === 3) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>Debt-to-Equity indicates <span>high reliance on debt</span>, <span>higher risk for dividends</span>, but might be sustainable for companies with strong cash flows.</p></td>
            </tr>
        )
    } else if (score === 0) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>Debt-to-Equity indicates indicates <span>very high financial risk</span>, <span>dividends at significant risk</span> unless supported by exceptionally strong cash flows and financial performance.</p></td>
            </tr>
        )
    }
}

/*
Favorable Valuation (Low Ratios)

Score: 20
Interpretation: The stock is potentially undervalued, suggesting it is a good buying opportunity.

Moderate Valuation (Average Ratios)

Score: 14
Interpretation: The stock is fairly valued, indicating that the price is reasonable based on earnings and cash flow.

Unfavorable Valuation (High Ratios)

Score: 8
Interpretation: The stock may be overvalued, suggesting that the price is high relative to earnings and cash flow.

Very Unfavorable Valuation (Very High Ratios)

Score: 0
Interpretation: The stock is likely overvalued, posing a higher risk for investors.
*/
const Score_Valuation_Ratios = (stockQuote, stockSummary) => {
    const PE = stockQuote.trailingPE;
    const EVEBITDA = stockSummary.defaultKeyStatistics.enterpriseValue / stockSummary.financialData.ebitda;

    let score_PE, score_EVEBITDA;

    if (PE < 15) {
        score_PE = 10;
    } else if (PE >= 15 && PE < 25) {
        score_PE = 7;
    } else if (PE >= 25 && PE < 35) {
        score_PE = 4;
    } else {
        score_PE = 0;
    }

    if (EVEBITDA < 8) {
        score_EVEBITDA = 10;
    } else if (EVEBITDA >= 8 && EVEBITDA < 12) {
        score_EVEBITDA = 7;
    } else if (EVEBITDA >= 12 && EVEBITDA < 15) {
        score_EVEBITDA = 4;
    } else {
        score_EVEBITDA = 0;
    }

    return (score_PE + score_EVEBITDA) / 2;
}

const Rate_Valuation_Ratios = ({ score }) => {
    if (score === 0) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>The stock is likely <span>overvalued</span>, posing a <span>higher risk</span> for investors.</p></td>
            </tr>
        )
    } else if (score <= 8) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>The stock may be <span>overvalued</span>, suggesting that the price is high relative to earnings and cash flow.</p></td>
            </tr>
        )
    } else if (score <= 14) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td className="med"><p>The stock is <span>fairly valued</span>, indicating that the price is reasonable based on earnings and cash flow.</p></td>
            </tr>
        )
    } else if (score <= 20) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p>The stock is potentially <span>undervalued</span>, suggesting it is a good buying opportunity.</p></td>
            </tr>
        )
    }
}

/*
Strong Buy: 10
Buy: 8
Hold: 5
Sell: 2
Strong Sell: 0
*/
const Score_Analyst_Recommendations = (recommendationKey) => {
    if (recommendationKey === 'strongBuy' || recommendationKey === 'strong_buy') {
        return 10
    } else if (recommendationKey === 'buy') {
        return 8
    } else if (recommendationKey === 'hold') {
        return 5
    } else if (recommendationKey === 'sell') {
        return 2
    } else if (recommendationKey === 'strongSell' ||recommendationKey === 'strong_sell') {
        return 0
    } else {
        return 99
    }
}

const Rate_Analyst_Recommendations = ({ score }) => {
    if (score === 10) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p>Analysts rate this stock as <span>"Strong Buy"</span></p></td>
            </tr>
        )
    } else if (score === 8) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-check" className="text-up" /></td>
                <td className="good"><p>Analysts rate this stock as <span>"Buy"</span></p></td>
            </tr>
        )
    } else if (score === 5) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td className="med"><p>Analysts rate this stock as <span>"Hold"</span></p></td>
            </tr>
        )
    } else if (score === 2) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>Analysts rate this stock as <span>"Sell"</span></p></td>
            </tr>
        )
    } else if (score === 0) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p>Analysts rate this stock as <span>"Strong Sell"</span></p></td>
            </tr>
        )
    }
}

/*
8-10: Very safe dividend. This stock has a strong and reliable dividend payout, making it an excellent choice for investors seeking consistent income and minimal risk.
6-7.9: Safe dividend. The dividend payout is stable and dependable, offering a good level of security for income-focused investors with a low likelihood of cuts or suspensions.
4-5.9: Moderately safe dividend. The dividend is fairly secure, but there may be some risk involved. Investors should monitor the company's financial health to ensure continued payouts.
2-3.9: Risky dividend. This stock's dividend payout is uncertain and may be reduced or suspended in the future. Caution is advised, and it may not be suitable for risk-averse investors.
0-1.9: Very risky dividend. The dividend is highly unreliable, with a significant chance of being cut or eliminated. Investors should be wary and consider the high risk before investing.
*/

const Rate_Dividend = ({ score }) => {
    if (score < 20) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Very risky dividend. The dividend is highly unreliable, with a significant chance of being cut or eliminated.</span></p></td>
            </tr>
        )
    } else if (score < 40) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                <td className="bad"><p><span>Risky dividend. This stock's dividend payout is uncertain and may be reduced or suspended in the future.</span></p></td>
            </tr>
        )
    } else if (score < 60) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle" className="text-hold" /></td>
                <td className="med"><p><span>Moderately safe dividend. The dividend is fairly secure, but there may be some risk involved.</span></p></td>
            </tr>
        )
    } else if (score < 80) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-up" /></td>
                <td className="good"><p><span>Safe dividend. The dividend payout is stable and dependable, offering a good level of security for income-focused investors with a low likelihood of cuts or suspensions.</span></p></td>
            </tr>
        )
    } else if (score <= 100) {
        return (
            <tr>
                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-up" /></td>
                <td className="good"><p><span>Very safe dividend. This stock has a strong and reliable dividend payout, making it an excellent choice for investors seeking consistent income and minimal risk.</span></p></td>
            </tr>
        )
    }
}
const DividendScore = ({ ticker, stockQuote, divData, stockSummary }) => {
    let att_counter = 0
    let score_div = 0
    const score_Dividend_History = Score_Dividend_History(divData.current_streak, divData.grow_streak, divData.cut_count)
    if (!isNaN(score_Dividend_History)) {
        att_counter++
        score_div += score_Dividend_History
    }

    const score_Dividend_Yield = Score_Dividend_Yield(stockQuote.dividendYield)
    if (!isNaN(score_Dividend_Yield)) {
        att_counter++
        score_div += score_Dividend_Yield
    }

    let score_Payout_Ratio
    {
        stockSummary.assetProfile.industry.toLowerCase().includes('reit')
            ? score_Payout_Ratio = Score_REIT_Payout_Ratio(stockSummary.summaryDetail.payoutRatio)
            : score_Payout_Ratio = Score_Payout_Ratio(stockSummary.summaryDetail.payoutRatio)
    }
    if (!isNaN(score_Payout_Ratio)) {
        att_counter++
        score_div += score_Payout_Ratio
    }

    const score_Debt_Ratio = Score_Debt_Ratio(stockSummary.financialData.debtToEquity)
    if (!isNaN(score_Debt_Ratio)) {
        att_counter++
        score_div += score_Debt_Ratio
    }

    const score_Valuation_Ratios = Score_Valuation_Ratios(stockQuote, stockSummary)
    if (!isNaN(score_Valuation_Ratios)) {
        att_counter++
        score_div += score_Valuation_Ratios
    }

    const score_Analyst_Recommendations = Score_Analyst_Recommendations(stockSummary.financialData.recommendationKey)
    if (!isNaN(score_Analyst_Recommendations)) {
        att_counter++
        score_div += score_Analyst_Recommendations
    }

    score_div = score_div / att_counter * 10
    if (divData.yearly_data.length <= 5) {
        score_div -= 25
    }

    //const score_div = (score_Dividend_History + score_Dividend_Yield + score_Payout_Ratio + score_Debt_Ratio + score_Valuation_Ratios + score_Analyst_Recommendations) / 6 * 10

    return (
        <div className="dividend-overview bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Dividends Score</h3>

            <div className="px-5">
                <div className="flex flex-col items-center justify-center mb-3">
                    <div className={`radial-progress font-bold mb-6 ${score_div < 40 ? "text-down" : score_div >= 60 ? "text-up" : "text-hold"}`} style={{ "--value": score_div }} role="progressbar">
                        {score_div.toFixed(2)}
                    </div>
                    <p>We assigns a score of <span className={`font-semibold ${score_div >= 60 ? 'text-up' : score_div >= 40 ? 'text-hold' : 'text-down'}`}>{score_div.toFixed(2)}</span><span className="text-white font-semibold">/100</span> to <span className="text-white font-semibold">{ticker}</span></p>
                </div>
                <table className="table">
                    <tbody>
                        {
                            !isNaN(score_div) && <Rate_Dividend score={score_div} />
                        }
                        {
                            !isNaN(score_Dividend_History) && <Rate_Dividend_History score={score_Dividend_History} />
                        }
                        {
                            !isNaN(score_Dividend_Yield) && <Rate_Dividend_Yield score={score_Dividend_Yield} />
                        }
                        {
                            !isNaN(score_Payout_Ratio) && <Rate_Payout_Ratio score={score_Payout_Ratio} />
                        }
                        {
                            !isNaN(score_Debt_Ratio) && <Rate_Debt_Ratio score={score_Debt_Ratio} />
                        }
                        {
                            !isNaN(score_Valuation_Ratios) && <Rate_Valuation_Ratios score={score_Valuation_Ratios} />
                        }
                        {
                            !isNaN(score_Analyst_Recommendations) && <Rate_Analyst_Recommendations score={score_Analyst_Recommendations} />
                        }
                        {
                            divData.yearly_data.length <= 5 &&
                            <tr>
                                <td><FontAwesomeIcon icon="fa-regular fa-circle-xmark" className="text-down" /></td>
                                <td className="bad"><p><span>This stock started paying dividends less than 5 years ago, not enough data to study its safety score.</span></p></td>
                            </tr>
                        }
                        <tr>
                            <td><FontAwesomeIcon className="text-hold" icon="fa-solid fa-triangle-exclamation" /></td>
                            <td><p className="text-hold text-sm italic font-semibold">This score is based entirely on Dividends data.</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DividendScore