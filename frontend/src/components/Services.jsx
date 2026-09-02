import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const fallbackServices = [
  {
    id: 1,
    title: "Commercial & Office Cleaning",
    short_description: "Complete professional cleaning solutions for corporate offices, retail stores, and commercial spaces.",
    full_description: "Desk dusting, floor single-disc scrubbing, restroom sanitization, and glass partition cleaning.",
    image_url: "/images/Residential and commercial cleaning1.jpeg",
    image_alt: "Commercial and office cleaning services in Coimbatore with professional glass partition cleaning and floor vacuuming"
  },
  {
    id: 2,
    title: "House Full Deep Cleaning",
    short_description: "Comprehensive top-to-bottom deep sanitization & cleaning for apartments, villas, and independent homes.",
    full_description: "Includes floor scrubbing, kitchen degreasing, bathroom stain removal, window glass wiping, and balcony wash.",
    image_url: "/images/House cleaning1.jpeg",
    image_alt: "House full deep cleaning in Coimbatore with kitchen and living room floor scrubbing and sanitization"
  },
  {
    id: 3,
    title: "Restroom & Toilet Deep Cleaning",
    short_description: "Specialized hard-water stain removal, tile descaling, and high-hygiene disinfection for restrooms & toilets.",
    full_description: "Tap descaling, wall tile scrubbing, toilet bowl stain removal, and floor sanitization.",
    image_url: "/images/restroom and toilet1.jpeg",
    image_alt: "Restroom and toilet deep cleaning in Coimbatore with tile descaling, sink polishing, and stain removal"
  },
  {
    id: 4,
    title: "Water Tank & Sump Cleaning",
    short_description: "Hygienic multi-stage high-pressure jet cleaning & sludge removal for underground sumps and overhead water tanks.",
    full_description: "Dewatering, heavy sludge vacuuming, high-pressure jet wash, anti-bacterial spray treatment.",
    image_url: "/images/watertank1.jpeg",
    image_alt: "Water tank and sump high pressure jet cleaning service in Coimbatore with multi-stage disinfection"
  },
  {
    id: 5,
    title: "Underground Sump Cleaning",
    short_description: "Heavy-duty deep sludge removal and high-suction slurry vacuuming for large domestic & commercial sumps.",
    full_description: "Industrial vacuum extraction, chemical wall scrubbing, UV anti-bacterial disinfection.",
    image_url: "/images/sump1.jpeg",
    image_alt: "Underground water sump deep cleaning with vacuum slurry extraction and pressure jet in Coimbatore"
  },
  {
    id: 6,
    title: "Sofa, Carpet & Mattress Shampooing",
    short_description: "Deep extraction foam shampooing to eliminate dust mites, stubborn stains, and odors from fabric sofas & mattresses.",
    full_description: "Dry vacuuming, chemical foam injection, dual technician extraction machine cleaning.",
    image_url: "/images/sofa1.jpeg",
    image_alt: "Sofa carpet and mattress shampooing service in Coimbatore using deep foam extraction machine"
  },
  {
    id: 7,
    title: "Pest Control & Sanitization Fogging",
    short_description: "Complete anti-termite, cockroach, bedbug management and chemical fumigation mist fogging services.",
    full_description: "Odorless herbal spray, thermal fogging, gel bait application, and full indoor disinfection.",
    image_url: "/images/pest control1.jpeg",
    image_alt: "Pest control and chemical sanitization mist fogging in Coimbatore with protective equipment"
  },
  {
    id: 8,
    title: "Glass & Window Facade Cleaning",
    short_description: "Streak-free crystal clear glass squeegee washing for tall windows, sliding doors, and architectural glass facades.",
    full_description: "Purified water wash, mineral stain removal, rubber squeegee wiping, high-reach glass cleaning.",
    image_url: "/images/glass1.jpeg",
    image_alt: "Glass and window facade cleaning in Coimbatore with streak-free squeegee washing"
  },
  {
    id: 9,
    title: "Workplace & Floor Machine Scrubbing",
    short_description: "Heavy-duty single-disc motorized floor scrubbing, conference table sanitization, and janitorial contract cleaning.",
    full_description: "Commercial floor buffing, table disinfection, janitor cart sanitation, daily office maintenance.",
    image_url: "/images/office1.jpeg",
    image_alt: "Workplace and commercial single disc floor machine scrubbing in Coimbatore tech parks and offices"
  },
  {
    id: 10,
    title: "Commercial Daily Cleaning",
    short_description: "Reliable daily cleaning services for offices, shops, showrooms, clinics, and other commercial spaces to maintain a clean and professional environment.",
    full_description: "Our commercial daily cleaning service covers floor cleaning, dusting, workstations, washrooms, common areas, glass surfaces, and waste removal to keep your business space clean, hygienic, and ready every day.",
    image_url: "/images/commercial daily1.jpeg",
    image_alt: "Professional commercial daily cleaning service for offices shops and business spaces in Coimbatore."
  }
];

export default function Services({ onSelectService }) {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    // Attempt to fetch live dynamic services from Python FastAPI backend if available
    axios.get(`${API_URL}/services`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((item, index) => ({
            ...item,
            image_url: fallbackServices[index % fallbackServices.length].image_url,
            image_alt: fallbackServices[index % fallbackServices.length].image_alt
          }));
          setServices(merged);
        }
      })
      .catch(err => {
        console.log("Using client services list with optimized images");
      });
  }, []);

  return (
    <section id="services" className="services-section" aria-label="Professional Cleaning Services">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Sparkles size={16} />
            <span>Our Cleaning Solutions</span>
          </div>
          <h2>Professional Cleaning Services in Coimbatore</h2>
          <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
            Tailored cleaning packages for homes, commercial properties, and specialized industrial needs in Coimbatore.
          </p>
        </div>

        <div className="services-grid">
          {services.map((item) => (
            <article key={item.id} className="service-card">
              <div>
                <div className="service-image-wrapper">
                  <img 
                    src={item.image_url} 
                    alt={item.image_alt || `${item.title} - Hand Power Cleaning Service Coimbatore`} 
                    className="service-img" 
                    loading="lazy"
                    decoding="async"
                    width="360"
                    height="200"
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.short_description}</p>
              </div>

              <div className="service-footer">
                <div>
                  <span className="price-tag">{item.price_starting}</span>
                </div>

                <button 
                  onClick={() => onSelectService(item.title)}
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '0.92rem' }}
                  aria-label={`Book ${item.title}`}
                >
                  <span>Book Service</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}