import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../data/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {
  cart: any = [];
  products: any = [];
  errMessage!: string;
  loader: boolean = true;
  quantity: number = 1;
  searchForm!: FormGroup;

  constructor(private productService: ProductService, private cartService: CartService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cartService.getCartUser().subscribe(
      (value) => {
        for (let i of value.cart) { this.cart.push(i.product._id) }
      },
      (err) => {
        this.errMessage = err.error.message;
      }
    )

    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.products = [];
    //Reason for setTimeout is because of first loading the cart
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(
        (value) => {
          for (let i of value) {
            let isThereInCart: boolean = (this.cart.indexOf(i._id) != -1) ? true : false;
            this.products.push(new Product(i._id, i.name, i.description, i.price, i.category.name, i.inStock, i.sold, isThereInCart));
          }
          this.loader = false;
        },
        (err) => {
          this.errMessage = err.error.message;
          this.loader = false;
        }
      );
    }, 1000)
  }

  addToCart(id: string, inTheStock: number) {
    if (inTheStock < this.quantity) {
      this.toastr.error("Please select quantity which is less than or Equal to in the stock value");
      return;
    }
    this.loader = true;
    this.cartService.addProductToCart({ "count": this.quantity, "product": id }).subscribe(
      () => {
        this.quantity = 1;
        this.loader = false;
        this.products.map((product: Product) => {
          if (product._id === id) { product.addedToCart = true; }
        })
        this.cartService.cartLengthByUser.next(1);
        this.toastr.info("Added To Cart");
      },
      () => {
        this.quantity = 1;
        this.loader = false;
        this.toastr.error("Not Added To Cart");
      }
    )
  }

  onChangeQuantity(number: string) {
    this.quantity = parseInt(number)
  }

  productSearch() {

  }
}
