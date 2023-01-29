import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import {SidenavEventsService} from '../../shared/sidenav-events.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditprofileService } from 'src/app/services/editprofile.service';
import { User } from 'src/app/model/userlist.model';
import { checkMatchValidator } from 'src/app/shared/Validators';
import {Message,MessageService, PrimeNGConfig} from 'primeng/api';

export interface EditProfile{ 
  id?:any,
  username?:string,
  password?:any,
  confirm_password?:any
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  editModel:EditProfile = {};
  msg:Message[];
  toogleIconchange = false; 
  username!:any;
  role!:any;
  submitted=false;
  editProfile: FormGroup;
  hide = true;
  editProfileDialog?: boolean;
  password!:any;
  confirmPassword!:any;
  uniquId!:any;

  constructor(
    private sharedNavbarEvent:SidenavEventsService,
    private auth:AuthService,
    private tokenser:TokenService,
    private router:Router,
    public fb: FormBuilder,
    private editprofileService: EditprofileService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
    ) { 
      this.editProfile = fb.group({
        username:['',Validators.required],
        password:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]],
        confirm_password:['',Validators.required],
      },
      {validator: checkMatchValidator('password', 'confirm_password')}
      )
    }

  ngOnInit(): void {
   this.username = this.tokenser.getname();
   this.role = this.tokenser.getRole();
if(this.role === 'Normal User'){
  this.role ='Analyst'
}

   this.uniquId = this.tokenser.getUid();
  }

  toggleSideNav(){
    this.sharedNavbarEvent.sendClickEvent();
    this.toogleIconchange=true;
    }


    logout(event:MouseEvent){
       //  event.preventDefault();
        this.tokenser.remove();
        this.auth.changeAuthStatus(false);
        this.router.navigate(['/signin'])

    }

    updatePassword(){
      this.editProfileDialog = true;
     }

     hideDilog() {
      this.editProfileDialog = false;
      this.submitted = false;
     // this.editProfile.reset();
      this.editProfile.controls['password'].reset();
      this.editProfile.controls['confirm_password'].reset();
    }

    editUserProfile(){
      this.submitted = true;
      this.editModel.id = this.uniquId;
      this.editModel.username = this.editProfile.controls['username'].value;
     
      this.editModel.password = this.editProfile.controls['password'].value;
     
      this.editModel.confirm_password = this.editProfile.controls['confirm_password'].value;
      // console.log(this.editModel);

      this.editprofileService.editProfile(this.editModel).subscribe(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Password updated',life: 3000}),console.log(response);
       // console.log(profiledata);
        },
        error => this.messageService.add({severity:'error', summary: 'error', detail: 'Something went wrong please, try again.', life: 3000})
       )
       this.editProfileDialog = false;
      }
  

}
function handelError(error: any, any: any) {
  throw new Error('Function not implemented.');
}

