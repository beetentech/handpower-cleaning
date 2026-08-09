import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onBookClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="container nav-container" aria-label="Main Navigation">
        <a href="#home" className="logo-link" title="Hand Power Cleaning Service Homepage">
          <img 
            src="/logo.jpg" 
            alt="Hand Power Cleaning Service Logo - Best Deep Cleaning in Coimbatore" 
            className="logo-img" 
            width="54" 
            height="54"
            loading="eager"
            decoding="async"
          />
          <div className="brand-text">
            <span className="brand-name">HAND POWER</span>
            <span className="brand-sub">CLEANING SERVICE</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Call CTA & Book Button */}
        <div className="nav-cta-box">
          <a href="tel:9342401538" className="phone-pill" title="Call Hand Power Cleaning Service Coimbatore">
            <Phone size={18} className="text-green" />
            <span>9342401538</span>
          </a>

          <button onClick={onBookClick} className="btn-primary" aria-label="Book Cleaning Service">
            <ShieldCheck size={18} />
            <span>Book Now</span>
          </button>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu navigation"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: '#ffffff',
            padding: '20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
          }}
          aria-label="Mobile Navigation Drawer"
        >
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="tel:9342401538" style={{ fontWeight: 'bold', color: '#25A244' }}>📞 Call 9342401538</a>
        </div>
      )}
    </header>
  );
}
