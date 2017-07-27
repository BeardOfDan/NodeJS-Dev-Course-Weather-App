"use strict";

const yargs = require('yargs');
const axios = require('axios');

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
console.log("\n"); // spacing

let address = encodeURIComponent(argv.address);
let geocodeUrl = "https://maps.google.com/maps/api/geocode/json?address=" + address;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error("Unable to find that address");
  }

  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let formattedAddress = response.data.results[0].formatted_address;
  let weatherUrl = `https://api.darksky.net/forecast/ddba06b83a81213457264e4d7c895941/${lat},${lng}`;

  console.log(formattedAddress);
  return axios.get(weatherUrl);
}).then((response) => {
  let temp = response.data.currently.temperature;
  let feel = response.data.currently.apparentTemperature;

  console.log(`It is currently ${temp}°, ${temp === feel ? "and it feels like it too." : "but it feels like " + feel + "°"}`);
}).catch((err) => {
  if (err.code === "ENOTFOUND") {
    console.log("Unable to connect to API servers.");
  } else {
    console.log(err.message);
  }
});
