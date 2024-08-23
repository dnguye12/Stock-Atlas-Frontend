import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MenuLinks = () => {
    return (
        <>
            <li>
                <Link to="/"><FontAwesomeIcon icon="fa-solid fa-house" />Home</Link>
            </li>
            <li>
                <details>
                    <summary><FontAwesomeIcon icon="fa-solid fa-chart-simple" />Stock</summary>
                    <ul className='p-0'>
                        <li>
                            <Link to="/"><FontAwesomeIcon icon="fa-solid fa-house" />Home</Link>
                        </li>
                        <li>
                            <Link to="/heatmaps"><FontAwesomeIcon icon="fa-solid fa-border-all" />Heatmaps</Link>
                        </li> 
                        <li>
                            <Link to="/day-gainers"><FontAwesomeIcon icon="fa-solid fa-crown" />Daily Biggest Winners</Link>
                        </li>
                        <li>
                            <Link to="/day-losers"><FontAwesomeIcon icon="fa-solid fa-person-falling-burst" />Daily Biggest Losers</Link>
                        </li>
                        <li>
                            <Link to="/most-active"><FontAwesomeIcon icon="fa-solid fa-chart-line" />Most Active Today</Link>
                        </li>
                        <li>
                            <Link to="/most-shorted-stocks"><FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" />Most Shorted Stocks</Link>
                        </li>
                    </ul>
                </details>
            </li>
        </>
    )
}

export default MenuLinks