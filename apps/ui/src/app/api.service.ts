import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    if (!environment.production) {
        const scheme = environment.apiScheme;
        const host = environment.apiHost;
        const port = environment.apiPort;
        this.baseUrl = `${scheme}://${host}:${port}`;
    } else {
        this.baseUrl = '';
    }
  }

  public getCountriesWithMostNeighbors(count?: number): Observable<any> {
    const options = count ? { params: { count: `${count}` } } : {};
    return this.http.get<any>(`${this.baseUrl}/most-neighbors`, options);
  }

  public getMostPopulatedCountries(count?: number): Observable<any> {
    const options = count ? { params: { count: `${count}` } } : {};
    return this.http.get<any>(`${this.baseUrl}/most-populated`, options);
  }
}
