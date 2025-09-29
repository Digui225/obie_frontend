import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


const baseUrl = 'api/v1/FaitSuiviSollicitation';
// const baseUrl = 'http://localhost:9080/api/v1/FaitSuiviAbonne';  // Remplacez par l'URL correcte de votre API

@Injectable({
  providedIn: 'root'
})
export class FaitSuiviSollService {
  

  constructor(private http: HttpClient) { }

  getSollData(
    type: string,
    axe: string,
    startDate: string,
    endDate: string
  ):  Observable<[string, number][]> {
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
    'Nombre de sollicitations clients': () => this.getNombreSollByDimension(dimension, startDate, endDate),
    'Taux de sollicitation résolues dans les délais': () => this.getTauxResoluDelByDimension(dimension, startDate, endDate),
    'Taux de sollicitation résolues hors délais': () => this.getTauxResoluHorsDelByDimension(dimension, startDate, endDate),
    'Durée moyenne de résolution des sollicitations': () => this.getDureeMoySollByDimension(dimension, startDate, endDate),
    // tu peux ajouter ici d’autres routes au fur et à mesure
  };

  const selectedRoute = routes[type];

  if (!selectedRoute) {
    return throwError(() => new Error(`Type non supporté : ${type}`));
  }

  return selectedRoute();
} 

   /* getSollData(
    type: string,
    axe: string,
    startDate: string,
    endDate: string
  ): Observable<[string, number][]> {
    const routes: Record<string, any> = {
      'Nombre de sollicitations clients': {
        'Direction': () => this.getNombreSollDir(startDate, endDate),
        'Type abonné': () => this.getNombreSollTypeAb(startDate, endDate),
        'Segment abonné': () => this.getNombreSollSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getNombreSollPs(startDate, endDate),
        'Produit': () => this.getNombreSollProd(startDate, endDate),
      },
      'Taux de sollicitation résolues dans les délais ': {
        'Direction': () => this.getTauxResoluDelDir(startDate, endDate),
        'Type abonné': () => this.getTauxResoluDelTypeAb(startDate, endDate),
        'Segment abonné': () => this.getTauxResoluDelSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getTauxResoluDelPs(startDate, endDate),
        'Produit': () => this.getTauxResoluDelProd(startDate, endDate),
      },
      'Taux de sollicitation résolues hors délais ':{
        'Direction': () => this.getTauxResoluHorsDelDir(startDate, endDate),
        'Type abonné': () => this.getTauxResoluHorsDelTypeAb(startDate, endDate),
        'Segment abonné':() => this.getTauxResoluHorsDelSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getTauxResoluHorsDelPs(startDate, endDate),
        'Produit':() => this.getTauxResoluHorsDelProd(startDate, endDate),
      },
      'Durée moyenne de résolution des sollicitations':{
        'Direction': () => this.getDureeMoySollDir(startDate, endDate),
        'Type abonné': () => this.getDureeMoySollTypeAb(startDate, endDate),
        'Segment abonné':() => this.getDureeMoySollSeg(startDate, endDate),
        'Puissance Souscrite': () => this.getDureeMoySollPs(startDate, endDate),
        'Produit':() => this.getDureeMoySollProd(startDate, endDate),
      }
    };

    const selectedRoutes = routes[type]?.[axe];
    if (!selectedRoutes) {
      return throwError(() => new Error('Route non définie pour ce type et cet axe'));
    }

    return selectedRoutes();
  }  */


   getSollStatsParMois(start: string, end: string): Observable<any[]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
  
      return this.http.get<any[]>(`${baseUrl}/RepartitionMensuelle`, { params });
    }

    getSollStatsDirection(start: string, end:string){
          const params = new HttpParams()
            .set('start', start)
            .set('end', end);
      
            return this.http.get<any[]>(`${baseUrl}/SollicitationsParDirection`, { params });
          }

     getSollStatsParType(start: string, end: string): Observable<any[]> {
      const params = new HttpParams()
        .set('start', start)
        .set('end', end);
  
      return this.http.get<any[]>(`${baseUrl}/StatistiquesParTypeAbonne`, { params });
    }
  
    // Méthode générique pour NombreSollicitationClient
    getNombreSollByDimension(
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
          endpoint = 'NombreSollicitationClientDr';
          break;
        case 'type':
          endpoint = 'NombreSollicitationClientType';
          break;
        case 'mode':
          endpoint = 'NombreSollicitationClientModFact';
          break;
        case 'segment':
          endpoint = 'NombreSollicitationClientSeg';
          break;
        case 'produit':
          endpoint = 'NombreSollicitationClientPr';
          break;
        case 'ps':
          endpoint = 'NombreSollicitationClientPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
  
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }


  


  /* // 🔹 Nombre de sollicitations client par type d’abonné
  getNombreSollTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/NombreSollicitationClientType`, { params });
  }

  // 🔹 Nombre de sollicitations client par segment abonné
  getNombreSollSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/NombreSollicitationClientSeg`, { params });
  }

  // 🔹 Nombre de sollicitations client par puissance souscrite
  getNombreSollPs(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/NombreSollicitationClientPs`, { params });
  }

  // 🔹 Nombre de sollicitations client par Mode
  getNombreSollMode(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/NombreSollicitationClientModFact`, { params });
  }

  // 🔹 Nombre de sollicitations client par produit
  getNombreSollProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/NombreSollicitationClientPr`, { params });
  }

  // 🔹 Nombre de sollicitations client par direction
  getNombreSollDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/NombreSollicitationClientDr`, { params });
  } */



    // Méthode générique pour Taux résolu dans délai
    getTauxResoluDelByDimension(
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
          endpoint = 'TauxDeSollicitationResoluDelaisDr';
          break;
        case 'type':
          endpoint = 'TauxDeSollicitationResoluDelaisType';
          break;
        case 'mode':
          endpoint = 'TauxDeSollicitationResoluDelaisModFact';
          break;
        case 'segment':
          endpoint = 'TauxDeSollicitationResoluDelaisSeg';
          break;
        case 'produit':
          endpoint = 'TauxDeSollicitationResoluDelaisPr';
          break;
        case 'ps':
          endpoint = 'TauxDeSollicitationResoluDelaisPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
  
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }

  /* // 🔹 Taux résolu dans le délai par type d’abonné
  getTauxResoluDelTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluDelaisType`, { params });
  }

  // 🔹 Taux résolu dans le délai par Mode
  getTauxResoluDelMode(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluDelaisModFact`, { params });
  }

  // 🔹 Taux résolu dans le délai par segment abonné
  getTauxResoluDelSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluDelaisSeg`, { params });
  }

  // 🔹 Taux résolu dans le délai par puissance souscrite
  getTauxResoluDelPs(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluDelaisPs`, { params });
  }

  // 🔹 Taux résolu dans le délai par produit
  getTauxResoluDelProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluDelaisPr`, { params });
  }

  // 🔹 Taux résolu dans le délai par direction
  getTauxResoluDelDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluDelaisDr`, { params });
  } */

    // Méthode générique pour Taux résolu hors délai
     getTauxResoluHorsDelByDimension(
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
          endpoint = 'TauxDeSollicitationResoluHorsDelaisDr';
          break;
        case 'type':
          endpoint = 'TauxDeSollicitationResoluHorsDelaisType';
          break;
        case 'mode':
          endpoint = 'TauxDeSollicitationResoluHorsDelaisModFact';
          break;
        case 'segment':
          endpoint = 'TauxDeSollicitationResoluHorsDelaisSeg';
          break;
        case 'produit':
          endpoint = 'TauxDeSollicitationResoluHorsDelaisPr';
          break;
        case 'ps':
          endpoint = 'TauxDeSollicitationResoluHorsDelaisPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
  
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }
  
   /*  // 🔹 Taux résolu hors délai par type d’abonné
  getTauxResoluHorsDelTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluHorsDelaisType`, { params });
  }

   // 🔹 Taux résolu hors délai par Mode
  getTauxResoluHorsDelMode(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluHorsDelaisModFact`, { params });
  }

  // 🔹 Taux résolu hors délai par segment abonné
  getTauxResoluHorsDelSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluHorsDelaisSeg`, { params });
  }

  // 🔹 Taux résolu hors délai par puissance souscrite
  getTauxResoluHorsDelPs(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluHorsDelaisPs`, { params });
  }

  // 🔹 Taux résolu hors délai par produit
  getTauxResoluHorsDelProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluHorsDelaisPr`, { params });
  }

  // 🔹 Taux résolu hors délai par direction
  getTauxResoluHorsDelDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/TauxDeSollicitationResoluHorsDelaisDr`, { params });
  } */

    // Méthode générique pour Taux résolu hors délai
     getDureeMoySollByDimension(
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
          endpoint = 'DureMoyenneDeResolutionDesSollicitationDr';
          break;
        case 'type':
          endpoint = 'DureMoyenneDeResolutionDesSollicitationType';
          break;
        case 'mode':
          endpoint = 'DureMoyenneDeResolutionDesSollicitationModFact';
          break;
        case 'segment':
          endpoint = 'DureMoyenneDeResolutionDesSollicitationSeg';
          break;
        case 'produit':
          endpoint = 'DureMoyenneDeResolutionDesSollicitationPr';
          break;
        case 'ps':
          endpoint = 'DureMoyenneDeResolutionDesSollicitationPs';
          break;
        default:
          throw new Error(`Dimension inconnue : ${dimension}`);
      }
  
      return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
    }
  
   /*  // 🔹 Durée moyenne de résolution des sollicitations par type d’abonné
  getDureeMoySollTypeAb(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DureMoyenneDeResolutionDesSollicitationType`, { params });
  }

   // 🔹 Durée moyenne de résolution des sollicitations par mode
  getDureeMoySollMode(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DureDeResolutionDesSollicitationModFact`, { params });
  }

  // 🔹 Durée moyenne de résolution des sollicitations par segment abonné
  getDureeMoySollSeg(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DureMoyenneDeResolutionDesSollicitationSeg`, { params });
  }

  // 🔹 Durée moyenne de résolution des sollicitations par puissance souscrite
  getDureeMoySollPs(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DureMoyenneDeResolutionDesSollicitationPs`, { params });
  }

  // 🔹 Durée moyenne de résolution des sollicitations par produit
  getDureeMoySollProd(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DureMoyenneDeResolutionDesSollicitationPr`, { params });
  }

  // 🔹 Durée moyenne de résolution des sollicitations par direction
  getDureeMoySollDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<[string, number][]>(`${baseUrl}/DureMoyenneDeResolutionDesSollicitationDr`, { params });
  }
 */
  


  // Méthode pour récupérer le nombre total de modifications PS
  getTotalNombreDeModificationPs(start: string, end: string): Observable<number> {
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
  } 
}    
