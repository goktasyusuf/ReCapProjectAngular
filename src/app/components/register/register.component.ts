import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  constructor(private toastrService:ToastrService , private authService:AuthService,private formBuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      about:["",Validators.required],
      userName:["",Validators.required],
      age:["",Validators.required],
      phoneNumber:["",Validators.required],
      nationalityId:["",Validators.required]
    })
  }

  register() {
    if(this.registerForm.valid) {
      let model = Object.assign({},this.registerForm.value);
      this.authService.register(model).subscribe(response=>{
        if(response.success) {
          localStorage.setItem("registerToken",response.data.token);
          this.toastrService.info("E-Mailinize doğrulama linki gönderilmiştir.","Kayıt Başarılı") 
          setTimeout(()=>{
            this.router.navigate(["login"]);
          },2700)
        }
      },responseError=>{
        console.log(responseError)
      })
    }
    else{
      this.toastrService.info("Lütfen bilgileri doldurun","HATA");
    }
  }

}
