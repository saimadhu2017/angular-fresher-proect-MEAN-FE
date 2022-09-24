import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByProduct'
})
export class SearchByProductPipe implements PipeTransform {

  transform(products: any[], searchByValue?: string, valid?: boolean): any[] {
    if (valid) {
      searchByValue = searchByValue?.toLowerCase()
      return (
        products.filter((v) => v.name.toLowerCase().includes(searchByValue))
      );
    }
    return products;
  }

}
