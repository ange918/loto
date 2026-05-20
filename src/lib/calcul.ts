export interface ResultatCalcProduit {
  valeur_casiers: number
  valeur_bouteilles: number
  valeur_totale: number
  prix_unitaire: number // prix_casier / bouteilles_casier, arrondi 2 décimales
}

export function calculerValeurStock(
  nombre_casiers: number,
  bouteilles_unites: number,
  prix_casier: number,
  bouteilles_par_casier: number = 24
): ResultatCalcProduit {
  const prix_unitaire = prix_casier / bouteilles_par_casier

  const valeur_casiers = nombre_casiers * prix_casier
  const valeur_bouteilles = Math.round(prix_unitaire * bouteilles_unites)
  const valeur_totale = valeur_casiers + valeur_bouteilles

  return {
    valeur_casiers,
    valeur_bouteilles,
    valeur_totale,
    prix_unitaire: Math.round(prix_unitaire * 100) / 100,
  }
}

export interface LigneInventaire {
  nom: string
  categorie: string
  nombre_casiers: number
  bouteilles_unites: number
  prix_casier: number
  bouteilles_par_casier: number
}

export interface ResultatInventaire {
  lignes: (LigneInventaire & ResultatCalcProduit)[]
  total_general: number
}

export function calculerInventaire(produits: LigneInventaire[]): ResultatInventaire {
  let total_general = 0
  const lignes = produits.map(p => {
    const calc = calculerValeurStock(
      p.nombre_casiers,
      p.bouteilles_unites,
      p.prix_casier,
      p.bouteilles_par_casier
    )
    total_general += calc.valeur_totale
    return { ...p, ...calc }
  })
  return { lignes, total_general }
}

export function formaterFCFA(montant: number): string {
  return montant.toLocaleString('fr-FR') + ' FCFA'
}
