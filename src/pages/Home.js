import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      title: 'Career Guidance',
      description: 'Get personalized career advice from industry experts',
      icon: <i className="fas fa-compass"></i>
    },
    {
      title: 'Skill Development',
      description: 'Learn in-demand skills from experienced professionals',
      icon: <i className="fas fa-graduation-cap"></i>
    },
    {
      title: 'Resume Review',
      description: 'Get your resume reviewed by hiring managers',
      icon: <i className="fas fa-file-alt"></i>
    },
    {
      title: 'Mock Interviews',
      description: 'Practice with real interview scenarios',
      icon: <i className="fas fa-comments"></i>
    },
    {
      title: 'Referrals',
      description: 'Get referred to top companies by industry insiders',
      icon: <i className="fas fa-handshake"></i>
    },
    {
      title: 'Networking',
      description: 'Connect with industry professionals and expand your professional network',
      icon: <i className="fas fa-network-wired"></i>
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-title">Unlock Your Potential</h1>
            <h2 className="hero-subtitle">Connect with Industry Experts</h2>
            <p className="hero-description">
              Take your career to new heights with personalized mentorship from professionals 
              who've walked the path before you. Get guidance, build skills, and make 
              connections that last.
            </p>
            <div className="hero-cta">
              <Link to="/mentors" className="btn btn-primary btn-lg me-3">Find Your Mentor</Link>
              <Link to="/about" className="btn btn-outline-light btn-lg">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="features-title">Transform Your Career Journey</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="feature-card text-center">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Take the Next Step?</h2>
          <p className="lead">Join thousands of professionals who have transformed their careers through expert mentorship</p>
          <Link to="/mentors" className="btn btn-light btn-lg">
            Connect with a Mentor Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;