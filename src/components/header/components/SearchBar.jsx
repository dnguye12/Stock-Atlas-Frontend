import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { act, useEffect, useState } from 'react'
import { getYahooSearch, getYahooDailyActives } from '../../../services/stock'
import SearchBarStock from './SearchBarStock'

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState(null)
    const [actives, setActives] = useState()

    useEffect(() => {
        const handler = setTimeout(() => {
            const fetchData = async () => {
                const data = await getYahooSearch(searchInput)

                if (data) {
                    setSearch(data)
                }
            }
            fetchData()
        }, 500)
        return () => {
            clearTimeout(handler)
        }
    }, [searchInput])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooDailyActives(5)
                if (data) {
                    setActives(data)
                }
            } catch (error) {
                console.log("Getting daily actives: ", error)
            }
        }
        fetchData()
    }, [])

    if (!search || !actives) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <dialog id="my_search_modal" className="modal">
            <div className="modal-box absolute top-16 bg-neutral-950 border border-neutral-700">
                <label className="input input-bordered flex items-center gap-2 text-white border-neutral-700 bg-neutral-950 text-sm">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    <input type="text" value={searchInput} className="grow" placeholder="Search for symbols or companies" onChange={(e) => { setSearchInput(e.target.value) }} />
                </label>

                {
                    searchInput.length === 0
                        ?
                        <div>
                            <h3 className=' text-sm text-white font-semibold my-3'>Popular</h3>
                            <table className='table'>
                                <tbody>
                                    {
                                        actives.map((active, idx) => (
                                            <SearchBarStock key={idx} ticker={active.symbol} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>
                            <h3 className=' text-sm text-white font-semibold my-3'>Symbols</h3>
                            <table className='table'>
                                <tbody>
                                    {
                                        search.quotes.length > 0
                                            ?
                                            search.quotes.map((active, idx) => (
                                                active.symbol &&
                                                <SearchBarStock key={idx} ticker={active.symbol} />
                                            ))
                                            :
                                            <p>..Loading</p>

                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default SearchBar