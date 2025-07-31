const { messageText } = require("../../helpers/message")

const messageAnalyzeSheet = async (ctx, sheetInfo) => {
    let message = `<b>📄 Sheet Analysis</b>\n`
    message += `<b>Total Sheets:</b> ${sheetInfo.totalSheets}\n\n`

    sheetInfo.sheets.forEach((sheet, index) => {
        message += `<b>Sheet ${index + 1}:</b> ${sheet.name}\n`
        message += `Rows: ${sheet.rowCount}, Columns: ${sheet.colCount}\n\n`
    })

    messageText(ctx,message)
}

module.exports = {
    messageAnalyzeSheet
}
