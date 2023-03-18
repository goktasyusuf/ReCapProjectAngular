import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private authService:AuthService,private toastrService:ToastrService,private formBuilder:FormBuilder,private router:Router) {}
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      let model = Object.assign({},this.loginForm.value)
      this.authService.login(model).subscribe(response=>{
        if(response.success) {
          localStorage.setItem("token",response.data.token)
          this.toastrService.success("Giriş Başarılı","Başarılı")  
          setTimeout(() => {
            this.router.navigate(["user"])
          }
          , 2000);
        }
      },error=>{
        this.toastrService.error(error.error)
      })
    }
    else {
      this.toastrService.info("Lütfen bilgileri doldurunuz.","HATA")
    }
  }

}
