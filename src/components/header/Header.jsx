import SearchBar from "./components/SearchBar"

const Header = () => {
    return (
        <div className=" w-screen top-0 z-40 sticky bg-neutral-800 min-h-16 flex items-center shadow border-b border-b-neutral-700">
            <div className="container mx-auto w-full h-full">
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