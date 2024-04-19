import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../interfaces/playlist';
import { Tracks } from '../interfaces/tracks';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private _http: HttpClient) {}

  fetchPlaylist(): Observable<Playlist> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get<Playlist>('https://api.spotify.com/v1/me/playlists', {
      headers: headers,
    });
  }

  fetchTracks(playlist_id: string): Observable<Tracks> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get<Tracks>(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: headers,
      }
    );
  }

  deletePlaylistItems(playlist_id: string, track_uri: string): Observable<any> {
    const token = localStorage.getItem('token');
    const body = {
      tracks: [
        {
          uri: track_uri
        }
      ]
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.delete<any>(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: headers,
        body: body
      }
    );
  }
}
