import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { AddPaymentModel, Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  apiURL:string ="https://localhost:44394/api/Payments/";

  constructor(private httpClient:HttpClient) { }


  getAllPaymentDetails():Observable<ListResponseModel<Payment>> {
    return this.httpClient.get<ListResponseModel<Payment>>(this.apiURL + "getall");
  }

  getPaymentDetailsByCustomerId(customerId:number):Observable<ListResponseModel<Payment>>{
    return this.httpClient.get<ListResponseModel<Payment>>(this.apiURL +"getbycustomerid?customerId="+customerId);
  }
  addPaymentDetails(payment:AddPaymentModel):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL + "add" ,payment);
  }
}
