import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevTableConfigService {

  constructor() { }

  getTableHeaders(resultType: string): string[] {
    if (!resultType) {
      console.error("resultType est indéfini !");
      return [];
    }

    // Définition des en-têtes de base par axe d'analyse
    const baseHeaders: { [key: string]: string[] } = {
      'direction': ['N°', 'Direction'],
      'type abonné': ['N°', "Type d'abonné"],
      'segment abonné': ['N°', "Segment d'abonné"],
      'puissance souscrite': ['N°', 'Puissance souscrite (kW)'],
      'produit': ['N°', 'Produit']
    };

    // Mapping des indicateurs avec leurs suffixes correspondants
    const suffixMap: { [key: string]: string } = {
      
        'revenu énergie':"Revenu sur l'energie",  
        'revenu total':"Revenu total",   
        'revenu frais':"Revenu sur les frais",   
        'redevance facturée':"Redevance",   
        'redevance encaissée':"Redevance",   
        'droit de timbre encaissée':"Droit",   
        'avance sur consommation encaissé':"Avance",   
        'avance sur consommation remboursée':"Avance",   
        'vente accessoires':"Vente",   
        'montant impayés':"Montant",   
        'montant des factures':"Montant",   
        'montant encaissé':"Montant",   
        'montant avoir':"Montant",   
        'montant remboursement':"Montant",   
        'taux de recouvrement':"Taux",   
        'chiffre d’affaires global':"Chiifre",
    };

    // Définition des en-têtes spécifiques pour les résiliations
    const resiliationHeaders: { [key: string]: string[] } = {
      'produit': ['N°', 'Produit', "Nombre de résiliations"],
      'direction': ['N°', 'Direction', "Nombre de résiliations"],
      'type abonné': ['N°', "Type d'abonné", "Nombre de résiliations"],
      'segment abonné': ['N°', "Segment d'abonné", "Nombre de résiliations"],
      'puissance souscrite': ['N°', 'Puissance souscrite (kW)', "Nombre de résiliations"]
    };

    // Définition des en-têtes spécifiques pour les résiliations
    const totalHeaders: { [key: string]: string[] } = {
      'produit': ['N°', 'Produit', "Nombre total d'abonnés"],
      'direction': ['N°', 'Direction', "Nombre total d'abonnés"],
      'type abonné': ['N°', "Type d'abonné", "Nombre total d'abonnés"],
      'segment abonné': ['N°', "Segment d'abonné", "Nombre total d'abonnés"],
      'puissance souscrite': ['N°', 'Puissance souscrite (kW)', "Nombre total d'abonnés"]
    };


    // Vérifier que `resultType` est bien formatté sous "indicateur - axe"
    if (!resultType.includes(' - ')) {
      console.error(`Format incorrect de resultType: ${resultType}`);
      return [];
    }

    // Séparer `resultType` en indicateur et axe (dans cet ordre)
    const [indicateur, axe] = resultType.split(' - ').map(s => s.trim());

    // Normaliser les clés en minuscules
    const axeKey = axe.toLowerCase();
    const indicateurKey = indicateur.toLowerCase();

    // Gestion des cas de résiliation
    if (indicateurKey === 'nombre de résiliations' && resiliationHeaders[axeKey]) {
      return resiliationHeaders[axeKey];
    }
    // Gestion des cas de total
    if (indicateurKey === 'nombre total d\'abonnés' && totalHeaders[axeKey]) {
      return totalHeaders[axeKey];
    }

    // Vérifier l'existence de l'axe et de l'indicateur dans les mappings
    if (suffixMap[indicateurKey] && baseHeaders[axeKey]) {
      return [...baseHeaders[axeKey], suffixMap[indicateurKey]];
    }

    console.warn(`Aucun en-tête trouvé pour resultType: ${resultType}`);
    return [];
  }
  
}



