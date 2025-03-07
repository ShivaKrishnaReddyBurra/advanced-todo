import { createAsyncThunk } from '@reduxjs/toolkit';

// Use environment variables with fallback for development
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
console.log(API_KEY);
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Thunk action to fetch weather data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (location = "London", { rejectWithValue }) => {
        try {
            // Fetch weather data from the API
            const response = await fetch(
                `${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`
            );
            
            // Check if the response is not ok
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            
            // Parse the JSON response
            const data = await response.json();
            return {
                location: data.name,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                condition: data.weather[0].main,
            };
        } catch (error) {
            // Handle errors by rejecting with the error message
            return rejectWithValue(error.message);
        }
    }
);

// Original fetchWeather function (keep for backward compatibility)
export const fetchWeather = async (location = "London") => {
    try {
        // Fetch weather data from the API
        const response = await fetch(
            `${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`
        );
        
        // Check if the response is not ok
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        // Parse the JSON response
        const data = await response.json();
        return {
            location: data.name,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            condition: data.weather[0].main,
        };
    } catch (error) {
        // Log errors to the console
        console.error("Error fetching weather data:", error);
        return null;
    }
};

// Function to get the corresponding Bootstrap icon for a given weather icon code
export const getWeatherIcon = (iconCode) => {
    // Map OpenWeatherMap icon codes to Bootstrap icons
    const iconMap = {
        "01d": "bi-sun",
        "01n": "bi-moon-stars",
        "02d": "bi-cloud-sun",
        "02n": "bi-cloud-moon",
        "03d": "bi-cloud",
        "03n": "bi-cloud",
        "04d": "bi-clouds",
        "04n": "bi-clouds",
        "09d": "bi-cloud-drizzle",
        "09n": "bi-cloud-drizzle",
        "10d": "bi-cloud-rain",
        "10n": "bi-cloud-rain",
        "11d": "bi-cloud-lightning",
        "11n": "bi-cloud-lightning",
        "13d": "bi-snow",
        "13n": "bi-snow",
        "50d": "bi-cloud-fog",
        "50n": "bi-cloud-fog"
    };
    
    // Return the corresponding icon class or a default icon
    return iconMap[iconCode] || "bi-thermometer-half";
};

// Function to check if a task might be weather-dependent based on keywords
export const isOutdoorTask = (taskText) => {
    const outdoorKeywords = [
        "outdoor", "outside", "park", "garden", "hike", "walk", "run", "jog", 
        "bike", "cycling", "picnic", "beach", "swimming", "playground", "yard"
    ];
    
    // Check if the task text contains any of the outdoor keywords
    return outdoorKeywords.some(keyword => 
        taskText.toLowerCase().includes(keyword)
    );
};