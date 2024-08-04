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
                            <Link to="/"><FontAwesomeIcon icon="fa-solid fa-house" />Home</Link>
                        </li>
                    </ul>
                </details>
            </li>
        </>
    )
}

export default MenuLinks