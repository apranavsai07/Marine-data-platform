// src/components/pages/DataHub.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageTemplate = ({ children, title, subtitle, activePage }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const FloatingParticles = React.memo(() => (
    <div className="floating-particles">
      {[...Array(9)].map((_, i) => (
        <div 
          key={i}
          className="particle"
          style={{
            left: `${(i + 1) * 10}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  ));

  const OceanWaves = React.memo(() => (
    <div className="ocean-animation">
      <div className="wave" style={{ animationDelay: '0s' }} />
      <div className="wave" style={{ animationDelay: '-2s' }} />
      <div className="wave" style={{ animationDelay: '-4s' }} />
    </div>
  ));

  const handleNavigation = (path) => {
    setShowUserMenu(false); // Close dropdown when navigating
    navigate(path);
  };

  const handleLogout = () => {
    // Clear any user data here
    alert('Signing out... Redirecting to login page');
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-nav-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  return (
    <div className="marine-platform">
      <FloatingParticles />
      <OceanWaves />

      <nav className="navbar">
        <div 
          className="logo" 
          onClick={() => handleNavigation('/')}
          style={{ cursor: 'pointer' }}
        >
          CMLRE Marine Platform
        </div>
        <div className="nav-content">
          <ul className="nav-links">
            <li><span className={`nav-link ${activePage === 'home' ? 'active' : ''}`} onClick={() => handleNavigation('/home')}>Home</span></li>
            <li><span className={`nav-link ${activePage === 'features' ? 'active' : ''}`} onClick={() => handleNavigation('/features')}>Features</span></li>
            <li><span className={`nav-link ${activePage === 'research' ? 'active' : ''}`} onClick={() => handleNavigation('/research')}>Research</span></li>
            <li><span className={`nav-link ${activePage === 'data-hub' ? 'active' : ''}`} onClick={() => handleNavigation('/data-hub')}>Data Hub</span></li>
            <li><span className={`nav-link ${activePage === 'analytics' ? 'active' : ''}`} onClick={() => handleNavigation('/analytics')}>Analytics</span></li>
          </ul>
          
          {/* Enhanced User Navigation with Dropdown */}
          <div className="user-nav-container">
            <div 
              className="user-nav" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <span className="user-greeting">Hello, Dr. Sarah</span>
              <div className="user-avatar-small">S</div>
              <div className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}>▼</div>
            </div>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">S</div>
                  <div className="dropdown-user-info">
                    <div className="dropdown-name">Dr. Sarah Johnson</div>
                    <div className="dropdown-email">demo@marine.org</div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-item" onClick={() => handleNavigation('/home')}>
                  🏠 Dashboard
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('/profile')}>
                  👤 My Profile
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('/settings')}>
                  ⚙️ Account Settings
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('/research')}>
                  📁 My Projects
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('/data-hub')}>
                  🗄️ My Data
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-item" onClick={() => alert('Help & Support coming soon!')}>
                  ❓ Help & Support
                </div>
                <div className="dropdown-item" onClick={() => alert('Documentation coming soon!')}>
                  📚 Documentation
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-item logout" onClick={handleLogout}>
                  🚪 Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

// Data Hub Page
const DataHub = () => {
 

  const DatasetCard = ({ name, size, type, lastModified, accessibility }) => (
    <div className="dataset-card">
      <div className="dataset-header">
        <div className="dataset-icon">
          {type === 'oceanographic' ? '🌊' : 
           type === 'biological' ? '🐠' : 
           type === 'genetic' ? '🧬' : '📊'}
        </div>
        <div className="dataset-info">
          <h3>{name}</h3>
          <div className="dataset-meta">
            <span>{size}</span> • <span>{type}</span> • <span className={`access-${accessibility}`}>{accessibility}</span>
          </div>
        </div>
      </div>
      <div className="dataset-actions">
        <button className="dataset-btn primary">View</button>
        <button className="dataset-btn secondary">Download</button>
        <button className="dataset-btn secondary">Share</button>
      </div>
      <div className="dataset-modified">
        Last modified: {lastModified}
      </div>
    </div>
  );

  return (
    <PageTemplate title="Data Hub" subtitle="Centralized marine data management and sharing platform" activePage="data-hub">
      <div className="data-hub-content">
        <div className="data-actions">
          <button className="action-btn primary">
            📤 Upload Dataset
          </button>
          <button className="action-btn secondary">
            🔗 Connect Data Source
          </button>
          <button className="action-btn secondary">
            📋 Import from CSV
          </button>
        </div>

        <div className="data-overview">
          <div className="data-stats">
            <div className="data-stat">
              <div className="stat-number">1.2TB</div>
              <div className="stat-label">Total Data</div>
            </div>
            <div className="data-stat">
              <div className="stat-number">47</div>
              <div className="stat-label">Datasets</div>
            </div>
            <div className="data-stat">
              <div className="stat-number">23</div>
              <div className="stat-label">Sources</div>
            </div>
            <div className="data-stat">
              <div className="stat-number">156</div>
              <div className="stat-label">Collaborators</div>
            </div>
          </div>
        </div>

        <div className="datasets-section">
          <h2>Recent Datasets</h2>
          <div className="datasets-grid">
            <DatasetCard
              name="Indo-Pacific Coral Species Database"
              size="245 MB"
              type="biological"
              lastModified="2 hours ago"
              accessibility="public"
            />
            <DatasetCard
              name="Ocean Temperature Monitoring 2024"
              size="892 MB"
              type="oceanographic"
              lastModified="1 day ago"
              accessibility="restricted"
            />
            <DatasetCard
              name="Deep Sea eDNA Sequences"
              size="1.2 GB"
              type="genetic"
              lastModified="3 days ago"
              accessibility="private"
            />
            <DatasetCard
              name="Marine Biodiversity Index"
              size="156 MB"
              type="analytical"
              lastModified="1 week ago"
              accessibility="public"
            />
          </div>
        </div>

        <div className="data-sources">
          <h2>Connected Data Sources</h2>
          <div className="sources-grid">
            <div className="source-card">
              <div className="source-icon">🛰️</div>
              <h3>Satellite Monitoring</h3>
              <p>Real-time ocean surface temperature and chlorophyll data</p>
              <div className="source-status active">Active</div>
            </div>
            <div className="source-card">
              <div className="source-icon">⚓</div>
              <h3>Ocean Buoys Network</h3>
              <p>24/7 monitoring from 45 deep-sea monitoring stations</p>
              <div className="source-status active">Active</div>
            </div>
            <div className="source-card">
              <div className="source-icon">🔬</div>
              <h3>Laboratory Systems</h3>
              <p>Automated integration with lab instruments and databases</p>
              <div className="source-status pending">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DataHub;