// src/components/WeatherWidget.js
import React, { useEffect, useState } from 'react';
import { fetchWeather, getWeatherIcon } from '../services/weatherService';

const WeatherWidget = () => {
  // State variables to manage weather data, loading state, location input, and error messages
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to get user's location from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback - use coordinates to get weather
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Error callback - fallback to default location
          fetchWeatherData('London');
        }
      );
    } else {
      // Geolocation not supported
      fetchWeatherData('London');
    }
  }, []);

  // Function to fetch weather data using coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=YOUR_API_KEY`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      // Update state with fetched weather data
      setWeather({
        location: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        condition: data.weather[0].main,
      });
      setLoading(false);
    } catch (error) {
      // Handle errors and update state
      setError('Could not fetch weather data');
      setLoading(false);
    }
  };

  // Function to fetch weather data using city name
  const fetchWeatherData = async (city) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeather(city);
      if (weatherData) {
        setWeather(weatherData);
        setError('');
      } else {
        setError('Could not fetch weather data');
      }
    } catch (err) {
      setError('Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to fetch weather data for entered location
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherData(location);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="weather-widget loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="weather-widget error">
        <p>{error}</p>
        <form onSubmit={handleLocationSubmit} className="d-flex">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            className="form-control form-control-sm me-2"
          />
          <button type="submit" className="btn btn-sm btn-primary">Search</button>
        </form>
      </div>
    );
  }

  // Render weather data
  return (
    <div className="weather-widget">
      <div className="weather-header d-flex justify-content-between align-items-center">
        <h5 className="m-0">{weather.location}</h5>
        <form onSubmit={handleLocationSubmit} className="d-flex align-items-center">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Change location"
            className="form-control form-control-sm me-2"
            style={{ width: '120px' }}
          />
          <button type="submit" className="btn btn-sm btn-primary">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
      
      <div className="weather-content d-flex align-items-center mt-2">
        <div className="weather-icon me-3">
          <i className={`bi ${getWeatherIcon(weather.icon)} fs-1`}></i>
        </div>
        <div className="weather-info">
          <div className="temperature">{weather.temperature}°C</div>
          <div className="description text-capitalize">{weather.description}</div>
          <div className="details small">
            <span className="me-2"><i className="bi bi-droplet"></i> {weather.humidity}%</span>
            <span><i className="bi bi-wind"></i> {weather.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;