import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  token:string;
  decoded:any;
  user:User
  userId:any;
  roles:any;
  cars:Car[];


  constructor(private userService:UserService,private authService:AuthService,private rentalService:RentalService){}

  ngOnInit(): void {
    this.getAndDecodeToken();
    this.getUserByUserId(this.userId);
    this.getRentalDetailsByUserId(this.userId);
  }
  

  getAndDecodeToken() {
    this.token = this.authService.getToken()
    this.decoded = this.authService.decodeToken(this.token)
    this.userId = this.decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    this.roles = this.decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    
  }
  getUserByUserId(userId:number) {
    this.authService.getUserByUserId(userId).subscribe(response=>{
      if(response.success) {
        this.user = response.data;
      }
      else {
        console.log("HATA")
      }
    },error=>{
      console.log(error)
    })
  }

  getRentalDetailsByUserId(userId:number) {
    this.rentalService.getRentalDetailsByUserId(userId).subscribe(response=>{
      if(response.success) {
        this.cars = response.data;
      }
    },error=>{
      console.log(error)
    })
  }

}
