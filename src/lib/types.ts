export type Tarif = {
  id: string
  client_id: string
  produit_id: string
  prix_casier: number
}

export type Client = {
  id: string
  nom: string
  ville: string | null
  telephone: string | null
  created_at: string
}

export type Produit = {
  id: string
  nom: string
  categorie: string | null
  bouteilles_casier: number
  actif: boolean
  prix_unitaire: number
}

export type LigneInventaire = {
  produit_id: string
  casiers: number
  bouteilles: number
  stock_initial_casiers: number
  stock_initial_bouteilles: number
}

export type Inventaire = {
  id: string
  client_id: string
  produit_id: string
  date_inventaire: string
  casiers: number
  bouteilles: number
  stock_initial_casiers: number
  stock_initial_bouteilles: number
  commentaire: string | null
  produits?: Produit
}

