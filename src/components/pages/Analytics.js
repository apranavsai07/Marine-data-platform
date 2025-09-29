// src/components/pages/Analytics.js
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

// Analytics Page
const Analytics = () => {
  const navigate = useNavigate();

  const ChartCard = ({ title, type, data, description }) => (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-type">{type}</div>
      </div>
      <div className="chart-placeholder">
        <div className="chart-visual">
          📊
        </div>
        <p>{description}</p>
      </div>
      <div className="chart-actions">
        <button className="chart-btn">View Details</button>
        <button className="chart-btn">Export</button>
      </div>
    </div>
  );

  return (
    <PageTemplate title="Analytics Dashboard" subtitle="Advanced data analysis and visualization tools" activePage="analytics">
      <div className="analytics-content">
        <div className="analytics-actions">
          <button className="action-btn primary">
            📊 Create Visualization
          </button>
          <button className="action-btn secondary">
            🔍 Run Analysis
          </button>
          <button className="action-btn secondary">
            📄 Generate Report
          </button>
        </div>

        <div className="analytics-overview">
          <div className="metric-cards">
            <div className="metric-card">
              <div className="metric-icon">🌊</div>
              <div className="metric-value">28.5°C</div>
              <div className="metric-label">Avg Ocean Temp</div>
              <div className="metric-change positive">+0.8°C</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🐠</div>
              <div className="metric-value">2,847</div>
              <div className="metric-label">Species Identified</div>
              <div className="metric-change positive">+12%</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">📊</div>
              <div className="metric-value">94.2%</div>
              <div className="metric-label">AI Accuracy</div>
              <div className="metric-change positive">+2.1%</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🔬</div>
              <div className="metric-value">156</div>
              <div className="metric-label">Active Studies</div>
              <div className="metric-change neutral">+3</div>
            </div>
          </div>
        </div>

        <div className="charts-section">
          <h2>Data Visualizations</h2>
          <div className="charts-grid">
            <ChartCard
              title="Species Distribution"
              type="Heat Map"
              description="Geographic distribution of marine species across monitoring sites"
            />
            <ChartCard
              title="Temperature Trends"
              type="Time Series"
              description="Ocean temperature changes over the past 12 months"
            />
            <ChartCard
              title="Biodiversity Index"
              type="Line Chart"
              description="Ecosystem health indicators and biodiversity metrics"
            />
            <ChartCard
              title="Species Composition"
              type="Pie Chart"
              description="Relative abundance of different species groups"
            />
            <ChartCard
              title="Correlation Analysis"
              type="Scatter Plot"
              description="Relationship between environmental factors and species diversity"
            />
            <ChartCard
              title="Predictive Model"
              type="Forecast"
              description="AI-driven predictions for ecosystem changes"
            />
          </div>
        </div>

        <div className="analysis-tools">
          <h2>Analysis Tools</h2>
          <div className="tools-section">
            <div className="tool-category">
              <h3>🤖 Machine Learning</h3>
              <div className="tool-items">
                <button className="tool-item">Species Classifier</button>
                <button className="tool-item">Anomaly Detection</button>
                <button className="tool-item">Predictive Modeling</button>
              </div>
            </div>
            <div className="tool-category">
              <h3>📈 Statistical Analysis</h3>
              <div className="tool-items">
                <button className="tool-item">Correlation Analysis</button>
                <button className="tool-item">Regression Models</button>
                <button className="tool-item">Hypothesis Testing</button>
              </div>
            </div>
            <div className="tool-category">
              <h3>🗺️ Spatial Analysis</h3>
              <div className="tool-items">
                <button className="tool-item">Geographic Mapping</button>
                <button className="tool-item">Habitat Modeling</button>
                <button className="tool-item">Distribution Analysis</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Analytics;