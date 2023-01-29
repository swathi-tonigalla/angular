import { Component, OnInit } from '@angular/core';
import { UserInfo } from './UserInfo';
import { UserService } from '../../model/user.service';
// import { UserService } from './user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users:UserInfo={
    Name:'',
    Email:'',
    Password:'',
    Roles:''
  }
  user: UserInfo | undefined;
  
  
  roles: any[]= [
    {value:'Admin', viewValue:'Admin'},
    {value:'Normal', viewValue:'Normal-user'}
  ];

  constructor(private userService:UserService) { }
  ngOnInit(): void {

    
  }

  
  addUser(formobj: any)
  {
   return this.userService.post(this.users).subscribe(data=>{
      this.user=data;
      
    })
  }


 


}
function addUser(_user: any) {
  throw new Error('Function not implemented.');
}

