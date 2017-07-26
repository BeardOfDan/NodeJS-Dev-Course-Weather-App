"use strict";

const request = require('request');
const yargs = require('yargs');

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

  let address = argv.address;
  address = encodeURIComponent(address);

request({
  url: "https://maps.google.com/maps/api/geocode/json?address=" + address,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log("There was an error!");
    console.log(JSON.stringify(error, undefined, 2));
  } else if ((body.status === "ZERO_RESULTS") || (body.results === [])) {
    console.log("That address is invalid!");
  } else if (body.status === "OK") {
    console.log(`Address: ${body.results[0].formatted_address}
Lat: ${body.results[0].geometry.location.lat}
Lng: ${body.results[0].geometry.location.lng}`);
  } else {
    console.log("Unpredicted situation!\nCongratulations, you broke my program. I wonder what happened?");
  }
});
