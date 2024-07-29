import DividendChart from "./DividendChart"

//const data = [{ value: 0, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];

/* eslint-disable react/prop-types */
const DividendGrowth = ({ divData }) => {

    if (!divData) {
        return (
            <div>...Loading</div>
        )
    }

    let chartData = divData.yearly_data.map(helper => (
        {
            value: helper.amount,
            time: helper.date.unix()
        }
    ))

    return (
        <div className="dividend-growth bg-neutral-800 border border-neutral-700 rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-white mb-3">Dividend Growth</h3>

            <div className="dividend-growth-percent hidden sm:flex justify-evenly text-center">
                {divData.growth_1y &&
                    <>
                        <div className="py-5">
                            <h5>Last Full Year</h5>
                            <p className={`${divData.growth_1y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_1y.toFixed(2)}%</p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                    </>
                }
                {divData.growth_5y &&
                    <>
                        <div className="py-5">
                            <h5>Last 5 Years</h5>
                            <p className={`${divData.growth_5y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_5y.toFixed(2)}% <span>per year</span></p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                    </>
                }
                {divData.growth_20y &&
                    <>
                        <div className="py-5">
                            <h5>Last 20 Years</h5>
                            <p className={`${divData.growth_20y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_20y.toFixed(2)}% <span>per year</span></p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                    </>
                }
                {
                    divData.growth_total &&
                    <div className="py-5">
                        <h5>Since start</h5>
                        <p className={`${divData.growth_total >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_total.toFixed(2)}% <span>per year</span></p>
                    </div>
                }
            </div>
            <div className="dividend-growth-percent sm:hidden flex justify-evenly text-center">
                <div>
                    {divData.growth_1y &&
                        <>
                            <div className="py-5">
                                <h5>Last Full Year</h5>
                                <p className={`${divData.growth_1y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_1y.toFixed(2)}%</p>
                            </div>
                            <div className="divider divider-horizontal"></div>
                        </>
                    }
                    {divData.growth_5y &&
                        <>
                            <div className="py-5">
                                <h5>Last 5 Years</h5>
                                <p className={`${divData.growth_5y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_5y.toFixed(2)}% <span>per year</span></p>
                            </div>
                            <div className="divider divider-horizontal"></div>
                        </>
                    }
                </div>
                <div>
                    {divData.growth_20y &&
                        <>
                            <div className="py-5">
                                <h5>Last 20 Years</h5>
                                <p className={`${divData.growth_20y >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_20y.toFixed(2)}% <span>per year</span></p>
                            </div>
                            <div className="divider divider-horizontal"></div>
                        </>
                    }
                    {
                        divData.growth_total &&
                        <div className="py-5">
                            <h5>Since start</h5>
                            <p className={`${divData.growth_total >= 0 ? 'text-up' : 'text-down'}`}>{divData.growth_total.toFixed(2)}% <span>per year</span></p>
                        </div>
                    }
                </div>
            </div>
            <p className="italic text-sm text-center mt-1 mb-5">This data only accounts for full year</p>
            <div className="divider"></div>
            <div>
                <h3 className="font-semibold text-white mt-3">Total Annual Dividends Per Share</h3>
                <DividendChart data={chartData} grow={divData.growth_total} />
            </div>
            <div className="divider"></div>
            <div className="dividend-growth-percent hidden sm:flex justify-evenly text-center">
                {
                    (divData.current_streak || divData.current_streak === 0)
                    &&
                    <>
                        <div className="py-5">
                            <h5>Uninterrupted Dividend Streak</h5>
                            <p className="text-white">{divData.current_streak} years</p>
                            <span>without a dividend cut</span>
                        </div>
                        <div className="divider divider-horizontal"></div>
                    </>
                }
                {
                    (divData.grow_streak || divData.grow_streak === 0)
                    &&
                    <>
                        <div className="py-5">
                            <h5>Dividend Growth Streak</h5>
                            <p className="text-white">{divData.grow_streak} years</p>
                            <span>of consecutive increases</span>
                        </div>
                        <div className="divider divider-horizontal"></div>
                    </>
                }
                {
                    (divData.cut_count || divData.cut_count === 0)
                    &&
                    <div className="py-5">
                        <h5>Number of Dividend Cut</h5>
                        <p className={`${divData.cut_count > 0 ? 'text-down' : 'text-up'}`}>{divData.cut_count}</p>
                        <span>cut in the last 30 years</span>
                    </div>
                }
            </div>
            <div className="dividend-growth-percent sm:hidden flex flex-col justify-evenly text-center">
                <div>
                {
                    (divData.current_streak || divData.current_streak === 0)
                    &&
                    <>
                        <div className="">
                            <h5>Uninterrupted Dividend Streak</h5>
                            <p className="text-white">{divData.current_streak} years</p>
                            <span>without a dividend cut</span>
                        </div>
                        <div className="divider divider-vertical"></div>
                    </>
                }
                </div>
                <div>
                {
                    (divData.grow_streak || divData.grow_streak === 0)
                    &&
                    <>
                        <div className="py-0">
                            <h5>Dividend Growth Streak</h5>
                            <p className="text-white">{divData.grow_streak} years</p>
                            <span>of consecutive increases</span>
                        </div>
                        <div className="divider divider-vertical"></div>
                    </>
                }
                </div>
                <div>
                {
                    (divData.cut_count || divData.cut_count === 0)
                    &&
                    <div className="pb-3">
                        <h5>Number of Dividend Cut</h5>
                        <p className={`${divData.cut_count > 0 ? 'text-down' : 'text-up'}`}>{divData.cut_count}</p>
                        <span>cut in the last 30 years</span>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

export default DividendGrowth