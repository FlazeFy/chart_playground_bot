const { messageText } = require('../../helpers/message')

const messageProperty = async (ctx, fileInfo) => {
    const message = `<b>📄 File Info</b>\n` +
        `<b>Name :</b> ${fileInfo.name}\n` +
        `<b>Size :</b> ${fileInfo.size}\n` +
        `<b>Type :</b> ${fileInfo.mime_type}`

    messageText(ctx,message)
}


module.exports = {
    messageProperty
}
