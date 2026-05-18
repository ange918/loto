import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import NouveauClientPage from './pages/NouveauClientPage'
import InventairePage from './pages/InventairePage'
import HistoriquePage from './pages/HistoriquePage'

function ProtectedRoute({ children, session }: { children: React.ReactNode; session: boolean | null }) {
  if (session === null) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#00C96B] border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const [session, setSession] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={session ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/" element={<ProtectedRoute session={session}><DashboardPage /></ProtectedRoute>} />
        <Route path="/clients/nouveau" element={<ProtectedRoute session={session}><NouveauClientPage /></ProtectedRoute>} />
        <Route path="/inventaire/:clientId" element={<ProtectedRoute session={session}><InventairePage /></ProtectedRoute>} />
        <Route path="/historique/:clientId" element={<ProtectedRoute session={session}><HistoriquePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
