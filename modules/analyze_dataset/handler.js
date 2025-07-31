const axios = require('axios')
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

const handlerAnalyzeSheet = async (ctx, fileInfo) => {
    const doc = ctx.message.document
    if (!doc) {
        ctx.reply("Unsupported file type")
        return
    }

    const fileName = fileInfo.name
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls')
    ctx.session.fileInfo = fileInfo

    if (!isExcel) {
        ctx.reply("The uploaded file is not an Excel file (.xlsx or .xls)")
        return
    }

    // Get Telegram file
    const fileLink = await ctx.telegram.getFileLink(doc)
    const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' })
    
    // Read Excel data
    const workbook = XLSX.read(response.data, { type: 'buffer' })

    // Extract sheet data
    const sheetDetails = workbook.SheetNames.map(sheetName => {
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) 

        const rowCount = data.length
        const colCount = data[0] ? data[0].length : 0

        return {
            name: sheetName,
            rowCount,
            colCount,
        }
    })

    const result = {
        totalSheets: workbook.SheetNames.length,
        sheets: sheetDetails,
    }

    return result
}

module.exports = {
    handlerAnalyzeSheet,
}
