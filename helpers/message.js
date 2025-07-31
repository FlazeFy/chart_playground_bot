const messageText = (ctx,message) => {
    ctx.reply(message, { parse_mode: 'HTML' })
}

module.exports = {
    messageText
}