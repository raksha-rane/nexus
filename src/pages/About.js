import React from 'react';
import './About.css';

const About = () => {
  const missionPoints = [
    {
      title: 'Personalized Guidance',
      description: 'Connect with mentors who understand your unique career path and challenges, providing tailored advice to help you succeed.',
      icon: 'fas fa-compass'
    },
    {
      title: 'Industry Expertise',
      description: 'Learn from professionals across diverse sectors who bring real-world experience and insights to every interaction.',
      icon: 'fas fa-briefcase'
    },
    {
      title: 'Career Growth',
      description: 'Accelerate your professional development through structured mentorship programs and goal-oriented sessions.',
      icon: 'fas fa-chart-line'
    }
  ];

  const platformFeatures = [
    {
      title: 'Flexible Scheduling',
      description: 'Book sessions at your convenience with our easy-to-use calendar system.',
      icon: 'fas fa-calendar-alt'
    },
    {
      title: 'Secure Communication',
      description: 'Connect with mentors through our built-in chat platform ensuring privacy and seamless interaction.',
      icon: 'fas fa-lock'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your growth with session history and achievement tracking.',
      icon: 'fas fa-tasks'
    }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="about-title">About MentorConnect</h1>
              <p className="about-subtitle">
                Bridging the gap between aspiration and achievement through meaningful mentorship
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="our-mission">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2>Our Mission</h2>
              <p className="mission-text">
                At MentorConnect, we believe that everyone deserves access to quality mentorship 
                that can transform their career trajectory. Our platform is built on the foundation 
                of making professional guidance accessible, personalized, and impactful.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {missionPoints.map((point, index) => (
              <div key={index} className="col-md-4">
                <div className="mission-card">
                  <div className="mission-icon">
                    <i className={point.icon}></i>
                  </div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2>How It Works</h2>
              <p className="platform-description">
                Our platform simplifies the mentorship process while ensuring meaningful connections 
                and productive interactions between mentors and mentees.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>Our Impact</h2>
              <p className="impact-description">
                Since our inception, MentorConnect has facilitated thousands of meaningful 
                connections between mentors and mentees. Our community continues to grow, 
                fostering an environment of shared knowledge and mutual growth.
              </p>
              <div className="impact-stats">
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Mentorship Sessions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">80%</span>
                  <span className="stat-label">Career Advancement</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "MentorConnect transformed my career trajectory. The guidance I received
                  from my mentor helped me transition into a senior role and develop crucial
                  leadership skills."
                </p>
                <div className="testimonial-author">
                  <span className="author-name">Sarah Chen</span>
                  <span className="author-title">Product Manager at Tech Co</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="join-background"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2>Join Our Community</h2>
              <p className="join-description">
                Whether you're looking to grow in your career or share your expertise,
                MentorConnect provides the platform to make it happen.
              </p>
              <div className="join-cards">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="join-card mentee-card">
                      <div className="join-card-icon">
                        <i className="fas fa-user-graduate"></i>
                      </div>
                      <h3>Find a Mentor</h3>
                      <p>Take the next step in your career with guidance from industry experts</p>
                      <a href="/mentors" className="btn btn-primary btn-lg">Start Learning</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="join-card mentor-card">
                      <div className="join-card-icon">
                        <i className="fas fa-chalkboard-teacher"></i>
                      </div>
                      <h3>Become a Mentor</h3>
                      <p>Share your expertise and make a difference in someone's career</p>
                      <a href="/become-mentor" className="btn btn-outline-primary btn-lg">Start Teaching</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;