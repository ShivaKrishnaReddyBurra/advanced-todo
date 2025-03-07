import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated async login function
const simulateAuth = (username) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(username);
    }, 500);
  });
};

// Async thunk for handling login
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (username, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call to authenticate
      const user = await simulateAuth(username);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for handling logout
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call to log out
      // For now, just clear localStorage
      localStorage.removeItem('user');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

/**
 * Slice for authentication state management.
 * 
 * @namespace authSlice
 * 
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The synchronous reducers for the slice.
 * @property {Function} reducers.login - Reducer to handle user login.
 * @property {Function} reducers.logout - Reducer to handle user logout.
 * @property {Function} extraReducers - The asynchronous reducers for the slice.
 * 
 * @function reducers.login
 * @param {Object} state - The current state of the slice.
 * @param {Object} action - The action dispatched.
 * @param {Object} action.payload - The user data to be stored in the state.
 * 
 * @function reducers.logout
 * @param {Object} state - The current state of the slice.
 * 
 * @function extraReducers
 * @param {Object} builder - The builder to add cases for handling asynchronous actions.
 * 
 * @function extraReducers.addCase
 * @param {Function} loginAsync.pending - Case to handle pending state of loginAsync.
 * @param {Function} loginAsync.fulfilled - Case to handle fulfilled state of loginAsync.
 * @param {Function} loginAsync.rejected - Case to handle rejected state of loginAsync.
 * @param {Function} logoutAsync.fulfilled - Case to handle fulfilled state of logoutAsync.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      });
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;