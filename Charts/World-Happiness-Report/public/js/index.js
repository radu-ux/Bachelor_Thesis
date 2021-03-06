import { MultiLineChart } from './multi_linechart.js'

function main() {
    const multiLineChart = new MultiLineChart(['./data/2015.csv', './data/2016.csv', './data/2017.csv', './data/2018.csv', './data/2019.csv']);
    multiLineChart.createChart();
}

main()

