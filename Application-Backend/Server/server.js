const { captureRejectionSymbol } = require('events')
const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

//World Happiness data routes
server.get('/world-happiness/2015', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public/World-Happiness-RaceBarChart-Data')
    }
    res.sendFile("2015.csv", options);
})

server.get('/world-happiness/2015', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public/World-Happiness-RaceBarChart-Data')
    }
    res.sendFile("2015.csv", options);
})

server.get('/world-happiness/2016', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public/World-Happiness-RaceBarChart-Data')
    }
    res.sendFile("2016.csv", options);
})

server.get('/world-happiness/2017', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public/World-Happiness-RaceBarChart-Data')
    }
    res.sendFile("2017.csv", options);
})

server.get('/world-happiness/2018', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public/World-Happiness-RaceBarChart-Data')
    }
    res.sendFile("2018.csv", options);
})

server.get('/world-happiness/2019', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public/World-Happiness-RaceBarChart-Data')
    }
    res.sendFile("2019.csv", options);
})

//Covid 19 World vaccinations data routes
server.get('/covid-19-vaccine', (req, res) => {
    console.log("req made");
    var options = {
        root: path.join(__dirname, "public/COVID-19-Data")
    }
    res.sendFile("country_vaccinations.csv", options);
})

//Covid 19 America cases data routes
server.get('/covid-19-cases-america-counties-albers', (req, res) => {
    var options = {
        root: path.join(__dirname, "public/COVID-19-Data")
    }
    res.sendFile("counties-albers-10m.json", options)
})

server.get('/covid-19-cases-america-out', (req, res) => {
    var options = {
        root: path.join(__dirname, "public/COVID-19-Data")
    }
    res.sendFile("out.json", options)
})

server.get('/covid-19-cases-america', (req, res) => {
    var options = {
        root: path.join(__dirname, "public/COVID-19-Data")
    }
    res.sendFile("us_states_covid19_daily.csv", options)
})

//Coivd 19 World Restrictions data routes 
server.get('/covid-19-world-restrictions-countriesCode', (req, res) => {
    var options = {
        root: path.join(__dirname, "public/COVID-19-Data/World-Restrictions-Data") 
    }
    res.sendFile("countriesCode.csv", options);
})

server.get('/covid-19-world-restrictions-topoJson', (req, res) => {
    var options = {
        root: path.join(__dirname, "public/COVID-19-Data/World-Restrictions-Data") 
    }
    res.sendFile("countries-50m.json", options);
})

server.get('/covid-19-world-restrictions-restrictionsValues', (req, res) => {
    var options = {
        root: path.join(__dirname, "public/COVID-19-Data/World-Restrictions-Data") 
    }
    res.sendFile("newdata (1).json", options);
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
