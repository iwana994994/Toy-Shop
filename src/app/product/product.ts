import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../service/utils.service';
import { ToyService } from '../service/toy.service';
import { ToyModel } from '../../models/toy.model';
import { CartService } from '../service/cart.service'
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../service/notification.service';
import { ReviewService } from '../service/review.service';
import { AuthService } from '../service/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-product',
  imports: [MatCardModule,
     MatButtonModule,
     RouterLink,
    MatIconModule,
    MatProgressSpinnerModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  toy = signal<any | null>(null);
   toys = signal<ToyModel[]>([]);
   notification=inject(NotificationService)
   reviewService = inject(ReviewService);
   cartService = inject(CartService);
   utils= inject(UtilsService)
   
  rating = 0;
  hoveredRating = 0;




  constructor(route: ActivatedRoute, 
    
  ) {
  route.params.subscribe(params => {
    const id = Number(params['id']);

    ToyService.getToyById(id)
      .then(data => this.toy.set(data))
      .catch(err => console.error(err));

      ToyService.getToys()
      .then((data) => {
        this.toys.set(data);
        
      })
  });
  
}

addToCart(toy: any) {
  this.cartService.addToCart(toy);
 this.notification.success("  🎉  Uspesno dodato")
}




  setRating(value: number) {
    this.rating = value;
  }

  setHover(value: number) {
    this.hoveredRating = value;
  }

  clearHover() {
    this.hoveredRating = 0;
  }

  isFilled(star: number): boolean {
    return star <= (this.hoveredRating || this.rating);
  }

  canReview(): boolean {
  const activeUser = AuthService.getActiveUser();
  if (!activeUser || !this.toy()) return false;

  const orders = JSON.parse(localStorage.getItem(`orders_${activeUser.email}`) || '[]');

  return orders.some((order: any) =>
    order.items?.some((item: any) => item.id === this.toy()!.toyId
)
  );
}
hasReviewed(): boolean {
  const activeUser = AuthService.getActiveUser();
  if (!activeUser || !this.toy()) return false;

  const reviews = this.reviewService.getReviewsForThisToy(this.toy()!.toyId);

  return reviews.some((review: any) => review.userEmail === activeUser.email);
}

  saveReview() {
  if (!this.toy()) return;

  const activeUser = AuthService.getActiveUser();
  if (!activeUser) {
    this.notification.error('Morate biti ulogovani da biste ostavili ocenu');
    return;
  }
   if (!this.canReview()) {
    this.notification.error('Samo kupljen proizvod može da se oceni');
    return;
  }

  if (this.rating === 0) {
    this.notification.error('Morate oceniti igracku');
    return;
  }

  this.reviewService.saveReview(
    this.toy().toyId,
    this.rating,
    '',
    this.toy().name
  );

  this.notification.success('Ocena je sačuvana');
}
getReviews() {
  if (!this.toy()) return [];
  return this.reviewService.getReviewsForThisToy(this.toy()!.toyId);
}
}
