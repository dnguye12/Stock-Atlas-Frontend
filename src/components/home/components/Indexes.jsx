/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react"

import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { getYahooChart } from "../../../services/stock"

const IndexChart = ({ data }) => {
    const baseValue = data[0].close

    const chartContainerRef = useRef()
    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({ 
                width: chartContainerRef.current.clientWidth
            });
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: 'black'
                },
                textColor: 'white',
            },
            width: chartContainerRef.current.clientWidth,
            height: 40,
            rightPriceScale: {
                visible: false
            },
            timeScale: {
                visible: false
            },
            grid: {
                horzLines: {
                    visible: false
                },
                vertLines: {
                    visible: false
                }
            },
            handleScale: false,
            handleScroll: false,
            crosshair: {
                mode: CrosshairMode.Hidden
            }
        })

        chart.timeScale().fitContent()
        const mySeries = chart.addBaselineSeries({
            baseValue: { type: "price", price: baseValue },
            topLineColor: 'rgba( 38, 166, 154, 1)',
            topFillColor1: 'rgba( 38, 166, 154, 0.28)',
            topFillColor2: 'rgba( 38, 166, 154, 0.05)',
            bottomLineColor: 'rgba( 239, 83, 80, 1)',
            bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
            bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
            lastValueVisible: false,
            priceLineVisible: false
        });
        mySeries.setData(data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [data, baseValue])
    return (
        <div ref={chartContainerRef} />
    )
}

const Index = ({ name, ticker }) => {

    const [quotes, setQuotes] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooChart(ticker, "2024-06-21", "2024-06-22", "15m")
                console.log(data)
                setQuotes(data)
            } catch (error) {
                console.log("Index: ", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [ticker])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const myData = quotes.quotes.map(quote => ({
        time: new Date(quote.date).getTime(),
        value: quote.close
    }))

    return (
        <div className="flex items-center justify-between space-x-2 rounded border border-neutral-700 p-1.5 shadow-sm bg-neutral-800 hover:bg-neutral-700 lg-px-2">
            <div>
                <p className=" whitespace-nowrap text-sm font-semibold leading-tight">{name}</p>
            </div>
            <div className="w-full lg:h-[44px]">
                <IndexChart data={myData}></IndexChart>
            </div>
        </div>
    )
}

const Indexes = () => {
    return (
        <div>
            <p>Stock Indexes</p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4 md:grid-rows-1 lg:gap-4">
                <Index name="S&P 500" ticker='^GSPC' />
                <Index name="Dow 30" ticker='^DJI' />
                <Index name="Nasdaq" ticker='^IXIC' />
                <Index name="Russell 2000" ticker='^RUT' />
            </div>
        </div>
    )
}

export default Indexes