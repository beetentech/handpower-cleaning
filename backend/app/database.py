import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Get Database URL from Environment Variable (for PostgreSQL in production)
# Fallback to local SQLite database if DATABASE_URL is not set
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Fix Render/Heroku postgres:// vs postgresql:// protocol prefix issue if present
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
else:
    # SQLite fallback for zero-configuration local development
    SQLITE_DB_PATH = "sqlite:///./handpower.db"
    engine = create_engine(
        SQLITE_DB_PATH, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
