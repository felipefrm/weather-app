const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=a034af21d6fde508637dacd2113e378b&query=" + latitude + "," + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)

        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                precip: body.current.precip,
                humidity: body.current.humidity
            })
        }
    })

}

module.exports = forecast
