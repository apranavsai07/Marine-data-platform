// src/components/pages/Settings.js
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

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    dataAlerts: false,
    newsletterSubscription: true,
    twoFactorAuth: false,
    publicProfile: true,
    theme: 'ocean-blue',
    language: 'english',
    timezone: 'UTC-5',
    dataRetention: '1-year'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion process initiated. You will receive a confirmation email.');
    }
  };

  return (
    <>
      <style>{`
        .settings-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .settings-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
        }

        .settings-section h3 {
          color: #38bdf8;
          font-size: 1.5rem;
          margin: 0 0 1.5rem 0;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(56, 189, 248, 0.2);
        }

        .settings-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .setting-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(56, 189, 248, 0.2);
        }

        .setting-info {
          flex: 1;
          margin-right: 2rem;
        }

        .setting-info h4 {
          color: #e0f2fe;
          font-size: 1.1rem;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .setting-info p {
          color: #94a3b8;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        /* Toggle Switch Styling */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 30px;
          flex-shrink: 0;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(148, 163, 184, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.4);
          transition: 0.4s;
          border-radius: 30px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          left: 4px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .toggle-switch input:checked + .toggle-slider {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(30px);
        }

        /* Select Dropdown Styling */
        .setting-select {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #e0f2fe;
          font-size: 1rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .setting-select:hover {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.05);
        }

        .setting-select:focus {
          outline: none;
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
        }

        .setting-select option {
          background: #1e293b;
          color: #e0f2fe;
        }

        /* Password Section */
        .password-section {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .password-section h4 {
          color: #e0f2fe;
          font-size: 1.1rem;
          margin: 0 0 1.5rem 0;
          font-weight: 600;
        }

        .password-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-group label {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .field-group input {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #e0f2fe;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .field-group input:focus {
          outline: none;
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.05);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
        }

        .update-password-btn {
          margin-top: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .update-password-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        /* Settings Actions */
        .settings-actions {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }

        .save-settings-btn {
          padding: 1rem 3rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-settings-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
        }

        /* Danger Zone */
        .danger-zone {
          border: 2px solid rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.05);
        }

        .danger-zone h3 {
          color: #f87171;
          border-bottom-color: rgba(239, 68, 68, 0.2);
        }

        .danger-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
        }

        .danger-info {
          flex: 1;
          margin-right: 2rem;
        }

        .danger-info h4 {
          color: #fca5a5;
          font-size: 1.1rem;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .danger-info p {
          color: #fca5a5;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        .delete-account-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: 2px solid #ef4444;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .delete-account-btn:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .settings-content {
            padding: 1rem;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .setting-info {
            margin-right: 0;
          }

          .toggle-switch {
            align-self: flex-end;
          }

          .setting-select {
            width: 100%;
          }

          .danger-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .danger-info {
            margin-right: 0;
          }

          .delete-account-btn {
            width: 100%;
          }

          .save-settings-btn {
            width: 100%;
          }
        }
      `}</style>

      <PageTemplate title="Account Settings" subtitle="Manage your account preferences and security" activePage="settings">
        <div className="settings-content">
          
          <div className="settings-section">
            <h3>Notification Preferences</h3>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive email updates about your account activity</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications}
                    onChange={() => handleSettingToggle('emailNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Project Updates</h4>
                  <p>Get notified when collaborators update shared projects</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.projectUpdates}
                    onChange={() => handleSettingToggle('projectUpdates')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Data Alerts</h4>
                  <p>Receive alerts for unusual data patterns or anomalies</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.dataAlerts}
                    onChange={() => handleSettingToggle('dataAlerts')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Newsletter Subscription</h4>
                  <p>Monthly updates about new features and marine research</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.newsletterSubscription}
                    onChange={() => handleSettingToggle('newsletterSubscription')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Security</h3>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.twoFactorAuth}
                    onChange={() => handleSettingToggle('twoFactorAuth')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="password-section">
                <h4>Change Password</h4>
                <div className="password-fields">
                  <div className="field-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="field-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="field-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className="update-password-btn" onClick={handlePasswordSubmit}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Privacy</h3>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Public Profile</h4>
                  <p>Make your profile visible to other researchers</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.publicProfile}
                    onChange={() => handleSettingToggle('publicProfile')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Data Retention Period</h4>
                  <p>How long to keep your research data</p>
                </div>
                <select 
                  name="dataRetention" 
                  value={settings.dataRetention}
                  onChange={handleSelectChange}
                  className="setting-select"
                >
                  <option value="6-months">6 Months</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-years">2 Years</option>
                  <option value="indefinite">Indefinite</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Preferences</h3>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Theme</h4>
                  <p>Choose your preferred color scheme</p>
                </div>
                <select 
                  name="theme" 
                  value={settings.theme}
                  onChange={handleSelectChange}
                  className="setting-select"
                >
                  <option value="ocean-blue">Ocean Blue</option>
                  <option value="dark-mode">Dark Mode</option>
                  <option value="light-mode">Light Mode</option>
                  <option value="coral-reef">Coral Reef</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Language</h4>
                  <p>Select your preferred language</p>
                </div>
                <select 
                  name="language" 
                  value={settings.language}
                  onChange={handleSelectChange}
                  className="setting-select"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Timezone</h4>
                  <p>Set your local timezone</p>
                </div>
                <select 
                  name="timezone" 
                  value={settings.timezone}
                  onChange={handleSelectChange}
                  className="setting-select"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">UTC (GMT)</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                  <option value="UTC+8">China Standard Time (UTC+8)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-settings-btn" onClick={handleSaveSettings}>
              Save All Settings
            </button>
          </div>

          <div className="settings-section danger-zone">
            <h3>Danger Zone</h3>
            <div className="danger-content">
              <div className="danger-info">
                <h4>Delete Account</h4>
                <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
              </div>
              <button className="delete-account-btn" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>

        </div>
      </PageTemplate>
    </>
  );
};

export default Settings;