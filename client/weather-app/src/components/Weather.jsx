import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import weather_icon from '../assets/cloud.png';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const colors = ["blue", "purple", "green", "orange", "red"];
  
  const search = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Check if environment variable exists, otherwise use direct API key
      const API_KEY = import.meta.env.VITE_APP_ID || "937338ded2504d5a78d0b5b78419f653";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric`;
      
      console.log("Making request to:", url.replace(API_KEY, 'YOUR_API_KEY')); // Debug log without exposing API key
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log("API Response status:", response.status);
      console.log("API Response data:", data);
      
      if (response.ok && data.cod === 200) {
        const newWeather = {
          id: Date.now(), // Unique ID for React key
          city: `${data.name}, ${data.sys.country}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temp: Math.round(data.main.temp),
          condition: data.weather[0].description,
          min: Math.round(data.main.temp_min),
          max: Math.round(data.main.temp_max),
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          visibility: data.visibility ? Math.round(data.visibility / 1000) : 'N/A',
          wind: data.wind?.speed || 0,
          degree: data.wind?.deg || 0,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          color: colors[Math.floor(Math.random() * colors.length)]
        };

        // Add to beginning of array, keep max 6 cards
        setWeatherData(prev => [newWeather, ...prev.slice(0, 5)]);
        setCity(""); // Clear input after successful search
      } else {
        // Handle API errors
        const errorMessage = data.message || "City not found. Please check the spelling and try again.";
        setError(errorMessage);
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch weather data. Please check your internet connection and try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      search();
    }
  };

  const clearError = () => {
    setError("");
  };

  const removeWeatherCard = (cardId) => {
    setWeatherData(prev => prev.filter(weather => weather.id !== cardId));
  };

  return (
    <div className="app">
      <div className="header">
        <img src={weather_icon} alt="Weather Icon" className="logo" />
        <h1>Weather App</h1>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter a city name"
          value={city}
          onChange={(e) => setCity(e.target.value)} 
          onKeyDown={handleKeyPress}
          disabled={loading}
          className={loading ? "loading" : ""}
        />
        <button 
          onClick={search}
          disabled={loading}
          className={loading ? "loading" : ""}
        >
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <img src={search_icon} alt="search" style={{width:"20px"}}/>
          )}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button className="error-close" onClick={clearError}>×</button>
        </div>
      )}

      {loading && (
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <span>Fetching weather data...</span>
        </div>
      )}

      <div className="weather-cards">
        {weatherData.map((weather) => (
          <div className={`weather-card ${weather.color}`} key={weather.id}>
            <div className="top">
              <div className="city-info">
                <h2>{weather.city}</h2>
                <span>{weather.time}</span>
              </div>
              <button 
                className="close-button"
                onClick={() => removeWeatherCard(weather.id)}
                title="Remove this weather card"
              >
                ×
              </button>
            </div>
            <h1>{weather.temp}°C</h1>
            <p className="condition">{weather.condition}</p>
            <div className="temps">
              <span>Min: {weather.min}°</span>
              <span>Max: {weather.max}°</span>
            </div>
            <div className="info">
              <div>
                <strong>Pressure:</strong> {weather.pressure} hPa<br />
                <strong>Humidity:</strong> {weather.humidity}%<br />
                <strong>Visibility:</strong> {weather.visibility} km
              </div>
              <div>
                <strong>Wind:</strong> {weather.wind} m/s {weather.degree}°<br />
                <strong>Sunrise:</strong> {weather.sunrise}<br />
                <strong>Sunset:</strong> {weather.sunset}
              </div>
            </div>
          </div>
        ))}
      </div>

      {weatherData.length === 0 && !loading && !error && (
        <div className="placeholder">
          <div className="placeholder-icon">🌤️</div>
          <h3>Welcome to Weather App</h3>
          <p>Search for a city to see its current weather information</p>
        </div>
      )}

      <footer>
        <p>2025 Weather App by Chalana</p>
      </footer>
    </div>
  );
};

export default Weather;