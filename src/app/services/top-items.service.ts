import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopItems } from '../interfaces/top-items';

@Injectable({
  providedIn: 'root',
})
export class TopItemsService {
  constructor(private _http: HttpClient) {}

  fetchTopItems(): Observable<TopItems> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get<TopItems>(
      `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10`,
      {
        headers: headers,
      }
    );
  }
}
