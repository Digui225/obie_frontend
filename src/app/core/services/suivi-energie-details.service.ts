import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


const baseUrl = 'api/v1/FaitSuiviEnergie';

@Injectable({
  providedIn: 'root'
}) 

export class SuiviEnergieDetailsService {

    constructor(private http: HttpClient) { }

    //details consos energie mensuelle

    getDetailConsoMois(start: string, end: string): Observable<[string,string, number][]> {
        const params = new HttpParams()
          .set('start', start) // Ajoute un paramètre nommé "start" à l'URL avec la valeur de la variable start
          .set('end', end);    // Ajoute un paramètre nommé "end" à l'URL avec la valeur de la variable end
        return this.http.get<[string,string, number][]>(`${baseUrl}/DetailEnergieMensuelle`, { params }); 
        // Envoie une requête HTTP GET à l'URL de base avec le chemin "/DetailEnergieMensuelle"
        // et les paramètres "start" et "end". Attend un résultat de type "number".
      }

}
