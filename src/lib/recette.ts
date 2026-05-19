import { Inventaire, LigneRecette, Produit } from './types'

export function computeVentes(
  stock_initial_casiers: number,
  stock_initial_bouteilles: number,
  stock_final_casiers: number,
  stock_final_bouteilles: number,
  bouteilles_casier: number
) {
  const casiers_vendus = stock_initial_casiers - stock_final_casiers
  const bouteilles_vendues = stock_initial_bouteilles - stock_final_bouteilles
  const total_bouteilles_vendues = casiers_vendus * bouteilles_casier + bouteilles_vendues
  return { casiers_vendus, bouteilles_vendues, total_bouteilles_vendues }
}

export function aggregateLignesRecette(inventaires: Inventaire[]): LigneRecette[] {
  const map = new Map<string, LigneRecette>()

  for (const inv of inventaires) {
    const produit = inv.produits
    if (!produit) continue

    const stock_initial_casiers = inv.stock_initial_casiers ?? 0
    const stock_initial_bouteilles = inv.stock_initial_bouteilles ?? 0
    const stock_final_casiers = inv.casiers ?? 0
    const stock_final_bouteilles = inv.bouteilles ?? 0

    const { casiers_vendus, bouteilles_vendues, total_bouteilles_vendues } = computeVentes(
      stock_initial_casiers,
      stock_initial_bouteilles,
      stock_final_casiers,
      stock_final_bouteilles,
      produit.bouteilles_casier
    )

    const prix = Number(produit.prix_unitaire) || 0
    const recette = prix > 0 ? total_bouteilles_vendues * prix : 0

    const existing = map.get(inv.produit_id)
    if (existing) {
      existing.stock_initial_casiers += stock_initial_casiers
      existing.stock_initial_bouteilles += stock_initial_bouteilles
      existing.stock_final_casiers += stock_final_casiers
      existing.stock_final_bouteilles += stock_final_bouteilles
      existing.casiers_vendus += casiers_vendus
      existing.bouteilles_vendues += bouteilles_vendues
      existing.total_bouteilles_vendues += total_bouteilles_vendues
      existing.recette += recette
    } else {
      map.set(inv.produit_id, {
        produit: { ...produit, prix_unitaire: prix },
        stock_initial_casiers,
        stock_initial_bouteilles,
        stock_final_casiers,
        stock_final_bouteilles,
        casiers_vendus,
        bouteilles_vendues,
        total_bouteilles_vendues,
        recette,
      })
    }
  }

  return [...map.values()].filter(l => l.total_bouteilles_vendues !== 0)
}

export function toIsoDate(d: Date) {
  return d.toISOString().split('T')[0]
}

export function getWeekStart(d: Date = new Date()) {
  const date = new Date(d)
  const day = date.getDay()
  const diff = day === 0 ? 6 : day - 1
  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

export function getMonthStart(d: Date = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
