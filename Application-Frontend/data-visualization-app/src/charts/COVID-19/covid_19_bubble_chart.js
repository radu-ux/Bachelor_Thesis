import { DataParser } from "../shared/data_parser.js"
import * as d3 from "d3";
import { schemeGnBu } from "d3";

const bubbleChartSizes = {
    width: 600,
    height: 600,
    diameter: 600
};

const pieChartSizing = {
    width: 300,
    height: 300,
    innerRadius: 200,
    outerRadius: 300
};

class COIVD19Vaccinations {
    constructor(fileMNames) {
        this.fileMNames = fileMNames;
        this.data = {children: []};
        this.vaccineStatus = [];
    }

    /*
        DESCRIPTION: function for rendering the pie chart that displays
                     a statistic regarding the usage frequency of the 
                     COVID-19 vaccines available
    */
    pieChart() {
        var svg = d3.select("#pieChartPlaceholder")
                    .append("svg")
                    .attr("width", pieChartSizing.width)
                    .attr("height", pieChartSizing.height)
        
        /* Create pie layout, map every 'count' prop to an angle  to be used to draw 'a pie' */
        var pie = d3.pie()
                    .sort(null)
                    .value(d => d.count)
                    .padAngle(0.03)
        
        var arc = d3.arc()
                    .innerRadius(pieChartSizing.innerRadius/2 * 0.8)
                    .outerRadius(pieChartSizing.outerRadius/2 * 0.6);
        
        /* map every name to a color in the range of the specified interpolation */
        var color = d3.scaleOrdinal()
                      .domain(this.vaccineStatus.map(d => d.vaccine_name))
                      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.4 + 0.1), this.vaccineStatus.length))

        svg.append("g")
           .attr("transform", `translate(${pieChartSizing.width/2}, ${pieChartSizing.height/2})`)
           .attr("stroke", "white")
           .selectAll("path")
           .data(pie(this.vaccineStatus))
           .join("path")
            .attr("fill", d => color(d.data.vaccine_name))
            .transition()
            .delay((d, i) => i*500)
            .duration(800)
            .attrTween("d", d => { // used to draw the 'pies' step by step
                const i = d3.interpolate(d.startAngle, d.endAngle)
                return t => {
                    d.endAngle = i(t);
                    return arc(d);
                }
            }) 

        svg.append("g")
           .attr("transform", `translate(${pieChartSizing.width/2}, ${pieChartSizing.height/2})`)
           .attr("font-family", "sans-serif")
           .attr("font-size", "10px")
           .attr("font-weight", "bold")
           .attr("text-anchor", "middle")
           .selectAll("text")
           .data(pie(this.vaccineStatus))
           .join("text")
           .transition()
           .duration(800)
           .delay((d, i) => i*500)
           .attr("transform", d => {
               if(d.data.count >= 3) {
                const pos = arc.centroid(d)
                return `translate(${pos})`
               } else {
                   return null;
               }
           })
           .text(d => {
                if( d.data.count >=3 )
                    return d.data.vaccine_name
                return null;
            });
           
         svg.append("g")
            .attr("font-familiy", "sans-serif")
            .attr("font-weight", "bold")
            .attr("font-size", "40px")
            .append("text")
            .text(`WORLD: ${this.sumOfTotalVaccinations()}`)
            .attr("transform", `translate(${pieChartSizing.width/3 - 50}, ${pieChartSizing.width - 10})`)
    }

    /*
        DESCRIPTION: function for rendering the bubbles with the actual 
                     vaccinations satus
    */
    bubbleChart() {
        var svg = d3.select('#bubbleChartPlaceholder')
                    .append('svg')
                    .attr('width', bubbleChartSizes.width)
                    .attr('height', bubbleChartSizes.height)
                    .attr("text-anchor", "middle")

        var bubbleLayout = d3.pack(this.data)
                             .size([bubbleChartSizes.diameter, bubbleChartSizes.diameter])
                             .padding(1.5);
        var nodes = d3.hierarchy(this.data)
                      .sum(d => d.total_vaccinations);

        
        var node = svg.selectAll(".node")
                .data(bubbleLayout(nodes).descendants())
                .join("g")
                .filter(d => !d.children)
                .attr('class', "node")
                .attr('transform', d => `translate(${d.x}, ${d.y})`)

        node.append('circle')
            .transition()
            .duration(800)
            .delay((d, i) => i*100)
            .ease(d3.easeElastic)
            .delay((d, i) => i*100)
            .attr('r', d => {
                return d.r;
            })        
            .attr('fill', "rgb(251, 209, 75)");

        node.append("text")
            .text(d => d.data.country)
            .attr("fill", "none")
            .transition()
            .duration(800)
            .ease(d3.easeElastic)
            .delay((d, i) => i*100)
            .attr("fill", "black")
            .delay((d, i) => i*100)
            .attr("font-size", d => {
                    return d.r / 5;
            })

        node.append("text")
            .text(d => {
                if(d.data.total_vaccinations > 1000000) {
                    return Math.floor(d.data.total_vaccinations/1000000).toLocaleString() + "M"
                }
                return d.data.total_vaccinations
            })
            .attr("dy", "1.5em")
            .attr("fill", "none")
            .transition()
            .duration(800)
            .ease(d3.easeElastic)
            .delay((d, i) => i*100)
            .attr("fill", "black")
            .attr("font-size", d => {
                return d.r / 5;
            })
    }

    renderChartComponents() {
        this.bubbleChart();
        this.pieChart();
    }
 
    processData = async _ => {
        let data = []
        for(const file of this.fileMNames) {
            const parser = new DataParser(file);
            const parsedData = await parser.parseData(d => {
                if(d.date === "2021-03-22") {
                    return {
                        country: d['country'],
                        total_vaccinations: +d['people_fully_vaccinated'],
                        vaccine: d['vaccines']
                    }
                } else {
                    return null;
                }
            })
            data.push(parsedData);
        }
        return data;
    }

    sumOfTotalVaccinations() {
        const sum = d3.sum(this.vaccineStatus, d => d.count);
        if(sum > 1000000) {
            sum = Math.floor(sum / 1000000);
        }

        return sum.toLocaleString()+"M";
    }

    incrementVaccineCount(vaccineName) {
        this.vaccineStatus.forEach(vc => {
            if(vc.vaccine_name === vaccineName) {
                vc.count += 1;
            }
        })
    }

    searchVaccineByName(vaccineName) {
        let vaccineFound = false;
        this.vaccineStatus.forEach(vc => { 
            if(vc.vaccine_name.localeCompare(vaccineName) == 0){
                vaccineFound = true;
            }
        });
        return vaccineFound;
    }

    createVaccineStatus(vaccineName) {
        if(!this.searchVaccineByName(vaccineName)) {
            const vaccineObj = {
                vaccine_name: vaccineName,
                count: 1
            };
            this.vaccineStatus.push(vaccineObj);
        } else {
            this.incrementVaccineCount(vaccineName);
        }
    }

    setData(dataset) {
        this.data.children = dataset;
    }

    setVaccineStatus() {
        this.data.children.forEach(child => {
            if(child.total_vaccinations > 0) {
                const vaccine = child.vaccine;
                if(vaccine.includes(",")) {
                    const vaccineArr = vaccine.split(/[ ,]+/);
                    vaccineArr.forEach(vc => {
                       this.createVaccineStatus(vc);
                    });
                } else {
                    this.createVaccineStatus(vaccine);
                }
            }
        })
    }           

    sortData() {
        this.data.children.sort((a, b) => {
            return b.total_vaccinations - a.total_vaccinations;
        })
    }

    createChart() {
        this.processData().then(parsedData => {
            for(const item of parsedData) {
                this.setData(item);
                this.setVaccineStatus();
            }
            this.sortData();
            this.renderChartComponents();
        });
    }
}

export { COIVD19Vaccinations };