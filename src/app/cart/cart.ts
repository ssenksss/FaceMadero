import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CartService, ServiceItem } from './cart.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatTableModule, MatButtonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  items: ServiceItem[] = [];
  displayedColumns = ['naziv', 'opis', 'cena', 'ocena', 'actions'];

  constructor(private cartService: CartService) {
    this.cartService.items$.subscribe(data => this.items = data);
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  clear() {
    this.cartService.clearCart();
  }
}
