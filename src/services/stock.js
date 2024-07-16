import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor';

const baseUrl = import.meta.env.VITE_API_URL
const chartUrl = import.meta.env.VITE_CHART_API_URL
const dailyUrl = import.meta.env.VITE_DAILY_API_URL
const quoteUrl = import.meta.env.VITE_QUOTE_API_URL

const chartAxios = setupCache(axios.create(), {
    ttl: 60000, // 1 minute cache for chart data
});

const dailyAxios = setupCache(axios.create(), {
    ttl: 3600000, // 1 hour cache for daily data
});

export const getYahooChart = async (input_ticker, input_period1, input_period2, input_interval) => {
    let query = baseUrl + chartUrl;

    query += `/${input_ticker}/${input_period1}`;
    if (input_period2) {
        query += `/${input_period2}`;
    }
    if (input_interval) {
        query += `/${input_interval}`;
    }
    const request = await chartAxios.get(query)
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
    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooDailyLosers = async (count) => {
    let query = baseUrl + dailyUrl + '/losers';

    if (count) {
        query += `/${count}`
    }

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooDailyActives = async (count) => {
    let query = baseUrl + dailyUrl + '/active';

    if (count) {
        query += `/${count}`
    }
    const request = await dailyAxios.get(query)
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
    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooQuote = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getStockLogo = async(ticker) => {
    let query = baseUrl + quoteUrl + `/logo/${ticker}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooQuoteSummary = async(ticker, modules) => {
    let query = baseUrl + quoteUrl + `/summary/${ticker}/`

    modules.forEach((module, index) => {
        if(index === 0) {
            query += `${module}`
        }else {
            query += `&${module}`
        }
    })

    const request = await dailyAxios.get(query)
    return request.data
}