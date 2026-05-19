import { Produit } from '../lib/types'

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
  onChange: (field: Field, value: number) => void
}

export default function ProduitRow({ produit, values, onChange }: Props) {
  const { stock_initial_casiers, stock_initial_bouteilles, casiers, bouteilles } = values

  const casiers_vendus = stock_initial_casiers - casiers
  const bouteilles_vendues = stock_initial_bouteilles - bouteilles
  const total_btl = casiers_vendus * produit.bouteilles_casier + bouteilles_vendues
  const recette = total_btl * produit.prix_unitaire

  const showResume = stock_initial_casiers > 0 || stock_initial_bouteilles > 0
  const showWarning = casiers_vendus < 0

  const inputs: { field: Field; label: string }[] = [
    { field: 'stock_initial_casiers', label: 'STOCK INIT. CAS.' },
    { field: 'stock_initial_bouteilles', label: 'STOCK INIT. VOL.' },
    { field: 'casiers', label: 'RESTANT CAS.' },
    { field: 'bouteilles', label: 'RESTANT VOL.' },
  ]

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

      {showResume && (
        <div className="mt-3 space-y-1">
          <p className="font-montserrat text-[#00C96B] text-xs font-semibold">
            Vendus : {casiers_vendus} cas. + {bouteilles_vendues} vol. = {total_btl} btl.
          </p>
          {produit.prix_unitaire > 0 && (
            <p className="font-montserrat text-[#00C96B] text-xs font-semibold">
              Recette : {recette.toLocaleString('fr-FR')} FCFA
            </p>
          )}
          {showWarning && (
            <p className="font-montserrat text-red-400 text-xs">
              {'⚠ Restant > Initial, vérifier les valeurs'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}