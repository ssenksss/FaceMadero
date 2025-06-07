import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Navbar, RouterOutlet, MatButtonModule, MatDialogModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  showSimulirajLoginButton = false;
  isLoggedIn = false;

  searchQuery = signal('');
  searchFilters = signal({
    type: '',
    duration: '',
    priceSort: '',
    rating: ''
  });

  constructor(private dialog: MatDialog, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.split('?')[0].split('#')[0];
        this.isLoggedIn = !!localStorage.getItem('user');

        this.showSimulirajLoginButton = ['/pocetna', '/login', '/register'].includes(url);

        console.log('URL:', url, 'isLoggedIn:', this.isLoggedIn,  'showSimulirajLoginButton:', this.showSimulirajLoginButton);
      });
  }

  simulirajLogin() {
    localStorage.setItem('user', 'test');
    this.isLoggedIn = true;

    // Forcira da se ruta re-renderuje i triggeruje NavigationEnd
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  onSearch(event: { query: string; filters: any }) {
    this.searchQuery.set(event.query);
    this.searchFilters.set(event.filters);
  }

  onClear() {
    this.searchQuery.set('');
    this.searchFilters.set({
      type: '',
      duration: '',
      priceSort: '',
      rating: ''
    });
  }
}
