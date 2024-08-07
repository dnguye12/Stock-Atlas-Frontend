/* eslint-disable react/prop-types */
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ majorHoldersBreakdown }) => {
    const helper = (1 - majorHoldersBreakdown.insidersPercentHeld - majorHoldersBreakdown.institutionsPercentHeld) * 100
    const data = {
        labels: ['Insider', 'Institution', 'Retail and Other'],
        datasets: [
            {
                label: '% of Shares Held',
                data: [(majorHoldersBreakdown.insidersPercentHeld * 100).toFixed(2), (majorHoldersBreakdown.institutionsPercentHeld * 100).toFixed(2), helper.toFixed(2)],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                borderColor: [
                    'rgb(64 64 64)'
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                    color: 'white',
                    padding: 20,
                },

                position: 'bottom',
            },
            datalabels: {
                color: 'rgb(10 10 10)',
                font: {
                    weight: 'bold',
                    size: 15,
                },
                formatter: function (value, context) {
                    return `${value}%`;
                },
            }
        },
    };

    return <Pie data={data} options={options} />;
};

const HolderInsiderMajorHolders = ({ majorHoldersBreakdown }) => {
    return (
        <>
            {
                majorHoldersBreakdown
                &&
                <div className='bg-neutral-950 border border-neutral-700 rounded p-4 border-spacing-10 mt-4'>
                    <h3 className="font-semibold text-white mb-3">Major Holders Breakdown</h3>

                    <div className='w-full max-w-[450px] mx-auto'>
                        <PieChart majorHoldersBreakdown={majorHoldersBreakdown} />
                    </div>
                </div>
            }
        </>
    )
}

export default HolderInsiderMajorHolders