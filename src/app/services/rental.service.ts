import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { AddRental, Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiURL:string =" https://localhost:44394/api/rentals/getrentaldetails";

  constructor(private httpClient:HttpClient) { }


  getRentalDetails():Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiURL);
  }

  getRentalDetailsByCarId(carId:number):Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>("https://localhost:44394/api/Rentals/getrentaldetailsbycarid?carId="+carId)
  }

  addRentalDetails(data:any):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>("https://localhost:44394/api/rentals/add",data)
  }

  getRentalDetailsByUserId(userId:number):Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>("https://localhost:44394/api/Rentals/getrentaldetailsbyuserid?userId="+userId);

  }
}
