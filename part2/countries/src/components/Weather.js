import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  const accessKey = "428ebed9e71135d95aae13b9d2e736cc";

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${accessKey}&query=${capital}`
      )
      .then(response => {
        setWeather(response.data);
      });
  }, [accessKey, capital]);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {!weather.current ? (
        <p>No data</p>
      ) : (
        <>
          <p>
            <strong>Temperature: </strong> {weather.current.temperature} °C
            <br />
            <img
              src={weather.current.weather_icons[0]}
              alt={weather.current.weather_descriptions[0]}
            />
          </p>
          <p>
            <strong>Wind:</strong> {weather.current.wind_speed} km/h, direction{" "}
            {weather.current.wind_dir}
          </p>
        </>
      )}
    </div>
  );
};

export default Weather;
