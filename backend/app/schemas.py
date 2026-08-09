from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150, example="Ramesh Kumar")
    phone: str = Field(..., min_length=10, max_length=15, example="9342401538")
    email: Optional[str] = Field(None, example="ramesh@gmail.com")
    service_type: str = Field(..., example="Residential Deep Cleaning")
    location: Optional[str] = Field(None, example="Gandhipuram, Coimbatore")
    preferred_date: Optional[str] = Field(None, example="2026-08-10")
    message: Optional[str] = Field(None, example="Need deep cleaning for 3BHK house.")

class InquiryResponse(InquiryCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class ServiceResponse(BaseModel):
    id: int
    title: str
    short_description: str
    full_description: Optional[str] = None
    icon_name: Optional[str] = None
    price_starting: Optional[str] = None

    class Config:
        from_attributes = True
