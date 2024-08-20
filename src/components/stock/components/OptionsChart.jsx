/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OptionsChart = ({ optionsDates, stockOptions }) => {
    const labels = optionsDates.map(date => moment(date).format("YYYY"))
    let dataCalls = []
    let dataPuts = []
    let helperCall = 0
    let helperPut = 0

    stockOptions.forEach(stockOption => {
        stockOption.options[0].calls.forEach(call => {
            if (call.volume) {
                helperCall += call.volume
            }
        })

        stockOption.options[0].puts.forEach(put => {
            if (put.volume) {
                helperPut += put.volume
            }
        })

        dataCalls.push(helperCall)
        dataPuts.push(helperPut)
        helperCall = 0
        helperPut = 0
    })

    const data = {
        labels,
        datasets: [
            {
                label: 'Calls',
                data: dataCalls,
                backgroundColor: 'rgb(0, 169, 110)',
            },
            {
                label: 'Puts',
                data: dataPuts,
                backgroundColor: 'rgb(255 88 97)',
            },
        ],
    };

    let delayed;
    const options = {
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white', // Set legend text color to white
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                labels: {
                    color: 'white', // Set legend text color to white
                },
            },
            datalabels: {
                display: false,
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'white',
                    callback: function (value, index, ticks) {
                        const currentLabel = this.getLabelForValue(value);
                        const previousLabel = index > 0 ? this.getLabelForValue(ticks[index - 1].value) : null;

                        // Display label only if different from the previous one
                        return currentLabel !== previousLabel ? currentLabel : '';
                    },
                },
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'white', // Set y-axis text color to white
                },
            },
        },
    };

    return (
        <div className="hidden md:block stock-options bg-neutral-950 border border-neutral-700 rounded p-4 mt-4">
            <Bar data={data} options={options} />
        </div>
    )
}

export default OptionsChart