/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import { createChart, ColorType } from 'lightweight-charts';

const StockChart = ({ data, prevClose }) => {
    const chartContainerRef = useRef()
    const chartRef = useRef()
    const seriesRef = useRef()

    useEffect(() => {
        const handleResize = () => {
            chartRef.current.applyOptions({
                width: chartContainerRef.current.clientWidth
            });
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: 'rgba( 38, 166, 154, 0)'
                },
                textColor: 'white',
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            grid: {
                horzLines: {
                    visible: false
                },
                vertLines: {
                    visible: false
                }
            },
        })
        chartRef.current = chart
        
        const mySeries = chart.addBaselineSeries({
            baseValue: { type: "price", price: prevClose },
            topLineColor: 'rgba( 38, 166, 154, 1)',
            topFillColor1: 'rgba( 38, 166, 154, 0.28)',
            topFillColor2: 'rgba( 38, 166, 154, 0.05)',
            bottomLineColor: 'rgba( 239, 83, 80, 1)',
            bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
            bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
            lastValueVisible: false,
            priceLineVisible: false,
            lineWidth: 1
        });
        seriesRef.current = mySeries

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [prevClose])

    useEffect(() => {
        if(chartRef.current) {
            seriesRef.current.setData(data)
            chartRef.current.timeScale().fitContent();
        }
    }, [data]);


    return (
        <div ref={chartContainerRef} />
    )
}

export default StockChart