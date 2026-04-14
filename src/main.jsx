import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'
import AboutTeam from './pages/AboutTeam.jsx'

gsap.registerPlugin(ScrollTrigger)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutTeam />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
