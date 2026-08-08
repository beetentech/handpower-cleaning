import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" aria-label="Website Footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/logo.jpg" 
                alt="Hand Power Cleaning Service - Trusted Cleaning Company in Coimbatore" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #25A244' }} 
                width="42" 
                height="42" 
                loading="lazy" 
                decoding="async"
              />
              <h3 style={{ margin: 0 }}>HAND POWER</h3>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '20px' }}>
              Hand Power Cleaning Service - "Clean Hands. Clean Space. Better Life." Professional deep cleaning solutions in Ganapathy, Coimbatore, Tamil Nadu.
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#25A244', fontWeight: 'bold' }}>
              <ShieldCheck size={20} />
              <span>100% Quality & Hygiene Guaranteed</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#contact">Book Appointment</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Commercial Cleaning</a></li>
              <li><a href="#services">House Deep Cleaning</a></li>
              <li><a href="#services">Restroom Cleaning</a></li>
              <li><a href="#services">Water Tank Cleaning</a></li>
              <li><a href="#services">Sofa Shampooing</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Info</h4>
            <p style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
              <Phone size={28} color="#25A244" />
              <a 
                href="tel:7708948932" 
                style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }} 
                title="Call Hand Power Cleaning Service"
              >
                7708948932
              </a>
            </p>
            <p style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
              <Mail size={28} color="#25A244" style={{ flexShrink: 0 }} />
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=handpowercleaningservice@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: '#ffffff', 
                  fontWeight: '600', 
                  fontSize: '0.88rem', 
                  textDecoration: 'none', 
                  cursor: 'pointer'
                }}
                title="Send Email via Gmail to Hand Power Cleaning Service"
              >
                handpowercleaningservice@gmail.com
              </a>
            </p>
            <p style={{ display: 'flex', gap: '10px', marginBottom: '12px', color: '#ffffff', alignItems: 'center' }}>
              <MapPin size={28} color="#25A244" />
              <span>Ganapathy, Coimbatore,Tamil Nadu</span>
            </p>
          </div>
        </div>

        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.9rem' }}>© {new Date().getFullYear()} Hand Power Cleaning Service. All Rights Reserved.</p>
          
          <div style={{ textAlign: 'center', marginTop: '6px' }}>
            <div style={{ fontSize: '0.86rem', color: '#94A3B8', marginTop: '4px', letterSpacing: '0.5px' }}>
              Developed & Managed by <strong style={{ color: '#F8FAFC', letterSpacing: '0.8px' }}>BEETEN TECH</strong>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}