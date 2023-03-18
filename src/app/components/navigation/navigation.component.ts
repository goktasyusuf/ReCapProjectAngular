import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  token: string;
  decoded: any;
  user: User;
  userId: any;
  name: string;


  constructor(private authService: AuthService,private toastrService:ToastrService) { }
  ngOnInit(): void {
    this.getAndDecodeToken();
    this.getUserByUserId(this.userId);
  }


  getAndDecodeToken() {
    if (this.token != null) {
      this.token = this.authService.getToken()
      this.decoded = this.authService.decodeToken(this.token)
      this.userId = this.decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
      this.name = this.decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }

  getUserByUserId(userId: number) {
    if (this.token != null) {
      this.authService.getUserByUserId(userId).subscribe(response => {
        if (response.success) {
          this.user = response.data;
        }
      },
      error=>console.log(error))
    }

  }

  logOut() {
    this.authService.logOut();
    this.toastrService.success("Başarıyla çıkış Yapıldı","Başarılı");
    
  }

}
