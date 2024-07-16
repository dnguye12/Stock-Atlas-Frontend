export const formatNumber = (n) => {
    let formattedCap = "";

    if (Math.abs(n) >= 1e9) {
        formattedCap = `${(n / 1e9)}B`;
    } else if (Math.abs(n) >= 1e6) {
        formattedCap = `${(n / 1e6)}M`;
    } else if (Math.abs(n) >= 1000) {
        formattedCap = `${(n / 1000)}k`
    }
    else {
        formattedCap = `${n}`;
    }

    return formattedCap;
}