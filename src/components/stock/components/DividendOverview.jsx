/* eslint-disable react/prop-types */
import moment from 'moment';
import { capitalizeWord } from '../../../utils/textUtils';
import { useEffect, useState } from 'react';
import { getYahooQuoteSummary } from '../../../services/stock';

const DividendOverview = ({ ticker, stockQuote, divData }) => {
    const [stockSummary, setStockSummary] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooQuoteSummary(ticker, ["summaryDetail"])
                setStockSummary(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [ticker])

    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div className="dividend-overview bg-neutral-800 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Dividend Overview</h3>
            <div>
                <div className="flex justify-evenly">
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Yield</h5>
                        <p>{stockQuote.dividendYield}%</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Annual Dividend</h5>
                        <p>${stockQuote.dividendRate}</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Date</h5>
                        <p>{moment(stockQuote.dividendDate).format("MMM Do YY")}</p>
                    </div>
                </div>
                <div className="flex justify-evenly mt-4">
                    <div className="py-5 text-center flex-1">
                        <h5>Payout Frequency</h5>
                        <p>{capitalizeWord(divData.frequency)}</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Payout Ratio</h5>
                        <p>{(stockSummary.summaryDetail.payoutRatio * 100).toFixed(2)}%</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Growth</h5>
                        <p>{divData.growth_1y.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DividendOverview