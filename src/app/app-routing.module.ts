import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { IsNotSignedInService } from './route-Gaurd/is-not-signed-in.service';

const routes: Routes = [
  { path: 'signin', component: SignInComponent, canActivate: [IsNotSignedInService] },
  { path: 'signup', component: SignUpComponent, canActivate: [IsNotSignedInService] },
  { path: '', loadChildren: () => import('../app/components/list-of-products/list.module').then(m => m.ListOfProductsModule) },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
