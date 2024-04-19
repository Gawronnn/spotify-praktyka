import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from '../interfaces/token-response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  clientId = '7df9c756d0d24b74b942d90397276bf0';
  code = undefined;
  constructor(private _http: HttpClient) {}

  generateCodeVerifier(length: number) {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  getAccessToken(): Observable<TokenResponse> {
    const verifier = localStorage.getItem('verifier');

    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('client_id', this.clientId);
    body.append('code', this.code!);
    body.append('redirect_uri', 'https://gawronnn.github.io/spotify-praktyka/callback');
    body.append('code_verifier', verifier!);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this._http.post<TokenResponse>(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers: headers,
      }
    );
  }

  getRefreshToken(): Observable<TokenResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken!);
    body.append('client_id', this.clientId);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this._http.post<TokenResponse>(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers: headers,
      }
    );
  }
}
