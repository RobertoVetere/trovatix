import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssamblyaiService {
  private apiUrl = 'http://localhost:8081/v1/api/transcribe';

  constructor(private http: HttpClient) {}

  uploadAudio(audioBlob: Blob): Observable<string> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');

    // Especificamos que esperamos un string en el tipo de respuesta
    return this.http.post<string>(this.apiUrl, formData, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error uploading audio', error);
        return throwError(error);
      })
    );
  }
}
