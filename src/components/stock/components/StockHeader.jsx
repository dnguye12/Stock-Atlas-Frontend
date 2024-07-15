/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getStockLogo } from "../../../services/stock"

const StockHeader = ({ ticker }) => {
    const [logoImg, setLogoImage] = useState('')

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const logo = await getStockLogo(ticker)

                if (logo) {
                    setLogoImage(`data:image/png;base64,${logo}`)
                }
            } catch (error) {
                setLogoImage('')
            }
        }

        fetchLogo()
    }, [ticker])
    return (
        <div>
            <img src={logoImg} alt={ticker} />
        </div>
    )
}

export default StockHeader