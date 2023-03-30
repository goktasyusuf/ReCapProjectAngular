import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Token } from '../models/token';
import jwt_decode from "jwt-decode";
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ListResponseModel } from '../models/listResponseModel';
import { PasswordReset } from '../models/passwordReset';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL:string = "https://localhost:44394/api/auth/"



  constructor(private httpClient:HttpClient,private router:Router) {}

  login(loginModel:LoginModel):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL + "login",loginModel);
  } 

  register(registerModel:Register):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL + "register",registerModel);
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigate(["/"])
  }


  isAuthenticated() {
    if(localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  getToken() {
    return  (localStorage.getItem("token") || "");
  }

  updatePassword(dto:PasswordReset):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL + "resetpassword",dto);
  }

  decodeToken(token:string):string {
    return  jwt_decode(token);
  }

  getUserByUserId(userId:number):Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>("https://localhost:44394/api/users/getuserbyid?id=" +userId)
  }

  updateUser(user:User):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>("https://localhost:44394/api/users/updateuser",user);
  }
}
