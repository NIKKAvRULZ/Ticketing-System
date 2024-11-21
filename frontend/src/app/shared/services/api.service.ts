import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '<API_BASE_URL>';

  constructor(private http: HttpClient) {}

  // This method should return an observable, which will allow you to subscribe to it
  addTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tickets`, ticket); // Replace with your actual API endpoint
  }

  // Other methods...
}
