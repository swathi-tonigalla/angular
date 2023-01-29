import { Component,Inject,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {SidenavEventsService} from '../../../../shared/sidenav-events.service'
import { TokenService } from '../../../../services/token.service';
import { AuthService } from '../../../../services/auth.service';
import { UserpermissionService } from 'src/app/services/userpermission.service';
import { DOCUMENT } from '@angular/common';
import { GlobalConstants } from 'src/app/shared/global.constants';

@Component({
  selector: 'app-sidenavlinks',
  templateUrl: './sidenavlinks.component.html',
  styleUrls: ['./sidenavlinks.component.css']
})
export class SidenavlinksComponent implements OnInit  {

  toggleSidebarNavEvent?:Subscription;
  classToggled = false;
  isAdmin!:boolean;
  isInstrumentDestination: boolean;
  isAuditReport: boolean;
  permission: any = {};
  role!:any;
  uid!:any;

  constructor(
    private sdnavservice:SidenavEventsService,
    private auth: AuthService,
    private token:TokenService,
    private userpermissionService:UserpermissionService,
    @Inject(DOCUMENT) private document: Document,
    ) {
      this.isAdmin =false
    this.toggleSidebarNavEvent =
    this.sdnavservice.getClickEvent().subscribe(()=>{
      this.toggleNameChange()
    })
  }


  ngOnInit() {
    //this.auth.authStatus.subscribe(value => this.islogin = value)
    this.role =this.token.getRole()
    this.roleCheck();
  //  this.permission = this.token.getUserPermission();
  //  this.userpermissionService.getPer.subscribe((data) =>{
  //    this.permission = data;
  //    console.log(this.permission);
  //  }
  //  )
   this.uid = this.token.getUid();
   
   this.userpermissionService.getPerticularUserPermission(this.uid).subscribe((data) =>{
     if(data){
      this.permission = data.permission;
     }
  
    // console.log(this.permission);
    if(this.permission.instrument_destination === 'Yes')
    {
      this.isInstrumentDestination = true;
      console.log(this.permission.instrument_destination);
    }
    else{
      this.isInstrumentDestination = false;
    }
    if(this.permission.audit_report === 'Yes')
    {
      this.isAuditReport = true;
    }
    else{
      this.isAuditReport = false;
    }

  }
  )
 
   // console.log(JSON.parse(this.permission));
  //  this.isInstrumentDestination = false;
  //  this.isAuditReport = false;

   
   

  }

  roleCheck(){
    if(this.role == 'Administrator'){
      this.isAdmin = true
    }
   
    else {this.isAdmin =false}
  }

  
  public toggleNameChange() {
    this.classToggled = !this.classToggled;  
  }

  dashboard(){
    const currentRoute = 'homeIndex';
    this.document.location.href = currentRoute;
  }

  clmanage(){
    const currentRoute = 'clientmanagement';
    this.document.location.href = currentRoute;
  }

  instDestination(){
    const currentRoute = 'instrumentDestination';
    this.document.location.href = currentRoute;
  }

  icconfig(){
    const currentRoute = 'instrumentConfiguration';
    this.document.location.href = currentRoute; 
  }

  userMan(){
    const currentRoute = 'usermanagement';
    this.document.location.href = currentRoute; 
  }

  userPer(){
    const currentRoute = 'userpermissions';
    this.document.location.href = currentRoute; 
  }

  auditReport(){
    const currentRoute = 'auditreport';
    this.document.location.href = currentRoute; 
  }

}
