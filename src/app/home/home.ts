import { Component, signal, inject } from '@angular/core';
import { ToyModel } from '../../models/toy.model';
import { ToyService } from '../service/toy.service';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../service/utils.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Search } from '../search/search';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartService } from '../service/cart.service';
import { NotificationService } from '../service/notification.service';
import { Alerts } from '../alerts';
import { ReviewService } from '../service/review.service';
import { ReviewModel } from '../../models/review.model';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    Search,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<ToyModel[]>([]);
  toy = signal<any | null>(null);
  filteredToys = signal<ToyModel[]>([]);
  utils = inject(UtilsService);
  notification = inject(NotificationService);
  reviewService = inject(ReviewService);

  text = '';
  selectedType = '';

  pagedToys = signal<ToyModel[]>([]);
  favorites: { [key: number]: boolean } = {};

  constructor(private cartService: CartService) {
    ToyService.getToys()
      .then((data) => {
        this.toys.set(data);
        this.filteredToys.set(data);
        console.log(this.toys());
      })
      .catch((err) => console.error(err));
  }

  sortAsc() {
    const sorted = [...this.toys()].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
    this.filteredToys.set(sorted);
  }

  sortDesc() {
    const sorted = [...this.toys()].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
    this.filteredToys.set(sorted);
  }

  getTypes(): string[] {
    return [...new Set(this.toys().map(toy => toy.type.name))];
  }

  getAgeGroup(): string[] {
    return [...new Set(this.toys().map(t => t.ageGroup.name))];
  }

  getTargetGroup(): string[] {
    return [...new Set(this.toys().map(t => t.targetGroup))];
  }

  getRating(): number[] {
    return [1, 2, 3, 4, 5];
  }

  onFiltersChanged(filters: any) {
    const type = filters.type.toLowerCase().trim();
    const targetGroup = filters.targetGroup.toLowerCase().trim();
    const ageGroup = filters.ageGroup.toLowerCase().trim();
    const minRating = Number(filters.minRating || 0);
    const from = Number(filters.from);
    const to = Number(filters.to);

    const allReviews: ReviewModel[] = this.reviewService.getAllReviews();

    this.selectedType = filters.type;

    if (
      type === '' &&
      targetGroup === '' &&
      ageGroup === '' &&
      minRating === 0 &&
      from === 0 &&
      to === 0
    ) {
      this.filteredToys.set(this.toys());
      return;
    }

    const filtered = this.toys().filter((toy) => {
      const matchesType =
        type === '' || toy.type.name.toLowerCase() === type;

      const matchesTargetGroup =
        targetGroup === '' || toy.targetGroup.toLowerCase() === targetGroup;

      const matchesAgeGroup =
        ageGroup === '' || toy.ageGroup.name.toLowerCase() === ageGroup;

      const matchesPriceFrom =
        from === 0 || toy.price >= from;

      const matchesPriceTo =
        to === 0 || toy.price <= to;

      const toyReviews = allReviews.filter(review => review.toyId === toy.toyId);

      const averageRating =
        toyReviews.length > 0
          ? toyReviews.reduce((sum, review) => sum + review.rating, 0) / toyReviews.length
          : 0;

      const matchesRating =
        minRating === 0 || averageRating >= minRating;

      return (
        matchesType &&
        matchesTargetGroup &&
        matchesAgeGroup &&
        matchesPriceFrom &&
        matchesPriceTo &&
        matchesRating
      );
    });

    if (filtered.length === 0) {
      Alerts.error('Nema proizvoda po tom rangu');
      this.filteredToys.set(this.toys());
      return;
    }

    this.filteredToys.set(filtered);
  }

  search() {
    const text = this.text.toLowerCase().trim();

    if (text === '') {
      this.filteredToys.set(this.toys());
      return;
    }

    const filtered = this.toys().filter((toy) =>
      toy.name.toLowerCase().includes(text) ||
      toy.description.toLowerCase().includes(text)
    );

    this.filteredToys.set(filtered);
  }

  addToCart(toy: any) {
    this.cartService.addToCart(toy);
    this.notification.success('🎉 Uspesno dodato');
  }

  toggleFavorite(id: number, event: Event) {
    event.stopPropagation();
    this.favorites[id] = !this.favorites[id];
  }
}