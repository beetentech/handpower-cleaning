from sqlalchemy.orm import Session
from app.models import Inquiry, ServiceItem
from app.schemas import InquiryCreate

def create_inquiry(db: Session, inquiry: InquiryCreate):
    db_inquiry = Inquiry(
        name=inquiry.name,
        phone=inquiry.phone,
        email=inquiry.email,
        service_type=inquiry.service_type,
        location=inquiry.location,
        preferred_date=inquiry.preferred_date,
        message=inquiry.message
    )
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

def get_inquiries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Inquiry).order_by(Inquiry.id.desc()).offset(skip).limit(limit).all()

def update_inquiry_status(db: Session, inquiry_id: int, new_status: str):
    db_inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if db_inquiry:
        db_inquiry.status = new_status
        db.commit()
        db.refresh(db_inquiry)
    return db_inquiry

def seed_default_services_if_empty(db: Session):
    # If service count is not 10, refresh database services
    if db.query(ServiceItem).count() != 10:
        db.query(ServiceItem).delete()
        default_services = [
            ServiceItem(
                title="Residential & commercial cleaning",
                short_description="Complete professional cleaning solutions for residential homes, apartments, and commercial spaces.",
                full_description="Top-to-bottom dusting, floor scrubbing, window cleaning, and sanitization for homes and business premises.",
                icon_name="Building2"
            ),
            ServiceItem(
                title="House Full deep cleaning",
                short_description="Comprehensive top-to-bottom deep sanitization & cleaning for apartments, villas, and independent homes.",
                full_description="Includes floor scrubbing, kitchen degreasing, bathroom stain removal, window glass wiping, and balcony wash.",
                icon_name="Home"
            ),
            ServiceItem(
                title="Restroom & toilet deep cleaning",
                short_description="Specialized hard-water stain removal, tile descaling, and high-hygiene disinfection for restrooms & toilets.",
                full_description="Acid-free tile scrubbing, tap & shower head descaling, toilet bowl sanitization, and odor elimination.",
                icon_name="Bath"
            ),
            ServiceItem(
                title="Water Tank cleaning",
                short_description="Hygienic multi-stage high-pressure jet cleaning for overhead water storage tanks.",
                full_description="Dewatering, sludge removal, high-pressure jet wash, anti-bacterial spray treatment, and UV sanitization.",
                icon_name="Droplets"
            ),
            ServiceItem(
                title="Sump cleaning",
                short_description="Heavy-duty sludge extraction, high-pressure cleaning, and sanitization for underground sumps.",
                full_description="Submersible pump dewatering, manual sludge removal, jet washing, and disinfectant treatment.",
                icon_name="Layers"
            ),
            ServiceItem(
                title="Sofa & mattress washing",
                short_description="Deep extraction foam shampooing to eliminate dust mites, stubborn stains, and unpleasant odors.",
                full_description="Dry vacuuming, chemical foam injection, spot scrubbing, and moisture extraction for sofas and mattresses.",
                icon_name="Armchair"
            ),
            ServiceItem(
                title="Pest control",
                short_description="Safe & eco-friendly pest management for cockroaches, termites, bedbugs, and mosquitoes.",
                full_description="Odorless herbal gel treatment, chemical spray barrier, and long-term pest prevention control.",
                icon_name="Bug"
            ),
            ServiceItem(
                title="Glass cleaning",
                short_description="Streak-free glass cleaning for interior & exterior windows, glass partitions, facades, and mirrors.",
                full_description="Specialized glass cleaning solution, squeegee wiping, dust removal, and stain removal.",
                icon_name="Sparkles"
            ),
            ServiceItem(
                title="Office & workplace cleaning",
                short_description="Professional workplace, IT park, desk, and office cleaning for a pristine corporate environment.",
                full_description="Desk dusting, floor single-disc scrubbing, restroom sanitization, glass partition cleaning, and trash disposal.",
                icon_name="Briefcase"
            ),
            ServiceItem(
                title="Commercial Daily cleaning",
                short_description="Customized daily or contract maintenance cleaning services for commercial establishments and facilities.",
                full_description="Dedicated daily janitorial staff, daily sweep & mop, trash collection, and ongoing hygiene maintenance.",
                icon_name="Calendar"
            )
        ]
        db.add_all(default_services)
        db.commit()

def get_services(db: Session):
    seed_default_services_if_empty(db)
    return db.query(ServiceItem).all()
