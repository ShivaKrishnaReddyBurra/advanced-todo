// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/weather.css'; // Import the weather styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);