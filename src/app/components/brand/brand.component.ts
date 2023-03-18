import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  dataLoaded:boolean = false;
  brands:Brand[] = [];
  currentBrand:Brand ;
  currentBrandName:string;
  constructor(private brandService:BrandService,private toastrService:ToastrService){}

  ngOnInit(): void {
    this.getBrands();

  }

  getBrands() {
    this.brandService.getBrands().subscribe((response)=>{
      if(response.success) {
        this.brands = response.data;
        this.dataLoaded = true;
      }
      else {
        console.log(response.message);
      }
    },(error)=> {
      console.log(error.message);
    })

  }

  getCurrentBrand(brand:Brand) {
    this.currentBrand = brand;
    this.currentBrandName = brand.brandName;
  }
 

  getBrandClassName(brand:Brand) {
    if(this.currentBrand == brand) {
      return "list-group-item active";
    }
    else {
      return "list-group-item";
    }
  }

}
