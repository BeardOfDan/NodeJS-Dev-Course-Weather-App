"use strict";

const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});

// ddba06b83a81213457264e4d7c895941

request({
  url: "https://api.darksky.net/forecast/ddba06b83a81213457264e4d7c895941/37.939151,-121.9470726",
  json: true
}, (error, response, body) => {
  if ((!error) && (response.statusCode === 200)) {
    console.log(`Temperature: ${body.currently.temperature}`);
  } else {
    console.log("ERROR! Unable to fetch weather.");
  }
});
