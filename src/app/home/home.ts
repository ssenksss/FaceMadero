import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../cart/cart.service';

interface Usluga {
  id: number;
  naziv: string;
  opis: string;
  cena?: number;
  ocena?: number;
  status: 'trenutno' | 'preporuceno' | 'uskoro';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnChanges {
  usluge: Usluga[] = [
    { id: 1, naziv: 'Masaža leđa', opis: 'Opustajuća masaža leđa', cena: 1500, ocena: 4.5, status: 'trenutno' },
    { id: 2, naziv: 'Manikir', opis: 'Negovani nokti i koža', cena: 1200, ocena: 4.7, status: 'preporuceno' },
    { id: 3, naziv: 'Pedikir', opis: 'Nega stopala', cena: 1300, ocena: 4.6, status: 'preporuceno' },
    { id: 4, naziv: 'Facial tretman', opis: 'Dubinsko čišćenje kože lica', status: 'uskoro' },
    { id: 5, naziv: 'Depilacija', opis: 'Uklanjanje dlačica', cena: 1000, ocena: 4.2, status: 'trenutno' },
  ];

  @Input() searchQuery: string = '';
  @Input() searchFilters: {
    type: string;
    duration: string;
    priceSort: string;
    rating: string;
  } = { type: '', duration: '', priceSort: '', rating: '' };

  filteredUsluge = signal<Usluga[]>([]);
  searchActive = signal(false);

  constructor(private cartService: CartService) {}

  ngOnChanges(changes: SimpleChanges) {
    // Kad se promeni query ili filteri, filtriraj usluge
    if (changes['searchQuery'] || changes['searchFilters']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    let q = this.searchQuery.toLowerCase().trim();

    let filtrirane = this.usluge.filter(u => {
      // Filtriraj po query u nazivu
      let matchesQuery = q ? u.naziv.toLowerCase().includes(q) : true;

      // Filtriraj po tipu (ako je tip definisan)
      let matchesType = this.searchFilters.type ? u.naziv.toLowerCase().includes(this.searchFilters.type.toLowerCase()) : true;

      // Dodaj druge filtere ako želiš (npr duration, rating)
      // Ovde samo primer za rating:
      let matchesRating = true;
      if (this.searchFilters.rating) {
        matchesRating = (u.ocena ?? 0) >= parseFloat(this.searchFilters.rating);
      }

      return matchesQuery && matchesType && matchesRating && matchesQuery;
    });

    // Sortiranje po ceni ako je potrebno
    if (this.searchFilters.priceSort === 'asc') {
      filtrirane.sort((a, b) => (a.cena ?? 0) - (b.cena ?? 0));
    } else if (this.searchFilters.priceSort === 'desc') {
      filtrirane.sort((a, b) => (b.cena ?? 0) - (a.cena ?? 0));
    }

    this.filteredUsluge.set(filtrirane);
    this.searchActive.set(q !== '' || this.searchFilters.type !== '' || this.searchFilters.rating !== '');
  }

  dodajUKorpu(usluga: Usluga) {
    this.cartService.addItem(usluga);
    console.log('Dodato u korpu:', usluga);
  }

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
}
