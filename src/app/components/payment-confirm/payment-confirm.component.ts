import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
  car:Car;
  paymentForm:FormGroup;
  token:string;
  decodedToken:any;
  userId:number;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,private toastrService:ToastrService,private authService:AuthService,
    private paymentService:PaymentServiceService,private rentalService:RentalService,
    private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarDetailsByCarId(params["carId"])
      this.createPaymenForm();
      this.getAndDecodeToken();
    })
  }

  getCarDetailsByCarId(carId:number) {
    this.carService.getCarsByCarId(carId).subscribe(response=>{
      if(response.success) {
        this.car = response.data[0];
      }
      else {
        console.log(response.message)
      }
    },error=>{
      console.log(error)
    })
  }

  createPaymenForm() {
    this.paymentForm = this.formBuilder.group({
      creditCardId:["",Validators.required],
      expirationDate:["",Validators.required],
      cvv:["",Validators.required],
      customerId:[""],
      startDate:[localStorage.getItem('startDate')],
      endDate:[localStorage.getItem('endDate')],
    })
  }

  getAndDecodeToken() {
    this.token = this.authService.getToken();
    this.decodedToken = this.authService.decodeToken(this.token);
    this.userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    
  }
  setUserId() {
    this.paymentForm.get('customerId')?.setValue(this.userId);
  }

  pay() {
    if(this.paymentForm.valid) {
      let model = Object.assign({},this.paymentForm.value);
      if(confirm("Kartı kaydetmemizi ister misiniz ? ")) {
        this.paymentService.addPaymentDetails(model).subscribe(response=>{
          if (response.success) {
            this.toastrService.success("Kart başarıyla kaydedildi.","Başarılı")
          }
        })
      }
      else {
        null
      }
      var obj = {
        userId:this.userId,
        carId:this.car.carId,
        rentDate:localStorage.getItem("startDate"),
        returnDate:localStorage.getItem("endDate"),
      }
       this.rentalService.addRentalDetails(obj).subscribe(response=>{
        if(response.success) {
          this.toastrService.success("Araba Başarıyla Kiralandı ! " , "Başarılı")
          localStorage.removeItem("endDate")
          localStorage.removeItem("startDate")
          setTimeout(() => {(
            this.router.navigate(["/"])
          )
          },2000);
        }
       })
    }
    else {
      this.toastrService.error("Lütfen bilgilerinizi giriniz","HATA");
    }
  }

}
