export const truncateText = (text, length = 20) => {
    if(text.length > length) {
        return text.slice(0, length) + '...'
    }
    return text
}

export const capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}