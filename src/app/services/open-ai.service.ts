import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, fromEvent, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  private apiUrl = 'http://localhost:8081/api/validation';

  constructor(private http: HttpClient) { }

  validation(query: string): Observable<string> {
    const params = new HttpParams().set('message', query);
    return this.http.get<string>(this.apiUrl, { params });
  }

  createNewChatStream(chatRequest: any): Observable<string> {
    return new Observable(observer => {
      // Enviar la solicitud inicial al backend
      this.http.post(this.apiUrl, chatRequest, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }).subscribe({
        next: () => {
          // La conexión SSE se maneja aquí
          const eventSource = new EventSource(this.apiUrl);

          eventSource.onmessage = (event) => {
            if (event.data) {
              observer.next(event.data);
            }
          };

          eventSource.onerror = (error) => {
            observer.error(error);
          };

          return () => {
            eventSource.close();
          };
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }
}
