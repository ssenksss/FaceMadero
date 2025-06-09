import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CartService, ServiceItem } from '../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';



type UslugaStatus = 'trenutno' | 'preporuceno' | 'uskoro';

export interface Usluga {
  id: number;
  naziv: string;
  opis: string;
  cena?: number;
  ocena?: number;
  status: UslugaStatus;
  tip?: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  query: string = '';
  filters = {
    type: '',
    priceSort: '',
    rating: ''
  };

  usluge: Usluga[] = [
    { id: 1, naziv: 'Masaža leđa', opis: 'Opustajuća masaža leđa', cena: 1500, ocena: 4.5, status: 'trenutno', tip: 'masaža' },
    { id: 2, naziv: 'Manikir', opis: 'Negovani nokti i koža', cena: 1200, ocena: 4.7, status: 'preporuceno', tip: 'manikir' },
    { id: 3, naziv: 'Pedikir', opis: 'Nega stopala', cena: 1300, ocena: 4.6, status: 'preporuceno', tip: 'pedikir' },
    { id: 4, naziv: 'Facial tretman', opis: 'Dubinsko čišćenje kože lica', cena: 2000, ocena: 4.5, status: 'uskoro', tip: 'facial tretman' },
    { id: 5, naziv: 'Depilacija', opis: 'Uklanjanje dlačica', cena: 1000, ocena: 4.2, status: 'trenutno', tip: 'depilacija' },
    { id: 6, naziv: 'Presoterapija', opis: 'Detoksikacija tela putem limfne drenaže', cena: 2500, ocena: 4.8, status: 'preporuceno', tip: 'presoterapija' },
    { id: 7, naziv: 'Maderoterapija', opis: 'Tretman za celulit i toniranje tela', cena: 2200, ocena: 4.9, status: 'trenutno', tip: 'maderoterapija' },
    { id: 8, naziv: 'Čupanje obrva', opis: 'Precizno oblikovanje obrva', cena: 500, ocena: 4.4, status: 'trenutno', tip: 'čupanje' },
    { id: 9, naziv: 'Čupanje nausnica', opis: 'Uklanjanje neželjenih dlačica sa lica', cena: 300, ocena: 4.3, status: 'trenutno', tip: 'čupanje' },
    { id: 10, naziv: 'Higijenski tretman lica', opis: 'Čišćenje, piling i maska za lice', cena: 2500, ocena: 4.6, status: 'preporuceno', tip: 'facial tretman' },
    { id: 11, naziv: 'Tretman leđa', opis: 'Dubinsko čišćenje i masaža leđa', cena: 4000, ocena: 4.7, status: 'uskoro', tip: 'masaža' },
  ];

  rezultati: Usluga[] = [];

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}


  updateFilter(filterKey: keyof typeof this.filters, value: string): void {
    this.filters[filterKey] = value;
    this.pretrazi();
  }

  clearFilters(): void {
    this.query = '';
    this.filters = { type: '', priceSort: '', rating: '' };
    this.pretrazi();
  }

  pretrazi(): void {
    if (
      !this.query.trim() &&
      !this.filters.type &&
      !this.filters.priceSort &&
      !this.filters.rating
    ) {
      this.rezultati = [...this.usluge];
      return;
    }


    let filtered = [...this.usluge];

    if (this.query.trim()) {
      const q = this.query.toLowerCase();
      filtered = filtered.filter(u =>
        u.naziv.toLowerCase().includes(q) || u.opis.toLowerCase().includes(q)
      );
    }

    if (this.filters.type) {
      filtered = filtered.filter(u => u.tip === this.filters.type);
    }

    if (this.filters.rating) {
      const minRating = parseFloat(this.filters.rating);
      filtered = filtered.filter(u => (u.ocena ?? 0) >= minRating);
    }

    if (this.filters.priceSort) {
      filtered = filtered.sort((a, b) => {
        const cenaA = a.cena ?? 0;
        const cenaB = b.cena ?? 0;
        return this.filters.priceSort === 'asc' ? cenaA - cenaB : cenaB - cenaA;
      });
    }


    this.rezultati = filtered;
  }

  dodajUKorpu(usluga: Usluga): void {
    const item: ServiceItem = {
      id: usluga.id,
      naziv: usluga.naziv,
      opis: usluga.opis,
      cena: usluga.cena,
      ocena: usluga.ocena
    };

    this.cartService.addItem(item);
    alert('Usluga je dodata u korpu!');
  }

}
