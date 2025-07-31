const { Telegraf, Markup, session } = require('telegraf')
const fs = require('fs')

// const configFile = fs.readFileSync('./configs/telegram.json', 'utf8')
const configFile = fs.readFileSync('./configs/telegram_stage.json', 'utf8')
const conf = JSON.parse(configFile)

// Helpers

// Modules

const bot = new Telegraf(conf.TOKEN)
bot.use(session())

const menuOptions = [
    '/Show Export History',
];

bot.start( async (ctx) => {
    const userId = ctx.from.id
    ctx.reply(`Please choose an option in Menu:`, 
        Markup.keyboard(menuOptions.map(option => [option])).resize()
    );
});

bot.on('message', async (ctx) => {
    // Respond / Presenting data
    const present_respond = ['Showing','Let me show you the',"Here's the","I got the","See this","I gathered","I found"]

    const telegramId = ctx.from.id

    if (!ctx.session) ctx.session = {}

    if (ctx.message.text) {
        const message = ctx.message.text
        const idx_rand_present = generateRandomNumber(1,present_respond.length)

        if(message[0] == "/"){
            const index = menuOptions.indexOf(message)

            switch (index) {
                case 0: // Show Export History
                    // ....
                    break

                default:
                    ctx.reply(`Sorry I'dont know your command`)
                    break
            }
        } else {
            ctx.reply(`Unknown command. Please try again`)
        }
    } 
});

bot.launch().then(() => {
    console.log('Bot started')
}).catch((err) => {
    console.error('Error starting bot:', err)
});
