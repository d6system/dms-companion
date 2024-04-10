module.exports = {
    name: "CreateChart",
    description: "Generates a customizable chart using Chart.js",
    category: ".Daily's",
    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "labels",
            name: "Chart Items",
            description: "Labels for the chart (e.g., ['January', 'February', 'March'])",
            types: ["list"],
            required: true
        },
        {
            id: "data",
            name: "Item Data",
            description: "Data for the chart (e.g., [10, 20, 30] Must be in the same order as the Chart Items)\nFor example\n\rjan, feb, mars,\n01, 02, 03",
            types: ["list"],
            required: true
        }
    ],
    options: [
        {
            id: "title",
            name: "Chart Title",
            description: "The Chart title",
            type: "TEXT"
        },
        {
            id: "type",
            name: "Type",
            description: "Type of the chart",
            type: "select",
            required: true,
            options: {
                'default': 'Select Type',
                'bar': 'Bar',
                'line': 'Line',
                'pie': 'Pie',
                'doughnut': 'Doughnut',
                'radar': 'Radar',
                'polarArea': 'Polar Area'
            }
        }
    ],
    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "image",
            name: "image",
            description: "Generated chart image",
            types: ["object"],
        }
    ],
    async code(cache) {
        const title = this.GetOptionValue("title", cache);
        const type = this.GetOptionValue("type", cache);
        const data = this.GetInputValue("data", cache);
        const labels = this.GetInputValue("labels", cache);
        const font = this.GetOptionValue("font", cache);
        
        
        await this.require('chart.js@3');
        const Chart = require('chart.js/auto');
        const Canvas = require('canvas');
        const autocolors = await this.require('chartjs-plugin-autocolors');
        const canvas = Canvas.createCanvas(700, 400);
        const ctx = canvas.getContext('2d');

        Chart.register(autocolors);

        const chart = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                }]
            },
            options: {
                scales: {
                    y: {
                        display: (type === 'bar' || type === 'line') ? true: false,
                        beginAtZero: false,
                        ticks: {
                            color: 'white'
                        },
                    },
                    x: {
                        display: (type === 'bar' || type === 'line') ? true: false,
                        ticks: {
                            color: 'white'
                        }
                    }
                },
                elements: {
                    color: 'white'
                },
                plugins: {
                    autocolors: {
                        mode: 'data',
                        generateColors: (chart, count) => {
                            const colors = [];
                            const baseColor = 0;
                            const hueStep = 360 / count;
                            for (let i = 0; i < count; i++) {
                                const hue = (baseColor + i * hueStep) % 360;
                                colors.push(`hsl(${hue}, 100%, 50%)`);
                            }
                            return colors;
                        }
                    },
                    legend: {
                        labels: {
                            color: 'white',
                            font: {
                                size: 20
                            }              
                        }
                    }
                },
                
            }
        });

        const chartImage = chart.canvas.toBuffer();

        this.StoreOutputValue(chartImage, "image", cache);
        this.RunNextBlock("action", cache);
    }
};