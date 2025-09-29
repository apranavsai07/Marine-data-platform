// src/components/PageTemplate.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageTemplate.css';


const PageTemplate = ({ title, subtitle, activePage, children }) => {
  const navigate = useNavigate();
   console.log('PageTemplate loaded with:', { title, subtitle, activePage }); // Add this line

  const navigationItems = [
    { id: 'home', label: 'Home', path: '/home', icon: '🏠' },
    { id: 'features', label: 'Features', path: '/features', icon: '⚡' },
    { id: 'research', label: 'Research', path: '/research', icon: '🔬' },
    { id: 'data-hub', label: 'Data Hub', path: '/data-hub', icon: '📊' },
    { id: 'analytics', label: 'Analytics', path: '/analytics', icon: '📈' }
  ];

  return (
    <div className="page-template">
      {/* Navigation Header */}
      <header className="page-header">
        <div className="header-container">
          <div className="logo-section">
            <h1 className="platform-title">🌊 Marine Research Platform</h1>
          </div>
          <nav className="main-navigation">
            {navigationItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <button className="profile-btn">👤</button>
            <button className="settings-btn">⚙️</button>
            <button className="logout-btn" onClick={() => navigate('/')}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="page-main">
        <div className="page-title-section">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        
        <div className="page-content">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-container">
          <p>&copy; 2025 Marine Research Platform. All rights reserved.</p>
          <div className="footer-links">
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Service</button>
            <button className="footer-link">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageTemplate;