/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';

const IndexChart = ({ data, prevClose }) => {
    const baseValue = prevClose

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
                    color: 'rgba( 38, 166, 154, 0)'
                },
                textColor: 'white',
            },
            width: chartContainerRef.current.clientWidth,
            height: 64,
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
            },
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
            priceLineVisible: false,
            lineWidth: 1
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

export default IndexChart