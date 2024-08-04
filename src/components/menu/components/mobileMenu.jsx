import MenuLinks from './MenuLinks'

const MobileMenu = () => {
    return (
        <div className="drawer-side z-40">
            <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay z-30"></label>
            <ul className="my-menu menu bg-neutral-900 min-h-full w-52 px-5 py-4 pt-20 shadow border-r border-r-neutral-800 z-40">
                <MenuLinks />
            </ul>
        </div>
    )
}

export default MobileMenu