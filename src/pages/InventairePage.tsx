import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Client, Produit } from '../lib/types'
import ProduitRow from '../components/ProduitRow'

type LigneState = {
  stock_initial_casiers: number
  stock_initial_bouteilles: number
  casiers: number
  bouteilles: number
}

type Lignes = Record<string, LigneState>

const emptyLigne = (): LigneState => ({
  stock_initial_casiers: 0,
  stock_initial_bouteilles: 0,
  casiers: 0,
  bouteilles: 0,
})

function formatDate(d: Date) {
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function InventairePage() {
  const { clientId } = useParams<{ clientId: string }>()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [produits, setProduits] = useState<Produit[]>([])
  const [lignes, setLignes] = useState<Lignes>({})
  const [tarifs, setTarifs] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function load() {
      const [{ data: c }, { data: p }, { data: tarifsData }] = await Promise.all([
        supabase.from('clients').select('*').eq('id', clientId!).single(),
        supabase.from('produits').select('*').eq('actif', true).order('categorie').order('nom'),
        supabase.from('tarifs').select('*').eq('client_id', clientId!),
      ])
      setClient(c)
      setProduits(p || [])
      const init: Lignes = {}
      ;(p || []).forEach((prod: Produit) => { init[prod.id] = emptyLigne() })
      setLignes(init)
      const tarifsInit: Record<string, number> = {}
      ;(p || []).forEach((prod: Produit) => { tarifsInit[prod.id] = 0 })
      ;(tarifsData || []).forEach(t => {
        tarifsInit[t.produit_id] = Number(t.prix_unitaire) || 0
      })
      setTarifs(tarifsInit)
      setLoading(false)
    }
    load()
  }, [clientId])

  function handleChange(produitId: string, field: keyof LigneState, value: number) {
    setLignes(prev => ({
      ...prev,
      [produitId]: { ...prev[produitId], [field]: value },
    }))
  }

  function handlePrixChange(produitId: string, value: number) {
    setTarifs(prev => ({ ...prev, [produitId]: value }))
  }

  async function saveTarif(produitId: string, prix_unitaire: number) {
    await supabase.from('tarifs').upsert(
      { client_id: clientId!, produit_id: produitId, prix_unitaire },
      { onConflict: 'client_id,produit_id' }
    )
  }

  async function handleValider() {
    const filtered = Object.entries(lignes)
      .filter(([, v]) =>
        v.casiers > 0 ||
        v.bouteilles > 0 ||
        v.stock_initial_casiers > 0 ||
        v.stock_initial_bouteilles > 0
      )
      .map(([produit_id, v]) => ({
        client_id: clientId!,
        produit_id,
        date_inventaire: new Date().toISOString().split('T')[0],
        casiers: v.casiers,
        bouteilles: v.bouteilles,
        stock_initial_casiers: v.stock_initial_casiers,
        stock_initial_bouteilles: v.stock_initial_bouteilles,
      }))

    if (filtered.length === 0) {
      setError('Aucune quantité saisie')
      return
    }

    setSaving(true)
    setError(null)
    const { error: err } = await supabase
      .from('inventaires')
      .upsert(filtered, { onConflict: 'client_id,produit_id,date_inventaire' })

    if (err) {
      setError(err.message)
      setSaving(false)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    }
  }

  const categories = [...new Set(produits.map(p => p.categorie || 'Autres'))]

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#00C96B] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A0A0A] max-w-md mx-auto pb-24">
      <div className="sticky top-0 bg-[#0A0A0A] z-10 border-b border-[#1E1E1E]">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="text-white p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div>
            <p className="font-unbounded text-white text-sm font-bold leading-tight">{client?.nom}</p>
            <p className="font-montserrat text-[#666] text-xs">{formatDate(new Date())}</p>
          </div>
        </div>
      </div>

      {categories.map(cat => {
        const catProduits = produits.filter(p => (p.categorie || 'Autres') === cat)
        return (
          <div key={cat}>
            <div className="px-4 py-3 border-b border-[#1E1E1E]">
              <p className="font-unbounded text-[#00C96B] text-xs tracking-widest uppercase">{cat}</p>
            </div>
            {catProduits.map(p => (
              <ProduitRow
                key={p.id}
                produit={p}
                values={lignes[p.id] ?? emptyLigne()}
                prixUnitaire={tarifs[p.id] ?? 0}
                onChange={(field, val) => handleChange(p.id, field, val)}
                onPrixChange={val => handlePrixChange(p.id, val)}
                onPrixSave={val => saveTarif(p.id, val)}
              />
            ))}
          </div>
        )
      })}

      {error && (
        <div className="px-4 py-3">
          <p className="font-montserrat text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-0 z-50">
        <button
          onClick={handleValider}
          disabled={saving}
          className="w-full bg-[#00C96B] text-black font-unbounded font-bold text-sm tracking-wider h-14 disabled:opacity-50"
        >
          {saving ? 'SAUVEGARDE...' : 'VALIDER L\'INVENTAIRE'}
        </button>
      </div>

      {success && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#00C96B] px-8 py-6 text-center">
            <p className="font-unbounded text-black text-lg font-bold">Inventaire sauvegardé ✓</p>
          </div>
        </div>
      )}
    </div>
  )
}