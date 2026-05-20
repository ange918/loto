import { useEffect, useState } from 'react'
import { Produit } from '../lib/types'
import { calculerValeurStock, formaterFCFA } from '../lib/calcul'

type LigneValues = {
  stock_initial_casiers: number
  stock_initial_bouteilles: number
  casiers: number
  bouteilles: number
}

type Field = keyof LigneValues

type Props = {
  produit: Produit
  values: LigneValues
  prixCasier: number
  onChange: (field: Field, value: number) => void
  onPrixChange: (value: number) => void
  onPrixSave: (value: number) => Promise<void>
}

export default function ProduitRow({
  produit,
  values,
  prixCasier,
  onChange,
  onPrixChange,
  onPrixSave,
}: Props) {
  const { stock_initial_casiers, stock_initial_bouteilles, casiers, bouteilles } = values
  const [prixInput, setPrixInput] = useState('')
  const [prixSaved, setPrixSaved] = useState(false)

  useEffect(() => {
    setPrixInput(prixCasier > 0 ? String(prixCasier) : '')
  }, [prixCasier])

  useEffect(() => {
    if (!prixSaved) return
    const t = setTimeout(() => setPrixSaved(false), 1500)
    return () => clearTimeout(t)
  }, [prixSaved])

  const stockRestant =
    prixCasier > 0
      ? calculerValeurStock(casiers, bouteilles, prixCasier, produit.bouteilles_casier)
      : null

  const stockInitial =
    prixCasier > 0 && stock_initial_casiers > 0
      ? calculerValeurStock(
          stock_initial_casiers,
          stock_initial_bouteilles,
          prixCasier,
          produit.bouteilles_casier
        )
      : null

  const inputs: { field: Field; label: string }[] = [
    { field: 'stock_initial_casiers', label: 'STOCK INIT. CAS.' },
    { field: 'stock_initial_bouteilles', label: 'STOCK INIT. VOL.' },
    { field: 'casiers', label: 'RESTANT CAS.' },
    { field: 'bouteilles', label: 'RESTANT VOL.' },
  ]

  async function handlePrixBlur() {
    const valeur = parseFloat(prixInput) || 0
    onPrixChange(valeur)
    await onPrixSave(valeur)
    setPrixSaved(true)
  }

  return (
    <div className="bg-[#141414] px-4 py-4 border-b border-[#1E1E1E]">
      <p className="font-unbounded text-white text-sm font-semibold mb-1">{produit.nom}</p>
      <p className="font-montserrat text-[#666] text-xs mb-4">1 casier = {produit.bouteilles_casier} bouteilles</p>

      <div className="grid grid-cols-2 gap-3">
        {inputs.map(({ field, label }) => (
          <div key={field} className="flex flex-col gap-1">
            <label className="font-unbounded text-[#888] text-[8px] tracking-wider leading-tight">{label}</label>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={values[field] === 0 ? '' : values[field]}
              onChange={e => onChange(field, Math.max(0, parseInt(e.target.value) || 0))}
              placeholder="0"
              className="w-full min-h-[56px] bg-[#0A0A0A] border border-[#333] focus:border-[#00C96B] text-white text-lg text-center outline-none font-montserrat font-semibold transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="mt-3">
        <label className="font-unbounded text-[#888] text-[8px] tracking-wider block mb-1">
          PRIX CASIER (FCFA)
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={prixInput}
            onChange={e => {
              setPrixInput(e.target.value)
              onPrixChange(parseFloat(e.target.value) || 0)
            }}
            onBlur={handlePrixBlur}
            placeholder="Ex: 7000"
            className="w-full h-12 bg-[#0A0A0A] border border-[#333] focus:border-[#00C96B] text-white text-base pl-4 pr-14 outline-none font-montserrat font-semibold transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-unbounded text-[#666] text-xs">
            FCFA
          </span>
        </div>
        {prixSaved && (
          <p className="font-montserrat text-[#00C96B]/80 text-[10px] mt-1">Prix sauvegardé ✓</p>
        )}
      </div>

      {prixCasier === 0 && (
        <p className="font-montserrat text-[#666] text-xs mt-3">
          Entrez le prix du casier
        </p>
      )}

      {stockRestant && (
        <div
          className="bg-[#1E1E1E] p-3 mt-2 space-y-1 font-montserrat text-xs text-[#aaa]"
          style={{ borderLeft: '3px solid #00C96B' }}
        >
          <p className="font-unbounded text-[#00C96B] text-[10px] tracking-wider mb-2">
            VALEUR DU STOCK ACTUEL
          </p>
          <p>Casiers : {formaterFCFA(stockRestant.valeur_casiers)}</p>
          <p>Volantes : {formaterFCFA(stockRestant.valeur_bouteilles)}</p>
          <p className="text-[#555]">──────────────────────────────</p>
          <p className="font-unbounded text-[#00C96B] font-bold text-sm">
            TOTAL : {formaterFCFA(stockRestant.valeur_totale)}
          </p>
        </div>
      )}

      {stockInitial && (
        <p className="font-montserrat text-[#666] text-[10px] mt-2">
          Stock initial valorisé : {formaterFCFA(stockInitial.valeur_totale)}
        </p>
      )}
    </div>
  )
}
