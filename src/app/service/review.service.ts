import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ReviewModel } from '../../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly STORAGE_KEY = 'reviews';

  saveReview(toyId: number, rating: number, comment: string, name: string) {
    const user = AuthService.getActiveUser();

    const existingReviews: ReviewModel[] = JSON.parse(
      localStorage.getItem(this.STORAGE_KEY) || '[]'
    );

    const review: ReviewModel = {
      toyId,
      name,
      rating,
      comment,
      userEmail: user?.email || ''
    };

    existingReviews.push(review);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingReviews));
  }

  getReviewsForThisToy(id: number) {
    const reviews: ReviewModel[] = JSON.parse(
      localStorage.getItem(this.STORAGE_KEY) || '[]'
    );

    return reviews.filter(review => review.toyId === id);
  }

  getAllReviews() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }
}