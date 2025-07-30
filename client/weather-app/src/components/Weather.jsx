import React, { useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import weather_icon from '../assets/cloud.png';

const Weather = () => {

    const search = async (city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

        } catch (error) {
            
        }
    }

    useEffect (()=>{
        search("Colombo")
    })

  return (
    <div className="app">
      <div className="header">
        <img src={weather_icon} alt="Weather Icon" className="logo" />
        <h1>Weather App</h1>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Enter a city" />
        <button>Add City</button>
      </div>

      <div className="weather-cards">
        {[
          {
            city: 'Colombo, LK',
            time: '9.19am, Feb 8',
            temp: '27',
            condition: 'Few Clouds',
            min: '25',
            max: '28',
            color: 'blue'
          },
          {
            city: 'Tokyo, JP',
            time: '9.19am, Feb 8',
            temp: '7',
            condition: 'Broken Clouds',
            min: '-7',
            max: '7',
            color: 'purple'
          },
          {
            city: 'Liverpool, GB',
            time: '9.19am, Feb 8',
            temp: '-2',
            condition: 'Clear Sky',
            min: '-7',
            max: '5',
            color: 'green'
          },
          {
            city: 'Sydney, AU',
            time: '9.19am, Feb 8',
            temp: '26',
            condition: 'Light Rain',
            min: '20',
            max: '30',
            color: 'orange'
          },
          {
            city: 'Boston, US',
            time: '9.19am, Feb 8',
            temp: '13',
            condition: 'Mist',
            min: '10',
            max: '15',
            color: 'red'
          },
        ].map((weather, i) => (
          <div className={`weather-card ${weather.color}`} key={i}>
            <div className="top">
              <h2>{weather.city}</h2>
              <span>{weather.time}</span>
            </div>
            <h1>{weather.temp}°C</h1>
            <p>{weather.condition}</p>
            <div className="temps">
              <span>Temp Min: {weather.min}°</span>
              <span>Temp Max: {weather.max}°</span>
            </div>
            <div className="info">
              <div>
                <strong>Pressure:</strong> 1018hPa<br/>
                <strong>Humidity:</strong> 78%<br/>
                <strong>Visibility:</strong> 8.0km
              </div>
              <div>
                <strong>Wind:</strong> 4.0m/s 120 Degree<br/>
                <strong>Sunrise:</strong> 6:05am<br/>
                <strong>Sunset:</strong> 6:05am
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>2021 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default Weather;
