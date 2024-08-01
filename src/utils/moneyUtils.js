export const formatMarketCap = (marketCap, curr = 'USD') => {
    if (isNaN(marketCap)) {
        return "invalid"
    }

    let formattedCap = "";
    if (Math.abs(marketCap) >= 1e12) {
        formattedCap = `${currToSymbol(curr)}${(marketCap / 1e12).toFixed(2)}T`;
    }
    else if (Math.abs(marketCap) >= 1e9) {
        formattedCap = `${currToSymbol(curr)}${(marketCap / 1e9).toFixed(2)}B`;
    } else if (Math.abs(marketCap) >= 1e6) {
        formattedCap = `${currToSymbol(curr)}${(marketCap / 1e6).toFixed(2)}M`;
    } else if (Math.abs(marketCap) >= 1000) {
        formattedCap = `${currToSymbol(curr)}${(marketCap / 1000).toFixed(2)}k`;
    }
    else {
        formattedCap = `${currToSymbol(curr)}${marketCap.toFixed(2)}`;
    }

    return formattedCap;
}

export const currToSymbol = (curr) => {
    switch(curr) {
        case 'USD':
            return '$'
        default:
            return curr
    }
}