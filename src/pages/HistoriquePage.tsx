import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Inventaire } from '../lib/types'

function formatDate(str: string) {
  const [y, m, d] = str.split('-')
  return `${d}/${m}/${y}`
}

export default function HistoriquePage() {
  const { clientId } = useParams<{ clientId: string }>()
  const navigate = useNavigate()
  const [clientNom, setClientNom] = useState('')
  const [inventaires, setInventaires] = useState<Inventaire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const [{ data: c }, { data: inv, error: err }] = await Promise.all([
        supabase.from('clients').select('nom').eq('id', clientId!).single(),
        supabase
          .from('inventaires')
          .select('*, produits(nom, bouteilles_casier, categorie)')
          .eq('client_id', clientId!)
          .order('date_inventaire', { ascending: false }),
      ])
      setClientNom(c?.nom || '')
      if (err) setError(err.message)
      else setInventaires(inv || [])
      setLoading(false)
    }
    load()
  }, [clientId])

  const byDate = inventaires.reduce<Record<string, Inventaire[]>>((acc, inv) => {
    const d = inv.date_inventaire
    if (!acc[d]) acc[d] = []
    acc[d].push(inv)
    return acc
  }, {})

  const dates = Object.keys(byDate).sort((a, b) => b.localeCompare(a))

  return (
    <div className="min-h-screen bg-[#0A0A0A] max-w-md mx-auto pb-8">
      <div className="sticky top-0 bg-[#0A0A0A] z-10 border-b border-[#1E1E1E]">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="text-white p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div>
            <p className="font-unbounded text-white text-sm font-bold leading-tight">{clientNom}</p>
            <p className="font-montserrat text-[#666] text-xs">Historique</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center pt-16">
          <div className="w-8 h-8 border-2 border-[#00C96B] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <p className="font-montserrat text-red-400 text-sm px-4 pt-8">{error}</p>
      )}

      {!loading && !error && dates.length === 0 && (
        <div className="flex items-center justify-center pt-20">
          <p className="font-montserrat text-[#555] text-sm text-center px-8">Aucun inventaire enregistré pour ce client.</p>
        </div>
      )}

      {!loading && dates.map(date => {
        const lignes = byDate[date]
        const categories = [...new Set(lignes.map(l => l.produits?.categorie || 'Autres'))]

        return (
          <div key={date} className="mb-6">
            <div className="px-4 py-3 bg-[#141414] border-b border-[#1E1E1E]">
              <p className="font-unbounded text-white text-xs font-semibold tracking-wider">
                Inventaire du {formatDate(date)}
              </p>
            </div>

            {categories.map(cat => {
              const catLignes = lignes.filter(l => (l.produits?.categorie || 'Autres') === cat)
              return (
                <div key={cat}>
                  <div className="px-4 py-2 border-b border-[#1A1A1A]">
                    <p className="font-unbounded text-[#00C96B] text-[10px] tracking-widest uppercase">{cat}</p>
                  </div>
                  {catLignes.map(ligne => {
                    const total = ligne.casiers * (ligne.produits?.bouteilles_casier || 0) + ligne.bouteilles
                    return (
                      <div key={ligne.id} className="px-4 py-3 border-b border-[#141414] flex justify-between items-center">
                        <p className="font-unbounded text-white text-xs">{ligne.produits?.nom}</p>
                        <p className="font-montserrat text-[#888] text-xs text-right">
                          {ligne.casiers}c + {ligne.bouteilles}v{' '}
                          <span className="text-[#00C96B] font-semibold">= {total} btl</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
