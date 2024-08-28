import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombineResponse } from '../interfaces/combine-response.model';

@Injectable({
  providedIn: 'root'
})
export class PerplexityService {

  private apiUrl = 'http://localhost:8081/api/products-list';

  constructor(private http: HttpClient) { }

  // Método para obtener los mejores productos con la query dada
  getBestProducts(query: string): Observable<CombineResponse> {
    // Crear los parámetros de la consulta
    const params = new HttpParams().set('query', query);

    // Hacer la solicitud HTTP POST con los parámetros de la consulta en la URL
    return this.http.post<CombineResponse>(this.apiUrl, {}, { params });
  }
}
