import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {
  colorForm:FormGroup;
  colors:Color[];
  constructor(private toastrService:ToastrService,private colorService:ColorService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.getAllColors();
    this.createAddColorForm();
  }

  createAddColorForm() {
    this.colorForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  addColor() {
    if(this.colorForm.valid) {
      let model = Object.assign({},this.colorForm.value)
      this.colorService.addColor(model).subscribe(response=>{
        if(response.success) {
          this.toastrService.success("Renk başarıyla eklendi","BAŞARILI");
        }
      },responseError=>{
        this.toastrService.error(responseError.error.Message,"HATA")
      })
    }
    else {
      this.toastrService.error("Form boş geçilemez","HATA")
    }

  }

  getAllColors() {

    this.colorService.getColors().subscribe(response=>{
      if(response.success) {
        this.colors = response.data;
      }
      else {
        this.toastrService.info(response.message,"HATA")
      }
    },error=>{
      this.toastrService.error("Bilinmeyen Hata","HATA");
    })
  }

}
