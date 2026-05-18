import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Client } from '../lib/types'
import Layout from '../components/Layout'
import ClientCard from '../components/ClientCard'

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase
      .from('clients')
      .select('*')
      .order('nom')
      .then(({ data, error: err }) => {
        if (err) setError(err.message)
        else setClients(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <Layout>
      <div className="sticky top-0 bg-[#0A0A0A] z-10 flex items-center justify-between px-4 h-14 border-b border-[#1E1E1E]">
        <h1 className="font-unbounded text-white text-sm font-bold tracking-wider">MES CLIENTS</h1>
        <button
          onClick={() => navigate('/clients/nouveau')}
          className="w-9 h-9 bg-[#00C96B] flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-4">
        {loading && (
          <div className="flex justify-center pt-16">
            <div className="w-8 h-8 border-2 border-[#00C96B] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="font-montserrat text-red-400 text-sm text-center pt-8">{error}</p>
        )}

        {!loading && !error && clients.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 gap-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            <p className="font-montserrat text-[#555] text-sm text-center">Aucun client. Ajoutez votre premier client.</p>
            <button
              onClick={() => navigate('/clients/nouveau')}
              className="bg-[#00C96B] text-black font-unbounded text-xs font-bold tracking-wider px-6 h-10 mt-2"
            >
              + AJOUTER
            </button>
          </div>
        )}

        {!loading && clients.length > 0 && (
          <div className="flex flex-col gap-3">
            {clients.map(c => <ClientCard key={c.id} client={c} />)}
          </div>
        )}
      </div>
    </Layout>
  )
}
