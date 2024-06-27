import Indexes from "./components/Indexes";

const Home = () => {
    return (
        <div className="flex w-full flex-col justify-center mx-auto">
            <Indexes />
            <div className="my-hero text-center my-20">
                <h1 className="text-4xl sm:text-5xl text-white font-bold mb-6"><span>Ana</span>lyse <span>Stock</span></h1>
                <p className="home-p">We provide <span>100% free</span> and <span>high quality</span> data to <span>Retail Investors.</span></p>
                <p className="home-p">See stock prices, news, financial, forecasts, charts and more.</p>
            </div>
        </div>
    )
}

export default Home;