import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  data = {
    ime: 'Ana',
    prezime: 'Zečević',
    email: 'facemadero@gmail.com',
    telefon: '+381 60 123 45 67',
    adresa: 'Kraljevo, Srbija',
    instagram: 'facemadero',
    specijalnost: 'Tretmani lica i tela',

    cosmetics: [
      { src: 'assets/images/Thalgo.jpg', alt: 'Kozmetika 1' },
      { src: 'assets/images/silk.jpg', alt: 'Kozmetika 2' },
      { src: 'assets/images/EllaBache.jpg', alt: 'Kozmetika 3' }
    ],

    works: [
      { src: 'assets/images/lice.jpg', alt: 'Rad 1' },
      { src: 'assets/images/depilacija.jpg', alt: 'Rad 2' },
      { src: 'assets/images/pedikir2.PNG', alt: 'Rad 3' },
      { src: 'assets/images/presoterapija.jpg', alt: 'Rad 4' },
      { src: 'assets/images/lice2.PNG', alt: 'Rad 5' },
      { src: 'assets/images/lice1.jpg', alt: 'Rad 6' }

    ]
  };

  modalOpen = false;
  selectedImage: { src: string; alt: string } | null = null;

  constructor(private router: Router) {}

  bookAppointment() {
    this.router.navigate(['/home']);
  }

  openModal(img: { src: string; alt: string }) {
    this.selectedImage = img;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedImage = null;
  }

}
