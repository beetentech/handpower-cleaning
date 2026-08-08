import React from 'react';
import { Phone } from 'lucide-react';

export default function QuickContactBar() {
  return (
    <div className="floating-actions" aria-label="Quick Contact Actions">
      <a 
        href="https://wa.me/917708948932?text=Hi%20Hand%20Power%20Cleaning%20Service,%20I%20would%20like%20to%20inquire%20about%20your%20cleaning%20services%20in%20Coimbatore." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="action-circle action-whatsapp"
        title="Chat on WhatsApp"
        aria-label="Chat with Hand Power Cleaning on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          fill="#ffffff"
        >
          <path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.477-.15-.678.15-.201.301-.778.978-.954 1.179-.176.2-.352.226-.653.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.352.452-.528.15-.176.2-.301.301-.502.101-.2.05-.377-.025-.528-.075-.15-.678-1.633-.929-2.236-.244-.588-.493-.509-.678-.518-.176-.009-.377-.01-.578-.01-.201 0-.528.075-.804.377-.276.301-1.055 1.03-1.055 2.512s1.08 2.914 1.231 3.115c.151.201 2.125 3.245 5.148 4.551.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.306.176-1.431-.076-.126-.277-.201-.578-.352zm-5.462 7.618h-.008C10.22 22 8.44 21.523 6.87 20.618L2 22l1.41-4.757C2.457 15.617 1.996 13.842 2 12c.007-5.514 4.493-10 10.008-10 2.673 0 5.185 1.042 7.073 2.932A9.943 9.943 0 0 1 22 12c-.007 5.514-4.493 10-10.008 10z"/>
        </svg>
      </a>

      <a 
        href="tel:7708948932" 
        className="action-circle action-call"
        title="Call 7708948932"
        aria-label="Call Hand Power Cleaning Coimbatore"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
