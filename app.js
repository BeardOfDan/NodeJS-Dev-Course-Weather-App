"use strict";

const request = require('request');

request({
  url: "https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia",
  json: true
}, (error, response, body) => {
  if (error) {
    console.log("There was an error!");
    console.log(JSON.stringify(error, undefined, 2));
  } else {
    console.log(`Address: ${body.results[0].formatted_address}
Lat: ${body.results[0].geometry.location.lat}
Lng: ${body.results[0].geometry.location.lng}`);
  }
});
