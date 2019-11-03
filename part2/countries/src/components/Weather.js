import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=4007e336173c0af9bfce693326b6406d&query=${capital}`
      )

      .then(response => {
        setWeather({
          temperature: response.data.current.temperature,
          wind_speed: response.data.current.wind_speed,
          wind_dir: response.data.current.wind_dir,
          weather_icons: response.data.current.weather_icons
        });
      });
  }, [capital]);

  return (
    <div>
      <div>
        <b>Weather in {capital}</b>{" "}
      </div>
      <div>
        <br />
        <b>temperature:</b> {weather.temperature} Celsius
      </div>
      <img src={weather.weather_icons} alt="weather"></img>
      <div>
        <b>wind:</b> {weather.wind_speed} kph direction {weather.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
