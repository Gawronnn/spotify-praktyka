import { Component } from '@angular/core';
import { TopItemsService } from '../services/top-items.service';
import { TopItems } from '../interfaces/top-items';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-top-items',
  standalone: true,
  imports: [NgIf, NgFor, MatButtonModule, MatSidenavModule],
  templateUrl: './user-top-items.component.html',
  styleUrl: './user-top-items.component.scss',
})
export class UserTopItemsComponent {
  topItems: TopItems | undefined;

  constructor(private _topItemsService: TopItemsService) {}

  ngOnInit(): void {
    this._topItemsService.fetchTopItems().subscribe((response) => {
      this.topItems = response;
    });
  }
}
