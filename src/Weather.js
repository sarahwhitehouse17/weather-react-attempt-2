import React, { useState } from "react";
import "./App.css";
import axios from "axios";
export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, showLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    showLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.temp),
      wind: Math.round(response.data.wind.speed),
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="weather-app-details weather-app">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="find your city"
          onChange={updateCity}
          className="search-form-input"
        />
        <button type="submit" className="search-form-button">
          Search
        </button>
      </form>
    </div>
  );

  let message = (
    <p>
      Coded by Sarah Whitehouse open-sourced on GitHub and hosted on Netlify
    </p>
  );

  if (loaded) {
    return (
      <div className="weather-app-details weather-app">
        {form}
        <main>
          <h1 className="weather-app-city">{city}</h1>
          <div className="weather-app-data">
            <div className="weather-app-details">
              <ul>
                <li>
                  Humidity: <strong>{weather.humidity}%</strong>{" "}
                </li>
                <li>
                  Windspeed: <strong>{weather.wind}km/h</strong>{" "}
                </li>
                <li>
                  Description: <strong>{weather.description}</strong>
                </li>
              </ul>
            </div>
            <div className="weather-app-container">
              <img src={weather.icon} className="weather-app-icon" />
              <h2 className="weather-app-temperature">
                {weather.temperature}°C
              </h2>
            </div>
          </div>
        </main>
        <p>{message}</p>
      </div>
    );
  } else {
    return (
      <div className="weather-app-details weather-app">
        {form}
        {message}
      </div>
    );
  }
}
