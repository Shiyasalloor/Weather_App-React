import React, { useState } from "react";
import './weatherapp.css';

import cloud from '../Assets/cloud.png';
import humidity from '../Assets/humidity.png';
import searchIcon from '../Assets/search.png';
import wind from '../Assets/wind.png';

function WeatherApp() {
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        windSpeed: "",
        temperature: "",
        location: ""
    });

    const apiKey = '1233ccadca6bdae8a8c70b88d472db38';

    const search = async () => {
        try {
            const element = document.getElementsByClassName("input-city")[0];
            const inputValue = element.value;
            
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
            let response = await fetch(url);
            let data = await response.json();

            setWeatherData({
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} km/h`,
                temperature: `${(data.main.temp - 273.15).toFixed(1)}°C`,
                location: data.name
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="container">
            <div className="top-box">
                <input type="text" className="input-city" placeholder="Search Location"/>
                <div className="search-icon">
                    <img src={searchIcon} alt="" className="search-button" onClick={() => { search() }} />
                </div>
            </div>
            <div>
                <div className="weather-img">
                    <img src={cloud} alt="" />
                </div>
                <div className="temp">{weatherData.temperature}</div>
                <div className="location-place">{weatherData.location}</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity} alt="" className="icon"/>
                        <div className="data">
                            <div className="humidity-percentage">{weatherData.humidity}</div>
                            <div className="text">humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind} alt="" className="icon"/>
                        <div className="data">
                            <div className="wind-percentage">{weatherData.windSpeed}</div>
                            <div className="text">wind speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
