"use strict";

const request = require('request');

let getWeather = (lat, lng, callBack) => {
  request({
    url: `https://api.darksky.net/forecast/ddba06b83a81213457264e4d7c895941/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if ((!error) && (response.statusCode === 200)) {
      let result = {};
      result.temp = body.currently.temperature;
      result.feel = body.currently.apparentTemperature;

      callBack(undefined, result);
    } else {
      callBack("ERROR! Unable to fetch weather.");
    }
  });
};

module.exports = {
  getWeather
};
