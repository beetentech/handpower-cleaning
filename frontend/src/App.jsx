import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import QuickContactBar from './components/QuickContactBar';
import Footer from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState('Full Home Deep Cleaning');

  const scrollToContact = (serviceName = null) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-main">
      <Navbar onBookClick={() => scrollToContact()} />
      <Hero onBookClick={() => scrollToContact()} />
      <AboutUs />
      <Services onSelectService={(sName) => scrollToContact(sName)} />
      <ContactForm selectedService={selectedService} />
      <QuickContactBar />
      <Footer />
    </div>
  );
}
