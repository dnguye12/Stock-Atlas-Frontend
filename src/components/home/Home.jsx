import Gainers from "./components/Gainers";
import Indexes from "./components/Indexes";

const Home = () => {
    return (
        <div className="flex w-full flex-col justify-center mx-auto">
            <Indexes />

            <div className="my-hero text-center my-20">
                <h1 className="text-4xl sm:text-5xl text-white font-bold mb-6"><span>Ana</span>lyse <span>Stock</span></h1>
                <p className="home-p">We provide <span>100% free</span> and <span>easy-to-understand</span> data to <span>Retail Investors.</span></p>
                <p className="home-p">See stock prices, news, financial, forecasts, charts and more.</p>
            </div>

            <div className="grid grid-cols-2 w-full mx-auto gap-10">
                <Gainers />
                <Gainers />
            </div>
        </div>
    )
}

export default Home;