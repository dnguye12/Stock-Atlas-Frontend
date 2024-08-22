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
                    <ul>
                        <li>
                            <Link to="/"><FontAwesomeIcon icon="fa-solid fa-house" />Home</Link>
                        </li>
                        <li>
                            <Link to="/heatmaps"><FontAwesomeIcon icon="fa-solid fa-border-all" />Heatmaps</Link>
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