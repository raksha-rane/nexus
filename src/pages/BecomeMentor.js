import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BecomeMentor.css';

const BecomeMentor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    expertise: [],
    experience: '',
    bio: '',
    photo: null,
    linkedIn: '',
    availability: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [expertiseInput, setExpertiseInput] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const predefinedExpertise = [
    'Software Development',
    'Data Science',
    'Product Management',
    'UX Design',
    'Digital Marketing',
    'Business Strategy',
    'Leadership',
    'Cloud Computing',
    'Machine Learning',
    'Project Management'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.bio.trim() || formData.bio.length < 100) {
      newErrors.bio = 'Please provide a detailed bio (minimum 100 characters)';
    }
    if (formData.expertise.length === 0) {
      newErrors.expertise = 'Please select at least one area of expertise';
    }
    if (!formData.experience) {
      newErrors.experience = 'Years of experience is required';
    }
    if (!formData.availability) {
      newErrors.availability = 'Please select your weekly availability';
    }
    if (!formData.linkedIn.includes('linkedin.com')) {
      newErrors.linkedIn = 'Please provide a valid LinkedIn URL';
    }
    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addExpertise = (skill) => {
    if (skill && !formData.expertise.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, skill]
      }));
      setExpertiseInput('');
    }
  };

  const removeExpertise = (skill) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(item => item !== skill)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      navigate('/mentors');
    }
  };

  return (
    <div className="become-mentor-page">
      <div className="become-mentor-hero">
        <div className="container">
          <h1>Share Your Expertise</h1>
          <p>Join our community of mentors and help shape the next generation of professionals</p>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="mentor-form-card">
              <h2>Mentor Application</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Professional Title *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Senior Software Engineer"
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Years of Experience *</label>
                  <input
                    type="number"
                    className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                  {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Profile Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {photoPreview && (
                    <div className="photo-preview mt-2">
                      <img src={photoPreview} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Areas of Expertise *</label>
                  <div className="expertise-suggestions mb-2">
                    {predefinedExpertise.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        className={`expertise-tag ${formData.expertise.includes(skill) ? 'active' : ''}`}
                        onClick={() => addExpertise(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <div className="custom-expertise">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={expertiseInput}
                        onChange={(e) => setExpertiseInput(e.target.value)}
                        placeholder="Add custom expertise"
                      />
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => addExpertise(expertiseInput)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="selected-expertise mt-2">
                    {formData.expertise.map((skill) => (
                      <span key={skill} className="expertise-badge">
                        {skill}
                        <button type="button" onClick={() => removeExpertise(skill)}>×</button>
                      </span>
                    ))}
                  </div>
                  {errors.expertise && <div className="text-danger small mt-1">{errors.expertise}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Professional Bio *</label>
                  <textarea
                    className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Share your professional journey and why you want to be a mentor"
                    required
                  ></textarea>
                  {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Weekly Availability *</label>
                  <select
                    className={`form-select ${errors.availability ? 'is-invalid' : ''}`}
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select availability</option>
                    <option value="1-5">1-5 hours/week</option>
                    <option value="5-10">5-10 hours/week</option>
                    <option value="10-20">10-20 hours/week</option>
                    <option value="20+">20+ hours/week</option>
                  </select>
                  {errors.availability && <div className="invalid-feedback">{errors.availability}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">LinkedIn Profile *</label>
                  <input
                    type="url"
                    className={`form-control ${errors.linkedIn ? 'is-invalid' : ''}`}
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/your-profile"
                    required
                  />
                  {errors.linkedIn && <div className="invalid-feedback">{errors.linkedIn}</div>}
                </div>

                <div className="form-group mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                      id="terms"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the terms and conditions of being a mentor
                    </label>
                    {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary submit-button">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeMentor;