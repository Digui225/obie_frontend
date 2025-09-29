export interface dim_produit {
    id_produit?: number;
  code_produit?: string;
  type?: string;
  usage?: string;

}

export class DimProduitClass implements  dim_produit {

    constructor(
      public id_produit: number,
      public code_produit: string,
      public type: string,
      public usage: string
    ) {}
    
  }