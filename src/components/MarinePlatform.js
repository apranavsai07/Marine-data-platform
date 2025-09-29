// MarinePlatform.js - WITH DROPDOWN MENU ADDED

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

// Move these components OUTSIDE the main component to prevent re-creation
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

const FeatureCard = React.memo(({ icon, title, description, delay = 0, isNew = false, isPremium = false, onClick }) => (
  <div
    className={`feature-card ${isNew ? 'new-feature' : ''} ${isPremium ? 'premium-feature' : ''}`}
    style={{ animationDelay: `${delay}s`, cursor: onClick ? 'pointer' : 'default' }}
    onClick={onClick}
  >
    <div className="feature-icon">{icon}</div>
    <h3>
      {title}
      {isNew && <span className="new-badge">NEW</span>}
      {isPremium && <span className="premium-badge">PRO</span>}
    </h3>
    <p>{description}</p>
  </div>
));

const MarinePlatform = () => {
  const { login, logout: authLogout } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    institution: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // Simulated user database
  const users = useMemo(() => [
    {
      email: 'demo@marine.org',
      password: 'demo123',
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      institution: 'Marine Research Institute'
    }
  ], []);

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

  const handleNavigation = useCallback((path) => {
    setShowUserMenu(false);
    navigate(path);
  }, [navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const foundUser = users.find(u =>
        u.email === formData.email && u.password === formData.password
      );

      if (foundUser) {
        setUser(foundUser);
        setIsLoggedIn(true);
        setCurrentView('dashboard');
        login(foundUser); // Update global auth state
        navigate('/home'); // Navigate to home after successful login
      } else {
        alert('Invalid credentials. Try demo@marine.org / demo123');
      }
      setIsLoading(false);
    }, 1500);
  }, [formData.email, formData.password, users, login, navigate]);

  const handleRegister = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newUser = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        institution: formData.institution
      };

      setUser(newUser);
      setIsLoggedIn(true);
      setCurrentView('dashboard');
      login(newUser); // Update global auth state
      navigate('/home'); // Navigate to home after registration
      setIsLoading(false);
    }, 1500);
  }, [formData, login, navigate]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentView('login');
    setShowUserMenu(false);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      institution: ''
    });

    // Call authLogout and navigate in the next tick
    authLogout();

    // Use setTimeout to ensure state updates first
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  }, [authLogout, navigate]);

  const switchToRegister = useCallback(() => {
    setCurrentView('register');
  }, []);

  const switchToLogin = useCallback(() => {
    setCurrentView('login');
  }, []);

  const UserDashboard = useMemo(() => {
    if (!user) return null;

    return (
      <div className="login-container user-dashboard">
        <div className="user-header">
          <div className="user-avatar">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div className="user-info">
            <h2 className="user-name">Smart ogin, {user.firstName}!</h2>
            <p className="user-institution">{user.institution}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-number">127</span>
            <span className="stat-label">Datasets Analyzed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">43</span>
            <span className="stat-label">Species Identified</span>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button className="action-btn primary" onClick={() => handleNavigation('/analytics')}>
            📊 New Analysis
          </button>
          <button className="action-btn secondary" onClick={() => handleNavigation('/research')}>
            📁 My Projects
          </button>
          <button className="action-btn secondary" onClick={() => handleNavigation('/settings')}>
            ⚙️ Settings
          </button>
        </div>

        <div className="recent-activity">
          <h4>Recent Activity</h4>
          <div className="activity-item">
            <span className="activity-icon">🐠</span>
            <div className="activity-details">
              <p>Analyzed coral reef biodiversity</p>
              <small>2 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🌊</span>
            <div className="activity-details">
              <p>Uploaded ocean temperature data</p>
              <small>1 day ago</small>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="login-btn logout-btn"
          type="button"
        >
          Sign Out
        </button>
      </div>
    );
  }, [user, handleLogout, handleNavigation]);

  const LoginForm = useMemo(() => (
    <div className="login-container" key="login-form-container">
      <h2 className="login-title">Welcome</h2>
      <p className="login-subtitle">Sign in to access your marine research tools</p>

      <form onSubmit={handleLogin} key="login-form">
        <div className="form-group">
          <label htmlFor="login-email">Email Address</label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="researcher@marine.org"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="username"
            required
            key="login-email-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            required
            key="login-password-input"
          />
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In to Platform'}
        </button>
      </form>

      <div className="demo-credentials">
        <small>Demo: demo@marine.org / demo123</small>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <div className="register-link">
        New to marine research?
        <button
          type="button"
          className="link-btn"
          onClick={switchToRegister}
        >
          Create account
        </button>
      </div>
    </div>
  ), [formData.email, formData.password, handleInputChange, handleLogin, isLoading, switchToRegister]);

  const RegisterForm = useMemo(() => (
    <div className="login-container" key="register-form-container">
      <h2 className="login-title">Join CMLRE Platform</h2>
      <p className="login-subtitle">Create your account to start marine research</p>

      <form onSubmit={handleRegister} key="register-form">
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="register-firstName">First Name</label>
            <input
              type="text"
              id="register-firstName"
              name="firstName"
              placeholder="Dr. Jane"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              key="register-firstName-input"
            />
          </div>
          <div className="form-group half">
            <label htmlFor="register-lastName">Last Name</label>
            <input
              type="text"
              id="register-lastName"
              name="lastName"
              placeholder="Smith"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              key="register-lastName-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="register-institution">Institution</label>
          <input
            type="text"
            id="register-institution"
            name="institution"
            placeholder="Marine Research Institute"
            value={formData.institution}
            onChange={handleInputChange}
            required
            key="register-institution-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="register-email">Email Address</label>
          <input
            type="email"
            id="register-email"
            name="email"
            placeholder="researcher@institution.edu"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="username"
            required
            key="register-email-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            required
            key="register-password-input"
          />
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="divider">
        <span>or</span>
      </div>

      <div className="register-link">
        Already have an account?
        <button
          type="button"
          className="link-btn"
          onClick={switchToLogin}
        >
          Sign in here
        </button>
      </div>
    </div>
  ), [formData, handleInputChange, handleRegister, isLoading, switchToLogin]);

  const featureCards = useMemo(() => {
    const baseFeatures = [
      <FeatureCard
        key="species"
        icon="🐠"
        title="Species Classification"
        description="AI-powered identification and taxonomy"
        delay={0.1}
        onClick={() => handleNavigation('/features')}
      />,
      <FeatureCard
        key="ocean"
        icon="🌊"
        title="Ocean Analytics"
        description="Environmental parameter correlation"
        delay={0.2}
        onClick={() => handleNavigation('/analytics')}
      />
    ];

    if (isLoggedIn) {
      return [
        ...baseFeatures,
        <FeatureCard
          key="monitoring"
          icon="📡"
          title="Real-time Monitoring"
          description="Live data from ocean sensor networks"
          delay={0.3}
          isNew={true}
          onClick={() => handleNavigation('/analytics')}
        />,
        <FeatureCard
          key="predictive"
          icon="🤖"
          title="Predictive Models"
          description="AI-driven ecosystem forecasting"
          delay={0.4}
          isPremium={true}
          onClick={() => handleNavigation('/analytics')}
        />,
        <FeatureCard
          key="jupyter"
          icon="💻"
          title="Jupyter Workspace"
          description="Cloud-based research environment"
          delay={0.5}
          onClick={() => handleNavigation('/research')}
        />,
        <FeatureCard
          key="archives"
          icon="🗄️"
          title="Data Archives"
          description="50+ years of marine research data"
          delay={0.6}
          onClick={() => handleNavigation('/data-hub')}
        />,
        <FeatureCard
          key="lab"
          icon="🔬"
          title="Lab Integration"
          description="Connect your lab instruments"
          delay={0.7}
          isNew={true}
          onClick={() => handleNavigation('/research')}
        />,
        <FeatureCard
          key="collaboration"
          icon="🌐"
          title="Global Collaboration"
          description="Share insights with researchers worldwide"
          delay={0.8}
          onClick={() => handleNavigation('/research')}
        />
      ];
    } else {
      return [
        ...baseFeatures,
        <FeatureCard
          key="molecular"
          icon="🧬"
          title="Molecular Data"
          description="eDNA and genetic analysis tools"
          delay={0.3}
          onClick={() => handleNavigation('/data-hub')}
        />,
        <FeatureCard
          key="visualization"
          icon="📊"
          title="Visualization"
          description="Interactive dashboards and maps"
          delay={0.4}
          onClick={() => handleNavigation('/analytics')}
        />
      ];
    }
  }, [isLoggedIn, handleNavigation]);

  return (
    <div className="marine-platform">
      <FloatingParticles />
      <OceanWaves />

      <nav className="navbar">
        <div className="logo">
          AQUAINTEL
        </div>
        <div className="nav-content">
          <ul className="nav-links">
            <li><span className="nav-link" onClick={() => handleNavigation('/home')}>Home</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation('/features')}>Features</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation('/research')}>Research</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation('/data-hub')}>Data Hub</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation('/analytics')}>Analytics</span></li>
          </ul>

          {/* ADDED: User Dropdown Menu */}
          {isLoggedIn && user && (
            <div className="user-nav-container">
              <div
                className="user-nav"
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <span className="user-greeting">Hello, {user.firstName}</span>
                <div className="user-avatar-small">
                  {user.firstName.charAt(0)}
                </div>
                <div className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}>▼</div>
              </div>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">{user.firstName.charAt(0)}</div>
                    <div className="dropdown-user-info">
                      <div className="dropdown-name">{user.firstName} {user.lastName}</div>
                      <div className="dropdown-email">{user.email}</div>
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
          )}
        </div>
      </nav>

      <div className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">
            {isLoggedIn && user ? `Welcome Back, ${user.firstName}!` : 'Marine Biodiversity Intelligence'}
          </h1>
          <p className="hero-subtitle">
            {isLoggedIn
              ? `Continue your marine research journey with advanced AI-powered tools and analytics.`
              : `At the Marine Data Platform, our mission is to unify oceanography, taxonomy, and molecular biology through 
              AI-driven analytics. We aim to empower researchers, educators, and institutions with accessible, 
              intelligent tools that accelerate marine discoveries, promote sustainable ecosystem management, and foster 
              global collaboration for the protection of our oceans.`
            }
          </p>

          <div className="features-grid">
            {featureCards}
          </div>
        </div>

        <div className="login-section">
          {isLoggedIn ? (
            UserDashboard
          ) : currentView === 'register' ? (
            RegisterForm
          ) : (
            LoginForm
          )}
        </div>
      </div>
    </div>
  );
};

export default MarinePlatform;