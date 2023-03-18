import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  items:CartItem[];
  constructor(private cartService:CartServiceService){}
  ngOnInit(): void {
    this.getCartItems();
    
  }

  getCartItems() {
    this.items = this.cartService.getItems();
  }

}
