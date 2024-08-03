import { useState } from "react"
import SearchBar from "./components/SearchBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    const [searchBarLoading, setSearchBarLoading] = useState(true)

    return (
        <div className="navbar w-full top-0 z-50 sticky bg-neutral-900 min-h-16 items-center shadow border-b border-b-neutral-800">
            <div className="container mx-auto w-full h-full">
                <div className="flex-none xl:hidden">
                    <label htmlFor="my-drawer-1" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <FontAwesomeIcon icon="fa-solid fa-bars" />
                    </label>
                </div>
                <div className="w-full flex items-center">
                    <a href="/" className="font-semibold text-gray-200 text-xl">AnaStock</a>

                    <button className={`btn btn-sm rounded-lg border border-neutral-700 w-10 h-10 ${searchBarLoading && 'btn-disabled'}`} onClick={() => document.getElementById('my_search_modal').showModal()}>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    </button>
                   <SearchBar setSearchBarLoading={setSearchBarLoading}/>
                </div>
            </div>
        </div>
    )
}

export default Header