from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(150), nullable=True)
    service_type = Column(String(100), nullable=False)
    location = Column(String(200), nullable=True)
    preferred_date = Column(String(50), nullable=True)
    message = Column(Text, nullable=True)
    status = Column(String(50), default="New") # New, Contacted, Completed
    created_at = Column(DateTime, default=datetime.utcnow)

class ServiceItem(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    short_description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=True)
    icon_name = Column(String(50), nullable=True)
    price_starting = Column(String(50), nullable=True)
