import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItems } from '../models/cartItems';

import {CartItem} from '../models/cartItem'

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }
  addToCart(car:Car) {
    let item = CartItems.find(x=>x.car.carId === car.carId);
    if(item) {
      item.quantity+=1;
    }
    else {
      let item = new CartItem();
      item.car = car;
      item.quantity = 1;
      CartItems.push(item);
    }
  }

  getItems():CartItem[] {
    return CartItems;
  }
}
