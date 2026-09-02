// Backend API base URL.
//
// Local development:
// Vite proxy forwards /api requests to http://localhost:8000.
//
// Production:
// Uses VITE_API_URL when configured. Otherwise, it directly uses
// the deployed Render backend URL.

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_URL = (
  configuredApiUrl ||
  (import.meta.env.DEV
    ? '/api'
    : 'https://handpower-cleaning.onrender.com/api')
).replace(/\/$/, '');