const { Telegraf, Markup, session } = require('telegraf')
const messageHandler = require('./modules/message')
const propertyHandler = require('./modules/property_dataset/handler')
const propertyMessage = require('./modules/property_dataset/message')
const analyzeHandler = require('./modules/analyze_dataset/handler')
const analyzeMessage = require('./modules/analyze_dataset/message')
const summaryHandler = require('./modules/summary_dataset/handler')
const summaryMessage = require('./modules/summary_dataset/message')
const visualizeHandler = require('./modules/visualize_dataset/handler')
const { menuOptions } = require('./configs/const')
const fs = require('fs')

// const configFile = fs.readFileSync('./configs/telegram.json', 'utf8')
const configFile = fs.readFileSync('./configs/telegram_stage.json', 'utf8')
const conf = JSON.parse(configFile)

// Helpers

// Modules

const bot = new Telegraf(conf.TOKEN)
bot.use(session())

bot.start((ctx) => {
    ctx.reply(`Please choose an option in Menu:`, 
        Markup.keyboard(menuOptions.map(option => [option])).resize()
    )
})

bot.on('message', async (ctx) => {
    if (!ctx.session) ctx.session = {}

    if (ctx.message.text && ctx.message.text.startsWith("/")) {
        await messageHandler.messageCommandMenu(ctx)
    } else if (ctx.message.document || ctx.message.photo || ctx.message.video) {
        const fileInfo = await propertyHandler.handlerFileProperty(ctx)
        if (fileInfo) propertyMessage.messageProperty(ctx, fileInfo)

        // Excel Analyze
        const analyzeSheetInfo = await analyzeHandler.handlerAnalyzeSheet(ctx, fileInfo)
        if (analyzeSheetInfo) analyzeMessage.messageAnalyzeSheet(ctx, analyzeSheetInfo)

        // Excel Summary
        const summaryContextTotal = await summaryHandler.handlerSummaryContextTotal(ctx, fileInfo)
        if (summaryContextTotal) summaryMessage.messageSummaryContextTotal(ctx, summaryContextTotal)

        // Excel Visualization
        await visualizeHandler.visualizeSummaryHandler(ctx, fileInfo)
    } else {
        ctx.reply("Unsupported message type. Please send a command or a file")
    }
})

bot.launch().then(() => {
    console.log('Bot started')
}).catch((err) => {
    console.error('Error starting bot:', err)
})
