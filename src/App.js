// src/App.js
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MarinePlatform from './components/MarinePlatform';
import Home from './components/pages/Home';
import Features from './components/pages/Features';
import Research from './components/pages/Research';
import DataHub from './components/pages/DataHub';
import Analytics from './components/pages/Analytics';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';
import './App.css';

// Create Authentication Context
export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public route - Landing page with login */}
            <Route path="/" element={<MarinePlatform />} />
            
            {/* Public routes - Allow guest access */}
            <Route path="/home" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/research" element={<Research />} />
            <Route path="/data-hub" element={<DataHub />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* Protected routes - Require authentication */}
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/" replace />
              } 
            />
            <Route 
              path="/settings" 
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/" replace />
              } 
            />

            {/* Catch all - redirect to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;