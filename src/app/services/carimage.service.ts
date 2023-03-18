import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddImage } from '../models/addImage';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {
  apiURL:string ="https://localhost:44394/api"

  constructor(private httpClient:HttpClient) { }


  getAllCarImages():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiURL + "/carimages/getall");
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiURL +"/carimages/getimagesbycarid?carId="+carId)
  }


  addImage(addImage:AddImage):Observable<ResponseModel> {   
    const formData = new FormData();
    formData.append("image",addImage.image)
    formData.append("carId",addImage.carId.toString())
    return this.httpClient.post<ResponseModel>("https://localhost:44394/api/CarImages/AddImage",formData);
  }
}
