import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CartService, ServiceItem } from './cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatButtonModule, MatCard],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  items: ServiceItem[] = [];
  displayedColumns = ['naziv', 'opis', 'cena', 'ocena', 'actions'];
  showTimeSelection = false;



constructor(private cartService: CartService, private router: Router) {
  this.cartService.items$.subscribe(data => this.items = data);
}


placeOrder() {
    if (confirm('Da li želite da zakažete?')) {
      this.showTimeSelection = true;
    }
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  clear() {
    this.cartService.clearCart();
  }

  confirmTime() {
    const time = (document.getElementById('time') as HTMLInputElement).value;
    if (time) {
      alert(`Vreme je potvrđeno: ${time}`);
      this.showTimeSelection = false;
      if (confirm('Zahtev je uspešno poslat. ' +
        'Želite li da nastavite kupovinu?')) {
        this.router.navigate(['/home']); // OVO treba da radi
      }
    } else {
      alert('Molimo vas da izaberete vreme.');
    }
  }
  goHome() {
    window.location.href = '/';
  }

}
