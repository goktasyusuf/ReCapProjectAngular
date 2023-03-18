import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car[];
  carImages: CarImage[];
  defaultImage: string = "https://localhost:44394/Uploads/Images/no.jpg"

  constructor(private carService: CarService, private carImageService: CarimageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarByCarId(params["carId"])
      this.getCarImagesByCarId(params["carId"])
    })

  }
  getCarByCarId(carId: number) {
    this.carService.getCarsByCarId(carId).subscribe(response => {
      if (response.success) {
        this.car = response.data;
      }
      else {
        console.log(response.message)
      }
    }, error => {
      console.log(error.message)
    })
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
      if (response.success) {
        this.carImages = response.data;
      }
      else {
        console.log(response.message);
      }
    }, error => {
      console.log(error.message)
    })
  }

  getImagePath(carImage: CarImage): string {
    let url: string = "https://localhost:44394/Uploads/Images/" + carImage.imagePath;
    return url;
  }
}
