/* eslint-disable react/prop-types */
import moment from 'moment';
import { capitalizeWord } from '../../../utils/textUtils';

const DividendOverview = ({ stockQuote, divData, stockSummary }) => {
    return (
        <div className="dividend-overview bg-neutral-800 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Dividend Overview</h3>
            <div className='hidden sm:block'>
                <div className="flex justify-evenly">
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Yield</h5>
                        <p className='text-white'>{stockQuote.dividendYield}%</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Annual Dividend</h5>
                        <p className='text-white'>${stockQuote.dividendRate}</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Date</h5>
                        <p className='text-white'>{moment(stockQuote.dividendDate).format("MMM Do YY")}</p>
                    </div>
                </div>
                <div className="flex justify-evenly mt-4">
                    <div className="py-5 text-center flex-1">
                        <h5>Payout Frequency</h5>
                        {divData.frequency
                            ?
                            <p className='text-white'>{capitalizeWord(divData.frequency)}</p>
                            :
                            <p>No info</p>
                        }
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Payout Ratio</h5>
                        <p className='text-white'>{(stockSummary.summaryDetail.payoutRatio * 100).toFixed(2)}%</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Growth</h5>
                        {divData.growth_1y
                            ?
                            <p className={`${divData.growth_1y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_1y.toFixed(2)}%</p>
                            : <p>No info</p>
                        }
                    </div>
                </div>
            </div>
            <div className='sm:hidden block'>
                <div className="flex justify-evenly">
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Yield</h5>
                        <p className='text-white'>{stockQuote.dividendYield}%</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Annual Dividend</h5>
                        <p className='text-white'>${stockQuote.dividendRate}</p>
                    </div>
                </div>
                <div className="flex justify-evenly mt-4">
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Date</h5>
                        <p className='text-white'>{moment(stockQuote.dividendDate).format("MMM Do YY")}</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Payout Frequency</h5>
                        {divData.frequency
                            ?
                            <p className='text-white'>{capitalizeWord(divData.frequency)}</p>
                            :
                            <p>No info</p>
                        }
                    </div>
                </div>
                <div className="flex justify-evenly mt-4">
                    <div className="py-5 text-center flex-1">
                        <h5>Payout Ratio</h5>
                        <p className='text-white'>{(stockSummary.summaryDetail.payoutRatio * 100).toFixed(2)}%</p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="py-5 text-center flex-1">
                        <h5>Dividend Growth</h5>
                        {divData.growth_1y
                            ?
                            <p className={`${divData.growth_1y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_1y.toFixed(2)}%</p>
                            : <p>No info</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DividendOverview