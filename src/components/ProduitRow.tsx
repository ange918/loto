import { Produit } from '../lib/types'

type Props = {
  produit: Produit
  casiers: number
  bouteilles: number
  onChange: (field: 'casiers' | 'bouteilles', value: number) => void
}

export default function ProduitRow({ produit, casiers, bouteilles, onChange }: Props) {
  const total = casiers * produit.bouteilles_casier + bouteilles
  const hasValue = casiers > 0 || bouteilles > 0

  return (
    <div className="bg-[#141414] px-4 py-4 border-b border-[#1E1E1E]">
      <p className="font-unbounded text-white text-sm font-semibold mb-1">{produit.nom}</p>
      <p className="font-montserrat text-[#666] text-xs mb-4">1 casier = {produit.bouteilles_casier} bouteilles</p>

      <div className="flex gap-4 items-end">
        <div className="flex flex-col gap-1 items-center">
          <label className="font-unbounded text-[#888] text-[9px] tracking-wider">CASIERS</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={casiers === 0 ? '' : casiers}
            onChange={e => onChange('casiers', Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="0"
            className="w-20 h-14 bg-[#0A0A0A] border border-[#333] focus:border-[#00C96B] text-white text-xl text-center outline-none font-montserrat font-semibold transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1 items-center">
          <label className="font-unbounded text-[#888] text-[9px] tracking-wider">VOLANTES</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={bouteilles === 0 ? '' : bouteilles}
            onChange={e => onChange('bouteilles', Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="0"
            className="w-20 h-14 bg-[#0A0A0A] border border-[#333] focus:border-[#00C96B] text-white text-xl text-center outline-none font-montserrat font-semibold transition-colors"
          />
        </div>

        {hasValue && (
          <div className="flex flex-col justify-end pb-2 ml-2">
            <span className="font-montserrat text-[#00C96B] text-sm font-semibold">= {total} btl</span>
          </div>
        )}
      </div>
    </div>
  )
}
