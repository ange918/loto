import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Produit } from '../lib/types'
import Layout from '../components/Layout'

const CATEGORIES_ORDER = ['bière', 'malt', 'soda', 'eau']

function sortCategories(cats: string[]) {
  return [...cats].sort((a, b) => {
    const ia = CATEGORIES_ORDER.indexOf(a.toLowerCase())
    const ib = CATEGORIES_ORDER.indexOf(b.toLowerCase())
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
}

export default function ProduitsPage() {
  const [produits, setProduits] = useState<Produit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('produits')
      .select('*')
      .eq('actif', true)
      .order('categorie')
      .order('nom')
      .then(({ data, error: err }) => {
        if (err) setError(err.message)
        else setProduits((data || []).map(p => ({ ...p, prix_unitaire: Number(p.prix_unitaire) || 0 })))
        setLoading(false)
      })
  }, [])

  async function savePrix(id: string, prix: number) {
    setSavingId(id)
    const { error: err } = await supabase
      .from('produits')
      .update({ prix_unitaire: prix })
      .eq('id', id)

    if (err) setError(err.message)
    else {
      setProduits(prev => prev.map(p => (p.id === id ? { ...p, prix_unitaire: prix } : p)))
    }
    setSavingId(null)
  }

  const categories = sortCategories([...new Set(produits.map(p => p.categorie || 'Autres'))])

  return (
    <Layout>
      <div className="sticky top-0 bg-[#0A0A0A] z-10 flex items-center px-4 h-14 border-b border-[#1E1E1E]">
        <h1 className="font-unbounded text-white text-sm font-bold tracking-wider">CATALOGUE — PRIX CASIER</h1>
      </div>

      {loading && (
        <div className="flex justify-center pt-16">
          <div className="w-8 h-8 border-2 border-[#00C96B] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <p className="font-montserrat text-red-400 text-sm px-4 pt-4">{error}</p>
      )}

      {!loading && categories.map(cat => {
        const catProduits = produits.filter(p => (p.categorie || 'Autres') === cat)
        return (
          <div key={cat}>
            <div className="px-4 py-3 border-b border-[#1E1E1E]">
              <p className="font-unbounded text-[#00C96B] text-xs tracking-widest uppercase">{cat}</p>
            </div>
            {catProduits.map(p => (
              <ProduitPrixRow
                key={p.id}
                produit={p}
                saving={savingId === p.id}
                onSave={savePrix}
              />
            ))}
          </div>
        )
      })}
    </Layout>
  )
}

function ProduitPrixRow({
  produit,
  saving,
  onSave,
}: {
  produit: Produit
  saving: boolean
  onSave: (id: string, prix: number) => void
}) {
  const [prix, setPrix] = useState(String(produit.prix_unitaire || ''))

  useEffect(() => {
    setPrix(produit.prix_unitaire > 0 ? String(produit.prix_unitaire) : '')
  }, [produit.prix_unitaire])

  const prixNum = parseFloat(prix) || 0

  return (
    <div className="bg-[#141414] px-4 py-4 border-b border-[#1E1E1E]">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="font-unbounded text-white text-sm font-semibold">{produit.nom}</p>
          <p className="font-montserrat text-[#666] text-xs mt-1">
            {produit.bouteilles_casier} btl / casier
          </p>
        </div>
        {prixNum > 0 ? (
          <span className="font-unbounded text-[10px] bg-[#00C96B]/20 text-[#00C96B] px-2 py-1 shrink-0">
            {prixNum.toLocaleString('fr-FR')} FCFA
          </span>
        ) : (
          <span className="font-unbounded text-[10px] bg-[#333] text-[#888] px-2 py-1 shrink-0">
            Non défini
          </span>
        )}
      </div>

      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={prix}
          onChange={e => setPrix(e.target.value)}
          onBlur={() => onSave(produit.id, prixNum)}
          disabled={saving}
          placeholder="Ex: 7000"
          className="w-full min-h-[56px] bg-[#0A0A0A] border border-[#333] focus:border-[#00C96B] text-white text-lg pl-4 pr-16 outline-none font-montserrat font-semibold transition-colors disabled:opacity-50"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-unbounded text-[#666] text-xs">
          FCFA
        </span>
      </div>
    </div>
  )
}
