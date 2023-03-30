import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { BrandsandcarsComponent } from './components/brandsandcars/brandsandcars.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CarviewComponent } from './components/carview/carview.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PaymentConfirmComponent } from './components/payment-confirm/payment-confirm.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { TotalComponent } from './components/total/total.component';
import { UserComponent } from './components/user/user.component';
import { UsereditComponent } from './components/useredit/useredit.component';
import { LoginGuard } from './guards/login.guard';
import { PaymentGuardGuard } from './guards/payment-guard.guard';

const routes: Routes = [
  {
    path: "",pathMatch:"full", component: HomeComponent, children: [
      { path: "", component: CarviewComponent },
    ]
  },
  { path: "car/:carId/payment/paymentconfirm", component: PaymentConfirmComponent,canActivate:[LoginGuard,PaymentGuardGuard]},
  {
    path: "cars", component: TotalComponent,children:[
      { path: "addcolor", component: AddColorComponent,canActivate:[LoginGuard]},
      { path: "addcar", component: AddCarComponent,canActivate:[LoginGuard] },
      { path: "addbrand", component: AddBrandComponent,canActivate:[LoginGuard]},
      { path: "", component: BrandsandcarsComponent }, 
      { path: "car/:carId", component: CarDetailComponent }, 
      { path: "brands/:brandId/car/:carId", component: CarDetailComponent }, 
      { path: "brands/:brandId", component: CarComponent }, 
      { path: ":brandId/:colorId", component: CarComponent }, 
      { path: ":carId/:brandId/car/:carId", component: CarDetailComponent }, 
      { path: "car/:carId/payment", component: PaymentComponent,canActivate:[LoginGuard]}, 
      { path: ":brandId/:colorId/car/:carId/payment", component: PaymentComponent,canActivate:[LoginGuard]},
    ]
  },
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user",component:UserComponent ,canActivate:[LoginGuard]},
  {path:"useredit",component:UsereditComponent ,canActivate:[LoginGuard]},
  {path:"resetpassword",component:PasswordResetComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
