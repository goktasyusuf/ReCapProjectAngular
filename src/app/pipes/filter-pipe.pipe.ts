import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[],filteredText:string): Car [] {
    return filteredText  ?  value.filter(x=>x.carName.toLowerCase().indexOf(filteredText.toLocaleLowerCase())!==-1) : value
  }

}
