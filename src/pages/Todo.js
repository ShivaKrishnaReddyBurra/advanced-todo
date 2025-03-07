import React from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import TaskGrid from '../components/TaskGrid';
import MainLayout from '../components/MainLayout';

// Todo component that takes a viewMode prop
const Todo = ({ viewMode }) => {
    return (
        <MainLayout>
            <div className="todo-content mx-3">
                {/* Input field for adding new tasks */}
                <TaskInput />
                {/* Conditionally render TaskGrid or TaskList based on viewMode */}
                {viewMode === 'grid' ? <TaskGrid /> : <TaskList />}
            </div>
        </MainLayout>
    );
};

export default Todo;