import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  fetchProfile(): Observable<UserInfo> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get<UserInfo>('https://api.spotify.com/v1/me', {
      headers: headers,
    });
  }

  populateUI(profile: UserInfo, type: string) {
    if (type === 'all') {
      document.getElementById('displayName')!.innerText = profile.display_name;
      if (profile.images[1]) {
        document
          .getElementById('profile_picture')!
          .setAttribute('src', profile.images[1]?.url);
      }
      document.getElementById('id')!.innerText = profile.id;
      document.getElementById('email')!.innerText = profile.email;
      document.getElementById('uri')!.innerText = profile.uri;
      document
        .getElementById('uri')!
        .setAttribute('href', profile.external_urls.spotify);
      document.getElementById('url')!.innerText = profile.href;
      document.getElementById('url')!.setAttribute('href', profile.href);
      document.getElementById('imgUrl')!.innerText =
        profile.images[1]?.url ?? '(no profile image)';
      document
        .getElementById('imgUrl')!
        .setAttribute('href', profile.images[1]?.url);
    } else if (type === 'picture') {
      if (profile.images[1]) {
        document
          .getElementById('profile_picture')!
          .setAttribute('src', profile.images[1]?.url);
      }
    }
  }
}
