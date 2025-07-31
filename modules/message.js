const { generateRandomNumber } = require("../helpers/generator")
const { menuOptions } = require("../configs/const")

module.exports = {
    menuOptions,

    messageCommandMenu: async function (ctx) {
        const present_respond = ['Showing', 'Let me show you the', "Here's the", "I got the", "See this", "I gathered", "I found"]
        const message = ctx.message.text
        const idx_rand_present = generateRandomNumber(1, present_respond.length)
        const index = menuOptions.indexOf(message)

        switch (index) {
            case 0:
                ctx.reply(`${present_respond[idx_rand_present]} export history...`)
                break
            default:
                ctx.reply("Sorry, I don't know your command")
        }
    },
}
