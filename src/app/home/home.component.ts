import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import {
  RouterModule,
  ActivatedRoute,
  RouterLink,
  Router,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info.component';
import { catchError, throwError } from 'rxjs';
import { PlaylistBoxComponent } from '../playlist-box/playlist-box.component';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../interfaces/playlist';
import { UserTopItemsComponent } from '../user-top-items/user-top-items.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule, RouterLink, PlaylistBoxComponent, UserTopItemsComponent, MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private _route: ActivatedRoute,
    private _loginService: LoginService = inject(LoginService),
    private _userService: UserService,
    private _dialog: MatDialog,
    private _router: Router,
    private _playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.checkToken();
    if (!localStorage.getItem('verifier')) {
      this._router.navigate(['login']);
    }
    if (this._loginService.code || localStorage.getItem('token')) {
      this._router.navigate([''], {
        queryParams: {
          code: null,
        },
        queryParamsHandling: 'merge',
      });
    }
    if (localStorage.getItem('token')) {
      this.getPlaylist();
    }
  }

  playlists: Playlist | undefined;
  accesToken = localStorage.getItem('token');

  openDialog(): void {
    this._dialog.open(UserInfoComponent, { height: '40%', width: '70%' });
  }

  onLogged(): void {
    this._loginService
      .getAccessToken()
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((response) => {
        localStorage.setItem('token', response['access_token']);
        localStorage.setItem('refresh_token', response['refresh_token']);
        this._userService.fetchProfile().subscribe((response) => {
          this._userService.populateUI(response, 'picture');
        });
      });
  }

  checkToken(): void {
    if (!localStorage.getItem('token')) {
      this._route.queryParams.subscribe((params) => {
        this._loginService.code = params.code;
        if (params.code) {
          this.onLogged();
        }
      });
    } else {
      this._userService.fetchProfile().subscribe((response) => {
        this._userService.populateUI(response, 'picture');
      });
    }
  }

  getPlaylist() {
    this._playlistService.fetchPlaylist().subscribe((response) => {
      this.playlists = response;
    });
  }
}
