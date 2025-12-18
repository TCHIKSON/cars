import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiService } from './services/api.service.js'   // ← AJOUTE

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const token = localStorage.getItem("token") || "";

export const apiService = new ApiService(baseUrl, token);  // ← AJOUTE

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)