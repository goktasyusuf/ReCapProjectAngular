import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: Payment[];
  url: string;
  startDate: Date;
  endDate: Date;
  rentalDetails: Rental[];
  currentRental: Rental;
  carImages: CarImage[];
  carDetails: Car[];
  user: User;
  car: Car;
  token: string;
  decodedToken: any;
  userId: number;
  rentalForm: FormGroup

  constructor(private toastrService: ToastrService
    , private rentalService: RentalService, private activatedRoute: ActivatedRoute,
    private carService: CarService, private authService: AuthService, private router: Router
    , private carImageService: CarimageService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.getTokenAndDecode();
      this.getRentalDetailsByCarId(param["carId"]);
      this.getCarById(param["carId"]);
      this.getUserById(this.userId);
      this.getImagesByCarId(param["carId"])
    })

  }


  getImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
      if (response.success) {
        this.carImages = response.data;
        if (response.data.length > 0) {
          this.url = "https://localhost:44394/Uploads/Images/" + response.data[0].imagePath
        }
      }
    }, error => {
      console.log(error)
    })
  }

  getImagePath(carImage: CarImage): string {
    let url: string = "https://localhost:44394/Uploads/Images/" + carImage.imagePath;
    return url;
  }

  getCarById(carId: number) {
    this.carService.getCarsByCarId(carId).subscribe(response => {
      if (response.success) {
        this.carDetails = response.data;
        this.car = response?.data[0];
        
      }
      else {
        this.toastrService.info(response.message, "HATA");
      }
    }, error => {
      this.toastrService.error("Bilinmeyen Hata", "HATA");

    })
  }


  getRentalDetailsByCarId(carId: number) {
    this.rentalService.getRentalDetailsByCarId(carId).subscribe(response => {
      if (response.success) {
        this.rentalDetails = response?.data;
        this.currentRental = this.rentalDetails[0];
      }
      else {
        this.toastrService.info(response.message, "HATA");
      }
    }, error => {
      this.toastrService.error("Bilinmeyen Hata", "HATA");
    })
  }
  rentCar(rentalDetails: Rental) {
    if (this.rentalDetails.length == 0) {
      if (this.CheckIfDatesNull() || this.CheckIfDatesIsLetterThanToday() || this.CheckIfStartDateGreaterThanEndDate()) {
        return null
      }
      else {
        if (confirm(`${this.car.carName} adlı arabayı kiralamak istediğinize emin misiniz ? `)) {
          localStorage.setItem("startDate",this.startDate.toString())
          localStorage.setItem("endDate",this.endDate.toString())
          this.toastrService.success("Ödeme Ekranına Yönlendiriliyorsunuz", "Başarılı")
          return setTimeout(() => {
            return this.router.navigate([`car/${this.car.carId}/payment/paymentconfirm`])           
          }, 2000);
        }
        else {
          return null
        }
      }
    }
    else {
      if (this.CheckIfDatesNull() || this.CheckIfInvalidTime(rentalDetails) || this.CheckIfDatesIsLetterThanToday() || this.CheckIfStartDateGreaterThanEndDate()) {
        return null
      }
      else {
        if (confirm(`${this.car.carName} adlı arabayı kiralamak istediğinize emin misiniz ? `)) {
          localStorage.setItem("startDate",this.startDate.toString())
          localStorage.setItem("endDate",this.endDate.toString())
          this.toastrService.success("Ödeme Ekranına Yönlendiriliyorsunuz", "Başarılı")
          return setTimeout(() => {
            return this.router.navigate([`car/${this.car.carId}/payment/paymentconfirm`])  
          }, 2000);
        }
        else {
          return null
        }
      }
    }
  }

  getTokenAndDecode() {
    this.token = this.authService.getToken();
    this.decodedToken = this.authService.decodeToken(this.token);
    this.userId = this.decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  }

  getUserById(userId: number) {
    this.authService.getUserByUserId(userId).subscribe(response => {
      if (response.success) {
        this.user = response.data;
      }
    }, error => {
      console.log(error)
    })
  }

  //YARDIMCI FONKSİYONLAR

  private CheckIfDatesNull() {
    if (this.endDate == null || this.startDate == null) {
      return this.toastrService.error("Tarihler Boş Geçilemez")
    }
    return null;
  }
  private CheckIfInvalidTime(rentalDetails: Rental) {
    if ((rentalDetails.rentDate <= this.startDate) && (this.startDate < rentalDetails.returnDate)) {
      return this.toastrService.error("Araba seçtiğiniz tarihler arasında zaten kiralanmıştır")
    }
    return null;
  }
  private CheckIfDatesIsLetterThanToday() {
    const dt = new Date(this.startDate).getFullYear()
    const dt2 = new Date(this.endDate).getFullYear()
    const now = new Date();
    var nowYear = now.getFullYear()
    if (dt2 < nowYear || dt < nowYear) {
      return this.toastrService.error("Geçmiş tarihte kiralama yapamazsınız.");
    }
    return null;
  }
  private CheckIfStartDateGreaterThanEndDate() {
    const dt = new Date(this.startDate)
    const dt2 = new Date(this.endDate)
    if (dt >= dt2) {
      return this.toastrService.error("Kiralama başlangıç tarihiniz , bitiş tarihinden sonra olamaz")
    }
    return null;
  }

}


