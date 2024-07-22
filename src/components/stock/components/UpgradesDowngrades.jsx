/* eslint-disable react/prop-types */
const convertAction = (action) => {
    switch (action) {
        case 'main':
            return "Maintain"
        case 'reit':
            return "Reiterate"
        case 'down':
            return "Downgrade"
        case 'init':
            return "Initiated"
        case 'up':
            return "Upgrade"
        default:
            return action
    }
}

const gradeNumber = (action) => {
    switch (action) {
        case 'main':
        case 'reit':
            return 0
        case 'down':
            return -1
        case 'up':
            return 1
        default:
            return 0
    }
}

const UpgradesDowngrades = ({ stockSummary }) => {

    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    let helper1 = 0
    let helper2 = []

    while (helper2.length < 10) {
        const grade = stockSummary.upgradeDowngradeHistory.history[helper1]
        helper2.push(grade)
        helper1++
    }
    return (
        <div className="my-analysis bg-neutral-800 border border-neutral-700 rounded p-4">
            <h3 className="font-semibold text-white mb-3">Upgrades & Downgrades</h3>
            <div className="w-full ">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Firm</th>
                            <th>Action</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            helper2.map((grade, i) => {
                                return (
                                    <tr key={i} style={

                                        gradeNumber(grade.action) !== 0
                                            ? gradeNumber(grade.action) === -1
                                                ? { backgroundColor: "rgba(214, 10, 34, 0.5)" }
                                                : { backgroundColor: "rgba(3, 123, 102, 0.5)" }
                                            : {}
                                    }>
                                        <td>{grade.epochGradeDate.split('T')[0]}</td>
                                        <td>{grade.firm}</td>
                                        <td>{convertAction(grade.action)}</td>
                                        <td>{grade.fromGrade} {`->`} {grade.toGrade}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UpgradesDowngrades