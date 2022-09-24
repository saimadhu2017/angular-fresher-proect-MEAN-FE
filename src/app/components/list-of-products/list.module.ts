import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { ProfileComponent } from '../profile/profile.component';
import { ListOfProductsComponent } from './list-of-products.component';
import { ListOfProductsRoutingModule } from './list-routing.module';
import { CommonModule } from '@angular/common';
import { SearchByProductPipe } from 'src/app/pipes/search-by-product.pipe';
import { TotalCostPipe } from 'src/app/pipes/total-cost.pipe';
import { MouseHoverDirective } from 'src/app/directives/mouse-hover.directive';
import { OrderComponent } from '../order/order.component';

@NgModule({
    declarations: [
        ListOfProductsComponent,
        ProductInfoComponent,
        ProfileComponent,
        EditProfileComponent,
        CartComponent,
        SearchByProductPipe,
        TotalCostPipe,
        MouseHoverDirective,
        OrderComponent
    ],
    imports: [
        ListOfProductsRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class ListOfProductsModule {

}
