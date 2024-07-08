/* eslint-disable react/prop-types */
const RangeButtons = ({ setChartInterval }) => {
    const intervals = ['1D', '1W', '1M', 'YTD', '1Y', '5Y'];
    return (
        <>
            {
                intervals.map(interval =>
                (
                    <button className="btn" key={interval} onClick={() => setChartInterval(interval)}>{interval}</button>
                )
                )
            }</>
    )
}

export default RangeButtons