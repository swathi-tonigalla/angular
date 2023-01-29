import { Pipe, PipeTransform } from '@angular/core';
import { UserP } from '../model/userpermission.model'; 

@Pipe({
  name: 'serachUserPermission'
})
export class SerachUserPermissionPipe implements PipeTransform {

  transform(username: UserP[],selectedUser:string) {
    // return username.filter(username => username.name?.indexOf(selectedUser) !== -1);
  }

}
