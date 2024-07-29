import moment from 'moment';

export const process_div = (data, summary) => {
    let result = {}
    let frequency, helper1, helper2;
    let yearly_data = []
    if (data.length >= 2) {
        helper1 = moment(data[data.length - 1].date)
        helper2 = moment(data[data.length - 2].date)

        const diff = helper1.diff(helper2, 'days')
        if (diff >= 351) {
            frequency = "yearly"
        } else if (diff >= 168) {
            frequency = "semi"
        } else if (diff >= 76) {
            frequency = "quarterly"
        } else {
            frequency = "monthly"
        }

        result.frequency = frequency

        let current_year = {
            amount: 0,
            date: helper1
        }
        let current_streak = 0
        let grow_streak = 0
        let cut_count = 0

        for (let i = data.length - 1; i >= 0; i--) {
            helper1 = data[i]
            helper1.date = moment(helper1.date)
            if (current_year.date.isSame(helper1.date, 'year')) {
                current_year.amount += helper1.amount
            } else {
                if (yearly_data.length > 1) {
                    if (yearly_data[0].amount < current_year.amount) {
                        cut_count++
                    }
                    if (cut_count === 0 && yearly_data[0].amount >= current_year.amount) {
                        grow_streak++
                    }
                }
                yearly_data.unshift({ ...current_year })
                helper2 = current_year.date.diff(helper1.date, 'days')
                if (helper2 >= 380) {
                    cut_count++
                }
                if (cut_count === 0) {
                    current_streak++
                }
                current_year.date = helper1.date
                current_year.amount = helper1.amount

            }
        }
        yearly_data.unshift({ ...current_year })
        yearly_data[yearly_data.length - 1].amount = summary.summaryDetail.dividendRate
        result.current_streak = current_streak
        result.grow_streak = grow_streak
        result.cut_count = cut_count
    } else {
        if (data.length === 1) {
            data[0].date = moment(data[0].date)
            yearly_data.push({ amount: data[0].amount, date: data[0].date })
        }
    }
    result.yearly_data = yearly_data

    let growth_1y, growth_5y, growth_20y, growth_total
    if (yearly_data.length >= 3) {
        helper1 = yearly_data[yearly_data.length - 1].amount
        helper2 = yearly_data[1].amount
        growth_total = (helper1 / helper2 * 100 - 100) / (yearly_data.length - 1)
        result.growth_total = growth_total
    }
    if (yearly_data.length >= 3) {
        helper1 = yearly_data[yearly_data.length - 1].amount
        helper2 = yearly_data[yearly_data.length - 2].amount
        growth_1y = helper1 / helper2 * 100 - 100
        result.growth_1y = growth_1y
    }
    if (yearly_data.length >= 6) {
        helper2 = yearly_data[yearly_data.length - 5].amount
        growth_5y = (helper1 / helper2 * 100 - 100) / 5
        result.growth_5y = growth_5y
    }
    if (yearly_data.length >= 21) {
        helper2 = yearly_data[yearly_data.length - 20].amount
        growth_20y = (helper1 / helper2 * 100 - 100) / 20
        result.growth_20y = growth_20y
    }

    return result
}