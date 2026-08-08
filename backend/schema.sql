-- PostgreSQL Database Schema Script for Hand Power Cleaning Service

CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    service_type VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    preferred_date VARCHAR(50),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    icon_name VARCHAR(50),
    price_starting VARCHAR(50)
);

-- Seed default services
INSERT INTO services (title, short_description, full_description, icon_name, price_starting)
VALUES 
('Full Home Deep Cleaning', 'Comprehensive top-to-bottom deep sanitization & cleaning for apartments, villas, and independent homes.', 'Includes dusting, floor scrubbing, kitchen degreasing, bathroom sanitization, balcony washing, and window glass wiping.', 'Home', '₹2,999'),
('Commercial & Office Cleaning', 'Professional workplace, retail showroom, and office cleaning services for a pristine corporate environment.', 'Dusting desks, sanitizing restrooms, floor scrubbing, glass partitioning clean, and waste disposal.', 'Building2', '₹4,999'),
('Water Tank & Sump Cleaning', 'Hygienic 6-stage high-pressure jet cleaning for underground sumps and overhead water tanks.', 'Dewatering, sludge removal, high pressure washing, anti-bacterial spray, and UV sanitization.', 'Droplets', '₹999'),
('Sofa, Carpet & Mattress Shampooing', 'Deep extraction foam shampooing to eliminate dust mites, stains, and odors from soft furnishings.', 'Vacuuming, chemical foam injection, spot removal, extraction machine drying.', 'Sparkles', '₹799'),
('Post-Construction Cleaning', 'Heavy-duty cement, paint splatter, and dust removal for newly built or renovated properties.', 'Scraping paint splatters, chemical scrubbing of tiles, grout cleaning, total dust extraction.', 'HardHat', '₹5,999'),
('Kitchen & Bathroom Deep Cleaning', 'Specialized oil & grease removal for kitchens, plus hard-water stain removal for bathrooms.', 'Chimney exterior cleaning, tile degreasing, cabinet wiping, tap descaling, and toilet bowl disinfection.', 'Zap', '₹1,499')
ON CONFLICT DO NOTHING;
