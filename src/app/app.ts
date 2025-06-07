import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Profile } from './profile/profile';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Navbar, RouterOutlet, MatButtonModule, MatDialogModule],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>

    <button
      *ngIf="showProfileButton"
      mat-raised-button
      color="primary"
      (click)="openProfile()"
    >
      Otvori profil
    </button>
  `,
  styleUrls: ['./app.css']
})
export class App {
  showProfileButton = false;

  constructor(private dialog: MatDialog, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.split('?')[0].split('#')[0];
        console.log('Trenutni URL:', url); // za proveru u konzoli

        this.showProfileButton = url === '/profile';
      });

  }

  openProfile() {
    this.dialog.open(Profile, {
      data: {
        ime: 'Petar',
        prezime: 'Petrović',
        email: 'petar@example.com',
        telefon: '060123456',
        adresa: 'Neka Ulica 1',
        datumRodjenja: '1985-05-15'
      }
    });
  }
}
