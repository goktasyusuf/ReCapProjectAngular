import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  brands: Brand[];
  addCarForm: FormGroup;
  colors: Color[];

  images: any;
  carId: number;
  file: File;
  constructor(private formBuilder: FormBuilder, private carService: CarService, private toastrService: ToastrService, private brandService: BrandService, private colorService: ColorService, private imageService: CarimageService) { }
  ngOnInit(): void {

    this.createCarAddForm();
    this.getAllBrands();
    this.getAllColors();
  }


  createCarAddForm() {
    this.addCarForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      location: ["", Validators.required],
      description: ["", Validators.required],
      findexScore:["", Validators.required],
      seatNumber:["", Validators.required]
    })
  }

  onChange(event) {
    this.file = event.target?.files[0];
  }


  addCar() {
    if (this.addCarForm.valid) {
      let model = Object.assign({}, this.addCarForm.value)
      this.carService.addCar(model).subscribe(response => {
        if (response.success) {
          this.carId = response.data;
          if(this.file != null) {
            setTimeout(() => {
              let model2 = {
                carId:this.carId,
                image:this.file
              }
              this.imageService.addImage(model2).subscribe(response => {
                if (response.success) {  
                }
              })
            }, 2000) 
          }
          
          this.toastrService.success("Başarıyla Eklendi", "Başarılı")
        }
      }, responseError => {
        this.toastrService.error(responseError.error.Message)
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik Olamaz", "HATA")
    }
  }


  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      if (response.success) {
        this.brands = response.data;
      }
      else {
        this.toastrService.info(response.message, "HATA")
      }
    }, error => {
      this.toastrService.error("Bilinmeyen Hata", "HATA");
    })
  }

  getAllColors() {

    this.colorService.getColors().subscribe(response => {
      if (response.success) {
        this.colors = response.data;
      }
      else {
        this.toastrService.info(response.message, "HATA")
      }
    }, error => {
      this.toastrService.error("Bilinmeyen Hata", "HATA");
    })
  }


}
