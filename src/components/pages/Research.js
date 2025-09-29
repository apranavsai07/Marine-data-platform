// src/components/pages/Research.js
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

// Research Page
const Research = () => {
  const navigate = useNavigate();

  const ProjectCard = ({ title, status, progress, collaborators, lastUpdate }) => (
    <div className="project-card">
      <div className="project-header">
        <h3>{title}</h3>
        <span className={`project-status ${status.toLowerCase()}`}>{status}</span>
      </div>
      <div className="project-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress}% Complete</span>
      </div>
      <div className="project-details">
        <div className="project-collaborators">
          <span>👥 {collaborators} Collaborators</span>
        </div>
        <div className="project-update">
          <span>📅 Updated {lastUpdate}</span>
        </div>
      </div>
    </div>
  );

  return (
    <PageTemplate title="Research Projects" subtitle="Manage and collaborate on marine research initiatives" activePage="research">
      <div className="research-content">
        <div className="research-actions">
          <button className="action-btn primary" onClick={() => navigate('/data-hub')}>
            📊 New Project
          </button>
          <button className="action-btn secondary">
            📁 Import Data
          </button>
          <button className="action-btn secondary">
            👥 Invite Collaborators
          </button>
        </div>

        <div className="projects-section">
          <h2>Active Projects</h2>
          <div className="projects-grid">
            <ProjectCard
              title="Coral Reef Biodiversity Assessment"
              status="Active"
              progress={75}
              collaborators={8}
              lastUpdate="2 hours ago"
            />
            <ProjectCard
              title="Deep Sea Species Discovery"
              status="Active"
              progress={45}
              collaborators={12}
              lastUpdate="1 day ago"
            />
            <ProjectCard
              title="Ocean Temperature Impact Study"
              status="Review"
              progress={95}
              collaborators={6}
              lastUpdate="3 days ago"
            />
            <ProjectCard
              title="Marine Plastic Pollution Analysis"
              status="Planning"
              progress={15}
              collaborators={4}
              lastUpdate="1 week ago"
            />
          </div>
        </div>

        <div className="research-tools">
          <h2>Research Tools</h2>
          <div className="tools-grid">
            <div className="tool-card" onClick={() => navigate('/analytics')}>
              <div className="tool-icon">🔬</div>
              <h3>Species Analyzer</h3>
              <p>AI-powered species identification and classification</p>
            </div>
            <div className="tool-card" onClick={() => navigate('/data-hub')}>
              <div className="tool-icon">📈</div>
              <h3>Data Visualizer</h3>
              <p>Create interactive charts and visualizations</p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">💻</div>
              <h3>Jupyter Notebooks</h3>
              <p>Cloud-based research environment</p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">🌐</div>
              <h3>Collaboration Hub</h3>
              <p>Share and discuss research findings</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Research;