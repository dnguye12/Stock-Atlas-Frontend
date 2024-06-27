/* eslint-disable react/prop-types */
import Index from "./Index";


const Indexes = () => {
    return (
        <div className="mx-auto w-full max-w-[1000px]">
            <p>Stock Indexes</p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4 md:grid-rows-1 lg:gap-4">
                <Index name="S&P 500" ticker='^GSPC' />
                <Index name="Dow 30" ticker='^DJI' />
                <Index name="Nasdaq" ticker='^IXIC' />
                <Index name="Russell 2000" ticker='^RUT' />
            </div>
        </div>
    )
}

export default Indexes