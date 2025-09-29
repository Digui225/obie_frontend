import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dim_abonne } from '../models/dim-abonne-model';

const baseUrl = 'http://192.168.10.114:9080/api/v1/DimAbonne/list';

@Injectable({
  providedIn: 'root'
})
export class dimAbonneService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<dim_abonne[]> {
    return this.http.get<dim_abonne[]>(baseUrl);
  }

  get(id: any): Observable<dim_abonne> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  }