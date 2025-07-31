const validateExcel = (ctx,fileInfo) => {
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
}

module.exports = {
    validateExcel
}