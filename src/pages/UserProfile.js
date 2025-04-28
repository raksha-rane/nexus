import React from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../data/BookingContext';
import './UserProfile.css';

const UserProfile = () => {
  // Use the booking context instead of local state
  const { bookedSessions, removeBooking } = useBookings();
  
  // Mock user data - in a real app, this would come from an API/authentication
  const user = {
    name: 'Raksha Rane',
    email: 'raksha.rane@tmail.com',
    photo: 'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stats: {
      sessionsCompleted: 12,
      hoursLearned: 49,
      certificatesEarned: 3
    }
  };

  const handleCancelSession = (sessionId) => {
    if (window.confirm('Are you sure you want to cancel this session?')) {
      removeBooking(sessionId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + (date.getTimezoneOffset() * 60000))
      .toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  };

  return (
    <div className="user-profile-page">
      <div className="container py-5">
        <div className="row">
          {/* User Info */}
          <div className="col-md-4">
            <div className="profile-card">
              <div className="profile-photo-container">
                <img src={user.photo} alt={user.name} className="profile-photo" />
              </div>
              <h2>{user.name}</h2>
              <p className="email">
                <i className="fas fa-envelope me-2"></i>
                {user.email}
              </p>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-number">{user.stats.sessionsCompleted}</span>
                  <span className="stat-label">Sessions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{user.stats.hoursLearned}</span>
                  <span className="stat-label">Hours</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{user.stats.certificatesEarned}</span>
                  <span className="stat-label">Certificates</span>
                </div>
              </div>

              <Link to="/settings" className="edit-profile-btn">
                <i className="fas fa-user-edit"></i>
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Booked Sessions */}
          <div className="col-md-8">
            <div className="sessions-section">
              <h3>Your Booked Sessions</h3>
              {bookedSessions.map(session => (
                <div key={session.id} className="session-card">
                  <div className="session-info">
                    <img 
                      src={session.mentorPhoto} 
                      alt={session.mentorName} 
                      className="mentor-thumbnail"
                    />
                    <div className="session-details">
                      <h4>{session.topic}</h4>
                      <p>with {session.mentorName}</p>
                      <p className="session-time">
                        <i className="far fa-calendar-alt"></i>
                        {formatDate(session.date)} at {session.time}
                      </p>
                    </div>
                  </div>
                  <div className="session-actions">
                    <Link 
                      to={`/mentor/${session.mentorId}`} 
                      className="btn btn-outline-primary"
                    >
                      <i className="fas fa-comments me-2"></i>
                      Chat
                    </Link>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => handleCancelSession(session.id)}
                    >
                      <i className="fas fa-times me-2"></i>
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
              
              {bookedSessions.length === 0 && (
                <div className="no-sessions">
                  <i className="fas fa-calendar-plus fa-3x mb-3" style={{ color: '#1a237e' }}></i>
                  <p>You haven't booked any sessions yet.</p>
                  <Link to="/mentors" className="btn btn-primary">
                    <i className="fas fa-search me-2"></i>
                    Find a Mentor
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;