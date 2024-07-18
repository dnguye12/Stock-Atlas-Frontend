/* eslint-disable react/prop-types */
import Index from "./Index";


const Indexes = () => {
    return (
        <div className="mx-auto w-full">
            <p>Stock Indexes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
                <Index name="S&P 500" ticker='^GSPC' />
                <Index name="Dow 30" ticker='^DJI' />
                <Index name="Nasdaq" ticker='^IXIC' />
                <Index name="Russell 2000" ticker='^RUT' />
            </div>
        </div>
    )
}

export default Indexes