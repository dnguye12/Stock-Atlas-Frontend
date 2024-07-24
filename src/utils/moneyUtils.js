export const formatMarketCap = (marketCap) => {
    if (isNaN(marketCap)) {
        return "invalid"
    }

    let formattedCap = "";
    if (Math.abs(marketCap) >= 1e12) {
        formattedCap = `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    else if (Math.abs(marketCap) >= 1e9) {
        formattedCap = `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (Math.abs(marketCap) >= 1e6) {
        formattedCap = `$${(marketCap / 1e6).toFixed(2)}M`;
    } else if (Math.abs(marketCap) >= 1000) {
        formattedCap = `$${(marketCap / 1000).toFixed(2)}k`;
    }
    else {
        formattedCap = `$${marketCap.toFixed(2)}`;
    }

    return formattedCap;
}