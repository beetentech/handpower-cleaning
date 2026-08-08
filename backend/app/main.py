from fastapi import FastAPI, Depends, HTTPException, status, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import os
import hmac
import hashlib
import time
import datetime
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.database import engine, Base, get_db
from app.schemas import InquiryCreate, InquiryResponse, ServiceResponse
import app.crud as crud

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
    load_dotenv(env_path)
except Exception:
    pass

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "handpower2026")
SECRET_KEY = os.getenv("SECRET_KEY", "handpower_secure_token_secret_key_9342401538_coimbatore").encode()

# Create database tables automatically on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Hand Power Cleaning Service API",
    description="Backend API for Hand Power Cleaning Service in Coimbatore, Tamil Nadu",
    version="1.0.0"
)

# Enable CORS for frontend web integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows production domains & local Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdminLoginRequest(BaseModel):
    password: str

def generate_admin_token() -> str:
    """Generates a secure HMAC-SHA256 session token with 24-hour expiration."""
    timestamp = str(int(time.time()))
    signature = hmac.new(SECRET_KEY, f"admin:{timestamp}".encode(), hashlib.sha256).hexdigest()
    return f"{timestamp}.{signature}"

def verify_admin_token(authorization: str = Header(None), x_admin_token: str = Header(None)):
    """Validates the session token from Authorization or X-Admin-Token header."""
    token = x_admin_token
    if not token and authorization:
        if authorization.startswith("Bearer "):
            token = authorization.split(" ")[1]
        else:
            token = authorization

    if not token or "." not in token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token missing or invalid format"
        )

    try:
        timestamp, signature = token.split(".", 1)
        token_time = int(timestamp)
        
        # Check token expiration (24 Hours = 86400 seconds)
        if time.time() - token_time > 86400:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Admin session expired. Please log in again."
            )

        # Verify HMAC signature
        expected_sig = hmac.new(SECRET_KEY, f"admin:{timestamp}".encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_sig):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid security token signature"
            )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token validation error"
        )

@app.get("/admin")
def read_admin():
    admin_path = os.path.join(os.path.dirname(__file__), "..", "static", "admin.html")
    if os.path.exists(admin_path):
        headers = {
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
        return FileResponse(admin_path, headers=headers)
    return {"error": "Admin page not found"}

@app.get("/")
def read_root():
    return {
        "status": "online",
        "company": "Hand Power Cleaning Service",
        "phone": "9342401538",
        "email": "handpowercleaningservice@gmail.com",
        "location": "Ganapathy, Coimbatore, Tamil Nadu",
        "tagline": "Clean Hands. Clean Space. Better Life.",
        "documentation": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "database": "connected"}

@app.post("/api/admin/login")
def admin_login(payload: AdminLoginRequest):
    """
    Authenticates the admin password against environment variables (ADMIN_PASSWORD).
    Returns a 24-hour cryptographically signed session token.
    """
    if not payload.password or payload.password != ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect admin password"
        )
    
    token = generate_admin_token()
    return {
        "status": "success",
        "message": "Authentication successful",
        "token": token,
        "expires_in": 86400
    }

from fastapi import BackgroundTasks
from app.email_service import send_booking_email_notification

@app.post("/api/contact", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
def create_contact_inquiry(inquiry: InquiryCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Submits a new cleaning service inquiry/booking request.
    Data is stored directly in PostgreSQL/SQLite database.
    Sends automated email notifications to business owner and customer via BackgroundTasks.
    """
    try:
        new_inquiry = crud.create_inquiry(db=db, inquiry=inquiry)
        
        # Dispatch email alert asynchronously
        booking_data = {
            "name": inquiry.name,
            "phone": inquiry.phone,
            "email": inquiry.email,
            "service_type": inquiry.service_type,
            "location": inquiry.location,
            "preferred_date": inquiry.preferred_date,
            "message": inquiry.message
        }
        background_tasks.add_task(send_booking_email_notification, booking_data)
        
        return new_inquiry
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit inquiry: {str(e)}"
        )

class InquiryStatusUpdate(BaseModel):
    status: str

@app.patch("/api/inquiries/{inquiry_id}/status", response_model=InquiryResponse, dependencies=[Depends(verify_admin_token)])
def update_inquiry_status_route(inquiry_id: int, payload: InquiryStatusUpdate, db: Session = Depends(get_db)):
    """
    Updates status of an inquiry (e.g., from 'New' to 'Seen' / 'Contacted' / 'Completed').
    Protected by HMAC-SHA256 session token authentication.
    """
    updated = crud.update_inquiry_status(db=db, inquiry_id=inquiry_id, new_status=payload.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Inquiry record not found")
    return updated

@app.get("/api/inquiries", response_model=List[InquiryResponse], dependencies=[Depends(verify_admin_token)])
def read_inquiries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Fetch submitted inquiries for administration review.
    Protected by HMAC-SHA256 session token authentication.
    """
    return crud.get_inquiries(db=db, skip=skip, limit=limit)

@app.get("/api/admin/backup-db", dependencies=[Depends(verify_admin_token)])
def download_database_backup():
    """
    Downloads a complete copy of the SQLite database file (handpower.db).
    Protected by HMAC-SHA256 session token authentication.
    """
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "handpower.db"))
    if os.path.exists(db_path):
        return FileResponse(
            db_path, 
            filename=f"handpower_backup_{datetime.date.today()}.db", 
            media_type="application/x-sqlite3"
        )
    raise HTTPException(status_code=404, detail="Database file not found")

@app.get("/api/services", response_model=List[ServiceResponse])
def read_services(db: Session = Depends(get_db)):
    """
    Get list of professional cleaning services offered.
    """
    return crud.get_services(db=db)
