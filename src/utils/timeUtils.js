const getCurrentConvertTime = edtOffset => {
    let now = new Date()
    let utc = now.getTime() + (now.getTimezoneOffset() * 60000)
    let edt = new Date(utc + (3600000 * edtOffset))

    return edt
}

export const getCurrentEDTTime = () => {
    return getCurrentConvertTime(-4)
}

export const dateToString = date => {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day}/${hours}-${minutes}-${seconds}`
}

const getHour = date => {
    const hours = ('0' + date.getHours()).slice(-2);
    return hours
}

const getMinute = date => {
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return minutes
}

export const getTradingDay = date => {
    const day = date.getDay()
    if (day === 0) {
        return 'Sunday'
    } else if (day === 1) {
        return 'Monday'
    }
    else if (day === 6) {
        return 'Saturday'
    }
    return 'Weekday'
}

export const getTradingHour = (date, startHour, startMin, endHour, endMin) => {
    const hour = getHour(date)
    const min = getMinute(date)

    if (hour < startHour || (hour == startHour && min < startMin)) {
        return "pre"
    }

    if (hour > endHour || (hour == endHour && min > endMin)) {
        return "post"
    }

    return "now"
}

// 0 Saturday
// 1 Sunday
// 2 pre market
// 3 trading time
// 4 post market

// US Market 9:30-16:00 EDT
export const getTradingTime = markets => {
    if (markets === "US") {
        const edt = getCurrentEDTTime()

        const day = getTradingDay(edt)
        const hour = getTradingHour(edt, 9, 30, 16, 0)

        return {
            day: day,
            hour: hour
        }
    }
    return {}
}