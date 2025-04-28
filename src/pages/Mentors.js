import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mentorsData from '../data/mentors.json';
import './Mentors.css';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  useEffect(() => {
    setMentors(mentorsData.mentors);
    setFilteredMentors(mentorsData.mentors);
  }, []);

  const allExpertise = [...new Set(mentors.flatMap(mentor => mentor.expertise))];

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterMentors(term, selectedExpertise);
  };

  const toggleExpertise = (expertise) => {
    const updatedExpertise = selectedExpertise.includes(expertise)
      ? selectedExpertise.filter(e => e !== expertise)
      : [...selectedExpertise, expertise];
    setSelectedExpertise(updatedExpertise);
    filterMentors(searchTerm, updatedExpertise);
  };

  const filterMentors = (term, expertise) => {
    let filtered = mentors;
    
    if (term) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(term) ||
        mentor.title.toLowerCase().includes(term) ||
        mentor.bio.toLowerCase().includes(term)
      );
    }

    if (expertise.length > 0) {
      filtered = filtered.filter(mentor =>
        expertise.every(exp => mentor.expertise.includes(exp))
      );
    }

    setFilteredMentors(filtered);
  };

  return (
    <div className="mentors-page">
      <div className="mentors-hero">
        <div className="container">
          <h1>Find Your Perfect Mentor</h1>
          <p>Connect with experienced professionals who can guide your career journey</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Filters Section */}
          <div className="col-lg-3">
            <div className="filters-wrapper">
              <div className="mentors-filters">
                <div className="search-box">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search mentors..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>

                <h3 className="h5 mb-3">Areas of Expertise</h3>
                <div className="expertise-tags">
                  {allExpertise.map(expertise => (
                    <span
                      key={expertise}
                      className={`expertise-badge ${selectedExpertise.includes(expertise) ? 'active' : ''}`}
                      onClick={() => toggleExpertise(expertise)}
                    >
                      {expertise}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="col-lg-9">
            {filteredMentors.length === 0 ? (
              <div className="no-results">
                <i className="fas fa-user-slash"></i>
                <h3 className="h4 mb-2">No mentors found</h3>
                <p className="text-muted">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredMentors.map(mentor => (
                  <div key={mentor.id} className="col-md-6 col-lg-4">
                    <div className="mentor-card">
                      <div className="mentor-card-header">
                        <img
                          src={mentor.photo}
                          alt={mentor.name}
                          className="mentor-photo"
                        />
                        <span className="mentor-availability">
                          <i className="far fa-clock me-2"></i>
                          {mentor.availableSlots.length} slots
                        </span>
                      </div>

                      <div className="mentor-info">
                        <h3>{mentor.name}</h3>
                        <div className="title">{mentor.title}</div>
                        <div className="experience">
                          <i className="fas fa-briefcase me-2"></i>
                          {mentor.experience} years experience
                        </div>
                        
                        <p className="bio-preview">
                          {mentor.bio.substring(0, 100)}...
                        </p>

                        <div className="expertise-tags">
                          {mentor.expertise.slice(0, 3).map(exp => (
                            <span key={exp} className="expertise-badge">
                              {exp}
                            </span>
                          ))}
                          {mentor.expertise.length > 3 && (
                            <span className="expertise-badge">
                              +{mentor.expertise.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="mentor-stats">
                          <div className="mentor-stat">
                            <i className="fas fa-star"></i>
                            <span>{(Math.random() * (5 - 4.5) + 4.5).toFixed(1)}</span>
                          </div>
                          <div className="mentor-stat">
                            <i className="fas fa-users"></i>
                            <span>{Math.floor(Math.random() * (50 - 10) + 10)} mentees</span>
                          </div>
                        </div>

                        <div className="mentor-actions">
                          <Link
                            to={`/mentor/${mentor.id}`}
                            className="btn btn-primary"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;