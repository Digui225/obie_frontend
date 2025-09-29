import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AbsbaseUrl = '/api/v1/FaitSuiviAbonne';
const EnerbaseUrl = '/api/v1/FaitSuiviEnergie';
const RevbaseUrl = '/api/v1/FaitSuiviRevenu';
const SollbaseUrl = 'api/v1/FaitSuiviSollicitation';




@Injectable({
    providedIn: 'root'
  })
  export class TotalDomaineService {

    constructor(private http: HttpClient) { }

         // Méthode pour récupérer le nombre total d'abonnés    
         getTotalAbonne(start: string, end: string): Observable<number> {
            const params = new HttpParams()
              .set('start', start)
              .set('end', end);
            return this.http.get<number>(`${AbsbaseUrl}/NombreTotalAbonne`, { params });
          }

          // Méthode pour récupérer le qte total de Kwh    
            getTotalKwh(start: string, end: string): Observable<number> {
                const params = new HttpParams()
                .set('start', start)
                .set('end', end);
                return this.http.get<number>(`${EnerbaseUrl}/QuantiteKwhProduit`, { params });
            }

             // Méthode pour récupérer le revenu total
            getTotalRevenu(start: string, end: string): Observable<number> {
                const params = new HttpParams()
                .set('start', start)
                .set('end', end);
                return this.http.get<number>(`${RevbaseUrl}/RevenuTle`, { params });
            }

             // Méthode pour récupérer le revenu total
             getTotalSoll(start: string, end: string): Observable<number> {
                const params = new HttpParams()
                .set('start', start)
                .set('end', end);
                return this.http.get<number>(`${SollbaseUrl}/NombreSollicitationClient`, { params });
            }


             getAllStatsDomaine(start: string, end: string): Observable<any[]> {
                const params = new HttpParams()
                  .set('start', start)
                  .set('end', end);
            
                return this.http.get<any[]>(`${AbsbaseUrl}/TableauAbonneDir`, { params });
              } 

  }