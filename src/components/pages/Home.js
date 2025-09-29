// src/components/pages/Home.js
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
              <span className="user-greeting">Hello,User</span>
              <div className="user-avatar-small">S</div>
              <div className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}>▼</div>
            </div>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">S</div>
                  <div className="dropdown-user-info">
                    <div className="dropdown-name">User</div>
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

const Home = () => {
  const navigate = useNavigate();

  const QuickAccessCard = ({ icon, title, description, onClick, color = 'blue' }) => (
    <div 
      className={`quick-access-card ${color}`}
      onClick={onClick}
    >
      <div className="quick-access-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="quick-access-arrow">→</div>
    </div>
  );

  const StatCard = ({ number, label, trend, trendDirection }) => (
    <div className="stat-card">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
      <div className={`stat-trend ${trendDirection}`}>
        {trendDirection === 'up' ? '↗' : '↘'} {trend}
      </div>
    </div>
  );

  return (
    <PageTemplate title="Marine Research Dashboard" subtitle="Your personalized hub for ocean biodiversity research" activePage="home">
      {/* Dashboard Stats */}
      <div className="dashboard-overview">
        <div className="stats-grid">
          <StatCard 
            number="127" 
            label="Active Datasets" 
            trend="12% this month"
            trendDirection="up"
          />
          <StatCard 
            number="43" 
            label="Species Identified" 
            trend="8 new species"
            trendDirection="up"
          />
          <StatCard 
            number="89.4%" 
            label="AI Accuracy" 
            trend="2.1% improvement"
            trendDirection="up"
          />
          <StatCard 
            number="24" 
            label="Collaborators" 
            trend="Global network"
            trendDirection="up"
          />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="dashboard-content">
        <div className="section-header">
          <h2>Quick Access</h2>
          <p>Jump into your most-used research tools</p>
        </div>

        <div className="quick-access-grid">
          <QuickAccessCard
            icon="📊"
            title="Analytics Dashboard"
            description="View data visualizations and insights"
            onClick={() => navigate('/analytics')}
            color="blue"
          />
          <QuickAccessCard
            icon="🔬"
            title="Research Projects"
            description="Manage your ongoing studies"
            onClick={() => navigate('/research')}
            color="green"
          />
          <QuickAccessCard
            icon="🗄️"
            title="Data Repository"
            description="Access and upload datasets"
            onClick={() => navigate('/data-hub')}
            color="purple"
          />
          <QuickAccessCard
            icon="🐠"
            title="Species Classifier"
            description="AI-powered species identification"
            onClick={() => navigate('/features')}
            color="orange"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-activity">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <p>Your latest research updates</p>
        </div>

        <div className="activity-timeline">
          <div className="activity-item">
            <div className="activity-icon blue">📊</div>
            <div className="activity-content">
              <h4>Completed coral reef biodiversity analysis</h4>
              <p>Analyzed 234 species across 12 reef sites</p>
              <small>2 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon green">🌊</div>
            <div className="activity-content">
              <h4>Uploaded ocean temperature dataset</h4>
              <p>Temperature data from 15 monitoring buoys</p>
              <small>1 day ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon purple">🧬</div>
            <div className="activity-content">
              <h4>DNA sequencing results received</h4>
              <p>Results for 45 marine samples processed</p>
              <small>3 days ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon orange">🤖</div>
            <div className="activity-content">
              <h4>AI model training completed</h4>
              <p>Species classification accuracy improved to 94.2%</p>
              <small>1 week ago</small>
            </div>
          </div>
        </div>
      </div>

      {/* Research Highlights */}
      <div className="dashboard-highlights">
        <div className="section-header">
          <h2>Research Highlights</h2>
          <p>Discover trending research and insights</p>
        </div>

        <div className="highlights-grid">
          <div className="highlight-card featured">
            <div className="highlight-badge">Featured</div>
            <h3>Ocean Acidification Impact Study</h3>
            <p>New research reveals significant impact on coral reef ecosystems across the Indo-Pacific region.</p>
            <div className="highlight-stats">
              <span>🌊 15 Locations</span>
              <span>📊 500+ Samples</span>
              <span>👥 8 Researchers</span>
            </div>
          </div>
          <div className="highlight-card">
            <h3>AI-Driven Species Discovery</h3>
            <p>Machine learning algorithms identified 12 new marine species from deep-sea exploration data.</p>
            <div className="highlight-stats">
              <span>🤖 94% Accuracy</span>
              <span>🐠 12 New Species</span>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Home;