import React, { useEffect, useState } from 'react';
import { isOutdoorTask, fetchWeather, getWeatherIcon } from '../services/weatherService';

const TaskWithWeather = ({ task, onToggleComplete, onToggleImportant }) => {
    const [weatherInfo, setWeatherInfo] = useState(null); // State to store weather information
    const [showWeather, setShowWeather] = useState(false); // State to control the display of weather information

    useEffect(() => {
        // Check if the task is likely related to outdoor activities
        if (isOutdoorTask(task.text) && !weatherInfo) {
            // Only fetch weather when needed
            setShowWeather(true);
            fetchWeatherData();
        }
    }, [task.text]); // Dependency array to re-run effect when task.text changes

    const fetchWeatherData = async () => {
        try {
            const data = await fetchWeather(); // Fetch weather data from the service
            if (data) {
                setWeatherInfo(data); // Update state with fetched weather data
            }
        } catch (error) {
            console.error("Could not fetch weather data", error); // Log error if fetching fails
        }
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-checkbox">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)} // Toggle task completion status
                    id={`task-${task.id}`}
                />
                <label htmlFor={`task-${task.id}`}>
                    {task.text}
                    
                    {/* Render weather information for outdoor tasks */}
                    {showWeather && weatherInfo && (
                        <span className="badge bg-info ms-2">
                            <i className={`bi ${getWeatherIcon(weatherInfo.icon)}`}></i> 
                            {weatherInfo.temperature}°C
                        </span>
                    )}
                </label>
            </div>

            <button className={`star-btn ${task.important ? 'active' : ''}`} onClick={() => onToggleImportant(task.id)}>
                <i className={`bi ${task.important ? 'bi-star-fill' : 'bi-star'}`}></i> {/* Toggle task importance */}
            </button>
        </div>
    );
};

export default TaskWithWeather;