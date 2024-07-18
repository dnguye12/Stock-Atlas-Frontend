import SearchBar from "./components/SearchBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    return (
        <div className="navbar w-full top-0 z-50 sticky bg-neutral-800 min-h-16 items-center shadow border-b border-b-neutral-700">
            <div className="container mx-auto w-full h-full">
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-1" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <FontAwesomeIcon icon="fa-solid fa-bars" />
                    </label>
                </div>
                <div className="w-full flex items-center">
                    <a href="/" className="font-semibold text-gray-200 text-xl">AnaStock</a>
                    <SearchBar />
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Header