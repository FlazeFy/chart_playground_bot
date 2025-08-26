const { ucEachWord } = require("../../helpers/converter")
const { handlerSummaryContextTotal, handlerSummaryColumnsPeriodicToMonthTotal } = require("../summary_dataset/handler")

const visualizeBarChartHandler = async (ctx, fileInfo) => {
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
                { caption: `📊 <b>(Bar Chart) Visualize ${sheet.sheetName} - Col : ${ucEachWord(col.columnName.replaceAll('_',' '))}</b>`, parse_mode: 'HTML' }
            );
        }
    }
};

const visualizePieChartHandler = async (ctx, fileInfo) => {
    const sheetDetails = await handlerSummaryContextTotal(ctx, fileInfo)

    for (const sheet of sheetDetails) {
        for (const col of sheet.columns) {
            if (col.mostContext.length === 0 || col.mostContext.length > 5) continue

            const labels = col.mostContext.map(item => item.context)
            const values = col.mostContext.map(item => item.total)

            const chartConfig = {
                type: "pie",
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
                        datalabels: { color: "#FFFFFF" },
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
                { caption: `📊 <b>(Pie Chart) Visualize ${sheet.sheetName} - Col : ${ucEachWord(col.columnName.replaceAll('_',' '))}</b>`, parse_mode: 'HTML' }
            );
        }
    }
};

const visualizePeriodicLineChartHandler = async (ctx, fileInfo, type) => {
    const sheetDetails = await handlerSummaryColumnsPeriodicToMonthTotal(ctx, fileInfo)

    for (const sheet of sheetDetails) {
        for (const col of sheet.columns) {
            if (col.mostContext.length === 0) continue

            const labels = col.mostContext.map(item => item.context)
            const values = col.mostContext.map(item => item.total)

            const chartConfig = {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: `${type} total of ${ucEachWord(col.columnName.replaceAll('_',' '))}`,
                            data: values
                        }
                    ]
                },
                options: {
                    plugins: {
                        datalabels: { color: "#FFFFFF" },
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
                { caption: `📊 <b>(Line Chart) Visualize ${type} Total of ${sheet.sheetName} - Col : ${ucEachWord(col.columnName.replaceAll('_',' '))}</b>`, parse_mode: 'HTML' }
            );
        }
    }
};

module.exports = {
    visualizeBarChartHandler, visualizePieChartHandler, visualizePeriodicLineChartHandler
};
