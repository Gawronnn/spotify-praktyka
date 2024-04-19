import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._router.navigate(['callback']);
    }
  }
  onLogin(): void {
    this.redirectToAuthCodeFlow(this._loginService.clientId);
  }

  private async redirectToAuthCodeFlow(clientId: string): Promise<any> {
    const verifier = this._loginService.generateCodeVerifier(128);
    const challenge = await this._loginService.generateCodeChallenge(verifier);
    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'https://gawronnn.github.io/spotify-praktyka/callback');
    params.append(
      'scope',
      'user-read-private user-read-email playlist-read-private user-top-read playlist-modify-public playlist-modify-private'
    );
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }
}
