const { ucEachWord } = require("../../helpers/converter")
const { handlerSummaryContextTotal } = require("../summary_dataset/handler")

const visualizeSummaryHandler = async (ctx, fileInfo) => {
    const sheetDetails = await handlerSummaryContextTotal(ctx, fileInfo)

    for (const sheet of sheetDetails) {
        for (const col of sheet.columns) {
            if (col.mostContext.length === 0) continue

            const labels = col.mostContext.map(item => item.context)
            const values = col.mostContext.map(item => item.total)

            const chartConfig = {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        {
                            label: `Comparison of ${ucEachWord(col.columnName.replaceAll('_',' '))}`,
                            data: values
                        }
                    ]
                },
                options: {
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: `${sheet.sheetName} - ${col.columnName}` }
                    }
                }
            };

            // Generate chart Quickchart
            const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
                JSON.stringify(chartConfig)
            )}`;

            // Send chart image & message
            await ctx.replyWithPhoto(
                { url: chartUrl },
                { caption: `📊 <b>Visualize ${sheet.sheetName} - Col : ${ucEachWord(col.columnName.replaceAll('_',' '))}</b>`, parse_mode: 'HTML' }
            );
        }
    }
};

module.exports = {
    visualizeSummaryHandler
};
