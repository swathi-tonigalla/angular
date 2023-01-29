import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uidNameFilter',
  pure: false
})
export class UidNameFilterPipe implements PipeTransform {

  transform(uids: any[], filter: any): unknown {
    if (!uids || !filter) {
      return uids;
  }
  // filter items array, items which match and return true will be
  // kept, false will be filtered out
  return uids.filter(item => item.udname.indexOf(filter.udname) !== -1);
  }

}
