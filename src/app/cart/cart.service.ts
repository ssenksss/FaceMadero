import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ServiceItem {
  id: number;
  naziv: string;
  opis: string;
  cena?: number;
  ocena?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: ServiceItem[] = [];
  private itemsSubject = new BehaviorSubject<ServiceItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  addItem(item: ServiceItem) {
    if (!this.items.find(i => i.id === item.id)) {
      this.items.push(item);
      this.itemsSubject.next(this.items);
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.itemsSubject.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }
}
