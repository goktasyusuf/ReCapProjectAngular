import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiURL: string = "https://localhost:44394/api/cars/";

  constructor(private httpClient:HttpClient) { }
 
  getCars():Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiURL +"getcardetails");
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiURL + "getcardetailsbybrandid?brandId=" +brandId);
  }
  getCarsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiURL +"getcardetailsbycarid?carId=" +carId)
  }

  getCarsByBrandAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiURL +"getcarsbybrandandcolorid?brandId=" + brandId +"&colorId="+colorId)
  }

  addCar(car:Car):Observable<SingleResponseModel<number>> {
    return this.httpClient.post<SingleResponseModel<number>>(this.apiURL + "add" , car);
  }
}
