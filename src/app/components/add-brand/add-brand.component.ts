import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  addBrandForm:FormGroup
  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.createAddBrandForm();
  }



  createAddBrandForm() {
    this.addBrandForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  addBrand() {
    if(this.addBrandForm.valid) {
      let model = Object.assign({},this.addBrandForm.value)
      this.brandService.addBrand(model).subscribe(response=>{
        if(response.success) {
          this.toastrService.success("Ürün Başarıyla Eklendi","Başarılı")
        }
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.Message,"HATA")
      })
    }
    else {
      this.toastrService.error("Form boş bırakılamaz","HATA");
    }
  }

}
