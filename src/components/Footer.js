import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const socials = [
    { icon: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'github', url: 'https://github.com', label: 'GitHub' }
  ];

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubscribe = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    // Here you would typically make an API call to subscribe the user
    setSubscribeSuccess(true);
    setEmail('');
    setTimeout(() => setSubscribeSuccess(false), 3000);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="brand-link">MentorConnect</Link>
            <p>Empowering careers through mentorship</p>
            
            <div className="footer-socials">
              {socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-nav">
            <h4>Join Our Community</h4>
            <div className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                />
                <button 
                  className={`btn ${subscribeSuccess ? 'btn-success' : ''}`} 
                  type="button"
                  onClick={handleSubscribe}
                >
                  {subscribeSuccess ? (
                    <>
                      <i className="fas fa-check"></i>
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">© {new Date().getFullYear()} MentorConnect. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <ul className="legal-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;