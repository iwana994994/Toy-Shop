import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../service/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Alerts } from '../alerts';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { NotificationService } from '../service/notification.service';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-cart',
  imports: [MatIcon,MatCardModule, MatTableModule, FormsModule, MatAnchor],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  orders: any[] = [];
  cancelledItems: any[] = [];
  notification= inject(NotificationService)
  utils=inject(UtilsService)

  displayedColumns: string[] = ['picture','name', 'price', 'quantity', 'status', 'delete'];
  orderDisplayedColumns: string[] = ['id', 'date', 'totalAmount', 'items','status',"delete"];
cancelledDisplayedColumns: string[] = ['name', 'price', 'quantity', 'status', 'cancelledAt'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getItems();
    this.orders = this.cartService.loadOrders();
    this.cancelledItems = this.cartService.loadCancelledItems();

  }

  loadCart() {
    this.cartService.saveCart();
    this.cart = this.cartService.getItems();
  }

  updateOrder() {
    this.orders = this.cartService.loadOrders();
  }
  loadCancelledItems() {
  this.cancelledItems =this.cartService.loadCancelledItems();
}

  getTotalAmount(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  

  payBill() {
    this.cartService.payBill();
    this.cart = this.cartService.getItems();
    this.orders = this.cartService.loadOrders();
    
    console.log("order receive");
  }

cancelItem(id: number) {
  Alerts.confirm('Are you sure you want to cancel this item?', () => {
    this.cartService.cancelCartItem(id);

    window.location.reload()
    
    
  });
}
deleteItem(id:number){
  Alerts.confirm('Are you sure you want to delete order?', () => {
    this.cartService.deleteOrder(id);

    window.location.reload()
    
    
  });
}
}