// const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Deepak Kumar'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Deepak Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Deepak Kumar',
        help: `Need some help! I'm there for you.`,
    })
})

app.get('/weather',  async (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address'
        })
    }
    const data = await geocode(req.query.address);
    
    if(data.message){
        res.send({
            forecast: `${data.message}`,
            location: `${data.name} ${data.country}`,
            address: req.query.address,
            high: `${data.max} deg`,
            low: `${data.min} deg`
        })
    } else{
        res.send({
            error: 'Unable to find location, Try another search.'
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found',
        name: 'Deepak Kumar'
    });
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'My 404 page',
        name: 'Deepak Kumar'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})