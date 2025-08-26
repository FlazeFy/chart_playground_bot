const axios = require('axios')
const XLSX = require('xlsx')
const { validateExcel } = require('../../helpers/validator')

const handlerSummaryContextTotal = async (ctx,fileInfo) => {
    validateExcel(ctx,fileInfo)
    const doc = ctx.message.document

    // Get Telegram file
    const fileLink = await ctx.telegram.getFileLink(doc)
    const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' })
    
    // Read Excel data
    const workbook = XLSX.read(response.data, { type: 'buffer' })

    // Extract sheet data
    const sheetDetails = workbook.SheetNames.map(sheetName => {
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) 

        const columnSummary = []

        if (data.length === 0) return { sheetName, columns: [] }

        const colCount = data[0].length
        const headerRow = data[0] // First row as header

        for (let colIndex = 0; colIndex < colCount; colIndex++) {
            const wordCount = {}

            for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
                const cell = data[rowIndex][colIndex]
                
                if (typeof cell === 'string') {
                    const normalized = cell.trim().toLowerCase()

                    // Skip empty string
                    if (!normalized) continue

                    // Skip if valid URL
                    const isUrl = /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(normalized)
                    if (isUrl) continue

                    // Skip if valid date
                    const parsedDate = Date.parse(normalized)
                    if (!isNaN(parsedDate)) continue

                    // Count if it's a valid non-numeric string
                    if (isNaN(normalized)) {
                        wordCount[normalized] = (wordCount[normalized] || 0) + 1
                    }
                }
            }

            const mostContext = Object.entries(wordCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 7)
                .map(([context, total]) => ({ context, total }))

            columnSummary.push({
                columnIndex: colIndex,
                columnName: headerRow[colIndex] || `Col : ${colIndex + 1}`,
                mostContext
            })
        }

        return {
            sheetName,
            columns: columnSummary
        }
    })

    return sheetDetails
}

const handlerSummaryColumnsPeriodicToMonthTotal = async (ctx, fileInfo) => {
    validateExcel(ctx, fileInfo)
    const doc = ctx.message.document

    // Get Telegram file
    const fileLink = await ctx.telegram.getFileLink(doc)
    const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' })

    // Read Excel workbook
    const workbook = XLSX.read(response.data, { type: 'buffer' })

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const sheetDetails = workbook.SheetNames.map(sheetName => {
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) 

        if (data.length === 0) return { sheetName, columns: [] }

        const colCount = data[0].length
        const headerRow = data[0]
        const columnSummary = []

        for (let colIndex = 0; colIndex < colCount; colIndex++) {
            const values = []
            let validDateCount = 0
            let nonEmptyCount = 0

            for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
                const cell = data[rowIndex][colIndex]
                if (!cell) continue
                nonEmptyCount++

                let parsedDate = null

                if (cell instanceof Date) {
                    parsedDate = cell
                } else if (typeof cell === "string") {
                    const d = new Date(cell)
                    if (!isNaN(d)) parsedDate = d
                } else if (typeof cell === "number") {
                    // Only treat as Excel date if it's large enough (after 1970)
                    if (cell >= 25569) { // Excel serial for 1970-01-01
                        const parsed = XLSX.SSF.parse_date_code(cell)
                        if (parsed && parsed.y >= 1900 && parsed.y <= 2100) {
                            parsedDate = new Date(parsed.y, parsed.m - 1, parsed.d, parsed.H, parsed.M, parsed.S)
                        }
                    }
                }

                if (parsedDate) {
                    validDateCount++
                    values.push(parsedDate)
                }
            }

            // Keep column only if all non-empty values were valid dates
            if (nonEmptyCount > 0 && validDateCount === nonEmptyCount) {
                const monthCount = {}
                monthNames.forEach(m => { monthCount[m] = 0 })

                values.forEach(d => {
                    const monthName = d.toLocaleString("en-US", { month: "short" })
                    monthCount[monthName]++
                })

                const mostContext = monthNames.map(m => ({
                    context: m,
                    total: monthCount[m]
                }))

                columnSummary.push({
                    columnIndex: colIndex,
                    columnName: headerRow[colIndex] || `Col : ${colIndex + 1}`,
                    mostContext
                })
            }
        }

        return { sheetName, columns: columnSummary }
    })

    return sheetDetails
}


module.exports = {
    handlerSummaryContextTotal, handlerSummaryColumnsPeriodicToMonthTotal
}
