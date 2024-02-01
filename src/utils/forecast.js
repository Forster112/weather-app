const request = require("postman-request")

function forecast(location = "", callback = () => { }) {
  const url =
    `http://api.weatherapi.com/v1/forecast.json?key=8da825961219469e9e595125242301&q=${location}&days=2&aqi=no&alerts=no`;

  request(url, { json: true }, (error, response, body) => {
    if (error) {
      callback("No response from weather service", response, undefined);
    } else if (body.error) {
      callback(
        "No response from weather service or Invalid address",
        response,
        undefined
      );
    } else {
      callback(undefined, response, body)
    }
  });
};

module.exports = forecast;