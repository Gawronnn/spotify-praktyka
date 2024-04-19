import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'callback', component: HomeComponent },
  { path: 'playlist/:playlist_id', component: PlaylistDetailsComponent}
];
