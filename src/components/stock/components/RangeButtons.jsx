/* eslint-disable react/prop-types */
const RangeButtons = ({ chartInterval, setChartInterval }) => {
    const intervals = ['1D', '1W', '1M', 'YTD', '1Y', '5Y', 'Max'];
    return (
        <>
            {
                intervals.map(interval =>
                (
                    <button className={`btn bg-neutral-950 border-neutral-950 rounded-none border-b-2 ${chartInterval === interval && "text-white border-b-white"}`} key={interval} onClick={() => setChartInterval(interval)}>{interval}</button>
                )
                )
            }</>
    )
}

export default RangeButtons