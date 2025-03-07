import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    // State to store the username input
    const [username, setUsername] = useState('');
    // Hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Function to handle login button click
    const handleLogin = () => {
        // Check if the username is not empty
        if (username.trim()) {
            // Dispatch the login action with the username
            dispatch(login(username));
            // Navigate to the todo page
            navigate('/todo');
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center" style={{ height: '100vh', background: '#f5fbf7' }}>
            <div className="login-form p-4 bg-white rounded shadow" style={{ width: '100%', maxWidth: '350px' }}>
                <h2 className="mb-4 text-center">Login</h2>
                <input
                    type="text"
                    className="form-control mb-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />
                <button className="btn btn-primary w-100" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;