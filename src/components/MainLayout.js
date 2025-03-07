import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import SideBar from "./SideBar";

/**
 * MainLayout component that provides the main structure of the application.
 * It includes a header, sidebar, and main content area.
 * It also manages dark mode and view mode (list or grid) states.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the main content area.
 *
 * @returns {JSX.Element} The rendered MainLayout component.
 *
 * @example
 * <MainLayout>
 *   <TaskList />
 * </MainLayout>
 */
const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };
  
  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const user = useSelector((state) => state.auth.user);

  // Pass viewMode to children via cloning
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { viewMode });
    }
    return child;
  });

  return (
    <div className="task-app">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
      />

      <div className="app-container">
        <SideBar userName={user} />
        
        <div className="main-content">
          {childrenWithProps}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;