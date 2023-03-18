import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  selectedOptionColor: string;
  selectedOptionBrand:string;
  brands:Brand[];
  colors:Color[];
  filteredText:string ="";
  constructor(private brandService:BrandService,private toastrService:ToastrService,private colorService:ColorService) {}
  ngOnInit(): void {
    this.getColors();
    this.getBrands();
  }


  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      if (response.success) {
        this.brands = response.data;
      }
      else {
        this.toastrService.info(response.message, "HATA");
      }
    }, error => {
      this.toastrService.error("Marka Bilgisi Getirilemedi", "HATA")
    })
  }

  getColors() {

    this.colorService.getColors().subscribe(response => {
      if (response.success) {
        this.colors = response.data;
      }
      else {
        this.toastrService.info(response.message, "HATA");
      }
    }, error => {
      this.toastrService.error("Renk Bilgisi Getirilemedi", "HATA")
    })
  }

}
