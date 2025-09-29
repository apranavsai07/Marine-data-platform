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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }
  
  return children;
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
            
            {/* Protected routes - Require authentication */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features" 
              element={
                <ProtectedRoute>
                  <Features />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/research" 
              element={
                <ProtectedRoute>
                  <Research />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/data-hub" 
              element={
                <ProtectedRoute>
                  <DataHub />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home if authenticated, login if not */}
            <Route 
              path="*" 
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;