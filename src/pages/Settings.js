import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Raksha Rane',
    email: 'raksha.rane@tmail.com',
    photo: 'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: '',
    interests: '',
    linkedIn: '',
    twitter: '',
    github: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the user profile
    console.log('Updated profile:', formData);
    // Navigate back to profile page after successful update
    navigate('/profile');
  };

  return (
    <div className="settings-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="settings-card">
              <h2 className="text-center mb-4">Edit Profile</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="profile-photo-section text-center mb-4">
                  <img 
                    src={formData.photo} 
                    alt={formData.name} 
                    className="profile-photo-preview"
                  />
                  <div className="mt-3">
                    <button type="button" className="btn btn-outline-primary">
                      <i className="fas fa-camera me-2"></i>
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Interests</label>
                  <input
                    type="text"
                    className="form-control"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    placeholder="Web Development, Machine Learning, etc."
                  />
                </div>

                <div className="social-links-section mb-4">
                  <h4 className="mb-3">Social Links</h4>
                  
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fab fa-linkedin me-2"></i>LinkedIn
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fab fa-twitter me-2"></i>Twitter
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fab fa-github me-2"></i>GitHub
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save me-2"></i>
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/profile')}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;