import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL
const chartUrl = import.meta.env.VITE_CHART_API_URL
const dailyUrl = import.meta.env.VITE_DAILY_API_URL

export const getYahooChart = async (input_ticker, input_period1, input_period2, input_interval) => {
    let query = baseUrl + chartUrl;

    query += `/${input_ticker}/${input_period1}`;
    if (input_period2) {
        query += `/${input_period2}`;
    }
    if (input_interval) {
        query += `/${input_interval}`;
    }
    const request = await axios.get(query)
    return request.data
}

export const getYahooDailyGainers = async (count, region) => {
    let query = baseUrl + dailyUrl + '/gainers';

    if (count) {
        query += `/${count}`
    }
    if (region) {
        query += `/${region}`
    }
    const request = await axios.get(query)
    return request.data
}

export const getYahooDailyActives = async(count) => {
    let query = baseUrl + dailyUrl + '/active';

    if(count) {
        query += `/${count}`
    }
    const request = await axios.get(query)
    return request.data
}

export const getYahooTrending = async (count, region) => {
    let query = baseUrl + dailyUrl + '/trending';
    if (count) {
        query += `/${count}`
    }
    if (region) {
        query += `/${region}`
    }
    const request = await axios.get(query)
    return request.data
}