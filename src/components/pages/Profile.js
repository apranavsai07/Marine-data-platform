// src/components/pages/Profile.js
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'demo@marine.org',
    institution: 'Marine Research Institute',
    department: 'Marine Biology',
    position: 'Senior Research Scientist',
    phone: '+1 (555) 123-4567',
    location: 'Woods Hole, MA',
    bio: 'Marine biologist specializing in coral reef ecosystems and biodiversity conservation with over 15 years of research experience.',
    researchInterests: 'Coral Reef Ecology, Marine Biodiversity, Climate Change Impact',
    orcid: '0000-0002-1825-0097',
    googleScholar: 'scholar.google.com/citations?user=example'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <>
      <style>{`
        .profile-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .profile-avatar-large {
          flex-shrink: 0;
        }

        .avatar-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: bold;
          color: white;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
        }

        .profile-info {
          flex: 1;
        }

        .profile-info h2 {
          font-size: 2rem;
          color: #e0f2fe;
          margin: 0 0 0.5rem 0;
        }

        .profile-info p {
          color: #94a3b8;
          margin: 0.25rem 0;
          font-size: 1rem;
        }

        .edit-profile-btn {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .profile-sections {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .profile-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
        }

        .profile-section h3 {
          color: #38bdf8;
          font-size: 1.5rem;
          margin: 0 0 1.5rem 0;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(56, 189, 248, 0.2);
        }

        .profile-fields {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-group.half {
          flex: 1;
        }

        .field-group label {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .field-group input,
        .field-group textarea {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #e0f2fe;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .field-group input:focus,
        .field-group textarea:focus {
          outline: none;
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.05);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
        }

        .field-group input:disabled,
        .field-group textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.02);
        }

        .field-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .profile-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        .save-btn,
        .cancel-btn {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        }

        .cancel-btn {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .cancel-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #f87171;
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .field-row {
            grid-template-columns: 1fr;
          }

          .profile-actions {
            flex-direction: column;
          }

          .save-btn,
          .cancel-btn {
            width: 100%;
          }
        }
      `}</style>

      <PageTemplate title="My Profile" subtitle="Manage your personal information and research profile" activePage="profile">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar-large">
              <div className="avatar-circle">S</div>
            </div>
            <div className="profile-info">
              <h2>{profileData.firstName} {profileData.lastName}</h2>
              <p>{profileData.position}</p>
              <p>{profileData.institution}</p>
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="profile-sections">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div className="profile-fields">
                <div className="field-row">
                  <div className="field-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="field-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="field-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="field-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="field-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Professional Information</h3>
              <div className="profile-fields">
                <div className="field-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={profileData.institution}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="field-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={profileData.department}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="field-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={profileData.position}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="field-group">
                  <label>Research Interests</label>
                  <textarea
                    name="researchInterests"
                    value={profileData.researchInterests}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="3"
                  />
                </div>
                
                <div className="field-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Academic Links</h3>
              <div className="profile-fields">
                <div className="field-group">
                  <label>ORCID iD</label>
                  <input
                    type="text"
                    name="orcid"
                    value={profileData.orcid}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="field-group">
                  <label>Google Scholar</label>
                  <input
                    type="url"
                    name="googleScholar"
                    value={profileData.googleScholar}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

export default Profile;