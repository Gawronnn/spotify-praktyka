import { Component } from '@angular/core';
import { Playlist } from '../interfaces/playlist';
import { NgIf, NgFor } from '@angular/common';
import { PlaylistService } from '../services/playlist.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-playlist-box',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './playlist-box.component.html',
  styleUrl: './playlist-box.component.scss',
})
export class PlaylistBoxComponent {
  playlists: Playlist | undefined;

  constructor(private _playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.getPlaylist();
  }

  getPlaylist() {
    this._playlistService.fetchPlaylist().subscribe((response) => {
      this.playlists = response;
    });
  }
}
