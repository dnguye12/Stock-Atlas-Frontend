/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import { createChart, ColorType, LineStyle } from 'lightweight-charts';

const DividendChart = ({ data, grow }) => {
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
                    color: 'rgba(0, 169, 110, 0)'
                },
                textColor: 'white',
            },
            handleScroll: false,
            handleScale: false,
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
            timeScale: {
                fixLeftEdge: true,
                fixRightEdge: true,
                tickMarkFormatter: (time) => {
                    const date = new Date(time * 1000);
                    const year = date.getUTCFullYear().toString()
                    return year
                }
            },
            crosshair: {
                vertLine: {
                    width: 8,
                    color: '#C3BCDB44',
                    style: LineStyle.Solid,
                    labelBackgroundColor: '#9B7DFF',
                },
                horzLine: {
                    color: '#9B7DFF',
                    labelBackgroundColor: '#9B7DFF',
                },
            },
            localization: ({
                timeFormatter: (time) => {
                    const date = new Date(time * 1000);
                    const day = date.getUTCDate().toString().padStart(2, '0');
                    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                    const year = date.getUTCFullYear().toString()
                    return `${day}/${month}/${year}`;
                }
            })

        })


        chartRef.current = chart

        let mySeries;
        if (grow >= 0) {
            mySeries = chart.addAreaSeries({
                lineColor: 'rgba( 0, 169, 110, 1)',
                topColor: 'rgba( 0, 169, 110, 0.28)',
                bottomColor: 'rgba( 0, 169, 110, 0.05)'
            })
        } else {
            mySeries = chart.addAreaSeries({
                lineColor: 'rgba( 255, 88, 97, 1)',
                topColor: 'rgba( 255, 88, 97, 0.05)',
                bottomColor: 'rgba( 255, 88, 97, 0.28)'
            })
        }

        seriesRef.current = mySeries

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [])

    useEffect(() => {
        if (chartRef.current) {
            seriesRef.current.setData(data)
            chartRef.current.timeScale().fitContent();
        }
    }, [data]);


    return (
        <div ref={chartContainerRef} />
    )
}

export default DividendChart