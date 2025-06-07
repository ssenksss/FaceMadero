import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  // Ovde definisi podatke, npr:
  data = {
    ime: 'Marko',
    prezime: 'Marković',
    email: 'marko@example.com',
    telefon: '0601234567',
    adresa: 'Ulica 12, Grad',
    datumRodjenja: '1990-01-01'
  };
}
