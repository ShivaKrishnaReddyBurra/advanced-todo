import { configureStore } from '@reduxjs/toolkit'; // Importing configureStore from Redux Toolkit
import taskReducer from './taskSlice'; // Importing taskReducer from taskSlice
import authReducer from './authSlice'; // Importing authReducer from authSlice
import { thunk } from 'redux-thunk'; // Importing thunk middleware from redux-thunk

// Configuring the Redux store
const store = configureStore({
    reducer: {
        tasks: taskReducer, // Adding taskReducer to the store
        auth: authReducer, // Adding authReducer to the store
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) // Adding thunk middleware to the store
});

export default store; // Exporting the configured store as the default export