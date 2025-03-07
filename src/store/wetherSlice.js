import { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherData } from '../services/weatherService';

const initialState = {
  weatherData: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  location: 'London' // Default location
};

/**
 * A slice for managing weather-related state.
 * 
 * @namespace weatherSlice
 * 
 * @property {Object} initialState - The initial state of the weather slice.
 * @property {string} initialState.location - The current location for weather data.
 * @property {string} initialState.status - The status of the weather data fetch operation.
 * @property {Object|null} initialState.weatherData - The fetched weather data.
 * @property {string|null} initialState.error - The error message if the fetch operation fails.
 * 
 * @property {Object} reducers - The reducers for the weather slice.
 * @property {Function} reducers.setLocation - A reducer to set the location.
 * @param {Object} reducers.setLocation.state - The current state.
 * @param {Object} reducers.setLocation.action - The action object.
 * @param {string} reducers.setLocation.action.payload - The new location.
 * 
 * @property {Function} extraReducers - The extra reducers for handling async actions.
 * @param {Object} extraReducers.builder - The builder object for adding cases.
 * @param {Function} extraReducers.builder.addCase - A function to add a case to the builder.
 * 
 * @function extraReducers.builder.addCase(fetchWeatherData.pending)
 * @description Sets the status to 'loading' when the fetchWeatherData action is pending.
 * @param {Object} state - The current state.
 * 
 * @function extraReducers.builder.addCase(fetchWeatherData.fulfilled)
 * @description Sets the status to 'succeeded', updates weatherData, and clears any errors when the fetchWeatherData action is fulfilled.
 * @param {Object} state - The current state.
 * @param {Object} action - The action object.
 * @param {Object} action.payload - The fetched weather data.
 * 
 * @function extraReducers.builder.addCase(fetchWeatherData.rejected)
 * @description Sets the status to 'failed' and updates the error message when the fetchWeatherData action is rejected.
 * @param {Object} state - The current state.
 * @param {Object} action - The action object.
 * @param {string} action.payload - The error message.
 */
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setLocation } = weatherSlice.actions;

// Selector functions
export const selectWeatherData = (state) => state.weather.weatherData;
export const selectWeatherStatus = (state) => state.weather.status;
export const selectWeatherError = (state) => state.weather.error;

export default weatherSlice.reducer;