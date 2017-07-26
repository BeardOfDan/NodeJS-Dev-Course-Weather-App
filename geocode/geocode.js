"use strict";

const request = require('request');

let geocodeAddress = (address, callBack) => {
  address = encodeURIComponent(address);

  request({
    url: "https://maps.google.com/maps/api/geocode/json?address=" + address,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("There was an error in connecting to the Google servers!");
    } else if ((body.status === "ZERO_RESULTS") || (body.results === [])) {
      callBack("That address is invalid!");
    } else if (body.status === "OK") {
      let result = {};
      result.address = body.results[0].formatted_address;
      result.lat = body.results[0].geometry.location.lat;
      result.lng = body.results[0].geometry.location.lng;

      callBack(undefined, result);
    } else {
      callBack("Unpredicted situation!\nCongratulations, you broke my program. I wonder what happened?");
    }
  });
};

module.exports = {
  geocodeAddress
};

