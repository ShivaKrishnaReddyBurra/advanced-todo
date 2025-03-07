import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTask, toggleImportant } from "../store/taskSlice";
import { isOutdoorTask, fetchWeather, getWeatherIcon } from "../services/weatherService";
import TaskWithWeather from "./TaskWithWeather";

/**
 * TaskGrid component renders a grid of tasks with filtering and weather information.
 * 
 * This component:
 * - Fetches weather data if any task is an outdoor task.
 * - Filters tasks based on the selected filter (important, completed, planned).
 * - Separates tasks into pending and completed categories.
 * - Renders each task with a checkbox, text, and an optional weather badge for outdoor tasks.
 * - Allows toggling task completion and importance.
 * 
 * @component
 * @returns {JSX.Element} The rendered TaskGrid component.
 */
const TaskGrid = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);
    const dispatch = useDispatch();

    // Store weather info for each task
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        const fetchWeatherData = async () => {
            const data = await fetchWeather();
            setWeatherData(data);
        };

        // Check if any task is an outdoor task before fetching weather
        if (tasks.some(task => isOutdoorTask(task.text))) {
            fetchWeatherData();
        }
    }, [tasks]);
    const handleToggleComplete = (id) => {
        dispatch(toggleTask(id));
      };
    
      const handleToggleImportant = (id) => {
        dispatch(toggleImportant(id));
      };

    // Filter tasks
    let filteredTasks = tasks;
    if (filter === "important") {
        filteredTasks = tasks.filter((task) => task.important);
    } else if (filter === "completed") {
        filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "planned") {
        filteredTasks = tasks.filter((task) => !task.completed);
    }

    // Separate pending and completed tasks
    const pendingTasks = filteredTasks.filter((task) => !task.completed);
    const completedTasks = filteredTasks.filter((task) => task.completed);

    // Render a task card
    const renderTaskCard = (task) => (
        <div 
            key={task.id} 
            className={`task-card ${task.completed ? 'completed' : ''}`}
        >
            <div className="task-card-content">
                <div className="task-checkbox">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => dispatch(toggleTask(task.id))}
                        id={`grid-task-${task.id}`}
                    />
                    <label htmlFor={`grid-task-${task.id}`}>
                        {task.text}

                        {/* Weather badge for outdoor tasks */}
                        {isOutdoorTask(task.text) && weatherData && (
                            <span className="badge bg-info ms-2">
                                <i className={`bi ${getWeatherIcon(weatherData.icon)}`}></i> 
                                {weatherData.temperature}°C
                            </span>
                        )}
                    </label>
                </div>

                <button 
                    className={`star-btn ${task.important ? 'active' : ''}`}
                    onClick={() => dispatch(toggleImportant(task.id))}
                >
                    <i className={`bi ${task.important ? 'bi-star-fill' : 'bi-star'}`}></i>
                </button>
            </div>
        </div>
    );

    return (
        <div className="task-list">
            {/* Pending tasks grid */}
            <div className="grid-container">
                {pendingTasks.map(renderTaskCard)}
            </div>

            {/* Completed tasks section - styling matched with TaskList */}
            {completedTasks.length > 0 && (
        <div className="completed-section">
          <h3>
          Completed
          </h3>
          {completedTasks.map((task) => (
            <TaskWithWeather 
              key={task.id} 
              task={task} 
              onToggleComplete={handleToggleComplete} 
              onToggleImportant={handleToggleImportant} 
            />
          ))}
        </div>
      )}
        </div>
    );
};

export default TaskGrid;