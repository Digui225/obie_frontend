import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


const baseUrl = 'api/v1/FaitSuiviRevenu';
// const baseUrl = 'http://localhost:9080/api/v1/FaitSuiviAbonne';  // Remplacez par l'URL correcte de votre API

@Injectable({
  providedIn: 'root'
})
export class FaitSuiviRevenuService {

  constructor(private http: HttpClient) { }

  

   /* getRevenuData(
    type: string,
    axe: string,
    startDate: string,
    endDate: string
  ): Observable<[string, number][]> {
    const routes: Record<string, any> = {
      'Revenu énergie': {
        'Direction': () => this.getRevenuEnerDirection(startDate, endDate),
        'Type abonné': () => this.getRevenuEnerType(startDate, endDate),
        'Segment abonné': () => this.getRevenuEnerSegment(startDate, endDate),
        'Puissance Souscrite': () => this.getRevenuEnerPs(startDate, endDate),
        'Produit': () => this.getRevenuEnerProduit(startDate, endDate),
      },
      'Revenu total': {
        'Direction': () => this.getRevenuTotalDr(startDate, endDate),
        'Type abonné': () => this.getRevenuTotalType(startDate, endDate),
        'Segment abonné': () => this.getRevenuTotalSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getRevenuTotalPs(startDate, endDate),
        'Produit': () => this.getRevenuTotalPr(startDate, endDate),
      },
      'Montant des factures': {
        'Direction': () => this.getMontFactDir(startDate, endDate),
        'Type abonné': () => this.getMontFactType(startDate, endDate),
        'Segment abonné': () => this.getMontFactSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getMontFactPs(startDate, endDate),
        'Produit': () => this.getMontFactPr(startDate, endDate),
      },
      'Redevance facturée': {
        'Direction': () => this.getRedevanceFactDr(startDate, endDate),
        'Type abonné': () => this.getRedevanceFactType(startDate, endDate),
        'Segment abonné': () => this.getRedevanceFactSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getRedevanceFactps(startDate, endDate),
        'Produit': () => this.getRedevanceFactPr(startDate, endDate),
      },
      
      'Revenu frais': {
        'Direction': () => this.getRevenuFraisDr(startDate, endDate),
        'Type abonné': () => this.getRevenuFraisType(startDate, endDate),
        'Segment abonné': () => this.getRevenuFraisSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getRevenuFraisPs(startDate, endDate),
        'Produit': () => this.getRevenuFraisPr(startDate, endDate),
      },

      

      'Redevance encaissée': {
        'Direction': () => this.getRedevanceEncDr(startDate, endDate),
        'Type abonné': () => this.getRedevanceEncType(startDate, endDate),
        'Segment abonné': () => this.getRedevanceEncSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getRedevanceEncPS(startDate, endDate),
        'Produit': () => this.getRedevanceEncPr(startDate, endDate),
      },

      'Droit de timbre encaissée': {
        'Direction': () => this.getDroitTimbEncDir(startDate, endDate),
        'Type abonné': () => this.getDroitTimbEncType(startDate, endDate),
        'Segment abonné': () => this.getDroitTimbEncSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getDroitTimbEncPs(startDate, endDate),
        'Produit': () => this.getDroitTimbEncPr(startDate, endDate),
      },

      'Avance sur consommation encaissé': {
        'Direction': () => this.getAvancConsEncDr(startDate, endDate),
        'Type abonné': () => this.getAvancConsEncType(startDate, endDate),
        'Segment abonné': () => this.getAvancConsEncSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getAvancConsEncPs(startDate, endDate),
        'Produit': () => this.getAvancConsEncPr(startDate, endDate),
      },

      'Avance sur consommation remboursée': {
        'Direction': () => this.getAvancConsRembDr(startDate, endDate),
        'Type abonné': () => this.getAvancConsRembType(startDate, endDate),
        'Segment abonné': () => this.getAvancConsRembSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getAvancConsRembPs(startDate, endDate),
        'Produit': () => this.getAvancConsRembPr(startDate, endDate),
      },
      'Vente accessoires': {
        'Direction': () => this.getVenteAccDr(startDate, endDate),
        'Type abonné': () => this.getVenteAccType(startDate, endDate),
        'Segment abonné': () => this.getVenteAccSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getVenteAccPs(startDate, endDate),
        'Produit': () => this.getVenteAccPr(startDate, endDate),
      },

      'Montant impayés': {
        'Direction': () => this.getMontImpDr(startDate, endDate),
        'Type abonné': () => this.getMontImpType(startDate, endDate),
        'Segment abonné': () => this.getMontImpSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getMontImpPs(startDate, endDate),
        'Produit': () => this.getMontImpPr(startDate, endDate),
      },

      

      'Montant encaissé': {
        'Direction': () => this.getMontEncDr(startDate, endDate),
        'Type abonné': () => this.getMontEncType(startDate, endDate),
        'Segment abonné': () => this.getMontEncSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getMontEncPs(startDate, endDate),
        'Produit': () => this.getMontEncPr(startDate, endDate),
      },
      'Montant avoir': {
        'Direction': () => this.getMontAvDr(startDate, endDate),
        'Type abonné': () => this.getMontAvType(startDate, endDate),
        'Segment abonné': () => this.getMontAvSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getMontAvPs(startDate, endDate),
        'Produit': () => this.getMontAvPrMontFactPr(startDate, endDate),
      },

      'Montant remboursement': {
        'Direction': () => this.getMontRembDr(startDate, endDate),
        'Type abonné': () => this.getMontRembType(startDate, endDate),
        'Segment abonné': () => this.getMontRembSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getMontRembPs(startDate, endDate),
        'Produit': () => this.getMontRembPr(startDate, endDate),
      },

      'Taux de recouvrement': {
        'Direction': () => this.getTauxRecDr(startDate, endDate),
        'Type abonné': () => this.getTauxRecType(startDate, endDate),
        'Segment abonné': () => this.getTauxRecSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getTauxRecPs(startDate, endDate),
        'Produit': () => this.getTauxRecPr(startDate, endDate),
      },

      'Chiffre d’affaires global': {
        'Direction': () => this.getChiffreAffDr(startDate, endDate),
        'Type abonné': () => this.getChiffreAffType(startDate, endDate),
        'Segment abonné': () => this.getChiffreAffSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getChiffreAffPs(startDate, endDate),
        'Produit': () => this.getChiffreAffPr(startDate, endDate),
      }, 
    };

    const selectedRoutes = routes[type]?.[axe];
    if (!selectedRoutes) {
      return throwError(() => new Error('Route non définie pour ce type et cet axe'));
    }

    return selectedRoutes();
  }  */

  getRevenuData(
  type: string,
  axe: string,
  startDate: string,
  endDate: string
): Observable<[string, number][]> {
  // Mapping axe affiché -> dimension backend
  const mapAxeToDimension: { [key: string]: 'direction' | 'type' | 'mode' | 'segment' | 'produit' | 'ps' } = {
    'Direction': 'direction',
    'Type abonné': 'type',
    'Mode de facturation': 'mode',
    'Segment abonné': 'segment',
    'Puissance souscrite': 'ps',
    'Produit': 'produit',
  };

  const dimension = mapAxeToDimension[axe];

  if (!dimension) {
    return throwError(() => new Error(`Axe non supporté : ${axe}`));
  }

  // Mapping type -> méthode correspondante
  const routes: Record<string, () => Observable<[string, number][]>> = {
    'Revenu énergie': () => this.getRevenuEnergieByDimension(dimension, startDate, endDate),
    'Revenu Total': () => this.getRevenuTotalByDimension(dimension, startDate, endDate),
    'Montant des factures': () => this.getMontFactByDimension(dimension, startDate, endDate),
    'Redevance facturée': () => this.getRedevanceFactByDimension(dimension, startDate, endDate),
    // tu peux ajouter ici d’autres routes au fur et à mesure
  };

  const selectedRoute = routes[type];

  if (!selectedRoute) {
    return throwError(() => new Error(`Type non supporté : ${type}`));
  }

  return selectedRoute();
}


  

    /*  // Méthode pour récupérer le revenu total
  getTotalRevenu(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/RevenuTle`, { params });
  } */


  // Méthode pour récupérer les statistiques des revenus par segment
     getRevenuStatsParPuissance(start: string, end: string): Observable<any[]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
  
      return this.http.get<any[]>(`${baseUrl}/TableauPuissanceS`, { params });
    }

    getMontantFcatureInfos(start: string, end:string){
            const params = new HttpParams()
              .set('start', start)
              .set('end', end);
        
              return this.http.get<any[]>(`${baseUrl}/MontantRedevance`, { params });
      }


   // Méthode générique pour Revenu Énergie
  getRevenuEnergieByDimension(
    dimension: 'direction' | 'type' | 'mode' | 'segment' | 'produit' | 'ps',
    start: string,
    end: string
  ): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    let endpoint = '';

    switch (dimension) {
      case 'direction':
        endpoint = 'RevenuEnergieDr';
        break;
      case 'type':
        endpoint = 'RevenuEnergieType';
        break;
      case 'mode':
        endpoint = 'RevenuEnergieModFact';
        break;
      case 'segment':
        endpoint = 'RevenuEnergieSeg';
        break;
      case 'produit':
        endpoint = 'RevenuEnergiePr';
        break;
      case 'ps':
        endpoint = 'RevenuEnergiePs';
        break;
      default:
        throw new Error(`Dimension inconnue : ${dimension}`);
    }

    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  }

  getRevenuTotalByDimension(
  dimension: 'direction' | 'type' | 'mode' | 'segment' | 'produit' | 'ps',
  start: string,
  end: string
): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);

  let endpoint = '';
  switch (dimension) {
    case 'direction':
      endpoint = 'RevenuTotalDr';
      break;
    case 'type':
      endpoint = 'RevenuTotalType';
      break;
    case 'mode':
      endpoint = 'RevenuTotalModFact';
      break;
    case 'segment':
      endpoint = 'RevenuTotalSeg';
      break;
    case 'produit':
      endpoint = 'RevenuTotalPr';
      break;
    case 'ps':
      endpoint = 'RevenuTotalPs';
      break;
    default:
      throw new Error(`Dimension inconnue : ${dimension}`);
  }

  return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
}

getMontFactByDimension(
  dimension: 'direction' | 'type' |'mode'  | 'segment' | 'produit' | 'ps',
  start: string,
  end: string
): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);

  let endpoint = '';
  switch (dimension) {
    case 'direction':
      endpoint = 'MontFactDir';
      break;
    case 'type':
      endpoint = 'MontFactType';
      break;
    case 'mode':
      endpoint = 'MontFactModFact';
      break;
    case 'segment':
      endpoint = 'MontFactSeg';
      break;
    case 'produit':
      endpoint = 'MontFactPr';
      break;
    case 'ps':
      endpoint = 'MontFactPs';
      break;
    default:
      throw new Error(`Dimension inconnue : ${dimension}`);
  }

  return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
}

getRedevanceFactByDimension(
  dimension: 'direction' | 'type' | 'mode' | 'segment' | 'produit' | 'ps',
  start: string,
  end: string
): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);

  let endpoint = '';
  switch (dimension) {
    case 'direction':
      endpoint = 'RedevanceFactDr';
      break;
    case 'type':
      endpoint = 'RedevanceFactType';
      break;
    case 'mode':
      endpoint = 'RedevanceFactModFact';
      break;
    case 'segment':
      endpoint = 'RedevanceFactSeg';
      break;
    case 'produit':
      endpoint = 'RedevanceFactPr';
      break;
    case 'ps':
      endpoint = 'RedevanceFactps';
      break;
    default:
      throw new Error(`Dimension inconnue : ${dimension}`);
  }

  return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
}

}
  /* // Méthode pour récupérer le revenu energie par direction
getRevenuEnerDirection(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/RevenuEnergieDr`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/RevenuEnergieDr"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

 // Méthode pour récupérer le revenu energie par Type d'abonnés
 getRevenuEnerType(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/RevenuEnergieType`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/RevenuEnergieType"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

// Méthode pour récupérer le revenu energie par Produit
getRevenuEnerProduit(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/RevenuEnergiePr`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/RevenuEnergiePr"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

// Méthode pour récupérer le revenu energie par Ps
getRevenuEnerPs(start: string, end: string): Observable<number[][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<number[][]>(`${baseUrl}/RevenuEnergiePs`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/RevenuEnergiePs"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

// Méthode pour récupérer le revenu energie par Segment
getRevenuEnerSegment(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/RevenuEnergieSeg`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/RevenuEnergieSeg"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

// Méthode pour récupérer le revenu energie par mode factur
getRevenuEnerMode(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/RevenuEnergieModFact`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/RevenuEnergieSeg"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
} */






 

  /* // Méthode pour récupérer le revenu total par type d'abonnés
  getRevenuTotalType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuTotalType`, { params });
  }

  // Méthode pour récupérer le revenu total par Direction
  getRevenuTotalDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuTotalDr`, { params });
  }

  // Méthode pour récupérer le revenu total par Segment
  getRevenuTotalSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuTotalSeg`, { params });
  }

  // Méthode pour récupérer le revenu total par Produit
  getRevenuTotalPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuTotalPr`, { params });
  }

  // Méthode pour récupérer le revenu total par Ps
  getRevenuTotalPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/RevenuTotalPs`, { params });
  }

  // Méthode pour récupérer le revenu total par mode
  getRevenuTotalMode(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/RevenuTotalModFact`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT DES FACTURES par Ps
  getMontFactPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/MontFactPs`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT DES FACTURES  par Produit
  getMontFactPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontFactPr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT DES FACTURES  par type
  getMontFactType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontFactType`, { params });
  }
  
  // Méthode pour récupérer le TOTAL MONTANT DES FACTURES  par direction
  getMontFactDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontFactDir`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT DES FACTURES  par segment
  getMontFactSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontFactSeg`, { params });
  }

  // Méthode pour récupérer le total sur les redevances facturées
  getTotalRedevanceFacture(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/RedevanceFacture`, { params });
  }

  // Méthode pour récupérer les redevances facturées par type d'abonnés
  getRedevanceFactType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceFactType`, { params });
  }

  // Méthode pour récupérer les redevances facturées par mode
  getRedevanceFactMode(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceFactModFact`, { params });
  }

  // Méthode pour récupérer les redevances facturées par Direction
  getRedevanceFactDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceFactDr`, { params });
  }

  // Méthode pour récupérer les redevances facturées par Segment
  getRedevanceFactSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceFactSeg`, { params });
  }

  // Méthode pour récupérer les redevances facturées par Produit
  getRedevanceFactPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceFactPr`, { params });
  }

  // Méthode pour récupérer les redevances facturées par Ps
  getRedevanceFactps(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/RedevanceFactps`, { params });
  } */


  /* // Méthode pour récupérer le revenu sur les frais
  getTotalRevenuFrais(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/AbonneFacture`, { params });
  }

  // Méthode pour récupérer le revenu sur les frais par type d'abonnés
  getRevenuFraisType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuFraisType`, { params });
  }

  // Méthode pour récupérer le revenu sur les frais par Direction
  getRevenuFraisDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuFraisDr`, { params });
  }

  // Méthode pour récupérer le revenu sur les frais par Segment
  getRevenuFraisSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuFraisSeg`, { params });
  }

  // Méthode pour récupérer le revenu sur les frais par Produit
  getRevenuFraisPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RevenuFraisPr`, { params });
  }

  // Méthode pour récupérer le revenu sur les frais par Ps
  getRevenuFraisPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/RevenuFraisPs`, { params });
  } */



  


  /* // Méthode pour récupérer le total des redevances encaissées
  getRedevanceEncaisse(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/RedevanceEncaisse`, { params });
  }

  // Méthode pour récupérer redevances encaissées par type d'abonnés
  getRedevanceEncType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceEncType`, { params });
  }

  // Méthode pour récupérer redevances encaissées par Direction
  getRedevanceEncDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceEncDr`, { params });
  }

  // Méthode pour récupérer redevances encaissées par Segment
  getRedevanceEncSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceEncSeg`, { params });
  }

  // Méthode pour récupérer redevances encaissées par Produit
  getRedevanceEncPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/RedevanceEncPr`, { params });
  }

  // Méthode pour récupérer redevances encaissées par Ps
  getRedevanceEncPS(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/RedevanceEncPS`, { params });
  } */



  /* // Méthode pour récupérer le montant des droits de timbre par Ps
  getDroitTimbEncPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/DroitTimbEncPs`, { params });
  }

  // Méthode pour récupérer le montant des droits de timbre  par Produit
  getDroitTimbEncPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DroitTimbEncPr`, { params });
  }

  // Méthode pour récupérer le montant des droits de timbre  par type
  getDroitTimbEncType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DroitTimbEncType`, { params });
  }
  
  // Méthode pour récupérer le montant des droits de timbre  par direction
  getDroitTimbEncDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DroitTimbEncDir`, { params });
  }

  // Méthode pour récupérer le montant des droits de timbre  par segment
  getDroitTimbEncSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DroitTimbEncSeg`, { params });
  } */


  /* // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION ENCAISSE par Ps
  getAvancConsEncPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/AvancConsEncPs`, { params });
  }

  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION ENCAISSE  par Produit
  getAvancConsEncPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AvancConsEncPr`, { params });
  }

  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION ENCAISSE  par type
  getAvancConsEncType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AvancConsEncType`, { params });
  }
  
  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION ENCAISSE  par direction
  getAvancConsEncDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AvancConsEncDr`, { params });
  }

  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION ENCAISSE  par segment
  getAvancConsEncSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AvancConsEncSeg`, { params });
  }

  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION REMBOURSE par Ps
  getAvancConsRembPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/AvancConsRembPs`, { params });
  }

  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION REMBOURSE  par Produit
  getAvancConsRembPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneTotalPr`, { params });
  }

  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION REMBOURSE  par type
  getAvancConsRembType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AvancConsRembType`, { params });
  }
  
  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION REMBOURSE  par direction
  getAvancConsRembDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AvancConsRembDr`, { params });
  }

  // Méthode pour récupérer le montant des AVANCE SUR CONSOMATION REMBOURSE  par segment
  getAvancConsRembSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AvancConsRembSeg`, { params });
  } */

  /* // Méthode pour récupérer le montant des VENTE ACCESSOIRE par Ps
  getVenteAccPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/VenteAccPs`, { params });
  }

  // Méthode pour récupérer le montant des VENTE ACCESSOIRE  par Produit
  getVenteAccPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/VenteAccPr`, { params });
  }

  // Méthode pour récupérer le montant des VENTE ACCESSOIRE  par type
  getVenteAccType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/VenteAccType`, { params });
  }
  
  // Méthode pour récupérer le montant des VENTE ACCESSOIRE  par direction
  getVenteAccDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/VenteAccDr`, { params });
  }

  // Méthode pour récupérer le montant des VENTE ACCESSOIRE  par segment
  getVenteAccSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/VenteAccSeg`, { params });
  } */

  /* // Méthode pour récupérer le TOTAL MONTANT IMPAYE par Ps
  getMontImpPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/MontImpPs`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT IMPAYE  par Produit
  getMontImpPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontImpPr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT IMPAYE  par type
  getMontImpType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontImpType`, { params });
  }
  
  // Méthode pour récupérer le TOTAL MONTANT IMPAYE  par direction
  getMontImpDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontImpDr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT IMPAYE  par segment
  getMontImpSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontImpSeg`, { params });
  }

  

  // Méthode pour récupérer le TOTAL MONTANT AVOIR par Ps
  getMontAvPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/MontAvPs`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT AVOIR  par Produit
  getMontAvPrMontFactPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontAvPr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT AVOIR  par type
  getMontAvType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontAvType`, { params });
  }
  
  // Méthode pour récupérer le TOTAL MONTANT AVOIR  par direction
  getMontAvDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontAvDr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT AVOIR  par segment
  getMontAvSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontAvSeg`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT REMBOURSEMENT par Ps
  getMontRembPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/MontRembPs`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT REMBOURSEMENT  par Produit
  getMontRembPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontRembPr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT REMBOURSEMENT  par type
  getMontRembType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontRembType`, { params });
  }
  
  // Méthode pour récupérer le TOTAL MONTANT REMBOURSEMENT  par direction
  getMontRembDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontRembDr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT REMBOURSEMENT  par segment
  getMontRembSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontRembSeg`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT ENCAISSE par Ps
  getMontEncPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/MontEncPs`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT ENCAISSE  par Produit
  getMontEncPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontEncbPr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT ENCAISSE  par type
  getMontEncType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontEncType`, { params });
  }
  
  // Méthode pour récupérer le TOTAL MONTANT ENCAISSE  par direction
  getMontEncDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontEncDr`, { params });
  }

  // Méthode pour récupérer le TOTAL MONTANT ENCAISSE  par segment
  getMontEncSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/MontEncSeg`, { params });
  } */

  /* // Méthode pour récupérer le TAUX RECOUVREMENT par Ps
  getTauxRecPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/TauxRecPs`, { params });
  }

  // Méthode pour récupérer le TAUX RECOUVREMENT  par Produit
  getTauxRecPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxRecPr`, { params });
  }

  // Méthode pour récupérer le TAUX RECOUVREMENT  par type
  getTauxRecType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxRecType`, { params });
  }
  
  // Méthode pour récupérer le TAUX RECOUVREMENT  par direction
  getTauxRecDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxRecDr`, { params });
  }

  // Méthode pour récupérer le TAUX RECOUVREMENT  par segment
  getTauxRecSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxRecSeg`, { params });
  } */

  /* // Méthode pour récupérer le CHIFFRE D'AFFAIRE GLOBAL par Ps
  getChiffreAffPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/ChiffreAffPs`, { params });
  }

  // Méthode pour récupérer le CHIFFRE D'AFFAIRE GLOBAL  par Produit
  getChiffreAffPr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ChiffreAffPr`, { params });
  }

  // Méthode pour récupérer le CHIFFRE D'AFFAIRE GLOBAL  par type
  getChiffreAffType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ChiffreAffType`, { params });
  }
  
  // Méthode pour récupérer le CHIFFRE D'AFFAIRE GLOBAL  par direction
  getChiffreAffDr(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ChiffreAffDr`, { params });
  }

  // Méthode pour récupérer le TOTAL CHIFFRE D'AFFAIRE GLOBAL  par segment
  getChiffreAffSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ChiffreAffSeg`, { params });
  } */
















  // Méthode pour récupérer le nombre total de modifications PS
  /* getTotalNombreDeModificationPs(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/NombreDeModificationPs`, { params });
  }

  

  // Méthode pour récupérer le taux de résiliation
  getTotalTauxResiliation(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/TauxResiliation`, { params });
  }

  // Méthode pour récupérer le nombre total de migrations
  getTotalNombreMigration(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/NombreMigration`, { params });
  }

  // Méthode pour récupérer le nombre total de suspensions
  getTotalNombreSuspension(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/NombreSuspension`, { params });
  } */

