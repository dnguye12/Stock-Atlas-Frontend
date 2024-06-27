import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
    return (
        <label className="input input-bordered input-info flex items-center gap-2 ml-3 h-10">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            <input type="text" className="grow" placeholder="Search" />
        </label>
    )
}

export default SearchBar