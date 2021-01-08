

// const city = process.argv[2];

// https://api.mapbox.com/geocoding/v5/mapbox.places/patna.json?access_token=pk.eyJ1IjoiZGVlcGFra3VtYXIzMTEyIiwiYSI6ImNraXdobDJweTBldzAydW54bnMwYTVzZ2cifQ.2XRy5pPY8__xNRrWqqQjLw&limit=1

const geocode = (city) => {
    const fetch = require('node-fetch');
    const apiKey = '845a0901395489c0274516877665da86';
    const mapBoxKey = 'pk.eyJ1IjoiZGVlcGFra3VtYXIzMTEyIiwiYSI6ImNraXdobDJweTBldzAydW54bnMwYTVzZ2cifQ.2XRy5pPY8__xNRrWqqQjLw';
    const latlonUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapBoxKey}&limit=1`;

    if (!city) {
        // console.log('Please enter the name of the city');
        return 'Please enter the name of the city';
    } else {
        // let weather;
        return fetch(latlonUrl)
            .then(res => res.json())
            .then(data => {
                const [lon, lat] = data.features[0].geometry.coordinates;
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            })
            .then(res => res.json())
            .then(data => {
                const description = data.weather[0].description.replace(/\b\w/g, l => l.toUpperCase());
                return {
                    message: `${description}. It is currently ${data.main.temp} degrees out but, feels like ${data.main.feels_like} degrees. Humidity is around ${data.main.humidity}%.`,
                    name: data.name,
                    country: data.sys.country,
                    max: data.main.temp_max,
                    min: data.main.temp_min
                }
            })
            .catch(err => `Something went wrong`);
        // return weather;
    }
}

module.exports = geocode;


// console.log(process.argv[2]);


// fetch(`https://api.openweathermap.org/data/2.5/weather?q=Patna&appid=845a0901395489c0274516877665da86&units=metric`)
//     .then(res => res.json())
//     .then(data => console.log(`It is currently ${data.main.temp} degrees out but, it feels like ${data.main.feels_like} degrees. Freaking cold, bone chilling.`))
//     .catch(err => console.log(err));