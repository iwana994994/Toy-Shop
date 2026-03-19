import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(toy: any) {
    const existingItem = this.cart.find(item => item.id === toy.toyId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const item: CartItem = {
        id: toy.toyId,
        imageUrl:toy.imageUrl,
        name: toy.name,
        price: toy.price,
        quantity: 1,
        status: toy.status ?? 'rezervisano'
      };

      this.cart.push(item);
    }

    this.saveCart();
  }

  getItems(): CartItem[] {
    return this.cart;
  }

  private getUserEmail(): string | null {
    const user = AuthService.getActiveUser();
    return user?.email ?? null;
  }

  saveCart() {
    const userEmail = this.getUserEmail();
    if (!userEmail) return;

    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(this.cart));
  }

  loadCart() {
    const userEmail = this.getUserEmail();
    if (!userEmail) {
      this.cart = [];
      return;
    }

    const data = localStorage.getItem(`cart_${userEmail}`);
    this.cart = data ? JSON.parse(data) : [];
  }

  getTotalAmount(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItem(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
  }

  payBill() {
    const userEmail = this.getUserEmail();
    if (!userEmail) return;

    const existingOrders = localStorage.getItem(`orders_${userEmail}`);
    const orders = existingOrders ? JSON.parse(existingOrders) : [];

    const newOrder = {
      id: Date.now(),
      
      date: new Date().toISOString(),
      items: [...this.cart],
      totalAmount: this.getTotalAmount(),
      status: 'pristiglo',
         rating: 0,
          comment: '',
         reviewSubmitted: false
    };

    orders.push(newOrder);

    localStorage.setItem(`orders_${userEmail}`, JSON.stringify(orders));

    this.cart = [];
    this.saveCart();
  }

  loadOrders(): any[] {
    const userEmail = this.getUserEmail();
    if (!userEmail) {
      return [];
    }

    const data = localStorage.getItem(`orders_${userEmail}`);
    return data ? JSON.parse(data) : [];
  }

  cancelCartItem(id: number) {
  const userEmail = this.getUserEmail();
  if (!userEmail) return;

  const itemToCancel = this.cart.find(item => item.id === id);
  if (!itemToCancel) return;

  const existingCancelled = localStorage.getItem(`cancelled_${userEmail}`);
  const cancelledItems = existingCancelled ? JSON.parse(existingCancelled) : [];

  const cancelledItem = {
    ...itemToCancel,
    cancelledAt: new Date().toISOString(),
    cancelStatus: 'otkazano'
  };

  cancelledItems.push(cancelledItem);

  localStorage.setItem(`cancelled_${userEmail}`, JSON.stringify(cancelledItems));

  this.cart = this.cart.filter(item => item.id !== id);
  this.saveCart();
}

  loadCancelledItems(): any[] {
  const userEmail = this.getUserEmail();
  if (!userEmail) {
    return [];
  }

  const data = localStorage.getItem(`cancelled_${userEmail}`);
  return data ? JSON.parse(data) : [];
}
getTotalQuantity(items: any[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

  deleteOrder(id: number) {
      const userEmail = this.getUserEmail();
  const orders = this.loadOrders();
  const updatedOrders = orders.filter(order => order.id !== id);
  localStorage.setItem(`orders_${userEmail}`, JSON.stringify(updatedOrders));
}
}


