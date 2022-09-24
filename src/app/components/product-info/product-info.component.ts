import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/data/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  cart: any = [];
  product!: Product;
  errMessage!: string;
  loader: boolean = false;
  quantity: number = 1;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cartService.getCartUser().subscribe(
      (value) => {
        for (let i of value.cart) { this.cart.push(i.product._id) }
      },
      (err) => {
        this.errMessage = err.error.message;
      }
    )

    this.loader = true;
    setTimeout(() => {
      this.route.params.subscribe((params) => {
        this.productService.getProduct(params.productId).subscribe(
          (i) => {
            let isThereInCart: boolean = (this.cart.indexOf(i._id) != -1) ? true : false;
            this.product = new Product(i._id, i.name, i.description, i.price, i.category.name, i.inStock, i.sold, isThereInCart);
            this.loader = false;
          },
          (err) => {
            this.errMessage = err.error.message;
            this.loader = false;
          }
        )
      })
    }, 1000)
  }

  addToCart(id: string, inTheStock: number) {
    if (inTheStock < this.quantity) {
      this.toastr.error("Please select quantity which is less than or Equal to in the stock value");
      return;
    }
    this.loader = true;
    this.loader = true;
    this.cartService.addProductToCart({ "count": this.quantity, "product": id }).subscribe(
      () => {
        this.loader = false;
        if (this.product._id === id) { this.product.addedToCart = true; }
        this.cartService.cartLengthByUser.next(1);
        this.toastr.info("Added To Cart");
      },
      () => {
        this.loader = false;
        this.toastr.error("Not Added To Cart");
      }
    )
  }

  onChangeQuantity(number: string) {
    this.quantity = parseInt(number)
  }

}
