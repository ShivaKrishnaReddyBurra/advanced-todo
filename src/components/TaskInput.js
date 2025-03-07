import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * TaskInput component allows users to input and add tasks.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.darkMode - Indicates if dark mode is enabled.
 * 
 * @returns {JSX.Element} The rendered TaskInput component.
 * 
 * @component
 * 
 * @example
 * return (
 *   <TaskInput darkMode={true} />
 * )
 */
const TaskInput = ({ darkMode }) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: uuidv4(), text: task, completed: false, important: false }));
      setTask('');
    }
  };

  // New handler for key press events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="task-header-container">
      <div className="task-header">
        <div className="dropdown">
          <button className="dropdown-toggle">
            <span>To Do</span> <i className="bi bi-chevron-down"></i>
          </button>
        </div>
      </div>

      <div className="task-input-container">
        <div className="task-input">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add A Task"
            className="task-input-field"
          />
          <div className="task-input-actions">
            <button className="action-btn">
              <i className="bi bi-calendar"></i>
            </button>
            <button className="action-btn">
              <i className="bi bi-bell"></i>
            </button>
            <button className="action-btn">
              <i className="bi bi-tag"></i>
            </button>
          </div>
        </div>

        <button className="add-task-btn" onClick={handleAddTask}>
          ADD TASK
        </button>
      </div>
    </div>
  );
};

export default TaskInput;