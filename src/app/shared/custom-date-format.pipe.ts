import { Pipe, PipeTransform } from '@angular/core';
 import { Constants } from '../shared/constantants';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
     return super.transform(value, Constants.DATE_TIME_FMT);
  }
}
