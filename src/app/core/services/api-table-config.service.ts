import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTableConfigService {

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
      'mode de facturation': ['N°', "Mode de facturation"],
      'segment abonné': ['N°', "Segment d'abonné"],
      'puissance souscrite': ['N°', 'Puissance souscrite (kW)'],
      'produit': ['N°', 'Produit']
    };

    // Mapping des indicateurs avec leurs suffixes correspondants
    const suffixMap: { [key: string]: string } = {
      'abonnés actifs': "Nombre d'abonnés actifs",
      'abonnés au forfait': "Nombre d'abonnés au forfait",
      'abonnés facturés': "Nombre d'abonnés facturés",
      'nombre total d\'abonnés': "Nombre total d'abonnés",
      'abonnés résiliés': "Nombre d'abonnés résiliés",
      'nombre de résiliations': "Nombre de résiliations",
      'quantité kwh produite': "Quantité KwH produite",
      'quantité kwh livrée': "Quantité KwH livrée",
      'quantité kwh exportée': "Quantité KwH exportée",
      'quantité kwh consommée': "Quantité KwH consommée",
      'quantité kwh facturée': "Quantité KwH facturée",
      'quantité kwh redevance': "Quantité KwH redevance",
      'quantité kwh rechargée': "Quantité KwH rechargée",
      'quantité kwh approvisionnée': "Quantité KwH approvisionnée",
      'montant kwh rechargé': "Montant KwH rechargé",
      'montant kwh approvisionné': "Montant KwH approvisionné",
      'solde abonné': "",
      'solde revendeur': "",
      'revenu énergie': "Revenus sur l'energie",
      'revenu total': "Revenu total",
      'revenu frais': "Revenus sur les frais",
      'redevance facturée': "Redevance facturée",
      'redevance encaissée': "Redevance encaissée",
      'droit de timbre encaissé': "Droit de timbre encaissé",
      'avance sur consommation encaissé': "Avance sur consommation encaissé",
      'avance sur consommation remboursée': "Avance sur consommation remboursée",
      'vente accessoires': "Revenus sur les ventes d'accessoires",
      'montant impayés': "Montants impayés",
      'montant des factures': "Montants des factures",
      'montant encaissé': "Montants encaissés",
      'montant avoir': "Montants des avoirs",
      'montant remboursés': "Montants remboursés",
      'taux de recouvrement': "Taux de recouvrement",
      'chiffre d’affaires global': "Chiffre d’affaires",
       'nombre de sollicitations clients': "Nombre de sollicitations clients",   
      'taux de sollicitation résolues dans les délais': "Taux de résolution dans les delais",    
      'taux de sollicitation résolues hors délais':"Taux de résolution hors delais",    
      'durée moyenne de résolution des sollicitations': "Durée moyenne de résolution",
    };
    

    // Définition des en-têtes spécifiques pour les résiliations
    const resiliationHeaders: { [key: string]: string[] } = {
      'produit': ['N°', 'Produit', "Nombre de résiliations"],
      'direction': ['N°', 'Direction', "Nombre de résiliations"],
      'type abonné': ['N°', "Type d'abonné", "Nombre de résiliations"],
      'mode de facturation': ['N°', "Mode de facturation","Nombre de résiliations"],
      'segment abonné': ['N°', "Segment d'abonné", "Nombre de résiliations"],
      'puissance souscrite': ['N°', 'Puissance souscrite (kW)', "Nombre de résiliations"]
    };

    // Définition des en-têtes spécifiques pour les résiliations
    const totalHeaders: { [key: string]: string[] } = {
      'produit': ['N°', 'Produit', "Nombre total d'abonnés"],
      'direction': ['N°', 'Direction', "Nombre total d'abonnés"],
      'type abonné': ['N°', "Type d'abonné", "Nombre total d'abonnés"],
       'mode de facturation': ['N°', "Mode de facturation","Nombre total d'abonnés"],
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



