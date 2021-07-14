import { DataParser } from "../shared/data_parser";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const chartSizings = { 
    width: 960,
    height: 500,
    margin: {top:200, right:10, bottom:20, left:0}
}

class COVID19CasesAmerica {
    constructor(fileNames) {
        this.fileNames = fileNames;
        this.data = {states:new Map(), dates:[]};
        this.max = 0;
        this.index =  0;
    }

    renderChartComponents() {
        console.log(this.data.dates)
        d3.json("http://localhost:3001/covid-19-cases-america-counties-albers")
        .then(us => { 
            const states_map = new Map(topojson.feature(us, us.objects.states).features.map(d => [d.properties.name.slice(0,2).toUpperCase(), d]));
            console.log(topojson.feature(us, us.objects.states).features);
            d3.json("http://localhost:3001/covid-19-cases-america-out")
            .then(json_data => {
                us.objects.states.geometries.forEach(s => {
                    s.properties.id = json_data[s.properties.name];
                });
                const progressBarWidth = this.data.dates.length + 22;
                const svg = d3.select("#americaCOVIDCasesMapChart")
                              .append("svg")
                              .attr("viewBox", `0 0 1000 600`)
                              .attr("width", chartSizings.width)
                              .attr("height", chartSizings.height);
                
                const progressBarSvg = d3.select("#progressBar")
                                         .append("svg")
                                         .attr("viewBox", "0 0 700 70")
                                         .attr("width", 600)
                                         .attr("height", 50);

                const progressBar = progressBarSvg.append("rect")
                                                  .attr("fill", "#D3D3D3")
                                                  .attr("height", 15)
                                                  .attr("width", progressBarWidth)
                                                  .attr("rx", 5)
                                                  .attr("ry", 5)
                                                  .attr("x", chartSizings.margin.left)
                                                  .attr("y", 10)
                                                  .attr("stroke-width", 0.5)
                                                  .attr("stroke", "black")
                                                  .attr("filter", "drop-shadow( 0px 2px 1px rgba(0, 0, 0, .7))");
               
                const progressIndicator = progressBarSvg.append("rect")
                                                        .attr("fill", "white")
                                                        .attr("width", 20)
                                                        .attr("height", 30)
                                                        .attr("rx", 5)
                                                        .attr("ry", 5)
                                                        .attr("x", chartSizings.margin.left)
                                                        .attr("y", 2)
                                                        .attr("stroke-width", 0.5)
                                                        .attr("stroke", "black")
                                                        .attr("filter", "drop-shadow( 0px 2px 1px rgba(0, 0, 0, .7))");

                const dateIndicator = progressBarSvg.append("text")
                                                    .attr("x", 300)
                                                    .attr("y", 30)
                                                    .attr("font-family", "sans-serif")
                                                    .attr("font-size", 30)
                                                    .text(`${this.data.dates[this.index]}`)

                const path = d3.geoPath()

                const colorInterpolator = d3.interpolate("wheat", "red")
                const color = d3.quantize(colorInterpolator, this.max + 100)
                const us_map = svg.append("g")
                                .selectAll("path")
                                .data(topojson.feature(us, us.objects.states).features)
                                .join("path")
                                .attr("fill", (d,i) => {
                                        const val = this.data.states.get(d.properties.id);
                                        return color[val[this.index]];
                                    })
                                .attr("class", "state")
                                .attr("stroke", "white")
                                .attr("d", path);

                const animation = d3.interval(() => {
                    if(this.index == 266) {
                        animation.stop();
                        console.log("animation stopped");

                    }
                    progressIndicator.attr("x", chartSizings.margin.left + this.index+1);
                    if(this.index < 266)
                        dateIndicator.text(`${this.data.dates[this.index]}`)
                    this.index += 1;
                    d3.selectAll(".state")
                    .transition()
                    .duration(50)
                    .attr("fill", d => {
                        const val = this.data.states.get(d.properties.id)
                        const color_val = color[val[this.index]];
                        if(color_val !== undefined) 
                            return color_val;
                        else 
                            return color[val[265]];
                    })
                }, 100)
            })
        })
        
    }

    processData = async _ => {
        let data = []
        for(const file of this.fileNames) {
            const parser = new DataParser(file);
            const parsedData = await parser.parseData(d => {
                return {
                    state: d['state'],
                    cases: +d['positive'],
                    date: d['date']
                }  
            })
            data.push(parsedData);
        }
        return data;
    }

    setData(dataset) {
        const states = Array.from(d3.group(dataset, d => d.state), ([state, value]) => ({state, value}))
        const dates = Array.from(d3.group(dataset, d => d.date), ([date, value]) => ({date, value}));
        var formatTime = d3.timeFormat("%B %d, %Y");
        const min = d3.min(states, s => s.value.length)
        
        dates.sort((a, b) => d3.ascending(a.date, b.date));
        for(let i=0; i<min; i++) {
            var date = Array.from(dates[i].date);
            console.log(date);
            date.splice(4, 0, "-");
            date.splice(7, 0, "-")
            this.data.dates.push(formatTime(new Date(date.reduce((a, b) => a + b))));
        };
        states.forEach(s => {
            if(s.value.length > min) {
                s.value.splice(s.value.length-min-1, s.value.length-min)
            }
        })
        states.forEach(s => {
            var cases = [];
            s.value.forEach(val => {
                cases.push(val.cases);;
            }); 
            s.value = cases.sort((a, b) => d3.ascending(a, b));
        })

        var maxArr = [];
        states.forEach(s => {
            maxArr.push(d3.max(s.value))
        });
        this.max = d3.max(maxArr);
        this.data.states = new Map(d3.map(states, ({state, value}) => ([state, value])));
        console.log(this.data.states);
    }

    createChart() {
        this.processData().then(parsedData => {
            for(const item of parsedData) {
                this.setData(item);
            }
            this.renderChartComponents();
        });
    }
}

export { COVID19CasesAmerica };