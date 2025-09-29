import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dim_produit } from '../models/list-prod.model';

 const baseUrl = 'http://192.168.10.124:9080/api/v1/DimProduit/list';
// const baseUrl = 'http://localhost:9080/api/v1/DimProduit/list';


@Injectable({
  providedIn: 'root'
})
export class dimProduitService {

  constructor(private http: HttpClient) { }

  getProduits(): Observable<dim_produit[]> {
    return this.http.get<dim_produit[]>(baseUrl);
  }

  get(id: any): Observable<dim_produit> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  }