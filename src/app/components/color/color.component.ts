import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  dataLoaded :boolean = false;
  colors:Color[] = [];
constructor(private colorService:ColorService){}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response)=>{
      if(response.success) {
        this.colors = response.data;
        this.dataLoaded = true;
      }
      else {
        console.log(response.message);
      }
    },error=>{
      console.log(error.message);
    });
  }

}
