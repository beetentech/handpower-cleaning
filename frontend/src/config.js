// Backend API base URL.
// - In local dev, leave VITE_API_URL unset and Vite's proxy (see vite.config.js)
//   forwards /api requests to http://localhost:8000 automatically.
// - In production (Namecheap), set VITE_API_URL in a .env.production file to your
//   live Render backend URL, e.g. https://handpower-backend.onrender.com/api
export const API_URL = import.meta.env.VITE_API_URL || '/api';