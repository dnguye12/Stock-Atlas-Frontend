export const truncateText = (text, length = 20) => {
    if (text.length > length) {
        return text.slice(0, length) + '...'
    }
    return text
}

export const capitalizeWord = (string) => {
    if (string.length > 1) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else if (string.length === 0) {
        return string.toUpperCase()
    }
}