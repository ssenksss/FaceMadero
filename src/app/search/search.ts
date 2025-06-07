import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

type FilterType = {
  type: string;
  duration: string;
  priceSort: string;
  rating: string;
};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class Search {
  query = signal('');
  filters = signal<FilterType>({
    type: '',
    duration: '',
    priceSort: '',
    rating: '',
  });

  @Input() usluge: any[] = [];

  @Output() searchEvent = new EventEmitter<{ query: string; filters: FilterType }>();
  @Output() clearEvent = new EventEmitter<void>();

  updateFilter<K extends keyof FilterType>(key: K, value: string) {
    this.filters.update(current => ({
      ...current,
      [key]: value,
    }));
  }

  clearFilters() {
    this.filters.set({
      type: '',
      duration: '',
      priceSort: '',
      rating: '',
    });
    this.query.set('');
    this.clearEvent.emit();
  }

  search() {
    this.searchEvent.emit({
      query: this.query(),
      filters: this.filters(),
    });
  }
}
