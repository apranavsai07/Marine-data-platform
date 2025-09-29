// src/components/pages/Features.js
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
    setShowUserMenu(false);
    navigate(path);
  };

  const handleLogout = () => {
    alert('Signing out... Redirecting to login page');
    navigate('/');
  };

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

// Features Page
const Features = () => {
  const navigate = useNavigate();

  const FeatureShowcase = ({ icon, title, description, features, comingSoon = false, navigateTo }) => (
    <div className={`feature-showcase ${comingSoon ? 'coming-soon' : ''}`}>
      <div className="feature-header">
        <div className="feature-icon-large">{icon}</div>
        <div className="feature-info">
          <h3>{title} {comingSoon && <span className="coming-soon-badge">Coming Soon</span>}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="feature-details">
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        {!comingSoon && navigateTo && (
          <button className="feature-try-btn" onClick={() => navigate(navigateTo)}>
            Try Now →
          </button>
        )}
      </div>
    </div>
  );

  return (
    <PageTemplate title="Platform Features" subtitle="Explore our comprehensive marine research toolkit" activePage="features">
      <div className="features-showcase">
        <FeatureShowcase
          icon="🐠"
          title="AI Species Classification"
          description="Advanced machine learning for marine species identification"
          features={[
            "Real-time image recognition with 94% accuracy",
            "Support for 2,000+ marine species",
            "Morphometric analysis integration",
            "Batch processing capabilities"
          ]}
          navigateTo="/analytics"
        />

        <FeatureShowcase
          icon="🌊"
          title="Ocean Analytics Engine"
          description="Comprehensive environmental data analysis platform"
          features={[
            "Multi-parameter correlation analysis",
            "Climate change impact modeling",
            "Real-time sensor data integration",
            "Predictive ecosystem modeling"
          ]}
          navigateTo="/analytics"
        />

        <FeatureShowcase
          icon="🧬"
          title="Molecular Data Hub"
          description="Complete genomic and eDNA analysis suite"
          features={[
            "Automated DNA sequence alignment",
            "Phylogenetic tree construction",
            "eDNA metabarcoding pipeline",
            "Population genetics analysis"
          ]}
          navigateTo="/data-hub"
        />

        <FeatureShowcase
          icon="📊"
          title="Interactive Visualizations"
          description="Dynamic charts, maps, and 3D models for data exploration"
          features={[
            "Real-time dashboard updates",
            "Geographic information systems",
            "3D ecosystem modeling",
            "Custom report generation"
          ]}
          navigateTo="/analytics"
        />

        <FeatureShowcase
          icon="🤖"
          title="Predictive AI Models"
          description="Next-generation forecasting for marine ecosystems"
          features={[
            "Biodiversity change prediction",
            "Species migration modeling",
            "Ecosystem health forecasting",
            "Climate impact simulation"
          ]}
          comingSoon={true}
        />

        <FeatureShowcase
          icon="☁️"
          title="Cloud Computing Platform"
          description="Scalable infrastructure for large-scale marine research"
          features={[
            "High-performance computing clusters",
            "Automated data processing pipelines",
            "Global data synchronization",
            "Jupyter notebook environments"
          ]}
          comingSoon={true}
        />
      </div>
    </PageTemplate>
  );
};

export default Features;