import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class DetailsSuiviAbonneService {
  
    private baseUrl = 'api/v1/FaitSuiviAbonne';
  
    constructor(private http: HttpClient) {}
  
    private createParams(start: string, end: string): HttpParams {
      return new HttpParams().set('start', start).set('end', end);
    }
  
    getAbonneDetails(dimension: string, code: string | number, start: string, end: string): Observable<any[]> {
      const url = `${this.baseUrl}/${dimension}${code}`;
      return this.http.get<any[]>(url, { params: this.createParams(start, end) });
    }
  
    getAbonneActif(dimension: string, value: string, start: string, end: string): Observable<any[]> {
        const endpoint = this.getActifEndpoint(dimension, value);
        return this.http.get<any[]>(`${this.baseUrl}${endpoint}`, { params: this.createParams(start, end) });
    }
    
    private getActifEndpoint(dimension: string, value: string | number): string {
        switch (dimension.toLowerCase()) {
            case 'type': return `/${value}`;
            case 'mode': return `/Mode${value}`;
            case 'segment': return `/Segment${value}`;
            case 'puissance': return `/Puissance${value}`;
            case 'direction': return `/Direction${value}`; // ici pas de "Actif" devant
            case 'produit': return `/Produit${value}`;
            default: throw new Error('Dimension inconnue');
        }
    }
    
  
    getAbonneFacture(dimension: string, value: string, start: string, end: string): Observable<any[]> {
      const endpoint = this.getEndpoint('Facture', dimension, value);
      return this.http.get<any[]>(`${this.baseUrl}${endpoint}`, { params: this.createParams(start, end) });
    }
  
    getAbonneResile(dimension: string, value: string, start: string, end: string): Observable<any[]> {
      const endpoint = this.getEndpoint('Resile', dimension, value);
      return this.http.get<any[]>(`${this.baseUrl}${endpoint}`, { params: this.createParams(start, end) });
    }
  
    getNombreTotal(dimension: string, value: string, start: string, end: string): Observable<any[]> {
      const endpoint = this.getEndpoint('NombreTotal', dimension, value);
      return this.http.get<any[]>(`${this.baseUrl}${endpoint}`, { params: this.createParams(start, end) });
    }
  
    getNombreResiliation(dimension: string, value: string, start: string, end: string): Observable<any[]> {
      const endpoint = this.getEndpoint('NombreResi', dimension, value);
      return this.http.get<any[]>(`${this.baseUrl}${endpoint}`, { params: this.createParams(start, end) });
    }
  
    private getEndpoint(prefix: string, dimension: string, value: string | number): string {
      switch (dimension.toLowerCase()) {
        case 'type': return `/${prefix}${value}`;
        case 'mode': return `/${prefix}Mode${value}`;
        case 'segment': return `/${prefix}Segment${value}`;
        case 'puissance': return `/${prefix}Puissance${value}`;
        case 'direction': return `/${prefix}Direction${value}`;
        case 'produit': return `/${prefix}Produit${value}`;
        default: throw new Error('Dimension inconnue');
      }
    }
  }
  



/*
   * Appel générique pour récupérer les détails des abonnés
   * @param dimension ex: 'Direction', 'TypeAbonne', 'Segment', 'Puissance', 'Produit'
   * @param code ex: '1', 'Menage', '12', etc.
   * @param start date de début
   * @param end date de fin
   */

/*
getAbonneDetails(dimension: string, code: string | number, start: string, end: string): Observable<any[]> {
    const url = `${baseUrl}/${dimension}${code}`;
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<any[]>(url, { params });
  }

  getAbonneActif(dimension: string, value: string, start: string, end: string): Observable<any> {
    let endpoint = '';
  
    switch(dimension.toLowerCase()) {
      case 'direction':
        endpoint = `/Direction${value}`;
        break;
      case 'type':
        endpoint = `/Type${value}`;
        break;
      case 'segment':
        endpoint = `/Segment${value}`;
        break;
      case 'produit':
        endpoint = `/Produit${value}`;
        break;
      case 'puissance':
        endpoint = `/Puissance${value}`;
        break;
      default:
        throw new Error('Dimension inconnue');
    }
  
    return this.http.get(`${this.baseUrl}${endpoint}?start=${start}&end=${end}`);
  }
    
  getAbonneFacture(dimension: string, value: string, start: string, end: string): Observable<any> {
    let endpoint = '';
  
    switch(dimension.toLowerCase()) {
      case 'direction':
        endpoint = `/AbonneFactureDirection${value}`;
        break;
      case 'type':
        endpoint = `/AbonneFactureType${value}`;
        break;
      case 'segment':
        endpoint = `/AbonneFactureSeg${value}`;
        break;
      case 'produit':
        endpoint = `/AbonneFactureProd${value}`;
        break;
      case 'puissance':
        endpoint = `/AbonneFacturePs${value}`;
        break;
      default:
        throw new Error('Dimension inconnue');
    }
  
    return this.http.get(`${this.baseUrl}${endpoint}?start=${start}&end=${end}`);
  }

  // 🔹 Abonné résilié
  getAbonneResile(dimension: string, value: string, start: string, end: string): Observable<any> {
    let endpoint = '';

    switch (dimension.toLowerCase()) {
      case 'type':
        endpoint = `/AbonneResileType${value}`;
        break;
      case 'segment':
        endpoint = `/AbonneResileSegment${value}`;
        break;
      case 'puissance':
        endpoint = `/AbonneResilePuissance${value}`;
        break;
      case 'direction':
        endpoint = `/AbonneResileDirection${value}`;
        break;
      case 'produit':
        endpoint = `/AbonneResileProduit${value}`;
        break;
      default:
        throw new Error('Dimension inconnue');
    }

    return this.http.get(`${this.baseUrl}${endpoint}?start=${start}&end=${end}`);
  }

  // 🔹 Abonné total
  getNombreTotal(dimension: string, value: string, start: string, end: string): Observable<any> {
    let endpoint = '';

    switch (dimension.toLowerCase()) {
      case 'type':
        endpoint = `/NombreTotalType${value}`;
        break;
      case 'segment':
        endpoint = `/NombreTotalSegment${value}`;
        break;
      case 'puissance':
        endpoint = `/NombreTotalPuissance${value}`;
        break;
      case 'direction':
        endpoint = `/NombreTotalDirection${value}`;
        break;
      case 'produit':
        endpoint = `/NombreTotalProduit${value}`;
        break;
      default:
        throw new Error('Dimension inconnue');
    }

    return this.http.get(`${this.baseUrl}${endpoint}?start=${start}&end=${end}`);
  }

  // 🔹 Nombre résiliations par dimension
  getNombreResiliation(dimension: string, value: string, start: string, end: string): Observable<any> {
    let endpoint = '';

    switch(dimension.toLowerCase()) {
      case 'type':
        endpoint = `/NombreResiType`;
        break;
      case 'segment':
        endpoint = `/NombreResiSegment${value}`;
        break;
      case 'puissance':
        endpoint = `/NombreResiPuissance${value}`;
        break;
      case 'direction':
        endpoint = `/NombreResiDirection${value}`;
        break;
      case 'produit':
        endpoint = `/NombreResiProduit${value}`;
        break;
      default:
        throw new Error('Dimension inconnue pour résiliation');
    }

    return this.http.get(`${this.baseUrl}${endpoint}?start=${start}&end=${end}`);
  }

*/