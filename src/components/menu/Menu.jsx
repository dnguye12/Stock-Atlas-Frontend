import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Menu = () => {
    return (
        <ul className='hidden xl:flex menu sticky h-screen top-16 left-0 w-52 bg-neutral-900 z-40 shadow border-r border-r-neutral-800 px-5 py-4'>
            <li>
                <Link to="/"><FontAwesomeIcon icon="fa-solid fa-house" />Homepage</Link>
            </li>
        </ul>
    )
}

export default Menu;