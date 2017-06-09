require('./bootstrap.js'); // App Insights

const http = require('http');
const url  = require('url');
const dotenv = require('dotenv').config();

const appid = process.env.OPENWEATHER_APIKEY;

function httpHandler (request, response) {
  let parsed_url = url.parse(request.url, true);
  let zip        = parsed_url.query.zip;
  let country    = parsed_url.query.country || 'us';

  let query_string = `zip=${zip},${country}&APPID=${appid}`
  http.get(`http://api.openweathermap.org/data/2.5/forecast?${query_string}`,
    weather_response => { weather_response.pipe(response, {end: true}) }
  );
}

http.createServer(httpHandler).listen(8080);
