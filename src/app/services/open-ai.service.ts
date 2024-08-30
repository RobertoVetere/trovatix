import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  private apiUrl = 'http://localhost:8081/api/validation';

  constructor(private http: HttpClient) { }

   validateMessage(message: string): Observable<string> {
    const params = new HttpParams().set('message', message);
    return this.http.get(this.apiUrl, { params, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error en la validación:', error);
        return throwError(() => new Error('Error en la validación: ' + error.message));
      })
    );
  }
}
