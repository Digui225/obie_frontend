import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const baseUrl = '/api/v1/FaitSuiviAbonne';

// const baseUrl = 'http://localhost:9080/api/v1/FaitSuiviAbonne';


@Injectable({
  providedIn: 'root'
})
export class SuiviAbonneDetailsService {

  constructor(private http: HttpClient) { }

  /* // 🔹 mapping entre resultType et préfixe d'URL
  private endpointMap: Record<string, string> = {
    actif: '',
    facture: 'AbonneFacture',
    resilie: 'AbonneResile',
    resiliation: 'NombreResi',
    total: 'NombreTotal'
  };

  // 🔹 mapping entre resultType et équivalence des catégories
  private categoryMap: Record<string, Record<string, string>> = {
    actif: {
      Direction: 'Direction',
      TypeAbonne: 'TypeAbonne',
      Segment: 'Segment',
      Puissance: 'Puissance',
      Produit: 'Produit'
    },
    facture: {
      Direction: 'Dir',
      TypeAbonne: 'Typ',
      Segment: 'Seg',
      Puissance: 'Ps',
      Produit: 'Prod'
    },
    resilie: {
      Direction: 'Dir',
      TypeAbonne: 'Typ',
      Segment: 'Seg',
      Puissance: 'Ps',
      Produit: 'Prod'
    },
    resiliation: {
      Direction: 'Dir',
      TypeAbonne: 'Typ',
      Segment: 'Seg',
      Puissance: 'Ps',
      Produit: 'Prod'
    },
    total: {
      Direction: 'Dir',
      TypeAbonne: 'Typ',
      Segment: 'Seg',
      Puissance: 'Ps',
      Produit: 'Prod'
    }
  };

  /**
   * Méthode générique pour récupérer les détails
   * @param resultType actif | facture | resilie | resiliation | total
   * @param category ex: Direction, TypeAbonne, Segment...
   * @param key valeur clé (id ou libellé de la ligne sélectionnée)
   * @param start date début
   * @param end date fin
   */
  /* getDetails(resultType: string, category: string, key: any, start: string, end: string): Observable<[string, number][]> {
    const endpointPrefix = this.endpointMap[resultType];
    const mappedCategory = this.categoryMap[resultType][category];

    if (!mappedCategory) {
      throw new Error(`Catégorie "${category}" non supportée pour le type "${resultType}"`);
    }

    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    const url = `${baseUrl}/${endpointPrefix}${mappedCategory}${key}`;
    return this.http.get<[string, number][]>(url, { params });
  } */ 


  /* getDetailActif(type: 'direction' | 'type' | 'segment' | 'puissance' | 'produit', id: number, start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
  
    let endpoint = '';
  
    switch (type) {
      case 'direction':
        endpoint = `Direction${id}`;
        break;
      case 'type':
        if (id === 1) endpoint = 'TypeAbonnePost';
        else if (id === 2) endpoint = 'TypeAbonnePre';
        else if (id === 3) endpoint = 'TypeAbonneFor';
        break;
      case 'segment':
        endpoint = `Segment${id}`;
        break;
      case 'puissance':
        endpoint = `Puissance${id}`;
        break;
      case 'produit':
        endpoint = `Produit${id}`;
        break;
      default:
        throw new Error('Type inconnu');
    }
  
    return this.http.get<[string, number][]>(`${baseUrl}/${endpoint}`, { params });
  } */
  

   // DETAILS ABONNES ACTIFS

   // les infos des abonnés actifs par direction : Abidjan Sud
  getDetailActifDir9(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Direction9`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des abonnés actifs par direction : Centre Sud

  getDetailActifDir7(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Direction7`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  // les infos des abonnés actifs par direction : Abidjan centre
  getDetailActifDir11(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Direction11`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des abonnés actifs par direction : Abidjan Nord
    getDetailActifDir10(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
        .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
      return this.http.get<[string, number][]>(`${baseUrl}/Direction10`, { params }); 
      // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPardirection"
      // et les paramètres "start" et "end". Attend un résultat de type "number".
    }


    // les infos des abonnés actifs par direction : Yopougon

  getDetailActifDir12(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Direction12`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  getDetailActifDir(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Direction12`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par type : postpayé

  getDetailActifTypPost(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end)   // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/TypeAbonnePost`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPartype"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  getDetailActifTypPre(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end)   // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/TypeAbonnePre`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPartype"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  getDetailActifTypFor(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end)   // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/TypeAbonneFor`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifPartype"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par segment : Domestique Conventionnel

  getDetailActifSeg1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Segment1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par segment : Domestique Général

  getDetailActifSeg2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Segment2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par segment : Domestique social

  getDetailActifSeg3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Segment3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par segment : Professionnel Général

  getDetailActifSeg4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Segment4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par Ps 

  getDetailActifPs1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Puissance1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par Ps 

  getDetailActifPs2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Puissance2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés actifs par PS 

  getDetailActifPs3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Puissance3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailActifPs4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Puissance4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailActifPs5(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Puissance5`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  

  // les infos des abonnés actifs par produit 

  getDetailActifProd1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Produit1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailActifProd2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/Produit2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneActifParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  } 

  // DETAILS ABONNES FACTURES

  
    // les infos des abonnés Facturés par direction : Abidjan Sud
  getDetailFactureDir9(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureDirection9`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFacturePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des abonnés Facturés par direction : Centre Sud

  getDetailFactureDir7(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureDirection7`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFacturePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  // les infos des abonnés Facturés par direction : Abidjan centre
  getDetailFactureDir11(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureDirection11`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFacturePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des abonnés Facturés par direction : Abidjan Nord
    getDetailFactureDir10(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
        .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
      return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureDirection10`, { params }); 
      // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFacturePardirection"
      // et les paramètres "start" et "end". Attend un résultat de type "number".
    }


    // les infos des abonnés Facturés par direction : Yopougon

  getDetailFactureDir12(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureDirection12`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFacturePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }



  // les infos des abonnés Facturés par type : postpayé

  getDetailFactureTypPost(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureTypPost`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParTyp"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  
  getDetailFactureTypPre(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end)   // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureTypPre`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParTyp"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  getDetailFactureTypFor(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end)   // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureTypFor`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParTyp"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  

  // les infos des abonnés Facturés par segment : Domestique Conventionnel

  getDetailFactureSeg1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureSeg1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Facturés par segment : Domestique Général

  getDetailFactureSeg2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureSeg2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Facturés par segment : Domestique social

  getDetailFactureSeg3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureSeg3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Facturés par segment : Professionnel Général

  getDetailFactureSeg4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureSeg4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  

  // les infos des abonnés Facturés par Ps 

  getDetailFacturePs1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFacturePs1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Facturés par Ps 

  getDetailFacturePs2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFacturePs2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Facturés par PS 

  getDetailFacturePs3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFacturePs3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailFacturePs4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFacturePs4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailFacturePs5(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFacturePs5`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  

  

  // les infos des abonnés Facturés par produit 

  getDetailFactureProd1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureProd1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailFactureProd2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneFactureProd2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneFactureParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  
    // DETAILS ABONNES RESILIES

    // les infos des abonnés Resilies par type : postpayé

  getDetailResilieTypPost(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileTypPost`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParType"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  
    getDetailResilieTypPre(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end)   // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileTypPre`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParType"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  getDetailResilieTypFor(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end)   // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileTypFor`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParType"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }
  

  

  
  
    // les infos des abonnés Resilies par direction : Abidjan Sud
    
  getDetailResilieDir9(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileDr9`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des abonnés Resilies par direction : Centre Sud

  getDetailResilieDir7(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileDr7`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  // les infos des abonnés Facturés par direction : Abidjan centre
  getDetailResilieDir11(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileDr11`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des abonnés Facturés par direction : Abidjan Nord
    getDetailResilieDir10(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
        .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
      return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileDr10`, { params }); 
      // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliePardirection"
      // et les paramètres "start" et "end". Attend un résultat de type "number".
    }


    // les infos des abonnés Resilies par direction : Yopougon

  getDetailResilieDir12(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileDr12`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliePardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }



  // les infos des abonnés Resilies par segment : Domestique Conventionnel

  getDetailResilieSeg1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileSeg1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Resilies par segment : Domestique Général

  getDetailResilieSeg2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileSeg2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Resilies par segment : Domestique social

  getDetailResilieSeg3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileSeg3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des abonnés Resilies par segment : Professionnel Général

  getDetailResilieSeg4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResileSeg4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  

  // les infos des abonnés Resiliés par Ps 

  getDetailResiliePs1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResilePs1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  

  getDetailResiliePs2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResilePs2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailResiliePs3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResilePs3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailResiliePs4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResilePs4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailResiliePs5(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResilePs5`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  

  

  // les infos des abonnés Resiliés par produit 

  getDetailResilieProd1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResilePr1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailResilieProd2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/AbonneResilePr2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResilieParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }
  
  
    // DETAILS NOMBRE DE ResiliationS

    // les infos des  Resiliations par type : postpayé

  getDetailResiliationTyp(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResiTyp`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationParType"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  
  
    // les infos des  Resiliations par direction : Abidjan Sud
    
  getDetailResiliationDir9(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResiDir9`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des  Resiliations par direction : Centre Sud

  getDetailResiliationDir7(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResiDir7`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  // les infos nombre de resiliations par direction : Abidjan centre
  getDetailResiliationDir11(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResiDir11`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


     // les infos nombre de resiliations par direction : Abidjan Nord
    getDetailResiliationDir10(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
        .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
      return this.http.get<[string, number][]>(`${baseUrl}/NombreResiDir10`, { params }); 
      // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationPardirection"
      // et les paramètres "start" et "end". Attend un résultat de type "number".
    }


      // les infos nombre de resiliations par direction : Yopougon

  getDetailResiliationDir12(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResiDir12`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }



  // les infos nombre de resiliations par segment : Domestique Conventionnel

  getDetailResiliationSeg1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResi1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

   // les infos nombre de resiliations par segment : Domestique Général

  getDetailResiliationSeg2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResi2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

    // les infos nombre de resiliations par segment : Domestique social

  getDetailResiliationSeg3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResi3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos nombre de resiliations par segment : Professionnel Général

  getDetailResiliationSeg4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResi4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  

  // les infos nombre de resiliations par Ps 

  getDetailResiliationPs1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResiPuis`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

    

  // les infos nombre de resiliations par produit 




  getDetailResiliationProd2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreResiProd`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneResiliationParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // DETAILS ABONNES TotalS

  // les infos des abonnés Totals par type : postpayé
getDetailTotalTyp(start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start) // Paramètre "start" (date de début)
    .set('end', end)     // Paramètre "end" (date de fin)

  return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalTyp`, { params });
}


  
  
    // les infos des  Totals par direction : Abidjan Sud
    
  getDetailTotalDir9(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalDr9`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des  Totals par direction : Centre Sud

  getDetailTotalDir7(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalDr7`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  // les infos des NombreTotal par direction : Abidjan centre
  getDetailTotalDir11(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalDr11`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


    // les infos des NombreTotal par direction : Abidjan Nord
    getDetailTotalDir10(start: string, end: string): Observable<[string, number][]> {
      const params = new HttpParams()
        .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
        .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
      return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalDr10`, { params }); 
      // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalPardirection"
      // et les paramètres "start" et "end". Attend un résultat de type "number".
    }


    // les infos des  Totals par direction : Yopougon

  getDetailTotalDir12(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalDr12`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalPardirection"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }



  // les infos des NombreTotal par segment : Domestique Conventionnel

  getDetailTotalSeg1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalSeg1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des NombreTotal par segment : Domestique Général

  getDetailTotalSeg2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalSeg2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des NombreTotal par segment : Domestique social

  getDetailTotalSeg3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalSeg3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des NombreTotal par segment : Professionnel Général

  getDetailTotalSeg4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalSeg4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParSeg"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  

  // les infos des NombreTotal par Ps 

  getDetailTotalPs1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalPs1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des NombreTotal par Ps 

  getDetailTotalPs2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalPs2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }

  // les infos des NombreTotal par PS 

  getDetailTotalPs3(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalPs3`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailTotalPs4(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalPs4`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailTotalPs5(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalPs5`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParPS"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  

  

  // les infos des NombreTotal par produit 

  getDetailTotalProd1(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalPr1`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }


  getDetailTotalProd2(start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
      .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
    return this.http.get<[string, number][]>(`${baseUrl}/NombreTotalPr2`, { params }); 
    // Envoie une requête HTTP GET à l'URL de base avec le chemin "/AbonneTotalParProd"
    // et les paramètres "start" et "end". Attend un résultat de type "number".
  }
  


}

/* 

  getDetailActif(category: 'Direction' | 'TypeAbonne' | 'Segment' | 'Puissance' | 'Produit', key: string, start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start)
    .set('end', end);

  return this.http.get<[string, number][]>(
    `${baseUrl}/${category}${key}`, 
    { params }
  );
}


  getDetailFacture(category: 'Direction' | 'Typ' | 'Seg' | 'Ps' | 'Prod', key: string, start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start)
    .set('end', end);

  return this.http.get<[string, number][]>(
    `${baseUrl}/AbonneFacture${category}${key}`,
    { params }
  );
}


  getDetailResilie(category: 'Typ' | 'Dir' | 'Seg' | 'Ps' | 'Prod', key: string, start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start)
    .set('end', end);

  return this.http.get<[string, number][]>(
    `${baseUrl}/AbonneResile${category}${key}`,
    { params }
  );
}


  getDetailResiliation(category: 'Typ' | 'Dir' | 'Seg' | 'Ps' | 'Prod', key: string, start: string, end: string): Observable<[string, number][]> {
  const params = new HttpParams()
    .set('start', start)
    .set('end', end);

  return this.http.get<[string, number][]>(
    `${baseUrl}/NombreResi${category}${key}`,
    { params }
  );
}


  getDetailTotal(category: 'Typ' | 'Dir' | 'Seg' | 'Ps' | 'Prod', key: string, start: string, end: string): Observable<[string, number][]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<[string, number][]>(
      `${baseUrl}/NombreTotal${category}${key}`,
      { params }
    );
  }


*/
