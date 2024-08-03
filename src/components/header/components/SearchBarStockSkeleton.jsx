/* eslint-disable react/prop-types */
const SearchBarStockSkeleton = ({setSearchInput}) => {
    return (
        <tr className="hover cursor-pointer transition duration-300" onClick={() => {
            setSearchInput('')
            document.getElementById('my_search_modal').close()
        }
        }>
            <td className="w-12 px-0">
                <div className="rounded-full w-10 h-10 relative bg-neutral-950 border border-neutral-700 flex items-center justify-center mr-2">
                    <div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
                </div>
            </td>
            <td className="ps-0 flex flex-col justify-start">
                <div className="h-3 w-10 skeleton my-1"></div>
                <div className="h-3 w-full skeleton"></div>
            </td>
            <td>
                <div className="flex justify-end">
                    <div className="h-4 w-10 skeleton my-1"></div>
                </div>
            </td>

        </tr>
    )
}

export default SearchBarStockSkeleton