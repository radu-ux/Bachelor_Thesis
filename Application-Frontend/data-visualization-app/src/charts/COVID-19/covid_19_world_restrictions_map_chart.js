import {DataParser} from "../shared/data_parser.js";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const chartSizings = { 
    width: 700,
    height: 500,
    margin: {top:200, right:10, bottom:20, left:70}
}

class DataOperation {
    static getMinMaxValueOfDate(currentCountries) {
        var minValue = 1000;
        var maxValue = 0;
        currentCountries.forEach(c => {
            const parksStatistic = parseInt(c[0].parks,10);
            if(parksStatistic < minValue) {
                minValue = parksStatistic;
            } else if(parksStatistic > maxValue) {
                maxValue = parksStatistic;
            }
        });
        return {min: minValue, max: maxValue};
    }

    static countryIdExists(countries_dataset, id) {
        const country = countries_dataset.filter(d => d.id === id);
        if(country.length === 0)
            return undefined;
        return country[0].letter_code;
    }

    static splitArray(arr, size) {
        const partitionSize = Math.floor(size/3);
        var result = [];

        for(let i=0; i<partitionSize; i++) {
            result.push(arr[i]);
        }
        
        for(let i=Math.floor(arr.length/2); i<Math.floor(arr.length/2)+partitionSize; i++) {
            result.push(arr[i]);
        }

        for(let i=arr.length-partitionSize; i<arr.length; i++) {
            result.push(arr[i]);
        }

        return result;

    }

    static computeMenaValeForTopic(map, topic) {
        const array = Array.from(map, ([key, value]) => {
            return +value[0][topic];
        });

        const sumOfElements = array.reduce((a, b) => a+b);
        const mean = Math.floor(sumOfElements / array.length);
        return mean;
    }

    static computeMeanValueFromDate(map, date, topic) {
        console.log(map);
        const tempMap = map.get(date);
        const tempArray = Array.from(map, ([key, value]) => {
            return +value[0][topic];
        });

        const sumOfElements = tempArray.reduce((a, b) => a+b);
        const mean = Math.floor(sumOfElements / tempArray.length);
        console.log(mean);

    }
}

class ChartDataFetchUtil {
    #fileNames
    constructor(fileNames) {
        this.fileNames = fileNames;
    }

    processCSVData = async _ => {
        let data = []
        for(const file of this.fileNames) {
            const parser = new DataParser(file);
            const parsedData = await parser.parseData(d => {
                return {
                    letter_code: d['code2'],
                    id: d['id']
                }  
            })
            data.push(parsedData);
        }
        return data;
    }

    processJSONData = async (countriesWithId) => {
        const topojson_response = await d3.json("http://localhost:3001/covid-19-world-restrictions-topoJson");
        const restrictions_response = await d3.json("http://localhost:3001/covid-19-world-restrictions-restrictionsValues");
        const world_restrictions_data = restrictions_response.rows.map(d => {
            const countrytWithEqualCode = countriesWithId.filter(c => c.letter_code === d[0]);
            const country_region_code = d[0];
            const country_region_id = countrytWithEqualCode[0].id;
            const country_region = d[1];
            const date = d[6];
            const retail_and_recreation = d[7];
            const grocery_and_pharmacy = d[8];
            const parks = d[9];

            return {
                country_region_letter_code: country_region_code,
                country_region_id: country_region_id,
                country_region: country_region,
                retail_and_recreation: retail_and_recreation,
                grocery_and_pharmacy: grocery_and_pharmacy,
                parks: parks,
                date: date
            }
        });

        
        const countriesByDate = d3.group(world_restrictions_data, d=>d.date, d=>d.country_region_letter_code);
        const countries_geometries = topojson.feature(topojson_response, topojson_response.objects.countries).features;
        var dates = [];
        countriesByDate.forEach((key, value) => {
            dates.push(value);
        });

        return {world_restrictions: world_restrictions_data, countries_by_date: countriesByDate, countries_geometries: countries_geometries, dates: dates};
    }

    async prepareData() {
        const csvResponse = await this.processCSVData();
        let csvResponseData;
        for(const item of csvResponse) {
            csvResponseData = item;
        }
        const jsonResponseData = await this.processJSONData(csvResponseData);
       return {csvData: {countries_with_ids: csvResponseData}, jsonData: jsonResponseData}; 
    }

}

class COVID19Restrictions {
    constructor() {
        this.countries_by_date = null;
        this.countries_geometries = null; 
        this.countries_with_ids = null;
        this.world_restrictions = null;
        this.dates = null;
        this.index = 0;
        this.topic = "parks"
        this.path = null;
        this.months = new Map([
                        [1, "January"], [2, "February"], [3, "March"], 
                        [4, "April"], [5, "May",], [6, "June"], [7, "Jully"], 
                        [8, "August"], [9, "September"], [10, "October"],
                        [11, "November"], [12, "December"]]);
        this.rects = null;
        this.tooltip = null;
    }

    set chartDataValue(dataset) {
        this.countries_by_date = dataset.countries_by_date;
        this.countries_geometries = dataset.countries_geometries; 
        this.countries_with_ids = dataset.countries_with_ids;
        this.world_restrictions = dataset.world_countries;
        this.dates = dataset.dates;
    }

    createWorldLands() {
        console.log(this.dates[0], this.dates[this.dates.length-1]);
        const projection = d3.geoNaturalEarth1();      
        this.path = d3.geoPath(projection);

        const svg = d3.select("#mapChart")
                      .append("svg")
                      .attr("width", chartSizings.width)
                      .attr("height", chartSizings.height)
                      .attr("viewBox", "-10 -10 900 600")
                      .attr("transform", "translate(-180 ,  50)");
                      
        const world_map = svg.append("g")
                             .attr("id", "world_lands")
                             .attr("fill", "gray")
                             .selectAll("path")
                             .data(this.countries_geometries)
                             .join("path")
                             .transition()
                             .duration(800)
                             .attr("stroke", "white")
                             .attr("stroke-width", 0.5)
                             .attr("d", this.path);
    }

    createEvolutionLine() {
        const tempDates = this.dates.map(d => {return {"monthValue": this.months.get(+d.split('-')[1]), "date": d}});
        const datesGroupedByMonth = d3.group(tempDates, d => d.monthValue);
        const rectWidth =  5;
        
        this.tooltip = d3.select("#tooltip")
                         .style("opacity", 0)
                         .attr("class", "tooltip")
                         .style("background-color", "white")
                         .style("border", "solid")
                         .style("border-width", "2px")
                         .style("border-radius", "5px")
                         .style("padding", "5px")

        const svg = d3.select("#progressBar")
                      .append("svg")
                      .attr("transform", "translate(0 ,  80)")
                      .attr("width", 300)
                      .attr("height", 500)
                      .attr("viewBox", "0 0 400 500")

        const title = svg.append("text")
                         .attr("transform", "translate(0 ,  30)")
                         .text("Daily evolution per month (Mean Value)")
                         .style("font-size", "20px")
                         .style("font-weight", "bold");

        this.rects = svg.selectAll("g")
                         .data(datesGroupedByMonth)
                         .join("g")
                         .attr("transform", "translate(0 ,  70)")
                         .attr("id", d => d[0]);

        const rects = this.rects.selectAll("rect")
                                .data(d => d[1])
                                .join("rect")
                                .attr("id", d => "id-"+d.date)
                                .attr("class", "dailyStatistic")
                                .attr("width", rectWidth)
                                .attr("height", 10)
                                .attr("y", (d, i) => {
                                    if(d.monthValue == "February")
                                        return 40;
                                    if(d.monthValue == "March")
                                        return 90;
                                    if(d.monthValue == "April")
                                        return 140;
                                    if(d.monthValue == "May")
                                        return 190; 
                                    if(d.monthValue == "June")
                                        return 240;
                                })
                                .attr("x", (d, i) => {
                                    return i*10;
                                })
                                .attr("fill", "none")
                                .attr("stroke", "gray")
                                .attr("stroke-width", 0.5);


        rects.on("mouseover", (event) => {
            this.tooltip.style("opacity", 1);

        });

        rects.on("mouseleave", (event) => {
            d3.select("#tooltip").style("opacity", 0);
        });

        rects.on("mousemove", (event) => {
            const points = d3.pointer(event);
            console.log(event);
            const date = event.srcElement.id.slice(3, event.srcElement.id.length);
            const fillValue = event.srcElement.getAttribute("fill");
            const tempMap = this.countries_by_date.get(date);
            const arrayOfValues = Array.from(tempMap, ([key, value]) => {
                return +value[0]["parks"];
            })
            const sumOfValues = arrayOfValues.reduce((a, b) => a + b);
            const mean = Math.floor(sumOfValues / arrayOfValues.length);
            
            this.tooltip.style("left", `${event.pageX +20}px`)
                        .style("top", `${event.pageY}px`)
                        .html(() => {
                            if(fillValue !== "none")
                                return `Date: ${date}<br/>Restriction mean: ${mean}`;
                            return `Date: ${date}<br/>Restriction mean: panding`;
                        })
        })
                         
        this.rects.append("text")
                  .attr("class", "monthTitle")
                  .attr("y", d => {
                    if(d[0] == "February")
                        return 30;
                    if(d[0] == "March")
                        return 80;
                    if(d[0] == "April")
                        return 130;
                    if(d[0] == "May")
                        return 180; 
                    if(d[0] == "June")
                        return 230;
                    })
                    .attr("x", 10)
                    .text(d => d[0])
                    .style("font-size", "20px")
                    .attr("opacity", 0)
                    .transition()
                    .duration(2000)
                    .attr("opacity", 1)
                    .attr("fill", "gray");

    }

    createBubbles(topic) {
        var currentData = this.countries_by_date.get(this.dates[this.index]);
        var interval = DataOperation.getMinMaxValueOfDate(currentData);
        var filteredCountires = this.countries_geometries.filter(d => {
            const letter_code_found = currentData.has(DataOperation.countryIdExists(this.countries_with_ids, d.id));
            if(letter_code_found === undefined)
                return false;
            return letter_code_found;
        });

        var circleSize = d3.scaleLinear()
                            .domain([interval.min, interval.max])
                            .range([2, 7]);

        var circleColor = d3.scaleSequential()
                            .domain([interval.max, interval.min])
                            .interpolator(d3.interpolateRdYlGn);
                            
        const circles = d3.select("#world_lands")
                          .append("g")
                          .attr("id", "bubbles")
                          .selectAll("circle")
                          .data(filteredCountires)
                          .join("circle")
                          .attr("transform", d => {
                                const points = this.path.centroid(d);
                                return `translate(${points})`;
                           })
                           .attr("id", d => d.id)
                           .attr("r", d => {
                                const letter_code = DataOperation.countryIdExists(this.countries_with_ids, d.id);
                                const countryStatistics = currentData.get(letter_code);
                                const size = circleSize(parseInt(countryStatistics[0][topic], 10));
                                return size;
                            })
                            .attr("fill", d => {
                                const letter_code = DataOperation.countryIdExists(this.countries_with_ids, d.id);
                                const countryStatistics = currentData.get(letter_code);
                                const restrictionValue = parseInt(countryStatistics[0][topic], 10);
                                var color = circleColor(restrictionValue);
                                return color;
                            });
    }
    
    deleteCurrentBubles() {
        d3.select("#bubbles").remove();
    }

    restoreEvolutionLine() {
        d3.selectAll(".dailyStatistic").remove();
        d3.selectAll(".monthTitle").remove();

        const rectWidth =  5;

        const rects = this.rects.selectAll("rect")
                                .data(d => d[1])
                                .join("rect")
                                .attr("id", d => "id-"+d.date)
                                .attr("class", "dailyStatistic")
                                .attr("width", rectWidth)
                                .attr("height", 10)
                                .attr("y", (d, i) => {
                                    if(d.monthValue == "February")
                                        return 40;
                                    if(d.monthValue == "March")
                                        return 90;
                                    if(d.monthValue == "April")
                                        return 140;
                                    if(d.monthValue == "May")
                                        return 190; 
                                    if(d.monthValue == "June")
                                        return 240;
                                })
                                .attr("x", (d, i) => {
                                    return i*10;
                                })
                                .attr("fill", "none")
                                .attr("stroke", "gray")
                                .attr("stroke-width", 0.5);

        rects.on("mouseover", (event) => {
            const points = d3.pointer(event);
            const date = event.srcElement.id.slice(3, event.srcElement.id.length);
            const fillValue = event.srcElement.getAttribute("fill");
            const tempMap = this.countries_by_date.get(date);
            const arrayOfValues = Array.from(tempMap, ([key, value]) => {
                return +value[0]["parks"];
            })
            const sumOfValues = arrayOfValues.reduce((a, b) => a + b);
            const mean = Math.floor(sumOfValues / arrayOfValues.length);

            this.tooltip.style("opacity", 1);

        });

        rects.on("mousemove", (event) => {
            const points = d3.pointer(event);
            const date = event.srcElement.id.slice(3, event.srcElement.id.length);
            const fillValue = event.srcElement.getAttribute("fill");
            const tempMap = this.countries_by_date.get(date);
            const arrayOfValues = Array.from(tempMap, ([key, value]) => {
                return +value[0]["parks"];
            })
            const sumOfValues = arrayOfValues.reduce((a, b) => a + b);
            const mean = Math.floor(sumOfValues / arrayOfValues.length);
            
            this.tooltip.style("left", `${event.pageX +20}px`)
                        .style("top", `${event.pageY}px`)
                        .html(() => {
                            if(fillValue !== "none")
                                return `Date: ${date}<br/>Restriction mean: ${mean}`;
                            return `Date: ${date}<br/>Restriction mean: panding`;
                        })
        })

        rects.on("mouseleave", (event) => {
            d3.select("#tooltip").style("opacity", 0);
        });

        this.rects.append("text")
                 .attr("class", "monthTitle")
                 .attr("y", d => {
                    if(d[0] == "February")
                        return 30;
                    if(d[0] == "March")
                        return 80;
                    if(d[0] == "April")
                        return 130;
                    if(d[0] == "May")
                        return 180; 
                    if(d[0] == "June")
                        return 230;
                 })
                 .attr("x", 10)
                 .text(d => d[0])
                 .style("font-size", "20px")
                 .attr("opacity", 0)
                 .transition()
                 .duration(2000)
                 .attr("opacity", 1)
                 .attr("fill", "gray");
    }

}

class AnimationUtil {
    constructor() {
        this.animation = null;
        this.animationPlaying = false;
        this.currentChart = new COVID19Restrictions();
    }

    set currentChartInstance(chart) {
        this.currentChart = chart;
    }
    

    playBubbleAnimation(topic) {
        var index = 0;
        this.animationPlaying = true;
        const colorInterpolator = d3.interpolate("red", "blue");
        const monthColor = d3.quantize(colorInterpolator, this.currentChart.dates.length);
        this.animation = d3.interval(() => {
            if(index === this.currentChart.dates.length - 1) {
                console.log("animation stopped", index);
                this.animationPlaying = false;
                this.animation.stop();
            }

            let currentData = this.currentChart.countries_by_date.get(this.currentChart.dates[index]);
            let interval = DataOperation.getMinMaxValueOfDate(currentData);
            let filteredCountires = this.currentChart.countries_geometries.filter(d => {
                const letter_code_found = currentData.has(DataOperation.countryIdExists(this.currentChart.countries_with_ids, d.id));
                if(letter_code_found === undefined)
                    return false;
                return letter_code_found;
            });
            
            let circleSize = d3.scaleLinear()
                               .domain([interval.min, interval.max])
                               .range([2, 7]);

            let circleColor = d3.scaleSequential()
                                .domain([interval.max, interval.min])
                                .interpolator(d3.interpolateRdYlGn);

            const mean = DataOperation.computeMenaValeForTopic(currentData, topic);

            d3.select("#id-"+this.currentChart.dates[index])
              .attr("fill", circleColor(mean));
            

            d3.selectAll("circle")
                .data(filteredCountires)
                .transition()
                .duration(300)
                .attr("r", (d, i) => {
                    const letter_code = DataOperation.countryIdExists(this.currentChart.countries_with_ids, d.id);
                    const countryStatistics = currentData.get(letter_code);
                    const size = circleSize(parseInt(countryStatistics[0][topic], 10));
                    return size;
                })
                .attr("fill", d => {
                    const letter_code = DataOperation.countryIdExists(this.currentChart.countries_with_ids, d.id);
                    const countryStatistics = currentData.get(letter_code);
                    const restrictionValue = parseInt(countryStatistics[0][topic], 10);
                    var color = circleColor(restrictionValue);
                    return color;
                });

            index++;
        }, 500);
    }
}

export {ChartDataFetchUtil, COVID19Restrictions, AnimationUtil};