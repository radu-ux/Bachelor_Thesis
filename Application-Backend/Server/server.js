const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

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

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
