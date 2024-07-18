const MobileMenu = () => {
    return (
        <div className="drawer-side z-40">
            <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay z-30"></label>
            <ul className="menu bg-neutral-800 min-h-full w-52 px-5 py-4 pt-20 shadow border-r border-r-neutral-700 z-40">
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    )
}

export default MobileMenu