import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  constructor(private _userService: UserService) {}
  ngOnInit(): void {
    this._userService.fetchProfile().subscribe((response) => {
      this._userService.populateUI(response, 'all');
    });
  }

  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('verifier');
    localStorage.removeItem('refresh_token');
  }
}
