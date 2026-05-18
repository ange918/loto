import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import NouveauClientPage from './pages/NouveauClientPage'
import InventairePage from './pages/InventairePage'
import HistoriquePage from './pages/HistoriquePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients/nouveau" element={<NouveauClientPage />} />
        <Route path="/inventaire/:clientId" element={<InventairePage />} />
        <Route path="/historique/:clientId" element={<HistoriquePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
