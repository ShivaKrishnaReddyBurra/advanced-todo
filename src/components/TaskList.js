// Import necessary modules and components
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTask, toggleImportant } from "../store/taskSlice";
import TaskWithWeather from "./TaskWithWeather";

const TaskList = () => {
    // Get tasks and filter state from the Redux store
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);
    const dispatch = useDispatch();

    // Filter tasks based on the selected filter
    let filteredTasks = tasks;
    if (filter === "important") {
        filteredTasks = tasks.filter((task) => task.important);
    }

    // Separate pending and completed tasks
    const pendingTasks = filteredTasks.filter((task) => !task.completed);
    const completedTasks = filteredTasks.filter((task) => task.completed);

    // Handlers to pass to TaskWithWeather component
    const handleToggleComplete = (id) => {
        dispatch(toggleTask(id));
    };

    const handleToggleImportant = (id) => {
        dispatch(toggleImportant(id));
    };

    return (
        <div className="task-list">
            {/* Display pending tasks */}
            {pendingTasks.map((task) => (
                <TaskWithWeather 
                    key={task.id} 
                    task={task} 
                    onToggleComplete={handleToggleComplete} 
                    onToggleImportant={handleToggleImportant} 
                />
            ))}

            {/* Display completed tasks separately */}
            {completedTasks.length > 0 && (
                <div className="completed-section">
                    <h3>Completed</h3>
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

export default TaskList;
