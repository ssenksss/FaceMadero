import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importuj Angular Router

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  // Podaci o salonu
  data = {
    ime: 'Ana',
    prezime: 'Zečević',
    email: 'facemadero@gmail.com',
    telefon: '+381 60 123 45 67',
    adresa: 'Kraljevo, Srbija',
    instagram: 'facemadero',
    specijalnost: 'Tretmani lica i tela'
  };

  // Injectuj Router za navigaciju
  constructor(private router: Router) {}

  bookAppointment() {
    // Navigacija na početnu stranicu sa svim tretmanima
    this.router.navigate(['/home']);  // Putanja na home stranicu (tj. stranicu sa svim tretmanima)
  }
}
