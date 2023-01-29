import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SidenavEventsService } from '../../shared/sidenav-events.service';
import { LoginService } from '../../services/login.service';
import { ForgotPassword, User } from '../../model/user.model';
import { TokenService } from 'src/app/services/token.service';
import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import { UserpermissionService } from 'src/app/services/userpermission.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [MessageService]
})
export class SigninComponent implements OnInit {

  forgotPasswordModel:ForgotPassword = {};
  uniquId!:any;
  user!: User[];
  userinfo!: User;
  signForm: FormGroup;
  islogin!: boolean;
  public error = null;
  msgs1!: Message[];
  loading!: boolean;
  forgotPassword: FormGroup;
  forgotPasswordDialog?: boolean;
  submitted=false;
  isForgetPassword?:boolean;
  msg:Message[];
 sendclientData!:any;
  
  constructor(
    private router: Router,
    private sharedNavbarEvent: SidenavEventsService,
    private fb: FormBuilder,
    private loginserveice: LoginService,
    private tokenServ: TokenService,
    private auth: AuthService,
    private forgotpasswordService:ForgotpasswordService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private userpermissionService: UserpermissionService,
  ) {
    this.signForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    })
    this.userinfo = {}
    this.islogin = false
    this.loading = false

    this.forgotPassword = fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      
    })
  }

  ngOnInit() {
    this.uniquId = this.tokenServ.getUid();
   // console.log(this.uniquId);
   this.isForgetPassword = false;
 
  }

  submit() {

    this.loginserveice.loginService(this.signForm.value).subscribe(
      (logindata: any) => {
          // console.log(logindata);
        this.handelResponse(logindata);
        this.getUsername(logindata);
        this.getRole(logindata);
        this.getUid(logindata);
        this.setPermission(logindata)
          this.sendclientData = logindata.permission.selectedClient
          this.userpermissionService.sendppermissionforClient(this.sendclientData)
        
      },
      error => this.handelError(error)

    )
  }


  handelResponse(logindata: any) {
    this.tokenServ.handel(logindata.Token);
    this.auth.changeAuthStatus(true);
    this.sharedNavbarEvent.sendClickEvent();
    this.router.navigate(['/homeIndex'])
  }

  handelError(error: any) {
    this.error = error.error.error;
    this.msgs1 = [
      { severity: 'error', summary: 'Error', detail: 'Email and Password Doesn\'t Exist' }
    ]
  }

  getUsername(data: any) {
    this.tokenServ.getlogin(data.name)
  }
  getRole(role: any) {
    this.tokenServ.getLoginRole(role.roles)
  }

  passwordForget() {
    this.forgotPasswordDialog = true;
    this.isForgetPassword = true;
  }

  updatePassword() {
    this.forgotPasswordDialog = false;
  }
  getUid(uid:any)
  {
    this.tokenServ.getUserId(uid.unique_id);
  }

  hideDilog() {
    this.forgotPasswordDialog = false;
    this.submitted = false;
    this.forgotPassword.reset();
    this.isForgetPassword = false;
    
  }

  forgotPasswordFunction(){
    
    this.submitted = true;
    document.getElementById("progressForgetPassowrd_sepec").style.display = "flex"
    document.getElementById("forgetPanel").style.display = "none"
    
   // this.forgotPasswordModel.id = this.uniquId;
  // console.log(this.forgotPasswordModel.id);
   this.forgotPasswordModel.email = this.forgotPassword.controls['email'].value;
  //  console.log(this.forgotPasswordModel.email);

    this.forgotpasswordService.forgotPassword(this.forgotPasswordModel).subscribe(
      (response) => {
        // console.log(response);

        if(response.message === 'Check your inbox, we have sent a link to reset email.'){
          this.msgs1 = [
            { severity: 'success', detail: response.message,life: 3000 }
           
          ]
          this.isForgetPassword = false;
          document.getElementById("progressForgetPassowrd_sepec").style.display = "none"
          document.getElementById("forgetPanel").style.display = "block"
        }
     
        
        // this.messageService.add({severity:'success', summary: 'Success', detail: 'Email submitted successfully',life: 3000})
     },
       error =>{
       if(error){
        document.getElementById("progressForgetPassowrd_sepec").style.display = "none"
        document.getElementById("forgetPanel").style.display = "block"
       }
      this.msgs1 = [
        { severity: 'error', detail: error.error.message,life: 3000 }
       
      ]
    

  }
    )

    // 
    
  }
  setPermission(data:any)
  {
 //  this.tokenServ.setUserPermission(data.permission);
    this.userpermissionService.sendPermisssion(data.permission);
  }
  
 
}
