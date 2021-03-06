class DataParser {
    constructor(fileName) {
        this.fileName = fileName;
    }
    
    async getData() {
        const response = await fetch(this.fileName);
        const data = await response.text();
        return data;
    }

    async parseData(rowFilter) {
        const data = await this.getData();
        const parsedData = d3.csvParse(data, rowFilter);
        return parsedData;
    }
}    


export  { DataParser };