const { ucEachWord } = require("../../helpers/converter")
const { handlerSummaryContextTotal } = require("../summary_dataset/handler")
const PptxGenJS = require("pptxgenjs");
const axios = require("axios");
const fs = require("fs");

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

const visualizePeriodicLineChartHandler = async (ctx, type, sheetDetails) => {
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

const visualizeBarChartToPptxHandler = async (ctx, fileInfo) => {
    const sheetDetails = await handlerSummaryContextTotal(ctx, fileInfo)

    let pptx = new PptxGenJS()
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

            // Fetch image buffer
            const res = await axios.get(chartUrl, { responseType: "arraybuffer" })
            const imgBase64 = Buffer.from(res.data, "binary").toString("base64")

            // Add slide
            let slide = pptx.addSlide()
            slide.addText(`${sheet.sheetName} - ${col.columnName}`, {
                x: 0.5,
                y: 0.3,
                fontSize: 18,
                bold: true
            });
            slide.addImage({
                data: "data:image/png;base64," + imgBase64, x: 0.5, y: 1, w: 8, h: 4.5
            });
        }
    }

    // Save PPTX 
    const filename = `charts_${Date.now()}.pptx`
    await pptx.writeFile({ fileName: filename })

    // Send pptx & clean up
    await ctx.replyWithDocument({ source: filename })
    fs.unlinkSync(filename)
};

module.exports = {
    visualizeBarChartHandler, visualizePieChartHandler, visualizePeriodicLineChartHandler, visualizeBarChartToPptxHandler
};
