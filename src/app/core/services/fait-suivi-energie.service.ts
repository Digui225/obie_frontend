import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


const baseUrl = '/api/v1/FaitSuiviEnergie';

@Injectable({
  providedIn: 'root'
})
export class FaitSuiviEnergieService {

  constructor(private http: HttpClient) { }

      getEnergieData(
        type: string,
        axe: string,
        startDate: string,
        endDate: string
      ): Observable<[string, number][]> {
        // Normalisation des entrées
        type = type.trim().toLowerCase();
        axe = axe.trim().toLowerCase();
      
        // Mapping des axes d'analyse normalisés vers les dimensions backend
        const mapAxeToDimension: { [key: string]: 'direction' | 'type' | 'segment' | 'produit' | 'ps' } = {
          'direction': 'direction',
          'type abonné': 'type',
          'segment abonné': 'segment',
          'puissance souscrite': 'ps',
          'produit': 'produit',
        };
      
        const dimension = mapAxeToDimension[axe];
      
        if (!dimension) {
          return throwError(() => new Error(`Axe non supporté : ${axe}`));
        }
      
        // Mapping des types d’indicateur à leurs fonctions respectives
        const routes: Record<string, () => Observable<[string, number][]>> = {
          'quantité kwh produite': () => this.getQuantiteKwhProdByDimension(dimension, startDate, endDate),
          'quantité kwh livrée': () => this.getQuantiteKwhLivreByDimension(dimension, startDate, endDate),
          'quantité kwh exportée': () => this.getQuantiteKwhExpByDimension(dimension, startDate, endDate),
          'quantité kwh consommée': () => this.getQuantiteKwhConsByDimension(dimension, startDate, endDate),
          'quantité kwh facturée': () => this.getQuantiteKwhFactByDimension(dimension, startDate, endDate),
          'quantité kwh en redevance': () => this.getQuantiteKwhRedevanceByDimension(dimension, startDate, endDate),
          'quantité kwh rechargée': () => this.getQuantiteKwhRechargeeByDimension(dimension, startDate, endDate),
          'quantité kwh approvisionnée': () => this.getQuantiteKwhApproByDimension(dimension, startDate, endDate),
          'montant kwh rechargé': () => this.getMontantRechargeByDimension(dimension, startDate, endDate),
          'montant kwh approvisionné': () => this.getMontantApproByDimension(dimension, startDate, endDate),
          // Ajoute ici d'autres indicateurs si nécessaire...
        };
      
        const selectedRoute = routes[type];
      
        if (!selectedRoute) {
          return throwError(() => new Error(`Type non supporté : ${type}`));
        }
      
        // Appel de la méthode correspondante
        return selectedRoute();
      }
  

   /* getEnergieData(
    type: string,
    axe: string,
    startDate: string,
    endDate: string
  ): Observable<[string, number][]> {
    const routes: Record<string, any> = {
      'Quantité KWh produite': {
        'Direction': () => this.getQteKwhProdDir(startDate, endDate),
        'Type abonné': () => this.getQteKwhProdTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhProdSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhProdPs(startDate, endDate),
        'Produit': () => this.getQteKwhProdByProd(startDate, endDate),
      },
      'Quantité KWh livrée': {
        'Direction':  ()=> this.getQteKwhLivreDir(startDate, endDate),
        'Type abonné': () => this.getQteKwhLivreTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhLivreSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhLivreByPuissance(startDate, endDate),
        'Produit': () => this.getQteKwhLivreProd(startDate, endDate),
      },
      'Quantité KWh exportée': {
        'Direction': () => this.getQteKwhExpDir(startDate, endDate),
        'Type abonné': () => this.getQteKwhExpTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhExpSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhExpPs(startDate, endDate),
        'Produit': () => this.getQuantiteKwhExpByProduit(startDate, endDate),
      },

      'Quantité KWh consommée': {
        'Direction': () => this.getQteKwhConsoDir(startDate, endDate),
        'Type abonné': () => this.getQteKwhConsoTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhConsoSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhConsoPs(startDate, endDate),
        'Produit': () => this.getQteKwhConsoProd(startDate, endDate),
      },

      'Quantité KWh facturée': {
        'Direction': () => this.getQteKwhFactDr(startDate, endDate),
        'Type abonné': () => this.getQteKwhFactTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhFactSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhFactPs(startDate, endDate),
        'Produit': () => this.getQteKwhFactPr(startDate, endDate),
      },
      'Quantité KWh en redevance': {
        'Direction': () => this.getQteKwhRedvDr(startDate, endDate),
        'Type abonné': () => this.getQteKwhRedvTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhRedvSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhRedvPs(startDate, endDate),
        'Produit': () => this.getQteKwhRedvPr(startDate, endDate),
      },

      'Quantité KWh rechargée': {
        'Direction': () => this.getQteKwhRechDr(startDate, endDate),
        'Type abonné': () => this.getQteKwhRechTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhRechSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhRechPs(startDate, endDate),
        'Produit': () => this.getQteKwhRechPr(startDate, endDate),
      },

      'Quantité KWh approvisionnée': {
        'Direction': () => this.getQteKwhApprDr(startDate, endDate),
        'Type abonné': () => this.getQteKwhApprTypeAb(startDate, endDate),
        'Segment abonné': () => this.getQteKwhApprSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getQteKwhApprPs(startDate, endDate),
        'Produit': () => this.getQteKwhApprPr(startDate, endDate),
      },
      'Montant KWh rechargé': {
        'Direction': () => this.getMontantRechDr(startDate, endDate),
        'Type abonné': () => this.getMontantRechType(startDate, endDate),
        'Segment abonné': () => this.getMontantRechSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getMontantRechPs(startDate, endDate),
        'Produit': () => this.getMontantRechPr(startDate, endDate),
      },

      'Montant KWh approvisionné': {
        'Direction': () => this.getMontantApprDr(startDate, endDate),
        'Type abonné': () => this.getMontantApprType(startDate, endDate),
        'Segment abonné': () => this.getMontantApprSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getMontantApprPs(startDate, endDate),
        'Produit': () => this.getMontantApprPr(startDate, endDate),
      },

      'Solde abonné': {
        'Direction': () => this.getSoldeAboDr(startDate, endDate),
        'Type abonné': () => this.getSoldeAboTypeAb(startDate, endDate),
        'Segment abonné': () => this.getSoldeAboSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getSoldeAboPs(startDate, endDate),
        'Produit': () => this.getSoldeAboPr(startDate, endDate),
      },

      'Solde revendeur': {
        'Direction': () => this.getSoldeRevDr(startDate, endDate),
        'Type abonné': () => this.getSoldeRevTypeAb(startDate, endDate),
        'Segment abonné': () => this.getSoldeRevSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getSoldeRevPs(startDate, endDate),
        'Produit': () => this.getSoldeRevPr(startDate, endDate),
      },


    };

    const selectedRoutes = routes[type]?.[axe];
    if (!selectedRoutes) {
      return throwError(() => new Error('Route non définie pour ce type et cet axe'));
    }

    return selectedRoutes();
  } */ 

   /* getMultiEnergieInfos(start: string, end:string){
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<any[]>(`${baseUrl}/total`, { params });
   } */
   
    // Méthode pour récupérer les statistiques d'abonnés par direction
   getEnergieStatsParDirection(start: string, end: string): Observable<any[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<any[]>(`${baseUrl}/totalEnergie`, { params });
  }

  getQuantiteKwhInfos(start: string, end:string){
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

      return this.http.get<any[]>(`${baseUrl}/EnergieMensuelle`, { params });
    }

    getQuantiteKwhConsMois(start: string, end:string){
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
  
        return this.http.get<any[]>(`${baseUrl}/DetailEnergieMensuelle`, { params });
      }

/* // Méthode pour récupérer le qte total de Kwh    
getTotalKwh(start: string, end: string): Observable<number> {
  const params = new HttpParams()
    .set('start', start)
    .set('end', end);
  return this.http.get<number>(`${baseUrl}/QuantiteKwhProduit`, { params });
} */

  // Méthode générique
getQuantiteKwhProdByDimension(
  dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
  start: string,
  end: string
): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start)
    .set('end', end);

  let endpoint = '';

  switch (dimension) {
    case 'direction':
      endpoint = 'QuantiteQwhPrDr';
      break;
    case 'type':
      endpoint = 'QuantiteQwhPrType';
      break;
    case 'segment':
      endpoint = 'QuantiteQwhPrSeg';
      break;
    case 'produit':
      endpoint = 'QuantiteQwhPrPr';
      break;
    case 'ps':
      endpoint = 'QuantiteQwhPrPs';
      break;
    default:
      throw new Error(`Dimension inconnue : ${dimension}`);
  }

  return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
}


  /* // 🔹 Quantité KWh produite par type d’abonné
  getQteKwhProdTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhPrType`, { params });
  }

  // 🔹 Quantité KWh produite par segment abonné
  getQteKwhProdSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhPrSeg`, { params });
  }

  // 🔹 Quantité KWh produite par puissance souscrite
  getQteKwhProdPs(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhPrPs`, { params });
  }

  // 🔹 Quantité KWh produite par produit
  getQteKwhProdByProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhPrPr`, { params });
  }

  // 🔹 Quantité KWh produite par direction
  getQteKwhProdDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhPrDr`, { params });
  } */

  // Méthode générique
getQuantiteKwhLivreByDimension(
  dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
  start: string,
  end: string
): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start)
    .set('end', end);

  let endpoint = '';

  switch (dimension) {
    case 'direction':
      endpoint = 'QuantiteQwhLivDr';
      break;
    case 'type':
      endpoint = 'QuantiteQwhLivType';
      break;
    case 'segment':
      endpoint = 'QuantiteQwhLivSeg';
      break;
    case 'produit':
      endpoint = 'QuantiteQwhLivPr';
      break;
    case 'ps':
      endpoint = 'QuantiteQwhLivPs';
      break;
    default:
      throw new Error(`Dimension inconnue : ${dimension}`);
  }

  return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
}
  
  /*   // 🔹 Quantité KWh livrée par type d’abonné
  getQteKwhLivreTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhLivType`, { params });
  }

  // 🔹 Quantité KWh livrée par segment abonné
  getQteKwhLivreSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhLivSeg`, { params });
  }

  // 🔹 Quantité KWh livrée par puissance souscrite
  getQteKwhLivreByPuissance(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhLivPs`, { params });
  }

  // 🔹 Quantité KWh livrée par produit
  getQteKwhLivreProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhLivPr`, { params });
  }

  // 🔹 Quantité KWh livrée par direction
  getQteKwhLivreDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhLivDr`, { params });
  } */


    getQuantiteKwhExpByDimension(
      dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
      start: string,
      end: string
    ): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
    
      let endpoint = '';
    
      switch (dimension) {
        case 'direction':
          endpoint = 'QuantiteQwhExpDr';
          break;
        case 'type':
          endpoint = 'QuantiteQwhExpType';
          break;
        case 'segment':
          endpoint = 'QuantiteQwhExpSeg';
          break;
        case 'produit':
          endpoint = 'QuantiteQwhExpPr';
          break;
        case 'ps':
          endpoint = 'QuantiteQwhExpPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
    
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }
    


  /* // 🔹 Quantité KWh exportée par type d’abonné
  getQteKwhExpTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhExpType`, { params });
  }

  // 🔹 Quantité KWh exportée par segment abonné
  getQteKwhExpSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhExpSeg`, { params });
  }

  // 🔹 Quantité KWh exportée par puissance souscrite
  getQteKwhExpPs(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhExpPs`, { params });
  }

  // 🔹 Quantité KWh exportée par produit
  getQuantiteKwhExpByProduit(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhExpPr`, { params });
  }

  // 🔹 Quantité KWh exportée par direction
  getQteKwhExpDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhExpDr`, { params });
  } */

    getQuantiteKwhConsByDimension(
      dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
      start: string,
      end: string
    ): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
    
      let endpoint = '';
    
      switch (dimension) {
        case 'direction':
          endpoint = 'QuantiteQwhConsDr';
          break;
        case 'type':
          endpoint = 'QuantiteQwhConsType';
          break;
        case 'segment':
          endpoint = 'QuantiteQwhConsSeg';
          break;
        case 'produit':
          endpoint = 'QuantiteQwhConsPr';
          break;
       /*  case 'ps':
          endpoint = 'QuantiteQwhConsPs';
          break; */
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
    
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }
    
   // 🔹 Quantité KWh consommée par puissance souscrite (avec gestion headers)
      getQteKwhConsoPs(start: string, end: string): Observable<{ headers: string[], data: [string, number][] }> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<{ headers: string[], data: [string, number][] }>(`${baseUrl}/QuantiteQwhConsPs`, { params });
}



  /* // 🔹 Quantité KWh consommée par type d’abonné
  getQteKwhConsoTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhConsType`, { params });
  }

  // 🔹 Quantité KWh consommée par segment abonné
  getQteKwhConsoSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhConsSeg`, { params });
  }



  // 🔹 Quantité KWh consommée par produit
  getQteKwhConsoProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhConsPr`, { params });
  }

  // 🔹 Quantité KWh consommée par direction
  getQteKwhConsoDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhConsDr`, { params });
  } */

    getQuantiteKwhFactByDimension(
      dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
      start: string,
      end: string
    ): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
    
      let endpoint = '';
    
      switch (dimension) {
        case 'direction':
          endpoint = 'QuantiteQwhFactDr';
          break;
        case 'type':
          endpoint = 'QuantiteQwhFactType';
          break;
        case 'segment':
          endpoint = 'QuantiteQwhFactSeg';
          break;
        case 'produit':
          endpoint = 'QuantiteQwhFactPr';
          break;
        case 'ps':
          endpoint = 'QuantiteQwhFactPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
    
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }
    

  /* // 🔹 Quantité KWh facturée par type d’abonné
getQteKwhFactTypeAb(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhFactType`, { params });
}

// 🔹 Quantité KWh facturée par segment abonné
getQteKwhFactSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhFactSeg`, { params });
}

// 🔹 Quantité KWh facturée par puissance souscrite
getQteKwhFactPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhFactPs`, { params });
}

// 🔹 Quantité KWh facturée par produit
getQteKwhFactPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhFactPr`, { params });
}

// 🔹 Quantité KWh facturée par direction
getQteKwhFactDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhFactDr`, { params });
} */

  getQuantiteKwhRedevanceByDimension(
    dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
    start: string,
    end: string
  ): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
  
    let endpoint = '';
  
    switch (dimension) {
      case 'direction':
        endpoint = 'QuantiteQwhRedvDr';
        break;
      case 'type':
        endpoint = 'QuantiteQwhRedvType';
        break;
      case 'segment':
        endpoint = 'QuantiteQwhRedvSeg';
        break;
      case 'produit':
        endpoint = 'QuantiteQwhRedvPr';
        break;
      case 'ps':
        endpoint = 'QuantiteQwhRedvPs';
        break;
      default:
        throw new Error(`Dimension inconnue pour redevance : ${dimension}`);
    }
  
    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  }
  

/* // 🔹 Quantité KWh en redevance par type d’abonné
getQteKwhRedvTypeAb(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRedvType`, { params });
}

// 🔹 Quantité KWh en redevance par segment abonné
getQteKwhRedvSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRedvSeg`, { params });
}

// 🔹 Quantité KWh en redevance par puissance souscrite
getQteKwhRedvPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRedvPs`, { params });
}

// 🔹 Quantité KWh en redevance par produit
getQteKwhRedvPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRedvPr`, { params });
}

// 🔹 Quantité KWh en redevance par direction
getQteKwhRedvDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRedvPr`, { params });
} */
  
  
  getQuantiteKwhRechargeeByDimension(
    dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
    start: string,
    end: string
  ): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
  
    let endpoint = '';
  
    switch (dimension) {
      case 'direction':
        endpoint = 'QuantiteQwhRechaDr';
        break;
      case 'type':
        endpoint = 'QuantiteQwhRechaType';
        break;
      case 'segment':
        endpoint = 'QuantiteQwhRechaSeg';
        break;
      case 'produit':
        endpoint = 'QuantiteQwhRechaPr';
        break;
      case 'ps':
        endpoint = 'QuantiteQwhRechaPs';
        break;
      default:
        throw new Error(`Dimension inconnue pour recharge : ${dimension}`);
    }
  
    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  }
  
/* // 🔹 Quantité KWh rechargée par type d’abonné
getQteKwhRechTypeAb(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRechaType`, { params });
}

// 🔹 Quantité KWh rechargée par segment abonné
getQteKwhRechSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRechaSeg`, { params });
}

// 🔹 Quantité KWh rechargée par puissance souscrite
getQteKwhRechPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRechaPs`, { params });
}

// 🔹 Quantité KWh rechargée par produit
getQteKwhRechPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRechaPr`, { params });
}

// 🔹 Quantité KWh rechargée par direction
getQteKwhRechDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhRechaDr`, { params });
} */

  getQuantiteKwhApproByDimension(
    dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
    start: string,
    end: string
  ): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
  
    let endpoint = '';
  
    switch (dimension) {
      case 'direction':
        endpoint = 'QuantiteQwhApprDr';
        break;
      case 'type':
        endpoint = 'QuantiteQwhApprType';
        break;
      case 'segment':
        endpoint = 'QuantiteQwhApprSeg';
        break;
      case 'produit':
        endpoint = 'QuantiteQwhApprPr';
        break;
      case 'ps':
        endpoint = 'QuantiteQwhApprPs';
        break;
      default:
        throw new Error(`Dimension inconnue pour l’approvisionnement : ${dimension}`);
    }
  
    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  }
  

  /* // 🔹 Quantité KWh approvisionnée par type d’abonné
getQteKwhApprTypeAb(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhApprType`, { params });
}

// 🔹 Quantité KWh approvisionnée par segment abonné
getQteKwhApprSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhApprSeg`, { params });
}

// 🔹 Quantité KWh approvisionnée par puissance souscrite
getQteKwhApprPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhApprPs`, { params });
}

// 🔹 Quantité KWh approvisionnée par produit
getQteKwhApprPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhApprPr`, { params });
}

// 🔹 Quantité KWh approvisionnée par direction
getQteKwhApprDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/QuantiteQwhApprDr`, { params });
} */

  getMontantRechargeByDimension(
    dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
    start: string,
    end: string
  ): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
  
    let endpoint = '';
  
    switch (dimension) {
      case 'direction':
        endpoint = 'MontantRechDr';
        break;
      case 'type':
        endpoint = 'MontantRechType';
        break;
      case 'segment':
        endpoint = 'MontantRechSeg';
        break;
      case 'produit':
        endpoint = 'MontantRechPr';
        break;
      case 'ps':
        endpoint = 'MontantRechPs';
        break;
      default:
        throw new Error(`Dimension inconnue pour montant rechargé : ${dimension}`);
    }
  
    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  }
  

  /* // 🔹 Montant KWh rechargé par type d’abonné
getMontantRechType(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantRechType`, { params });
}

// 🔹 Montant KWh rechargé par segment abonné
getMontantRechSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantRechSeg`, { params });
}

// 🔹 Montant KWh rechargé par puissance souscrite
getMontantRechPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantRechPs`, { params });
}

// 🔹 Montant KWh rechargé par produit
getMontantRechPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantRechPr`, { params });
}

// 🔹 Montant KWh rechargé par direction
getMontantRechDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantRechDr`, { params });
} */

  getMontantApproByDimension(
    dimension: 'direction' | 'type' | 'segment' | 'produit' | 'ps',
    start: string,
    end: string
  ): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
  
    let endpoint = '';
  
    switch (dimension) {
      case 'direction':
        endpoint = 'MontantApprDr';
        break;
      case 'type':
        endpoint = 'MontantApprType';
        break;
      case 'segment':
        endpoint = 'MontantApprSeg';
        break;
      case 'produit':
        endpoint = 'MontantApprPr';
        break;
      case 'ps':
        endpoint = 'MontantApprPs';
        break;
      default:
        throw new Error(`Dimension inconnue pour montant approvisionné : ${dimension}`);
    }
  
    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  }
  

/* // 🔹 Montant KWh approvisionné par type d’abonné
getMontantApprType(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantApprType`, { params });
}

// 🔹 Montant KWh approvisionné par segment abonné
getMontantApprSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantApprSeg`, { params });
}

// 🔹 Montant KWh approvisionné par puissance souscrite
getMontantApprPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantApprPs`, { params });
}

// 🔹 Montant KWh approvisionné par produit
getMontantApprPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantApprPr`, { params });
}

// 🔹 Montant KWh approvisionné par direction
getMontantApprDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/MontantApprDr`, { params });
} */

// 🔹 Solde abonné par type d’abonné
getSoldeAboTypeAb(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeAboType`, { params });
}

// 🔹 Solde abonné par segment abonné
getSoldeAboSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeAboSeg`, { params });
}

// 🔹 Solde abonné par puissance souscrite
getSoldeAboPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeAboPs`, { params });
}

// 🔹 Solde abonné par produit
getSoldeAboPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeAboPr`, { params });
}

// 🔹 Solde abonné par direction
getSoldeAboDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeAboDr`, { params });
}

// 🔹 Solde revendeur par type d’abonné
getSoldeRevTypeAb(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeRevType`, { params });
}

// 🔹 Solde revendeur par segment abonné
getSoldeRevSeg(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeRevSeg`, { params });
}

// 🔹 Solde revendeur par puissance souscrite
getSoldeRevPs(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeRevPs`, { params });
}

// 🔹 Solde revendeur par produit
getSoldeRevPr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeRevPr`, { params });
}

// 🔹 Solde revendeur par direction
getSoldeRevDr(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams().set('start', start).set('end', end);
  return this.http.get<[string, number][]>(`${baseUrl}/SoldeRevDr`, { params });
}


  

  
  
  
  
}
