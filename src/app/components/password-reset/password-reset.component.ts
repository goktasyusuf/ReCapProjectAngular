import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordReset } from 'src/app/models/passwordReset';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  passwordUpdateForm: FormGroup;
  token: string;
  decodedToken: any;
  email: string;
  confirmPassword: string;
  constructor(private authService: AuthService, private toastrService: ToastrService
    , private formBuilder: FormBuilder, private router: Router) {

  }
  ngOnInit(): void {
    this.getAndDecodeToken();
    this.createPasswordUpdateForm();

  }

  getAndDecodeToken() {
    this.token = this.authService.getToken();
    this.decodedToken = this.authService.decodeToken(this.token);
    this.email = this.decodedToken["email"]
  }

  createPasswordUpdateForm() {
    this.passwordUpdateForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  setEmail() {
    this.passwordUpdateForm.get('email')?.setValue(this.email);
  }

  updatePassword() {
    if (this.passwordUpdateForm.valid) {
      if (this.confirmPassword.toString() !== this.passwordUpdateForm.get('password')["_pendingValue"]) {
        this.toastrService.error("Şifreler Eşleşmiyor", "HATA");
      } else {
        var model = Object.assign({}, this.passwordUpdateForm.value);
        this.authService.updatePassword(model).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Şifreniz başarıyla değiştirildi", "Başarılı")
            setTimeout(() => {
              this.router.navigate(["/"])
            }, 2000)
          }
        }, error => {
          console.log(error)
        })
      }
    }
    else {
      this.toastrService.error("Lütfen şifrenizi giriniz", "HATA");
    }
  }
}
