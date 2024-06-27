import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL
const chartUrl = import.meta.env.VITE_CHART_API_URL

export const getYahooChart = async (input_ticker, input_period1, input_period2, input_interval) => {
    let query = baseUrl + chartUrl;

    query += `/${input_ticker}/${input_period1}`;
    if(input_period2) {
        query += `/${input_period2}`;
    }
    if(input_interval) {
        query += `/${input_interval}`;
    }
    const request = await axios.get(query)
    return request.data
}
