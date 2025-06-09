import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { CartService, ServiceItem } from '../cart/cart.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

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
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})


export class Home {

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  @Input() searchQuery: string = '';

  usluge: Usluga[] = [
    { id: 1, naziv: 'Masaža leđa', opis: 'Opustajuća masaža leđa', cena: 1500, ocena: 4.5, status: 'trenutno' },
    { id: 2, naziv: 'Manikir', opis: 'Negovani nokti i koža', cena: 1200, ocena: 4.7, status: 'preporuceno' },
    { id: 3, naziv: 'Pedikir', opis: 'Nega stopala', cena: 1300, ocena: 4.6, status: 'preporuceno' },
    { id: 4, naziv: 'Facial tretman', opis: 'Dubinsko čišćenje kože lica', status: 'uskoro' },
    { id: 5, naziv: 'Depilacija', opis: 'Uklanjanje dlačica', cena: 1000, ocena: 4.2, status: 'trenutno' },
    { id: 6, naziv: 'Presoterapija', opis: 'Detoksikacija tela putem limfne drenaže', cena: 2500, ocena: 4.8, status: 'preporuceno' },
    { id: 7, naziv: 'Maderoterapija', opis: 'Tretman za celulit i toniranje tela', cena: 2200, ocena: 4.9, status: 'trenutno' },
    { id: 8, naziv: 'Čupanje obrva', opis: 'Precizno oblikovanje obrva', cena: 500, ocena: 4.4, status: 'trenutno' },
    { id: 9, naziv: 'Čupanje nausnica', opis: 'Uklanjanje neželjenih dlačica sa lica', cena: 300, ocena: 4.3, status: 'trenutno' },
    { id: 10, naziv: 'Higijenski tretman lica', opis: 'Čišćenje, piling i maska za lice', cena: 2500, ocena: 4.6, status: 'preporuceno' },
    { id: 11, naziv: 'Tretman leđa', opis: 'Dubinsko čišćenje i masaža leđa', cena: 4000, ocena: 4.7, status: 'uskoro' },
  ];

  dodajUKorpu(usluga: Usluga): void {
    const item: ServiceItem = {
      id: usluga.id,
      naziv: usluga.naziv,
      opis: usluga.opis,
      cena: usluga.cena,
      ocena: usluga.ocena
    };

    this.cartService.addItem(item);

    this.snackBar.open('Usluga je dodata u korpu!', 'Zatvori', {
      duration: 3000,
    });

  }

  searchActive(): boolean {
    return this.searchQuery.trim().length > 0;
  }

  filteredUsluge(): Usluga[] {
    const query = this.searchQuery.toLowerCase().trim();
    return this.usluge.filter(usluga =>
      usluga.naziv.toLowerCase().includes(query) ||
      usluga.opis.toLowerCase().includes(query)
    );
  }

  trenutnoDostupneUsluge(): Usluga[] {
    return this.usluge.filter(u => u.status === 'trenutno');
  }

  preporuceneUsluge(): Usluga[] {
    return this.usluge.filter(u => u.status === 'preporuceno');
  }

  uskoroUsluge(): Usluga[] {
    return this.usluge.filter(u => u.status === 'uskoro');
  }

  trackById(index: number, item: Usluga): number {
    return item.id;
  }
}
