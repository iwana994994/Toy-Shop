import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Alerts } from '../alerts';
import { CartService } from '../service/cart.service';
import { ReviewService } from '../service/review.service';
import { UtilsService } from '../service/utils.service';
import { ToyModel } from '../../models/toy.model';
import { ToyService } from '../service/toy.service';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  activeUser = AuthService.getActiveUser();
  router = inject(Router);
  utils = inject(UtilsService);
  reviewService = inject(ReviewService);

  oldPassword = '';
  newPassword = '';
  passRepeat = '';
  orders: any[] = [];


  recommended = signal<any[]>([]);




  constructor(private cartService: CartService) {}

ngOnInit() {
  this.orders = this.cartService.loadOrders();
  this.activeUser = AuthService.getActiveUser();

  AuthService.getFavoriteItems()
    .then(items => this.recommended.set(items));
}
  getAvatarUrl() {
    return `https://ui-avatars.com/api/?name=${this.activeUser?.firstName}+${this.activeUser?.lastName}`;
  }

  updateUser() {
    Alerts.confirm('Are you sure you want to update user info?',
      () => {
        AuthService.updateActiveUser(this.activeUser!);
        Alerts.success('User updated successfully');
      });
  }

  updatePassword() {
    Alerts.confirm('Are you sure you want to change the password?',
      () => {
        if (this.oldPassword != this.activeUser?.password) {
          Alerts.error('Invalid old password');
          return;
        }

        if (this.newPassword.length < 6) {
          Alerts.error('Password must be at least 6 characters long');
          return;
        }

        if (this.newPassword != this.passRepeat) {
          Alerts.error('Passwords dont match');
          return;
        }

        if (this.newPassword == this.activeUser?.password) {
          Alerts.error('New password cant be the same as the old one');
          return;
        }

        AuthService.updateActiveUserPassword(this.newPassword);
        Alerts.success('Password updated successfuly');
        AuthService.logout();
        this.router.navigate(['/login']);
      });
  }

}