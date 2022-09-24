import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any = [];
  errMessage!: string;
  loader: boolean = true;
  address: string = '';

  constructor(private cartService: CartService, private toastr: ToastrService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCartByUser();
  }

  getCartByUser() {
    this.cartService.getCartUser().subscribe(
      (value) => {
        this.cart = value.cart;
        this.loader = false;
      },
      (err) => {
        this.errMessage = err.error.message;
        this.loader = false;
      }
    )
  }

  deleteProductInCart(itemId: string) {
    this.loader = true;
    this.cartService.deleteProductInCart(itemId).subscribe(
      () => {
        this.cartService.cartLengthByUser.next(-1);
        this.getCartByUser();
      },
      (err) => {
        this.errMessage = err.error.message;
        this.loader = false;
      }
    )
  }

  placeOrder() {
    this.loader = true;
    this.address = this.address.trim();
    if (this.address.length == 0) {
      this.loader = false;
      this.toastr.error("Please Enter Address");
      return;
    }

    this.orderService.createOrder(this.address).subscribe(
      () => {
        this.loader = false;
        this.cartService.cartLengthByUser.next(-this.cart.length);
        this.cart = [];
        this.toastr.success("Order Placed Successsfully");
      },
      (err) => {
        this.toastr.error("Failed to Place Order");
        this.loader = false;
      }
    )
  }

}
