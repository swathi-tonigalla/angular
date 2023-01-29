import { Component,OnInit} from '@angular/core';
import{UserpermissionService} from '../../../services/userpermission.service';
import {User} from '../../../model/userlist.model';
//import {UserP} from '../../../model/userpermission.model';
 // import { SerachUserPermissionPipe } from 'src/app/shared/serach-user-permission.pipe';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserP, UserPermission } from 'src/app/model/userpermission.model';
import { TokenService } from 'src/app/services/token.service';
import { DatePipe } from '@angular/common';
// interface User {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-permision-search-filter',
  templateUrl: './permision-search-filter.component.html',
  styleUrls: ['./permision-search-filter.component.css']
})
export class PermisionSearchFilterComponent implements OnInit{
  permissionSearch: FormGroup;
  userslist: User[];
  selectedUser!:string;
  username2!:any;
  startDate2!:any;
  endDate2!:any;
  userPermission:UserPermission = {};
  userPermissionSearch :UserP[];
  permisssionSearch!:boolean;
  searchuserpermission:UserPermission[];
  uid!:any;
  
  constructor(private userpermissionService: UserpermissionService,
    private userService:UserService,
    private tokenService:TokenService,
    public fb: FormBuilder,
    private datePipe: DatePipe) {
     this.userslist = [];
     this.permissionSearch = fb.group({
      userName:[''],
      createdstartAt:[''],
      createdendAt:['']
    })
  }

 ngOnInit() {
    // this.userpermission.getUsers().then(users => this.userP = users);
    // Get all users
    this.userService.getallUsers().subscribe((data:any[])=>{
    this.userslist =data;
    this.userslist = this.userslist.filter(res => {return res.roles ==="Normal User"})
    // console.log(this.userslist)
    
    });
    this.uid = this.tokenService.getUid();
 }
 selected(){
  // console.log(this.selectedUser)
}
searchPermission()
{
  const usernameSelected =this.permissionSearch.controls['userName'].value;
  if(usernameSelected){
this.userPermission.userName = this.permissionSearch.controls['userName'].value;
  }else{
    let d = this.permissionSearch.controls['createdstartAt'].value;
  let dc =  d.setDate(d.getDate());
  this.userPermission.createdstartAt = this.datePipe.transform(dc,"yyyy-MM-dd");
 
  let da = this.permissionSearch.controls['createdendAt'].value;
  let de =  da.setDate(da.getDate());
  this.userPermission.createdendAt = this.datePipe.transform(de,"yyyy-MM-dd");
  
  }
  

  
  this.userPermission.uid = this.uid;
  this.sendToDb(this.userPermission);
  this.permisssionSearch = true;
  this.sendSearchStatus(this.permisssionSearch);
 
  }

  // Send perticular usesr data to server for serching users permission by using searchUserPermission API
  sendToDb(data:any)
  {
    setTimeout(()=>{this.userpermissionService.searchUserPermission(data).subscribe((data:any) =>{
      // console.log(data)
    this.searchuserpermission = data;

    if(data){
      this.sendSearchData(this.searchuserpermission);

    }

     })},3000);
     
    
    }

  // Send search status to the user permission service
  sendSearchStatus(status:any)
  {
    this.userpermissionService.sendSearchStatus(status);
  }

  // Send search data to the user permission Service
  sendSearchData(data:any)
  {
    this.userpermissionService.sendSearchData(data);
  }


}
