import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { FormsModule } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { CartItems } from 'src/app/models/cartItems';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  colors: Color[];
  brands: Brand[];
  dataLoaded: boolean = false;
  filteredText: string = "";
  selectedOptionBrand: string;
  selectedOptionColor: string;


  constructor(private carService: CarService, private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute, private cartService: CartServiceService,
    private colorService: ColorService, private brandService: BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {

      if(param["brandId"] && param["colorId"]) {
        this.getCarsByBrandAndColorId(param["brandId"],param["colorId"])
      }
      else if (param["brandId"]) {
        this.getCarsByBrandId(param["brandId"]);
        this.getColors();
        this.getBrands();
      }
      else {
        this.getAllCars();
        this.getColors();
        this.getBrands();
      }
    })

  }

  getAllCars() {
    this.carService.getCars().subscribe(response => {
      if (response.success) {
        this.cars = response.data;
        this.dataLoaded = true;
      }
      else {
        this.toastrService.info("Bilinmeyen Hata", "Hata");
      }
    }, error => {
      this.toastrService.error("Bir hata meydana geldi");
    })
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response => {
      if (response.success) {
        this.cars = response.data;
        this.dataLoaded = true;
      }
      else {
        this.toastrService.info(response.message)
      }
    }, error => {
      this.toastrService.error("Bir hata meydana geldi.Lütfen sayfayı yenileyin", "Hata")
    })
  }

  addToCart(car: Car) {
    this.cartService.addToCart(car);
    this.toastrService.success(car.carName + " sepete eklendi", "Başarılı");
  }

  getColors() {

    this.colorService.getColors().subscribe(response => {
      if (response.success) {
        this.colors = response.data;
      }
      else {
        this.toastrService.info(response.message, "HATA");
      }
    }, error => {
      this.toastrService.error("Renk Bilgisi Getirilemedi", "HATA")
    })
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      if (response.success) {
        this.brands = response.data;
      }
      else {
        this.toastrService.info(response.message, "HATA");
      }
    }, error => {
      this.toastrService.error("Marka Bilgisi Getirilemedi", "HATA")
    })
  }

  getCarsByBrandAndColorId(brandId:number,colorId:number) {
    this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe(response=>{
      if(response.success) {
        this.cars = response.data;
        this.dataLoaded = true;
      }
      else {
        this.toastrService.info(response.message,"HATA");
      }
    },error=>{
      this.toastrService.error("Bir hata meydana geldi","HATA");
    })
  }
}



