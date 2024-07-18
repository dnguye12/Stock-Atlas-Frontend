export const truncateText = (text, length = 20) => {
    if(text.length > length) {
        return text.slice(0, length) + '...'
    }
    return text
}