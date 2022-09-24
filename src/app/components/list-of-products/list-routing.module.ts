import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsSignedInService } from 'src/app/route-Gaurd/is-signed-in.service';
import { CartComponent } from '../cart/cart.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { OrderComponent } from '../order/order.component';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { ProfileComponent } from '../profile/profile.component';
import { ListOfProductsComponent } from './list-of-products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListOfProductsComponent },
      { path: 'product/:productId', component: ProductInfoComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit/profile', component: EditProfileComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent }
    ],
    canActivate: [IsSignedInService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfProductsRoutingModule { }
