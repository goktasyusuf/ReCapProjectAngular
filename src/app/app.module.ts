import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { ColorComponent } from './components/color/color.component';
import { UserComponent } from './components/user/user.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarviewComponent } from './components/carview/carview.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { TotalComponent } from './components/total/total.component';
import { BrandsandcarsComponent } from './components/brandsandcars/brandsandcars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilterComponent } from './components/filter/filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UsereditComponent } from './components/useredit/useredit.component';
import { PaymentConfirmComponent } from './components/payment-confirm/payment-confirm.component';
import {FileUploadModule} from 'primeng/fileupload';
@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NavigationComponent,
    BrandComponent,
    CarouselComponent,
    TestimonialComponent,
    PreferenceComponent,
    ColorComponent,
    UserComponent,
    RentalComponent,
    CarDetailComponent,
    CarviewComponent,
    HomeComponent,
    FooterComponent,
    MapComponent,
    ContactComponent,
    AboutComponent,
    TotalComponent,
    BrandsandcarsComponent,
    VatAddedPipe,
    FilterPipePipe,
    CartSummaryComponent,
    FilterComponent,
    PaymentComponent,
    AddCarComponent,
    AddBrandComponent,
    AddColorComponent,
    LoginComponent,
    RegisterComponent,
    UsereditComponent,
    PaymentConfirmComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: false,
      closeButton: true,
      countDuplicates: true,
      positionClass: "toast-bottom-right",
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule { }
  