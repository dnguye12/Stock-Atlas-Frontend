import { useEffect, useState } from "react"
import { getYahooQuoteSummary } from "../../../services/stock"

const StockAnalystRating = ({ ticker }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const result = await getYahooQuoteSummary(ticker, ['financialData', 'recommendationTrend'])

            setData(result)
        }

        fetchData()
    }, [ticker])

    if (!data) {
        return (
            <div>...Loading</div>
        )
    }
    console.log(data)
    return (
        <div className="w-full flex flex-col">
            <h2>Analyst Rating</h2>
            <div className="flex justify-between">
                <div>
                    <h3>Signal</h3>
                    <h4>Buy</h4>
                </div>
                <div>
                    <h3>Price Target</h3>
                    <h4>$175</h4>
                </div>
            </div>
        </div>
    )
}

export default StockAnalystRating