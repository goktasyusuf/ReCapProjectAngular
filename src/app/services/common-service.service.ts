import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  startDate:Date;
  mystatusChangedForStart: EventEmitter<any> = new EventEmitter();
  mystatusChangedForEnd: EventEmitter<any> = new EventEmitter();
  endDate:Date;

  constructor() { }

  get startDateValue(): any {
    return  this.startDate;
  }
  get endDateValue(): any {
    return  this.endDate;
  }

  set startDateValue(val:any){
    this.startDate = val;
    this.mystatusChangedForStart.emit(val);
  }
  set endDateValue(val:any){
    this.startDate = val;
    this.mystatusChangedForEnd.emit(val);
  }
}
