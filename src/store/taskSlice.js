import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load tasks from local storage
const loadTasksFromStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
};

// Save tasks to local storage
const saveTasksToStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Async thunk action to fetch tasks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            // Simulate loading tasks from localStorage
            const tasks = loadTasksFromStorage();
            return tasks;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk action to save a task
export const saveTask = createAsyncThunk(
    'tasks/saveTask',
    async (task, { getState, rejectWithValue }) => {
        try {
            // Simulate saving the task
            return task;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Initial state of the task slice
const initialState = {
    tasks: loadTasksFromStorage(),
    filter: 'all',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

// Create the task slice
export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Add a new task
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            saveTasksToStorage(state.tasks);
        },
        // Remove a task by id
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveTasksToStorage(state.tasks);
        },
        // Toggle the completed status of a task by id
        toggleTask: (state, action) => {
            state.tasks = state.tasks.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
            saveTasksToStorage(state.tasks);
        },
        // Toggle the important status of a task by id
        toggleImportant: (state, action) => {
            state.tasks = state.tasks.map(task =>
                task.id === action.payload ? { ...task, important: !task.important } : task
            );
            saveTasksToStorage(state.tasks);
        },
        // Set the filter for displaying tasks
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(saveTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                } else {
                    state.tasks.push(action.payload);
                }
                saveTasksToStorage(state.tasks);
            });
    }
});

// Export regular action creators
export const { addTask, removeTask, toggleTask, toggleImportant, setFilter } = taskSlice.actions;

// Export thunk action creators that wrap the functionality of regular actions
export const addTaskAsync = (task) => async (dispatch) => {
    try {
        // Dispatch the regular action to add a task
        dispatch(addTask(task));
    } catch (error) {
        console.error('Failed to add task:', error);
    }
};

export const toggleTaskAsync = (id) => async (dispatch) => {
    try {
        // Dispatch the regular action to toggle a task
        dispatch(toggleTask(id));
    } catch (error) {
        console.error('Failed to toggle task:', error);
    }
};

export default taskSlice.reducer;