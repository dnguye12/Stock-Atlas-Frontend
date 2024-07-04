import { useState } from "react";
import Active from "./components/Active";
import Gainers from "./components/Gainers";
import Indexes from "./components/Indexes";
import Losers from "./components/Losers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Home = () => {
    const [showingGainers, setShowingGainers] = useState(true)

    return (
        <div className="w-full max-w-7xl sm:px-5 mx-auto my-20">
            <div className="flex w-full flex-col justify-center mx-auto">
                <Indexes />

                <div className="my-hero text-center my-20">
                    <h1 className="text-4xl sm:text-5xl text-white font-bold mb-6"><span>Ana</span>lyse <span>Stock</span></h1>
                    <p className="home-p">We provide <span>100% free</span> and <span>easy-to-understand</span> data to <span>Retail Investors.</span></p>
                    <p className="home-p">See stock prices, news, financial, forecasts, charts and more.</p>
                </div>

                <div className="grid grid-cols-2 mx-auto w-full gap-10">
                    {
                        showingGainers
                            ?
                            <div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon className="mr-2 cursor-pointer" onClick={() => { setShowingGainers(false) }} icon="fa-solid fa-chevron-down" />
                                    <h3 className=" select-none">Top Gainers Today</h3>
                                </div>
                                <Gainers />
                            </div>
                            :
                            <div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon className="mr-2 cursor-pointer" onClick={() => { setShowingGainers(true) }} icon="fa-solid fa-chevron-up" />
                                    <h3 className=" select-none">Top Losers Today</h3>
                                </div>
                                <Losers />
                            </div>
                    }
                    <Active />
                </div>
            </div>
        </div>
    )
}

export default Home;