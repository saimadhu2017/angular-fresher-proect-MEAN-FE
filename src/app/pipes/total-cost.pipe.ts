import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalCost'
})
export class TotalCostPipe implements PipeTransform {

  transform(value: number, cart: any[]): number {
    cart.forEach((item) => {
      value = value + (item.product.price) * (item.count)
    })
    return value;
  }

}
