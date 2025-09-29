export interface AbonneModel {
  id: string;
  c_name: string;
  position: string;
  location: string;
  salary: string;
  experience: string;
  job_type: string;
}

export interface candidateModel {
  id: string;
  image: string;
  name: string;
  insta: string;
  designation: string;
}

export interface Group {
  name: string;
  type: string;
  
}

export interface FaitSuiviAbonne {
  id_fait: BigInteger;
  id_abonne: BigInteger;
  id_directions: BigInteger;
  id_produit: BigInteger;
  id_temps: string;
  nombre_total_abonnes: BigInteger;
  abonnes_actifs: BigInteger;
  abonnes_forfait: BigInteger;
  nouveaux_abonnes: BigInteger;
  abonnes_factures: BigInteger;
  abonnes_resilies: BigInteger;
  nombre_resiliation: BigInteger;
  nombre_modification_ps: BigInteger;
  nombre_migration: BigInteger;
  nombre_suspension: BigInteger;
}
