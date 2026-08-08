import React from 'react';
import { ShieldCheck, Sparkles, PhoneCall, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero({ onBookClick }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1>Clean Hands. Clean Space. <br/><span className="text-green">Better Life.</span></h1>

          <p>
            You make dust and stain, we make it clean! Hand Power Cleaning Service delivers professional home, office, sofa, carpet, water tank, and post-construction deep cleaning across Ganapathy, Coimbatore, Tamil Nadu.
          </p>

          <div className="hero-buttons">
            <button onClick={onBookClick} className="btn-primary" aria-label="Get Free Instant Cleaning Quote">
              <span>Get Free Instant Quote</span>
              <ArrowRight size={18} />
            </button>

            <a href="tel:7708948932" className="btn-outline" title="Call Hand Power Cleaning Coimbatore">
              <PhoneCall size={18} />
              <span>Call 7708948932</span>
            </a>
          </div>
        </div>

        <div className="hero-card-wrapper">
          <div className="hero-main-card">
            <img 
              src="/logo.jpg" 
              alt="Hand Power Cleaning Service Official Banner - Professional Deep Cleaning Services in Coimbatore" 
              className="hero-logo-banner" 
              width="280"
              height="280"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="floating-badge badge-1">
            <CheckCircle2 size={22} color="#25A244" />
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Eco-Friendly</div>
              <div style={{ fontSize: '0.95rem', color: '#0B2545' }}>100% Safe Chemicals</div>
            </div>
          </div>

          <div className="floating-badge badge-2">
            <Sparkles size={22} color="#00A8E8" />
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Equipped Team</div>
              <div style={{ fontSize: '0.95rem', color: '#0B2545' }}>Hand & Power Tools</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
