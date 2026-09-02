import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function ContactForm({ selectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service_type: selectedService || 'House Full Deep Cleaning',
    location: '',
    preferred_date: '',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  // Update service type if parent component changes selected service
  React.useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service_type: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      // The backend stores the booking and sends the email notification.
      await axios.post('https://handpower-cleaning-r588.onrender.com/api/contact', formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      });

      setStatus({ loading: false, success: true, error: '' });
      setFormData({
        name: '',
        phone: '',
        email: '',
        service_type: 'House Full Deep Cleaning',
        location: '',
        preferred_date: '',
        message: ''
      });
    } catch (err) {
      console.error('Booking submission failed:', err);
      const apiMessage = err.response?.data?.detail;
      setStatus({
        loading: false,
        success: false,
        error: apiMessage || 'Booking could not be saved. Please try again or contact us on WhatsApp.'
      });
    }
  };

  const handleWhatsAppSend = () => {
    const text = `Hi Hand Power Cleaning Service! I would like to book a service.%0A%0A*Name:* ${formData.name || 'Not provided'}%0A*Phone:* ${formData.phone || 'Not provided'}%0A*Service:* ${formData.service_type}%0A*Location:* ${formData.location || 'Coimbatore'}%0A*Date:* ${formData.preferred_date || 'Asap'}%0A*Message:* ${formData.message || 'Need quote'}`;
    window.open(`https://wa.me/919342401538?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact and Service Booking">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Send size={16} />
            <span>Get In Touch</span>
          </div>
          <h2>Contact & Service Booking</h2>
          <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
            Book your cleaning appointment or request an instant free quote in Coimbatore.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            <div>
              <h3>Hand Power Cleaning Service</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>
                "Clean Hands. Clean Space. Better Life." <br />
                Coimbatore's trusted partner for hygienic, spotless homes & offices.
              </p>

              <div className="info-item">
                <div className="info-icon">
                  <Phone size={22} />
                </div>
                <div className="info-details">
                  <h5>Call / WhatsApp</h5>
                  <a href="tel:9342401538" title="Call Hand Power Cleaning Coimbatore">+91 9342401538</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={22} />
                </div>
                <div className="info-details">
                  <h5>Location</h5>
                  <p>Ganapathy, Coimbatore, Tamil Nadu</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={22} />
                </div>
                <div className="info-details">
                  <h5>Email Address</h5>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=handpowercleaningservice@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#ffffff', 
                      fontWeight: 'bold', 
                      fontSize: '0.95rem', 
                      textDecoration: 'none', 
                      cursor: 'pointer'
                    }}
                    title="Send Email via Gmail to Hand Power Cleaning Service"
                  >
                    handpowercleaningservice@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '14px',
              marginTop: '30px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px', color: '#E2E8F0' }}>Need Instant Response on WhatsApp?</p>
              <button 
                type="button"
                onClick={handleWhatsAppSend}
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                }}
                aria-label="Chat directly on WhatsApp"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="20" 
                  height="20" 
                  fill="#ffffff"
                >
                  <path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.477-.15-.678.15-.201.301-.778.978-.954 1.179-.176.2-.352.226-.653.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.352.452-.528.15-.176.2-.301.301-.502.101-.2.05-.377-.025-.528-.075-.15-.678-1.633-.929-2.236-.244-.588-.493-.509-.678-.518-.176-.009-.377-.01-.578-.01-.201 0-.528.075-.804.377-.276.301-1.055 1.03-1.055 2.512s1.08 2.914 1.231 3.115c.151.201 2.125 3.245 5.148 4.551.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.306.176-1.431-.076-.126-.277-.201-.578-.352zm-5.462 7.618h-.008C10.22 22 8.44 21.523 6.87 20.618L2 22l1.41-4.757C2.457 15.617 1.996 13.842 2 12c.007-5.514 4.493-10 10.008-10 2.673 0 5.185 1.042 7.073 2.932A9.943 9.943 0 0 1 22 12c-.007 5.514-4.493 10-10.008 10z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrapper">
            <h3>Book Service / Get Free Quote</h3>

            {status.success && (
              <div className="alert-success" role="alert">
                <CheckCircle2 size={24} />
                <div>
                  <strong>Thank You! Your booking request has been received.</strong>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>Our team will call you at 9342401538 shortly to confirm the appointment.</p>
                </div>
              </div>
            )}

            {status.error && (
              <div style={{
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }} role="alert">
                <AlertCircle size={20} />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} aria-label="Customer Cleaning Service Booking Form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. 9342401538"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service_type">Required Service *</label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                  >
                    <option value="Commercial & Office Cleaning">Commercial & Office Cleaning</option>
                    <option value="House Full Deep Cleaning">House Full Deep Cleaning</option>
                    <option value="Restroom & Toilet Deep Cleaning">Restroom & Toilet Deep Cleaning</option>
                    <option value="Water Tank & Sump Cleaning">Water Tank & Sump Cleaning</option>
                    <option value="Underground Sump Cleaning">Underground Sump Cleaning</option>
                    <option value="Sofa, Carpet & Mattress Shampooing">Sofa, Carpet & Mattress Shampooing</option>
                    <option value="Post-Construction Cleaning">Post-Construction Cleaning</option>
                    <option value="Pest Control & Sanitization Fogging">Pest Control & Sanitization Fogging</option>
                    <option value="Glass & Window Facade Cleaning">Glass & Window Facade Cleaning</option>
                    <option value="Workplace & Floor Machine Scrubbing">Workplace & Floor Machine Scrubbing</option>
                    <option value="Villa & Multi-Room Crew Deep Cleaning">Villa & Multi-Room Crew Deep Cleaning</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Area / Location in Coimbatore *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    placeholder="e.g. RS Puram, Gandhipuram, Peelamedu"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferred_date">Preferred Date</label>
                  <input
                    type="date"
                    id="preferred_date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Specific Instructions / Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Describe your cleaning requirements (e.g., 3BHK house, stain removal)..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn-primary"
                style={{ width: '100%', marginTop: '24px', padding: '16px' }}
                aria-label="Submit Cleaning Booking Request"
              >
                {status.loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
