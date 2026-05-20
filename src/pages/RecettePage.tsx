import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { supabase } from '../lib/supabase'
import { Client, Inventaire, Tarif } from '../lib/types'
import {
  calculerInventaire,
  formaterFCFA,
  type LigneInventaire,
  type ResultatInventaire,
} from '../lib/calcul'
import { getMonthStart, getWeekStart, toIsoDate } from '../lib/recette'

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

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

type PeriodPreset = 'week' | 'month' | 'custom'

type InventaireAvecProduit = Inventaire & {
  produits: { nom: string; bouteilles_casier: number; categorie: string | null }
}

function buildResultat(
  inventaires: InventaireAvecProduit[],
  tarifs: Tarif[]
): ResultatInventaire {
  const agg = new Map<string, LigneInventaire>()

  for (const inv of inventaires) {
    const tarif = tarifs.find(t => t.produit_id === inv.produit_id)
    if (!tarif || tarif.prix_casier <= 0 || !inv.produits) continue

    const casiers_vendus = (inv.stock_initial_casiers ?? 0) - (inv.casiers ?? 0)
    const bouteilles_vendues = (inv.stock_initial_bouteilles ?? 0) - (inv.bouteilles ?? 0)

    if (casiers_vendus === 0 && bouteilles_vendues === 0) continue

    const existing = agg.get(inv.produit_id)
    if (existing) {
      existing.nombre_casiers += casiers_vendus
      existing.bouteilles_unites += bouteilles_vendues
    } else {
      agg.set(inv.produit_id, {
        nom: inv.produits.nom,
        categorie: inv.produits.categorie ?? '',
        nombre_casiers: casiers_vendus,
        bouteilles_unites: bouteilles_vendues,
        prix_casier: Number(tarif.prix_casier) || 0,
        bouteilles_par_casier: inv.produits.bouteilles_casier,
      })
    }
  }

  return calculerInventaire([...agg.values()])
}

export default function RecettePage() {
  const { clientId } = useParams<{ clientId: string }>()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [resultat, setResultat] = useState<ResultatInventaire>({ lignes: [], total_general: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [preset, setPreset] = useState<PeriodPreset>('week')
  const [dateDebut, setDateDebut] = useState(toIsoDate(getWeekStart()))
  const [dateFin, setDateFin] = useState(toIsoDate(new Date()))

  function applyPreset(p: 'week' | 'month') {
    setPreset(p)
    const fin = new Date()
    const debut = p === 'week' ? getWeekStart(fin) : getMonthStart(fin)
    setDateDebut(toIsoDate(debut))
    setDateFin(toIsoDate(fin))
  }

  function onCustomDateChange(field: 'debut' | 'fin', value: string) {
    setPreset('custom')
    if (field === 'debut') setDateDebut(value)
    else setDateFin(value)
  }

  useEffect(() => {
    async function loadClient() {
      const { data } = await supabase.from('clients').select('*').eq('id', clientId!).single()
      setClient(data)
    }
    loadClient()
  }, [clientId])

  useEffect(() => {
    if (!clientId || !dateDebut || !dateFin) return

    async function loadRecette() {
      setLoading(true)
      setError(null)
      const [{ data, error: err }, { data: tarifsData, error: tarifsErr }] = await Promise.all([
        supabase
          .from('inventaires')
          .select('*, produits(nom, bouteilles_casier, categorie)')
          .eq('client_id', clientId)
          .gte('date_inventaire', dateDebut)
          .lte('date_inventaire', dateFin),
        supabase.from('tarifs').select('*').eq('client_id', clientId),
      ])

      if (err || tarifsErr) {
        setError(err?.message || tarifsErr?.message || 'Erreur de chargement')
        setResultat({ lignes: [], total_general: 0 })
      } else {
        const tarifs = (tarifsData || []).map(t => ({
          ...t,
          prix_casier: Number(t.prix_casier) || 0,
        }))
        setResultat(buildResultat((data || []) as InventaireAvecProduit[], tarifs))
      }
      setLoading(false)
    }
    loadRecette()
  }, [clientId, dateDebut, dateFin])

  const { lignes: resultats, total_general } = resultat

  const categories = useMemo(
    () => sortCategories([...new Set(resultats.map(l => l.categorie || 'Autres'))]),
    [resultats]
  )

  function exportPDF() {
    if (!client) return
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('INVENTAIRE PRO — RECETTE', 14, 20)
    doc.setFontSize(11)
    doc.text(`Client : ${client.nom}`, 14, 32)
    doc.text(`Période : du ${formatDisplayDate(dateDebut)} au ${formatDisplayDate(dateFin)}`, 14, 39)
    doc.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')}`, 14, 46)

    autoTable(doc, {
      startY: 55,
      head: [['Produit', 'Catégorie', 'Vendus (cas.)', 'Volantes', 'Val. casiers', 'Val. volantes', 'Total']],
      body: resultats.map(l => [
        l.nom,
        l.categorie,
        String(l.nombre_casiers),
        String(l.bouteilles_unites),
        formaterFCFA(l.valeur_casiers),
        formaterFCFA(l.valeur_bouteilles),
        formaterFCFA(l.valeur_totale),
      ]),
      foot: [['', '', '', '', '', 'TOTAL', formaterFCFA(total_general)]],
      headStyles: { fillColor: [0, 201, 107] },
      footStyles: { fillColor: [30, 30, 30], textColor: [0, 201, 107], fontStyle: 'bold' },
    })
    doc.save(`recette_${client.nom}_${dateDebut}_${dateFin}.pdf`)
  }

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
            <p className="font-unbounded text-white text-sm font-bold leading-tight">{client?.nom}</p>
            <p className="font-montserrat text-[#666] text-xs">Recette</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4 border-b border-[#1E1E1E]">
        <div className="flex gap-2">
          <button
            onClick={() => applyPreset('week')}
            className={`flex-1 font-unbounded text-[10px] tracking-wider h-11 border ${
              preset === 'week'
                ? 'bg-[#00C96B] text-black border-[#00C96B]'
                : 'border-[#333] text-[#888]'
            }`}
          >
            CETTE SEMAINE
          </button>
          <button
            onClick={() => applyPreset('month')}
            className={`flex-1 font-unbounded text-[10px] tracking-wider h-11 border ${
              preset === 'month'
                ? 'bg-[#00C96B] text-black border-[#00C96B]'
                : 'border-[#333] text-[#888]'
            }`}
          >
            CE MOIS
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-unbounded text-[#888] text-[9px] tracking-wider block mb-1">DÉBUT</label>
            <input
              type="date"
              value={dateDebut}
              onChange={e => onCustomDateChange('debut', e.target.value)}
              className="w-full min-h-[48px] bg-[#0A0A0A] border border-[#333] focus:border-[#00C96B] text-white text-sm px-3 outline-none font-montserrat"
            />
          </div>
          <div>
            <label className="font-unbounded text-[#888] text-[9px] tracking-wider block mb-1">FIN</label>
            <input
              type="date"
              value={dateFin}
              onChange={e => onCustomDateChange('fin', e.target.value)}
              className="w-full min-h-[48px] bg-[#0A0A0A] border border-[#333] focus:border-[#00C96B] text-white text-sm px-3 outline-none font-montserrat"
            />
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

      {!loading && !error && resultats.length === 0 && (
        <p className="font-montserrat text-[#555] text-sm text-center px-8 pt-16">
          Aucune vente sur cette période.
        </p>
      )}

      {!loading && resultats.length > 0 && (
        <>
          {categories.map(cat => {
            const catLignes = resultats.filter(l => (l.categorie || 'Autres') === cat)
            const totalCat = catLignes.reduce((s, l) => s + l.valeur_totale, 0)

            return (
              <div key={cat} className="mb-4">
                <div className="px-4 py-3 bg-[#141414] border-b border-[#1E1E1E]">
                  <p className="font-unbounded text-[#00C96B] text-xs tracking-widest uppercase">{cat}</p>
                </div>

                <div className="px-2 py-2 grid grid-cols-[1fr_36px_36px_52px_52px_56px] gap-1 border-b border-[#1E1E1E]">
                  <span className="font-unbounded text-[#666] text-[7px]">PRODUIT</span>
                  <span className="font-unbounded text-[#666] text-[7px] text-right">CAS.</span>
                  <span className="font-unbounded text-[#666] text-[7px] text-right">VOL.</span>
                  <span className="font-unbounded text-[#666] text-[7px] text-right">V.CAS</span>
                  <span className="font-unbounded text-[#666] text-[7px] text-right">V.VOL</span>
                  <span className="font-unbounded text-[#666] text-[7px] text-right">TOTAL</span>
                </div>

                {catLignes.map(l => (
                  <div
                    key={`${l.nom}-${l.categorie}`}
                    className="px-2 py-3 border-b border-[#141414] grid grid-cols-[1fr_36px_36px_52px_52px_56px] gap-1 items-start"
                  >
                    <p className="font-unbounded text-white text-[10px] leading-tight">{l.nom}</p>
                    <p className="font-montserrat text-[10px] text-[#aaa] text-right">{l.nombre_casiers}</p>
                    <p className="font-montserrat text-[10px] text-[#aaa] text-right">{l.bouteilles_unites}</p>
                    <p className="font-montserrat text-[9px] text-[#888] text-right leading-tight">
                      {l.valeur_casiers.toLocaleString('fr-FR')}
                    </p>
                    <p className="font-montserrat text-[9px] text-[#888] text-right leading-tight">
                      {l.valeur_bouteilles.toLocaleString('fr-FR')}
                    </p>
                    <p className="font-montserrat text-[10px] text-[#00C96B] text-right font-semibold leading-tight">
                      {l.valeur_totale.toLocaleString('fr-FR')}
                    </p>
                  </div>
                ))}

                <div className="px-4 py-3 flex justify-between items-center bg-[#1E1E1E]">
                  <span className="font-unbounded text-[#888] text-xs">Total {cat}</span>
                  <span className="font-montserrat text-[#00C96B] text-sm font-semibold">
                    {formaterFCFA(totalCat)}
                  </span>
                </div>
              </div>
            )
          })}

          <div className="px-4 py-4 mx-4 mb-4 bg-[#141414] border border-[#00C96B]/30">
            <p className="font-unbounded text-[#00C96B] text-sm font-bold text-center">
              RECETTE TOTALE : {formaterFCFA(total_general)}
            </p>
          </div>

          <div className="px-4 pb-8">
            <button
              onClick={exportPDF}
              disabled={!client || resultats.length === 0}
              className="w-full bg-[#00C96B] text-black font-unbounded font-bold text-sm tracking-wider min-h-[56px] disabled:opacity-40"
            >
              EXPORTER EN PDF
            </button>
          </div>
        </>
      )}
    </div>
  )
}
