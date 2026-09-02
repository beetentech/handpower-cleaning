#  HandPower Cleaning Service - Official Website & Admin Portal

Official business website and backend inquiry management system for **Hand Power Cleaning Service**, located in **Ganapathy, Coimbatore, Tamil Nadu**.

> *"Clean Hands. Clean Space. Better Life."*
> *"You make dust and stain, we make it clean."*

---

## 📞 Business Details & Contacts
- **Company Name**: Hand Power Cleaning Service
- **Primary Helpline**: `9342401538`
- **Email**: `handpowercleaningservice@gmail.com`
- **Headquarters / Area**: Ganapathy, Coimbatore & Surrounding Areas, Tamil Nadu
- **Services Offered**:
  - Full Home Deep Cleaning
  - Commercial & Office Cleaning
  - Restroom & Toilet Deep Sanitization
  - Water Tank & Underground Sump 6-Stage Cleaning
  - Sofa, Mattress & Upholstery Foam Shampooing
  - Glass, Window & Façade Cleaning
  - Post-Construction Deep Cleaning
  - Pest Control & Disinfection

---

## 👑 Admin Portal Access
- **Admin Dashboard**: `http://localhost:8000/admin`
- **Admin Password**: `handpower2026`
- **Features**:
  - Real-time Total Bookings & Unread Lead Counters
  - Interactive Lead Status Manager (`New` ➡️ `Contacted` ➡️ `Completed`)
  - 1-Click WhatsApp Direct Customer Messaging
  - 1-Click Excel / CSV Lead Data Export

---

## 📂 Project Directory Structure

```
CLIENT WEB/
├── frontend/                   # React Frontend Website (Vite)
│   ├── public/                 # Favicons, logo, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/         # Navbar, Hero, AboutUs, Services, ContactForm, Footer, etc.
│   │   ├── App.jsx             # Main React Application
│   │   ├── index.css           # Custom Glassmorphism Theme & Responsive Layouts
│   │   └── main.jsx            # Application Entry Point
│   ├── index.html              # Head Meta Tags, Open Graph & SEO Fonts
│   └── package.json            # Dependencies & Scripts
├── backend/                    # Python FastAPI Backend API & Admin Dashboard
│   ├── app/
│   │   ├── main.py             # FastAPI App & Protected Admin Endpoints
│   │   ├── database.py         # Database Engine (SQLite / PostgreSQL)
│   │   ├── models.py           # DB Tables (Inquiries & Services)
│   │   ├── schemas.py          # Data Validation Schemas
│   │   └── crud.py             # Database Queries
│   ├── static/
│   │   └── admin.html          # Professional Admin Dashboard UI
│   ├── .env                    # Environment Credentials (ADMIN_PASSWORD)
│   ├── .env.example            # Environment Template
│   ├── requirements.txt        # Backend Packages
│   └── schema.sql              # SQL Schema Backup
└── README.md                   # Client Documentation & Handover Guide
```

---

## 🏃 Quick Start Commands

### 1. Start Python Backend & Admin Portal:
```bash
cd backend
python -m uvicorn app.main:app --port 8000
```
- Admin Dashboard: `http://localhost:8000/admin`

### 2. Start Frontend Website:
```bash
cd frontend
npm run dev
```
- Website URL: `http://localhost:5173`

---

*Developed & Managed by **BEETEN TECH***
