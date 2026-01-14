import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';


const baseUrl = '/api/v1/FaitSuiviAbonne';

@Injectable({
  providedIn: 'root'
})
export class FaitSuiviAbonneService {

  constructor(private http: HttpClient) { }
  

  getAbonneData(
    type: string,
    axe: string,
    startDate: string,
    endDate: string
  ): Observable<[string, number][]> {
    const mapAxeToDimension: { [key: string]: 'direction' | 'type' | 'mode' | 'segment' | 'produit' | 'ps' } = {
      'Direction': 'direction',
      'Type abonné': 'type',
      'Mode de facturation' : 'mode',
      'Segment abonné': 'segment',
      'Puissance souscrite': 'ps',
      'Produit': 'produit',
    };
  
    const dimension = mapAxeToDimension[axe];
  
    if (!dimension) {
      return throwError(() => new Error(`Axe non supporté : ${axe}`));
    }
  
    const routes: Record<string, () => Observable<[string, number][]>> = {
      'Abonnés actifs': () => this.getAbonneActifByDimension(dimension, startDate, endDate),
      'Abonnés au forfait': () => this.getAbonneForfaitByDimension(dimension, startDate, endDate),
      'Abonnés facturés': () => this.getAbonneFactureByDimension(dimension, startDate, endDate),
      'Abonnés résiliés': () => this.getAbonneResilieByDimension(dimension, startDate, endDate),
      'Nombre de résiliations': () => this.getResiliationByDimension(dimension, startDate, endDate),
      'Nombre total d\'abonnés': () => this.getAbonneTotalByDimension(dimension, startDate, endDate),
    };
  
    const selectedRoute = routes[type];
  
    if (!selectedRoute) {
      return throwError(() => new Error(`Type non supporté : ${type}`));
    }
  
    return selectedRoute();
  }
  
  /* getAbonneDatav2(
  type: string,
  axe: string,
  startDate: string,
  endDate: string
): Observable<[string, number][]> {
  const mapAxeToDimension: Record<string, string> = {
    'Direction': 'direction',
    'Type abonné': 'type',
    'Mode de facturation': 'mode',
    'Segment abonné': 'segment',
    'Puissance souscrite': 'ps',
    'Produit': 'produit',
  };

  const mapTypeToStatut: Record<string, string> = {
    'Abonnés actifs': 'actif',
    'Abonnés au forfait': 'forfait',
    'Abonnés facturés': 'facture',
    'Abonnés résiliés': 'resilie',
    'Nombre de résiliations': 'resiliation',
    'Nombre total d\'abonnés': 'total',
  };

  const dimension = mapAxeToDimension[axe];
  const statut = mapTypeToStatut[type];

  if (!dimension || !statut) {
    return throwError(() => new Error(`Type ou axe non supporté : ${type}, ${axe}`));
  }

  const params = new HttpParams()
    .set('statut', statut)
    .set('dimension', dimension)
    .set('start', startDate)
    .set('end', endDate);

  return this.http.get<[string, number][]>(
    `${baseUrl}/abonnes`,
    { params }
  );
}
*/

   /* getAbonneDatav0(
    type: string,
    axe: string,
    startDate: string,
    endDate: string
  ): Observable<[string, number][]> {
    const routes: Record<string, any> = {
      'Abonnés actifs': {
        'Direction': () => this.getAbonneActifPardirection(startDate, endDate),
        'Type abonné': () => this.getAbonneActifParTypeAbonne(startDate, endDate),
        'Segment abonné': () => this.getAbonneActifParSegment(startDate, endDate),
        'Puissance Souscrite': () => this.getAbonneActifParPs(startDate, endDate),
        'Produit': () => this.getAbonneActifParProduit(startDate, endDate),
      },
      'Abonnés au forfait': {
        'Direction': () => this.getAbonneForfaitDir(startDate, endDate),
        'Type abonné': () => this.getAbonneForfaitTypeA(startDate, endDate),
        'Segment abonné': () => this.getAbonneForfaitSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getAbonneForfaitPs(startDate, endDate),
        'Produit': () => this.getAbonneForfaitProd(startDate, endDate),
      },
      'Abonnés facturés':{
        'Direction': () => this.getAbonneFactureDir(startDate, endDate),
        'Type abonné': () => this.getAbonneFactureTypeA(startDate, endDate),
        'Segment abonné':() => this.getAbonneFactureSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getAbonneFacturePs(startDate, endDate),
        'Produit':() => this.getAbonneFactureProd(startDate, endDate),
      },
      'Abonnés résiliés':{
        'Direction': () => this.getAbonneResilieDir(startDate, endDate),
        'Type abonné': () => this.getAbonneResilieTypeA(startDate, endDate),
        'Segment abonné':() => this.getAbonneResilieSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getAbonneResiliePs(startDate, endDate),
        'Produit':() => this.getAbonneResilieProd(startDate, endDate),
      },
      'Nombre de résiliations':{
        'Direction': () => this.getResiliationDir(startDate, endDate),
        'Type abonné': () => this.getResiliationTypeA(startDate, endDate),
        'Segment abonné':() => this.getResiliationSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getResiliationPs(startDate, endDate),
        'Produit':() => this.getResiliationProd(startDate, endDate),
      },
      'Nombre total d\'abonnés':{
        'Direction': () => this.getTotalDir(startDate, endDate),
        'Type abonné': () => this.getTotalType(startDate, endDate),
        'Segment abonné':() => this.getTotalSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getTotalPs(startDate, endDate),
        'Produit':() => this.getTotalProd(startDate, endDate),
      }
    };

    const selectedRoutes = routes[type]?.[axe];
    if (!selectedRoutes) {
      return throwError(() => new Error('Route non définie pour ce type et cet axe'));
    }

    return selectedRoutes();
  }  */

    getMultiAbonneInfos(start: string, end:string){
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
  
        return this.http.get<any[]>(`${baseUrl}/StatutAbonne`, { params });
      }

      getTypeAbonneInfos(start: string, end:string){
        const params = new HttpParams()
          .set('start', start)
          .set('end', end);
    
          return this.http.get<any[]>(`${baseUrl}/RepartitionTypeA`, { params });
        }

        /* // Méthode pour récupérer le nombre total d'abonnés    
        getTotalAbonne(start: string, end: string): Observable<number> {
          const params = new HttpParams()
            .set('start', start)
            .set('end', end);
          return this.http.get<number>(`${baseUrl}/NombreTotalAbonne`, { params });
        } */


   // Méthode pour récupérer les statistiques d'abonnés par direction
   getAbonneStatsParDirection(start: string, end: string): Observable<any[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<any[]>(`${baseUrl}/TableauAbonneDir`, { params });
  }

  // Méthode pour récupérer les statistiques d'abonnés par direction
  getAbonneActifParDirProd(start: string, end: string): Observable<any[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<any[]>(`${baseUrl}/AboActDir`, { params });
  }
   

    // Méthode générique
    getAbonneActifByDimension(
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
          endpoint = 'AbonneActifPardirection';
          break;
        case 'type':
          endpoint = 'AbonneActifParTypeAbonne';
          break;
        case 'mode':
              endpoint = 'AbonneActifParModFact';
            break;
        case 'segment':
          endpoint = 'AbonneActifParSegment';
          break;
        case 'produit':
          endpoint = 'AbonneActifProduit';
          break;
        case 'ps':
          endpoint = 'AbonneActifParPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }

      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }





  /* // Méthode pour récupérer le nombre total d'abonnés actifs par direction
getAbonneActifPardirection(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/AbonneActifPardirection`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPardirection"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

 // Méthode pour récupérer le nombre total d'abonnés actifs par Type d'abonnés
 getAbonneActifParTypeAbonne(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/AbonneActifParTypeAbonne`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParTypeAbonne"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

// Méthode pour récupérer le nombre total d'abonnés actifs par Produit
getAbonneActifParProduit(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/AbonneActifProduit`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParProduit"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

// Méthode pour récupérer le nombre total d'abonnés actifs par Ps
getAbonneActifParPs(start: string, end: string): Observable<number[][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<number[][]>(`${baseUrl}/AbonneActifParPs`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParPs"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
}

// Méthode pour récupérer le nombre total d'abonnés actifs par Segment
getAbonneActifParSegment(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
    .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
  return this.http.get<[string, number][]>(`${baseUrl}/AbonneActifParSegment`, { params }); 
  // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParSegment"
  // et les paramètres "start" et "end". Attend un résultat de type "number".
} */


  getAbonneForfaitByDimension(
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
        endpoint = 'abonneForfaitDir';
        break;
      case 'type':
        endpoint = 'abonneForfaitTypeA';
        break;
      case 'mode':
          endpoint = 'abonneForfaitMode';
        break;
      case 'segment':
        endpoint = 'abonneForfaitSegmentA';
        break;
      case 'produit':
        endpoint = 'abonneForfaitP';
        break;
      case 'ps':
        endpoint = 'abonneForfaitPS';
        break;
      default:
        throw new Error(`Dimension inconnue : ${dimension}`);
    }
  
    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  }
  



  /* // Méthode pour récupérer le nombre total d'abonnés forfait
  getTotalAbonneForfait(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/AbonneForfait`, { params });
  }

    // Méthode pour récupérer le nombre total d'abonnés forfait par type d'abonnés
    getAbonneForfaitTypeA(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
      return this.http.get<[string, number][]>(`${baseUrl}/abonneForfaitTypeA`, { params });
    }

    // Méthode pour récupérer le nombre total d'abonnés forfait par Direction
    getAbonneForfaitDir(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
      return this.http.get<[string, number][]>(`${baseUrl}/abonneForfaitDir`, { params });
    }

    // Méthode pour récupérer le nombre total d'abonnés forfait par Segment
    getAbonneForfaitSeg(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
      return this.http.get<[string, number][]>(`${baseUrl}/abonneForfaitSegmentA`, { params });
    }

    // Méthode pour récupérer le nombre total d'abonnés forfait par Produit
    getAbonneForfaitProd(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
      return this.http.get<[string, number][]>(`${baseUrl}/abonneForfaitP`, { params });
    }

    // Méthode pour récupérer le nombre total d'abonnés forfait par Ps
    getAbonneForfaitPs(start: string, end: string): Observable<number[][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
      return this.http.get<number[][]>(`${baseUrl}/abonneForfaitPS`, { params });
    } */
  
      getAbonneFactureByDimension(
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
            endpoint = 'abonneFactureDr';
            break;
          case 'type':
            endpoint = 'abonneFactureTyp';
            break;
          case 'mode':
          endpoint = 'abonneFactureMode';
          break;
          case 'segment':
            endpoint = 'abonneFactureSeg';
            break;
          case 'produit':
            endpoint = 'abonneFacturePr';
            break;
          case 'ps':
            endpoint = 'abonneFacturePS';
            break;
          default:
            throw new Error(`Dimension inconnue : ${dimension}`);
        }
      
        return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
      }


  // Méthode pour récupérer le nombre total d'abonnés facturés
  /* getTotalAbonneFacture(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/AbonneFacture`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés Facture par type d'abonnés
  getAbonneFactureTypeA(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneFactureTyp`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés Facture par Direction
  getAbonneFactureDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneFactureDr`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés Facture par Segment
  getAbonneFactureSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneFactureSeg`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés Facture par Produit
  getAbonneFactureProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneFacturePr`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés Facture par Ps
  getAbonneFacturePs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/abonneFacturePS`, { params });
  } */

    getAbonneResilieByDimension(
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
          endpoint = 'abonneResileDr';
          break;
        case 'type':
          endpoint = 'abonneResileTyp';
          break;
         case 'mode':
          endpoint = 'abonneResileModFact';
          break;
        case 'segment':
          endpoint = 'abonneResileSg';
          break;
        case 'produit':
          endpoint = 'abonneResilePr';
          break;
        case 'ps':
          endpoint = 'abonneResilePS';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
    
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }

  // Méthode pour récupérer le nombre total d'abonnés résiliés
  /* getTotalAbonneResilie(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/AbonneResilie`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par type d'abonnés
  getAbonneResilieTypeA(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneResileTyp`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Direction
  getAbonneResilieDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneResileDr`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Segment
  getAbonneResilieSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneResileSg`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Produit
  getAbonneResilieProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneResilePr`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Ps
  getAbonneResiliePs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/abonneResilePS`, { params });
  } */

    getResiliationByDimension(
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
          endpoint = 'ResiliationTotalDir';
          break;
        case 'type':
          endpoint = 'ResiliationTotalTyp';
          break;
        case 'mode':
          endpoint = 'ResiliationTotalModFact';
          break;
        case 'segment':
          endpoint = 'ResiliationTotalSeg';
          break;
        case 'produit':
          endpoint = 'ResiliationTotalPr';
          break;
        case 'ps':
          endpoint = 'ResiliationTotalPS';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
    
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }

  // Méthode pour récupérer le nombre total de résiliations
  /* getTotalNombreResiliation(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${baseUrl}/NombreResiliation`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par type d'abonnés
  getResiliationTypeA(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ResiliationTotalTyp`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Direction
  getResiliationDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ResiliationTotalDir`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Segment
  getResiliationSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ResiliationTotalSeg`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Produit
  getResiliationProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/ResiliationTotalPr`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés résiliés par Ps
  getResiliationPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/ResiliationTotalPS`, { params });
  } */

    getAbonneTotalByDimension(
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
          endpoint = 'AbonneTotalDir';
          break;
        case 'type':
          endpoint = 'abonneTotalTyp';
          break;
        case 'mode':
          endpoint = 'abonneTotalMode';
          break;
        case 'segment':
          endpoint = 'AbonneTotalSeg';
          break;
        case 'produit':
          endpoint = 'AbonneTotalPr';
          break;
        case 'ps':
          endpoint = 'AbonneTotalPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
    
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }


  // Méthode pour récupérer le nombre total d'abonnés par Ps
  /* getTotalPs(start: string, end: string): Observable<number[][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number[][]>(`${baseUrl}/AbonneTotalPs`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés  par Produit
  getTotalProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneTotalPr`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés  par type
  getTotalType(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/abonneTotalTyp`, { params });
  }
  
  // Méthode pour récupérer le nombre total d'abonnés  par direction
  getTotalDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneTotalDir`, { params });
  }

  // Méthode pour récupérer le nombre total d'abonnés  par segment
  getTotalSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneTotalSeg`, { params });
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
}
