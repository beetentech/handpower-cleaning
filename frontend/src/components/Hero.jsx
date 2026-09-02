import React from 'react';
import {
  Sparkles,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Home,
  Building2,
  Bath,
  Sofa,
  Bug,
  Waves,
  BugIcon,
  Hammer
} from 'lucide-react';

export default function Hero({ onBookClick }) {
  const services = [
    { icon: <Home size={16} />, label: 'Home Cleaning' },
    { icon: <Building2 size={16} />, label: 'Office Cleaning' },
    { icon: <Bath size={16} />, label: 'Bathroom Cleaning' },
    { icon: <Sofa size={16} />, label: 'Sofa & Carpet' },
    { icon: <Waves size={16} />, label: 'Water Tank' },
    { icon: <BugIcon size={16} />, label: 'Pest Control & Sanitization Fogging' }
  ];

  return (
    <section
      id="home"
      className="hero-section"
      aria-labelledby="hero-title"
    >
      <div className="container hero-grid">

        {/* LEFT CONTENT */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            <span>Professional Cleaning Service in Coimbatore & Ganapathy</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            Cleaning Service in
            <span className="hero-city"> Coimbatore</span>

            <span className="hero-green-line">
              for Homes, Offices & Commercial Spaces
            </span>
          </h1>

          <p className="hero-description">
            Hand Power Cleaning Service provides professional
            <strong> home cleaning</strong>,
            <strong> office cleaning</strong>,
            <strong> toilet & bathroom deep cleaning</strong>,
            sofa cleaning, carpet cleaning, water tank cleaning and
            post-construction cleaning across Coimbatore, Tamil Nadu.
          </p>

          <div
            className="hero-service-list"
            aria-label="Cleaning services offered in Coimbatore"
          >
            {services.map((service, index) => (
              <div className="hero-service-chip" key={index}>
                {service.icon}
                <span>{service.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-buttons">
            <button
              onClick={onBookClick}
              className="btn-primary"
              aria-label="Get a free cleaning service quote in Coimbatore"
            >
              <span>Get Free Instant Quote</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <a
              href="tel:+919342401538"
              className="btn-outline"
              aria-label="Call Hand Power Cleaning Service Coimbatore"
              title="Call Hand Power Cleaning Service in Coimbatore"
            >
              <PhoneCall size={18} aria-hidden="true" />
              <span>Call 9342401538</span>
            </a>
          </div>

          <p className="hero-location">
            Serving Ganapathy, Gandhipuram, Peelamedu, RS Puram,
            Saibaba Colony, Race Course, Singanallur, Ramanathapuram
            and nearby areas in Coimbatore.
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-visual">
          <div className="hero-image-card">
            <div className="hero-image-glow" aria-hidden="true"></div>

            <img
              src="/logo.jpg"
              alt="Hand Power Cleaning Service Coimbatore providing home, office, bathroom, sofa, carpet and water tank cleaning"
              className="hero-image"
              width="480"
              height="480"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="hero-floating-card floating-top">
            <CheckCircle2
              size={22}
              color="#25A244"
              aria-hidden="true"
            />
            <div>
              <span className="floating-label">Safe Cleaning</span>
              <strong>Home & Office Care</strong>
            </div>
          </div>

          <div className="hero-floating-card floating-bottom">
            <Sparkles
              size={22}
              color="#00A8E8"
              aria-hidden="true"
            />
            <div>
              <span className="floating-label">Professional Team</span>
              <strong>Deep Cleaning Experts</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}