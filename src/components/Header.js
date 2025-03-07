import React from 'react';

// Header component receives props: darkMode, toggleDarkMode, viewMode, toggleViewMode
const Header = ({ darkMode, toggleDarkMode, viewMode, toggleViewMode }) => {
    return (
        <header className="app-header">
            <div className="header-left">
                {/* Menu button */}
                <button className="menu-btn">
                    <i className="bi bi-list"></i>
                </button>
                
                {/* Logo */}
                <div className="logo">
                    <i className="bi bi-check2-circle"></i>
                    DoIt
                </div>
            </div>

            <div className="header-right">
                {/* Search button */}
                <button className="search-btn">
                    <i className="bi bi-search"></i>
                </button>
                
                {/* View mode toggle button */}
                <button className="view-btn" onClick={toggleViewMode}>
                    <i className={`bi ${viewMode === 'grid' ? 'bi-list' : 'bi-grid'}`}></i>
                </button>
                
                {/* Dark mode toggle button */}
                <button className="theme-btn" onClick={toggleDarkMode}>
                    <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
                </button>
            </div>
        </header>
    );
};

export default Header;