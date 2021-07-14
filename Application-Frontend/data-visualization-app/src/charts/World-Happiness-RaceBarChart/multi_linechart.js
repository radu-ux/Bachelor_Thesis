import { DataParser } from '../shared/data_parser.js';
import * as d3 from "d3";
import { tree } from 'd3';

class ChartSizing {
    margin = {top: 20, left: 10, bottom: 10, right: 170};
    width = 900 - this.margin.left - this.margin.right;
    height = 500 - this.margin.top - this.margin.bottom;
}


class MultiLineChart {
    constructor(fileNames) {
        this.fileNames = fileNames;
        this.maxScore = 0;
        this.data = {
            countries: [],
            years: [2015, 2016, 2017, 2018, 2019],
            first_file_parsed: true
        };
    }

    filterData(parsedData) {
        const sortedData = parsedData.slice().sort((a, b) => d3.descending(a.happiness_score, b.happiness_score));

        if(this.data.first_file_parsed) {
            for(let i=0; i<10; i++) {
                const currentCountry = sortedData[i];
                if(this.data.countries.some(country => {return country.country_name === currentCountry.country;})) {
                    this.data.countries[i].scores.push(currentCountry.happiness_score);
                } else {
                    this.data.countries.push({country_name: currentCountry.country, scores: [currentCountry.happiness_score], rank:-1, color: currentCountry.color});
                }
            }
            this.data.first_file_parsed = false;
        } else {
            for(let i=0; i<this.data.countries.length; i++) {
                const currentCountry = this.data.countries[i];
                const updatedCountry = sortedData.filter(c => currentCountry.country_name === c.country);
                console.log(updatedCountry);
                this.data.countries[i].scores.push(updatedCountry[0].happiness_score);
            }
        }
    }

    renderChartComponents() {
        console.log(this.data.countries)
        this.data.countries.sort((a, b) => a.scores[0] - b.scores[0]);
        this.data.countries.forEach((d, i) => d.rank = i);

        const sizes = new ChartSizing();

        const svg = d3.select('#chartPlaceholder')
                      .append('svg')
                      .attr('width', sizes.width + sizes.margin.left + sizes.margin.right)
                      .attr('height', sizes.height + sizes.margin.top + sizes.margin.bottom)
        
        const x = d3.scaleLinear()
                    .domain([0, d3.max(this.data.countries, d => d.scores[0])])
                    .range([sizes.margin.left, sizes.width]);  

        const y = d3.scaleBand()
                    .domain(d3.range(this.data.countries.length))
                    .range([sizes.height, sizes.margin.top])
                    .padding(0.1);
        const xAxis = svg.append('g')
                         .attr('transform', `translate(0, ${sizes.margin.top})`)
                         .transition()
                         .duration(2000)    
                         .call(d3.axisTop(x));
        
        const bars = svg.selectAll('rect')
                    .data(this.data.countries)
        bars.join('rect')
            .attr('class', 'bar')
            .attr('y', (d, i) => y(d.rank))
            .attr('height', y.bandwidth())
            .transition()
            .duration(2000)
            .attr('x', x(0))
            .attr('width', (d, i) => x(d.scores[0]) - x(0))
            .attr('fill', d => d.color)
                                
        const countryName = svg.append('g').selectAll('text').data(this.data.countries)
        countryName.join('text')
                   .attr('class', 'label')
                   .attr('y', d => y(d.rank) + y.bandwidth()/2 + 5)
                   .transition()
                   .duration(2000)
                   .attr('x', d => x(d.scores[0]))
                   .attr("dy", "0.35em")
                   .attr("dx", -4)
                   .attr("text-anchor", "end")
                   .text(d => d.country_name);
        
        const countryScore = svg.append('g').selectAll('text').data(this.data.countries)
        countryScore.join('text')
                    .attr('class', 'score')
                    .attr('y', d => y(d.rank) + y.bandwidth()/2 + 5)
                    .transition()
                    .attr("dy", "0.35em")
                    .attr("dx", -4)
                    .duration(2000)
                    .attr('x', d => x(d.scores[0] + 0.1))
                    .text(d => (Math.round(d.scores[0] * 100) / 100).toFixed(2));

        const yearCounter = svg.append('text')
                               .attr('id', 'currentYear')
                               .attr('x', sizes.width + 60)
                               .attr('y', sizes.height / 2)
                               .attr('opacity', 0)
                               .transition()
                               .duration(1000)
                               .attr('opacity', 1)
                               .style('font', '40px sans-serif')
                               .style('font-weight', 'bold')
                               .text(this.data.years[0]);
        
        var scoreIndex = 1;
        let animation = d3.interval(() => {
            let c = Array.from(this.data.countries);
            let ranks = this.establishRanks(c, scoreIndex);

            svg.selectAll('.bar')
                .data(this.data.countries)
                .attr('x', x(0))
                .attr('height', y.bandwidth())
                .transition()
                .duration(2000)
                .attr('y', (d, i) => {
                    return y(ranks[d.country_name])
                })
                .attr('width', (d, i) => {
                    return x(d.scores[scoreIndex]) - x(0);
                })
            svg.selectAll('.label')
               .data(this.data.countries)
               .attr("dy", "0.35em")
               .attr("dx", -4)
               .attr("text-anchor", "end")
               .transition()
               .duration(2000)
               .attr('x', d => x(d.scores[scoreIndex]))
               .attr('y', (d, i) => y(ranks[d.country_name]) + y.bandwidth()/2 + 5)

            svg.selectAll('.score')
               .data(this.data.countries)
               .transition()
               .attr("dy", "0.35em")
               .attr("dx", -4)
               .duration(2000)
               .attr('x', d => x(d.scores[scoreIndex] + 0.1))
               .attr('y', d => y(ranks[d.country_name]) + y.bandwidth()/2 + 5)
               .text(d => (Math.round(d.scores[scoreIndex] * 100) / 100).toFixed(2));
            
            svg.select('#currentYear')
               .transition()
               .duration(2000)
               .text(this.data.years[scoreIndex]);
              

            if(scoreIndex === 4) {
                animation.stop()
            }

            scoreIndex++;
        }, 5000)
        
    }

    findMaxScore() {
        let maxArr = this.data.countries.map(d => d3.max(d.scores))
        return d3.max(maxArr);
    }

    establishRanks(arr, scoreIndex) {
        let ranks = {};
        arr.sort((a, b) => a.scores[scoreIndex] - b.scores[scoreIndex]);
        for(let i=0; i<arr.length; i++) {
            ranks[arr[i].country_name] = i;
        }
        return ranks;
    }    

    processData = async _ => {
        let data = []
        for(const file of this.fileNames) {
            const parser = new DataParser(file);
            const parsedData = await parser.parseData(d => {
                return {
                    country: d.Country,
                    happiness_score: +d['Happiness.Score'], 
                    color: d3.hsl(Math.random()*360, 0.75, 0.80) 
                }
            })
            data.push(parsedData);
        }
        return data;
    }

    createChart() {
        this.processData().then(parsedData => {
            for(const item of parsedData) {
                this.filterData(item);
            }
            this.renderChartComponents();
        });
    }
}

export { MultiLineChart };