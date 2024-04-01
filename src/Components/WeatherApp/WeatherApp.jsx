import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

const WeatherApp = () => {

    let api_key = "19e390e2b10393d8af98fbb7844bf755";

    const [weatherData, setWeatherData] = useState(null);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")[0];
        if (element.value === "") {
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=imperial&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
        } catch(error) {
            console.error("Error fetching weather data");
        }
    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type='text' className="cityInput" placeholder='Search' />
            <div className="search-icon" onClick={search}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        {weatherData && <div className="main-content" >
            <div className="weather-image">
                <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="" />
            </div>
            <div className="weather-temp">{Math.floor(weatherData.main.temp)} °F</div>
            <div className="weather-location">{weatherData.name}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.main.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{Math.floor(weatherData.wind.speed)} mph</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
  )
}

const getWeatherIcon = (iconCode) => {
    switch(iconCode) {
        case "01d":
        case "01n":
            return clear_icon;
        case "02d":
        case "02n":
        case "03d":
        case "03n":
            return cloud_icon;
        case "04d":
        case "04n":
        case "09d":
        case "09n":
            return drizzle_icon;
        case "10d":
        case "10n":
        case "11d":
        case "11n":
            return rain_icon;
        case "13d":
        case "13n":
            return snow_icon;
        default:
            return clear_icon;
    }
}

export default WeatherApp
