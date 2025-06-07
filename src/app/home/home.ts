import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../cart/cart.service';
import { Search } from '../search/search';

interface Usluga {
  id: number;
  naziv: string;
  opis: string;
  cena?: number;    // može da bude undefined za "uskoro"
  ocena?: number;   // može da bude undefined za "uskoro"
  status: 'trenutno' | 'preporuceno' | 'uskoro';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule, Search],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  usluge: Usluga[] = [
    { id: 1, naziv: 'Masaža leđa', opis: 'Opustajuća masaža leđa', cena: 1500, ocena: 4.5, status: 'trenutno' },
    { id: 2, naziv: 'Manikir', opis: 'Negovani nokti i koža', cena: 1200, ocena: 4.7, status: 'preporuceno' },
    { id: 3, naziv: 'Pedikir', opis: 'Nega stopala', cena: 1300, ocena: 4.6, status: 'preporuceno' },
    { id: 4, naziv: 'Facial tretman', opis: 'Dubinsko čišćenje kože lica', status: 'uskoro' },
    { id: 5, naziv: 'Depilacija', opis: 'Uklanjanje dlačica', cena: 1000, ocena: 4.2, status: 'trenutno' },
  ];

  constructor(private cartService: CartService) {}

  trackById(index: number, usluga: any): number {
    return usluga.id;
  }

  get trenutnoDostupneUsluge(): Usluga[] {
    return this.usluge.filter(u => u.status === 'trenutno');
  }

  get preporuceneUsluge(): Usluga[] {
    return this.usluge.filter(u => u.status === 'preporuceno');
  }

  get uskoroUsluge(): Usluga[] {
    return this.usluge.filter(u => u.status === 'uskoro');
  }

  dodajUKorpu(usluga: Usluga) {
    this.cartService.addItem(usluga);
    console.log('Dodato u korpu:', usluga);
  }
}
