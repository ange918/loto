export interface ResultatCalcVente {
  total_btl_initial: number
  total_btl_restant: number
  bouteilles_vendues: number
  prix_bouteille: number
  valeur_stock_restant: number
  recette: number
}

export function calculerRecette(
  stock_init_casiers: number,
  stock_init_vol: number,
  restant_casiers: number,
  restant_vol: number,
  prix_casier: number,
  bouteilles_par_casier: number = 24
): ResultatCalcVente {
  const total_btl_initial = stock_init_casiers * bouteilles_par_casier + stock_init_vol
  const total_btl_restant = restant_casiers * bouteilles_par_casier + restant_vol
  const bouteilles_vendues = total_btl_initial - total_btl_restant
  const prix_bouteille = prix_casier / bouteilles_par_casier
  const recette = Math.round(bouteilles_vendues * prix_bouteille)
  const valeur_stock_restant = Math.round(total_btl_restant * prix_bouteille)

  return {
    total_btl_initial,
    total_btl_restant,
    bouteilles_vendues,
    prix_bouteille: Math.round(prix_bouteille * 100) / 100,
    valeur_stock_restant,
    recette,
  }
}

export function formaterFCFA(montant: number): string {
  return montant.toLocaleString('fr-FR') + ' FCFA'
}

export type LigneRecetteCalc = {
  nom: string
  categorie: string
  date: string
} & ResultatCalcVente
