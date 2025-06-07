import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { Profile } from '../profile/profile';
import {patchFetchToLoadInMemoryAssets} from '@angular/build/src/utils/server-rendering/fetch-patch';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isLoggedIn = false;
  showProfileButton = false;

  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.split('?')[0].split('#')[0];
        this.isLoggedIn = !!localStorage.getItem('user');
        this.showProfileButton = this.isLoggedIn && ['/profile', '/login', '/register'].includes(url);
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/welcome']);
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

  toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks?.classList.toggle('active');
  }

  protected readonly patchFetchToLoadInMemoryAssets = patchFetchToLoadInMemoryAssets;
}
