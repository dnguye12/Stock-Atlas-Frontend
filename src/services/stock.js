import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor';

const baseUrl = import.meta.env.VITE_API_URL
const chartUrl = import.meta.env.VITE_CHART_API_URL
const dailyUrl = import.meta.env.VITE_DAILY_API_URL
const quoteUrl = import.meta.env.VITE_QUOTE_API_URL
const insightsUrl = import.meta.env.VITE_INSIGHTS_API_URL
const optionsUrl = import.meta.env.VITE_OPTIONS_API_URL

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

export const getYahooDividendHistory = async (input_ticker) => {
    let query = baseUrl + chartUrl

    query += `/${input_ticker}/div`
    const request = await dailyAxios.get(query)
    const helper = [...request.data.events.dividends]
    return helper
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

export const getYahooQuote = async (ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getStockLogo = async (ticker) => {
    let query = baseUrl + quoteUrl + `/logo/${ticker}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return ''
        }
        console.log(error)
    }
}

export const getYahooQuoteSummary = async (ticker, modules) => {
    let query = baseUrl + quoteUrl + `/summary/${ticker}/`

    modules.forEach((module, index) => {
        if (index === 0) {
            query += `${module}`
        } else {
            query += `&${module}`
        }
    })

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooRecommendationBySymbol = async (ticker) => {
    let query = baseUrl + quoteUrl + `/recommendationsBySymbol/${ticker}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooSearch = async (input) => {
    let query = baseUrl + quoteUrl + `/search/${input}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooInsights = async (ticker, count = 10) => {
    let query = baseUrl + insightsUrl + `/${ticker}/${count}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooNews = async (ticker, count = 10) => {
    let query = baseUrl + quoteUrl + `/news/${ticker}/${count}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooESG = async (ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/esg`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooIncomeAnnual = async (ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/income-annual`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooIncomeQuarter = async (ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/income-quarterly`
    
    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooBalanceSheetAnnual = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/balance-sheet-annual`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooBalanceSheetQuarter = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/balance-sheet-quarterly`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooCashFlowAnnual = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/cash-flow-annual`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooCashFlowQuarter = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/cash-flow-quarterly`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooRatiosAnnual = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/ratios-annual`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooRatiosQuarterly = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/ratios-quarterly`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooAltmanScore = async(ticker) => {
    let query = baseUrl + quoteUrl + `/${ticker}/altman-score`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooOptions = async(ticker) => {
    let query = baseUrl + optionsUrl + `/${ticker}`

    const request = await dailyAxios.get(query)
    return request.data
}

export const getYahooMostShortedStocks = async(count = 5) => {
    let query = baseUrl + dailyUrl + `/most-shorted-stocks/${count}`

    const request = await dailyAxios.get(query)
    return request.data
}