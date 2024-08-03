export const formatNumber = (n) => {
    let formattedCap = "";

    if(isNaN(n)) {
        return "-"
    }

    if (Math.abs(n) >= 1e9) {
        formattedCap = `${(n / 1e9).toFixed(0)}B`;
    } else if (Math.abs(n) >= 1e6) {
        formattedCap = `${(n / 1e6).toFixed(0)}M`;
    } else if (Math.abs(n) >= 1000) {
        formattedCap = `${(n / 1000).toFixed(0)}k`
    }
    else {
        formattedCap = `${n}`;
    }

    return formattedCap;
}

export const myToLocaleString = (n) => {
    return n.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
}

export const percentageDiff = (n1, n2) => {
    return ((n2 / n1) * 100 - 100)
}