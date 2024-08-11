/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'

const FinancialsHeader = ({ ticker }) => {
    const location = useLocation();
    return (
        <div className="navbar pt-0 mt-0">
            <Link to={`/stock/${ticker}/financials`} className={`btn btn-ghost rounded-none ${location.pathname === `/stock/${ticker}/financials` ? 'active' : ''}`}>Income Statement</Link>
            <Link to={`/stock/${ticker}/financials/balance-sheet`} className={`btn btn-ghost rounded-none ${location.pathname === `/stock/${ticker}/financials/balance-sheet` ? 'active' : ''}`}>Balance Sheet</Link>
            <Link to={`/stock/${ticker}/financials/cash-flow`} className={`btn btn-ghost rounded-none ${location.pathname === `/stock/${ticker}/financials/cash-flow` ? 'active' : ''}`}>Cash Flow</Link>
            <Link to={`/stock/${ticker}/financials/ratios`} className={`btn btn-ghost rounded-none ${location.pathname === `/stock/${ticker}/financials/ratios` ? 'active' : ''}`}>Ratios</Link>
        </div>
    )
}

export default FinancialsHeader