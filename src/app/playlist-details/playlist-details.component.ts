import { Component } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tracks } from '../interfaces/tracks';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserService } from '../services/user.service';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catchError, throwError } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-playlist-details',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, MatButton, RouterLink, MatIconModule],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.scss',
})
export class PlaylistDetailsComponent {
  tracks: Tracks | undefined;

  constructor(
    private _playlistService: PlaylistService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getPlaylist();
    this._userService.fetchProfile().subscribe((response) => {
      this._userService.populateUI(response, 'picture');
    });
  }

  getPlaylist() {
    const playlist_id = this._route.snapshot.paramMap.get('playlist_id');
    this._playlistService.fetchTracks(playlist_id!).subscribe((response) => {
      this.tracks = response;
    });
  }

  openDialog(): void {
    this._dialog.open(UserInfoComponent, { height: '40%', width: '70%' });
  }

  deletePlaylistItems(track_uri: string){
    const playlist_id = this._route.snapshot.paramMap.get('playlist_id');
    this._playlistService.deletePlaylistItems(playlist_id!, track_uri).pipe(
      catchError((err) => {
        this._snackBar.open("You cannot remove tracks from a playlist you don't own.", 'OK', {
          duration: 5000,
          panelClass: ['warning'],
        })
        return throwError(() => err);
      })).subscribe(() => {
      this.getPlaylist()
    })
  }

}
