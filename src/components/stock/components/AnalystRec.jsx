/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);
import { getMonthFromNumber } from '../../../utils/timeUtils';

const AnalystRec = ({ stockSummary }) => {
    const { t, i18n } = useTranslation();
    if (!stockSummary || !stockSummary.recommendationTrend) {
        return (
            <div>...Loading</div>
        )
    }

    let data = {
        strongSellData: [],
        sellData: [],
        holdData: [],
        buyData: [],
        strongBuyData: [],
        labels: []
    }

    let maxRec = 0
    const trend = [...stockSummary.recommendationTrend.trend].reverse()
    trend.forEach(trend => {
        data.strongSellData.push(trend.strongSell)
        data.sellData.push(trend.sell)
        data.holdData.push(trend.hold)
        data.buyData.push(trend.buy)
        data.strongBuyData.push(trend.strongBuy)

        const helper = trend.strongBuy + trend.buy + trend.hold + trend.sell + trend.strongSell
        if (helper > maxRec) {
            maxRec = helper
        }
    })

    for (let i = data.strongSellData.length - 1; i >= 0; i--) {
        data.labels.push(getMonthFromNumber(i))
    }

    const barData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Strong Sell',
                data: data.strongSellData,
                backgroundColor: '#D60A22',
                barPercentage: 0.5,
                datalabels: {
                    align: 'center',
                    anchor: 'center'
                },
                borderRadius: 5
            },
            {
                label: 'Sell',
                data: data.sellData,
                backgroundColor: '#EA7034',
                barPercentage: 0.5,
                datalabels: {
                    align: 'center',
                    anchor: 'center'
                },
                borderRadius: 5
            },
            {
                label: 'Hold',
                data: data.holdData,
                backgroundColor: '#FFD747',
                barPercentage: 0.5,
                datalabels: {
                    align: 'center',
                    anchor: 'center'
                },
                borderRadius: 5
            },
            {
                label: 'Buy',
                data: data.buyData,
                backgroundColor: '#81A949',
                barPercentage: 0.5,
                datalabels: {
                    align: 'center',
                    anchor: 'center'
                },
                borderRadius: 5
            },
            {
                label: 'Strong Buy',
                data: data.strongBuyData,
                backgroundColor: '#037B66',
                barPercentage: 0.5,
                datalabels: {
                    align: 'center',
                    anchor: 'center'
                },
                borderRadius: 5
            }
        ]
    }
    let delayed;
    const barOptions = {
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
        plugins: {
            title: {
                display: true,
                text: `Recommendations trend past ${data.strongBuyData.length} months`,
                font: {
                    size: 14,
                    weight: "bold"
                },
                color: "#A6ADBB"
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                position: 'bottom',
                labels: {
                    color: "#A6ADBB"
                }
            },
            datalabels: {
                color: 'rgb(38,38,38)',
                display: function (context) {
                    return context.dataset.data[context.dataIndex] > (maxRec / 10 + 1);
                },
                font: {
                    weight: 'bold',
                    size: 14,
                },
                formatter: Math.round
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                ticks: { color: '#A6ADBB' }
            },
            y: {
                stacked: true,
                ticks: { color: '#A6ADBB' }
            },
        },
    };
    
    return (
        <div className="my-analysis bg-neutral-800 border border-neutral-700 rounded p-4">
            <h3 className="font-semibold text-white mb-3">{t('stock.analyst_recommendations.Analyst Recommendations')}</h3>
            <div className='hidden sm:block relative w-full h-full'>
                <Bar className=' h-full' data={barData} options={barOptions} />
            </div>
            <div className='sm:hidden block relative w-full h-full'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Ratings</th>
                            {
                                barData.labels.map(label => (
                                    <th key={label}>{label}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Strong Buy</th>
                            <td>{barData.datasets[4].data[0]}</td>
                            <td>{barData.datasets[4].data[1]}</td>
                            <td>{barData.datasets[4].data[2]}</td>
                            <td>{barData.datasets[4].data[3]}</td>
                        </tr>
                        <tr>
                            <th>Buy</th>
                            <td>{barData.datasets[3].data[0]}</td>
                            <td>{barData.datasets[3].data[1]}</td>
                            <td>{barData.datasets[3].data[2]}</td>
                            <td>{barData.datasets[3].data[3]}</td>
                        </tr>
                        <tr>
                            <th>Hold</th>
                            <td>{barData.datasets[2].data[0]}</td>
                            <td>{barData.datasets[2].data[1]}</td>
                            <td>{barData.datasets[2].data[2]}</td>
                            <td>{barData.datasets[2].data[3]}</td>
                        </tr>
                        <tr>
                            <th>Sell</th>
                            <td>{barData.datasets[1].data[0]}</td>
                            <td>{barData.datasets[1].data[1]}</td>
                            <td>{barData.datasets[1].data[2]}</td>
                            <td>{barData.datasets[1].data[3]}</td>
                        </tr>
                        <tr>
                            <th>Strong Sell</th>
                            <td>{barData.datasets[0].data[0]}</td>
                            <td>{barData.datasets[0].data[1]}</td>
                            <td>{barData.datasets[0].data[2]}</td>
                            <td>{barData.datasets[0].data[3]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AnalystRec