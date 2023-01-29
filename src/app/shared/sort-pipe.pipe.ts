import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '@angular/common';
@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

 
  valueAscOrder!:any;
  keyDescOrder!:any;
  transform(value: any, sortParam: any) {
    if(sortParam === 'h') {
      (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.value.localeCompare(b.value);
      }
   
    } else {
     (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
      }
    }
  }
  
}
