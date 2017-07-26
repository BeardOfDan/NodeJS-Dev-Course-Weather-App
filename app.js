"use strict";

const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h")
  .argv;

geocode.geocodeAddress(argv.address, (errorMessageGeo, resultsGeo) => {
  if (errorMessageGeo) {
    console.log("\n", errorMessageGeo);
  } else { // geo success
      console.log(`\n${resultsGeo.address}`);
    weather.getWeather(resultsGeo.lat, resultsGeo.lng, (errorMessageW, resultsW) => {
      if (errorMessageW) {
        console.log("\n", errorMessageW);
      } else { // weather success
        console.log(`It is currently ${resultsW.temp}°, ${resultsW.temp === resultsW.feel ? "and it feels like it too." : "but it feels like " + resultsW.feel + "°"}`);
      }
    });
  }
});
