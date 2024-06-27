import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Menu = () => {
    return (
        <ul className='menu h-full w-1/5 bg-neutral-800 max-w-48 z-40 shadow border-r border-r-neutral-700 px-5 py-4'>
            <li>
                <a href="/"><FontAwesomeIcon icon="fa-solid fa-house" />Homepage</a>
            </li>

            <li>
                <a href="/"><FontAwesomeIcon icon="fa-solid fa-house" />Homepage</a>
            </li>
            <li>
                <a href="/"><FontAwesomeIcon icon="fa-solid fa-house" />Homepage</a>
            </li>
            <li>
                <a href="/"><FontAwesomeIcon icon="fa-solid fa-house" />Homepage</a>
            </li>
            <li>
                <a href="/"><FontAwesomeIcon icon="fa-solid fa-house" />Homepage</a>
            </li>
            <li>
                <a href="/"><FontAwesomeIcon icon="fa-solid fa-house" />Homepage</a>
            </li>
            
        </ul>
    )
}

export default Menu;