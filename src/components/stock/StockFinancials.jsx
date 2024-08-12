import { Route, Routes } from "react-router-dom"

import FinancialsHeader from "./components/FinancialsHeader"
import FinancialsIncome from "./components/FinancialsIncome"
import FinancialsBalanceSheet from "./components/FinancialsBalanceSheet"
import FinancialsCashFlow from "./components/FinancialsCashFlow"
import FinancialsRatios from "./components/FinancialsRatios"

/* eslint-disable react/prop-types */
const StockFinancials = ({ ticker, stockQuote }) => {
    return (
        <div className="stock-finance w-full flex flex-col mt-0">
            <FinancialsHeader ticker={ticker} />
            <div className="w-full px-5">
                <Routes>
                    <Route path='/' element={<FinancialsIncome ticker={ticker} stockQuote={stockQuote}/>} />
                    <Route path='balance-sheet' element={<FinancialsBalanceSheet ticker={ticker}/>} />
                    <Route path='cash-flow' element={<FinancialsCashFlow ticker={ticker}/>} />
                    <Route path='ratios' element={<FinancialsRatios ticker={ticker}/>} />
                </Routes>
            </div>
        </div>
    )
}

export default StockFinancials