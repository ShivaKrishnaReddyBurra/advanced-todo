import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import Login from './pages/Login';
import Todo from './pages/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [viewMode, setViewMode] = React.useState('list');

  React.useEffect(() => {
    const handleViewModeChange = () => {
      const viewMode = document.querySelector('[viewmode]')?.getAttribute('viewmode');
      setViewMode(viewMode);
    };

    // Initial check
    handleViewModeChange();

    // Set up a mutation observer to watch for changes to the viewmode attribute
    const observer = new MutationObserver(handleViewModeChange);
    const targetNode = document.querySelector('[viewmode]');
    if (targetNode) {
      observer.observe(targetNode, { attributes: true, attributeFilter: ['viewmode'] });
    }

    // Clean up the observer on component unmount
    return () => {
      if (targetNode) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/todo" 
            element={
              <ProtectedRoute>
                <Todo viewMode={viewMode}/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;