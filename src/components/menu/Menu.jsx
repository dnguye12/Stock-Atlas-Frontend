import MenuLinks from './components/MenuLinks'

const Menu = () => {
    return (
        <ul className='my-menu hidden xl:flex menu sticky h-screen top-16 left-0 w-52 bg-neutral-900 z-40 shadow border-r border-r-neutral-800 px-5 py-4'>
            <MenuLinks />
        </ul>
    )
}

export default Menu;