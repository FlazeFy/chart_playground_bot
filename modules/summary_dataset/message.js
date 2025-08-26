const { messageText } = require('../../helpers/message')

const messageSummaryContextTotal = async (ctx, resultAnalyze, title = ' ', find_type = '') => {
    let message = ''

    resultAnalyze.forEach(sheet => {
        message += `\n<b>📊 Summary${title}</b> ${sheet.sheetName}\n`

        if (sheet.columns.length === 0) {
            message += `No columns found\n`
        } else {
            sheet.columns.forEach((col, colIndex) => {
                message += `\n<b>📌 Col ${colIndex + 1} : ${col.columnName}</b>\n`

                if (col.mostContext.length === 0) {
                    message += `No ${find_type} words found\n`
                } else {
                    col.mostContext.forEach((item, index) => {
                        message += `${index + 1}. ${item.context} (${item.total})\n`
                    })
                }
            })
        }

        message += "\n======== || ===== || ========\n"
    })

    messageText(ctx, message)
}

module.exports = {
    messageSummaryContextTotal
}
