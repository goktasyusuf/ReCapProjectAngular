import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  token: string;
  decoded: any;
  userId: number;
  user: User;
  editForm: FormGroup;
  cars:Car[];



  constructor(private authService: AuthService, private toastrService: ToastrService, 
    private formBuilder: FormBuilder, private router: Router,private rentalService:RentalService) {
    this.setData();
  }
  ngOnInit(): void {
    this.getAndDecodeToken();
    this.getUserByUserId(this.userId);
    this.createEditForm();


  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      firstName: ["", Validators.required,],
      lastName: ["", Validators.required],
      about: ["", Validators.required],
      userName: ["", Validators.required],
      age: ["", Validators.required],
      eMail: [""]

    })
  }
  updateUser() {
    if (this.editForm.valid) {
      let model = Object.assign({}, this.editForm.value);

      this.authService.updateUser(model).subscribe(response => {
        if (response.success) {
          this.toastrService.success("Bilgiler Başarıyla Güncellendi","Başarılı")
          this.router.navigate(["/user"]);
        }
        else {
          console.log("success gelmedi")
        }
      }, responseError => {
        console.log("response error geldi")
      })
    }
    else {
      this.toastrService.info("Form Boş Bırakılamaz", "HATA")
    }
  }

  getAndDecodeToken() {
    this.token = this.authService.getToken()
    this.decoded = this.authService.decodeToken(this.token)
    this.userId = this.decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

  }
  getUserByUserId(userId: number,) {
    this.authService.getUserByUserId(userId).subscribe(response => {
      if (response.success) {
        this.user = response.data;
      }
      else {
        console.log("HATA")
      }
    }, error => {
      console.log(error)
    })
  }

  setData() {
    this.editForm?.get('eMail')?.setValue(this.user.eMail);
  }




}
