import React from 'react';
import { Award, Users, ThumbsUp, ShieldCheck, MapPin, Phone } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <div>
          <div className="badge">
            <Award size={16} />
            <span>Trusted Local Cleaning Specialists</span>
          </div>

          <h2 style={{ fontSize: '2.4rem', margin: '16px 0' }}>
            About <span className="text-navy">Hand Power</span> Cleaning Service
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#64748B', marginBottom: '20px' }}>
            Based in <strong>Ganapathy, Coimbatore, Tamil Nadu</strong>, Hand Power Cleaning Service is dedicated to transforming residential and commercial spaces into spotless, hygienic, and invigorating environments.
          </p>

          <p style={{ fontSize: '1.02rem', color: '#64748B', marginBottom: '24px' }}>
            We combine manual hand precision with modern power-assisted extraction & scrub equipment. Whether it is deep scrubbing stubborn floor stains, removing hard-water deposits, or sanitizing water tanks and upholstered furniture, our trained team takes complete pride in every detail.
          </p>

          <div className="about-highlights">
            <div className="highlight-box">
              <Users size={24} className="text-green" style={{ marginBottom: '8px' }} />
              <h4>Trained Technicians</h4>
              <p>Experienced & background-verified cleaning professionals.</p>
            </div>

            <div className="highlight-box">
              <ShieldCheck size={24} className="text-green" style={{ marginBottom: '8px' }} />
              <h4>Eco & Pet Safe</h4>
              <p>Non-toxic chemicals safe for your family and pets.</p>
            </div>

            <div className="highlight-box">
              <ThumbsUp size={24} className="text-green" style={{ marginBottom: '8px' }} />
              <h4>Affordable Pricing</h4>
              <p>Transparent quotes without any hidden charges.</p>
            </div>

            <div className="highlight-box">
              <MapPin size={24} className="text-green" style={{ marginBottom: '8px' }} />
              <h4>Coimbatore Wide</h4>
              <p>Fast doorstep service across Coimbatore.</p>
            </div>
          </div>
        </div>

        {/* Feature Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0B2545, #13293D)',
          borderRadius: '24px',
          padding: '40px',
          color: '#ffffff',
          boxShadow: '0 16px 36px rgba(11, 37, 69, 0.15)'
        }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '16px' }}>
            Our Brand Promise
          </h3>
          <blockquote style={{
            fontSize: '1.15rem',
            fontStyle: 'italic',
            borderLeft: '4px solid #25A244',
            paddingLeft: '16px',
            margin: '20px 0',
            color: '#E2E8F0'
          }}>
            "You make dust and stain, we make it clean."
          </blockquote>
          
          <p style={{ color: '#94A3B8', marginBottom: '28px' }}>
            From single room deep cleaning to multi-storey office spaces, we bring high pressure jets, foam shampoo extractors, and heavy-duty scrubbers to your doorstep.
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#07fd34' }}>Direct-Service</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>9342401538</div>
            </div>
            <a href="tel:9342401538" className="btn-primary" style={{ padding: '10px 20px' }} title="Call Hand Power Cleaning Coimbatore">
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
