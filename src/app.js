const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        developer: 'Felipe Melo',
        img: 'img/weather.png'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        developer: 'Felipe Melo',
        img: 'img/dev.png'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        developer: 'Felipe Melo',
        text: 'This is some helpful text.',
        img: 'img/help.png'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {temperature, feelslike} = {}) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: `Its currently ${temperature} degrees out and feels like ${feelslike} degrees.`,
                location,
                address: req.query.address,
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Error',
        developer: 'Felipe Melo',
        errorMessage: 'This help article doesnt exist.',
        img: 'img/404.png'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Error',
        name: 'Felipe Melo',
        errorMessage: 'This page doesnt exist.',
        img: 'img/404.png'
    })
})

app.listen(3000, () => {
    console.log("Web server listening on port 3000.")
})