import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  loader: boolean = false;
  orders: any = [];
  errMessage!: string;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loader = true;
    this.orderService.getOrderByUser().subscribe(
      (value) => {
        this.orders=value.orders;
        console.log(this.orders);
        this.loader = false;
      },
      (err) => {
        this.errMessage = "Some Error Occured in Fetching Order Please Try later"
        this.loader = false;
      }
    )
  }

}
