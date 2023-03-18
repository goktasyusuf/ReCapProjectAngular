import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[] = [];
  dataLoaded:boolean = false;
  constructor(private rentalService:RentalService){}
  ngOnInit(): void {
    this.getRentalDetails();
  }
  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe((response)=>{
      if(response.success) {
        this.rentals = response.data;
        this.dataLoaded = true;
      }
      else {
        console.log(response.message);
      }
    })
  }

}
