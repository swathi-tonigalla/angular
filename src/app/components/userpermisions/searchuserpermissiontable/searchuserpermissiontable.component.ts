import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { UserP, UserPermission } from 'src/app/model/userpermission.model';
import { Client } from 'src/app/model/usersclient.model';
import { TokenService } from 'src/app/services/token.service';
import { UserpermissionService } from 'src/app/services/userpermission.service';
import { UsersClientService } from 'src/app/services/users-client.service';

@Component({
  selector: 'app-searchuserpermissiontable',
  templateUrl: './searchuserpermissiontable.component.html',
  styleUrls: ['./searchuserpermissiontable.component.css']
})
export class SearchuserpermissiontableComponent implements OnInit {
  userPermissions:UserP[];
  userP:UserP[] = [];
  userPermission:UserP = {};
  userpObject:UserP = {};
 
  msg:Message[];
  clientArray:any[];

  users: UserP[];    
  user?:UserP;
  first = 0;
  rows = 10;
  userDialog?: boolean;
  permissions: FormGroup;
  selectedUser!:string;
  ch1!:boolean;
  ch2!:boolean;
  ch3!:boolean;
  uniquId!:any;
  audit_report!:boolean;
  userPermissionDialog?: boolean;
  editpermissionvar?:any;
  sourceClient: Client[];
  targetClient: Client[];
  checkbox1 !:string;
  checkbox2 !:string;
  checkbox3 !:string;
  instrumentDestination!:any;
  auditReport!:any;
  loadProject!:any;
  searchuserpermissionData:any[] = [];
  instrumentDestinationtxt !:string;
  auditReporttxt !:string;
  loadProjecttxt !:string;
  isLoading:boolean = false

  constructor(private userpermissionService: UserpermissionService,
    fb: FormBuilder,
    private messageService: MessageService,
    private tokenser:TokenService,
    @Inject(DOCUMENT) private document: Document,
    private clientService: UsersClientService) {
      this.users = [];  
     this.targetClient = [];
     this.sourceClient = []; 
     this.permissions = fb.group({
      instrument_destination: [false],
      audit_report: [false],
      load_project: [false],
      });
     }

  ngOnInit(): void {
    //   setTimeout(()=>{
      this.isLoading = true;
     let progressSpinSearch = document.getElementById("progressSpinSearch");
     progressSpinSearch.style.display='flex'
      //  console.log( this.isLoading)
      this.userpermissionService.getSearchData.subscribe((response:any) =>{
        // console.log(response)
       
     
        this.searchuserpermissionData = response;
        if(this.searchuserpermissionData){
            this.isLoading = false;
          progressSpinSearch.style.display='none'
        }
      
       });
  //  },2000);
    
    // Get all clients
     this.clientService.getallClients().subscribe((data:any[])=>{
    this.sourceClient =data;
   });
    
   // Get users id
   this.uniquId = this.tokenser.getUid();

   // Get perticular users permission
  this.userpermissionService.getPerticularUserPermission(this.uniquId).subscribe((data) =>{
     this.userpObject = data.permission;
 
  });
  
  // console.log("iam from search table")
  }
next() {
    this.first = this.first + this.rows;
}
prev() {
    this.first = this.first - this.rows;
}
reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.users ? this.first === (this.users.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
}

// Edit users permission
editUserPermission(userPermission)
{
  let modletxt = document.getElementById("modletxt_"+userPermission.unique_id);
      let txt_ = document.getElementById("txt_"+userPermission.unique_id);
      let modletxtar = document.getElementById("modletxtar_"+userPermission.unique_id);
      let txtar_ = document.getElementById("txtar_"+userPermission.unique_id);
      let modletxtlp = document.getElementById("modletxtlp_"+userPermission.unique_id);
      let txtlp_ = document.getElementById("txtlp_"+userPermission.unique_id);
  
  this.userPermissionDialog = true;
  this.userPermission = userPermission;

  // Get all clients
  this.clientService.getallClients().subscribe((data:any[])=>{
    this.sourceClient =data;
   });
   
   if(this.userPermission.instrument_destination.toString() === "Yes")
   {
     this.userPermission.instrument_destination = true
   }
   else
   {
     this.userPermission.instrument_destination = false
   }
   if(this.userPermission.audit_report.toString() === "Yes")
   {
     this.userPermission.audit_report = true
   }
   else
   {
     this.userPermission.audit_report = false
   }
   if(this.userPermission.load_project.toString() === "Yes")
   {
     this.userPermission.load_project = true
   }
   else
   {
     this.userPermission.load_project = false
   }
   if( this.userPermission.instrument_destination)
       {
        modletxt.style.display ='none';
        txt_.style.display ='block';
        this.instrumentDestinationtxt ="Yes";
        }
       else{
        modletxt.style.display ='none';
        txt_.style.display ='block';
        this.instrumentDestinationtxt ="No";
        }
       if(this.userPermission.audit_report)
       {
        modletxtar.style.display ='none';
        txtar_.style.display ='block';
        this.auditReporttxt ="Yes";
       }
       else{
        modletxtar.style.display ='none';
        txtar_.style.display ='block';
        this.auditReporttxt ="No";
        }
       if( this.userPermission.load_project)
       {
        modletxtlp.style.display ='none';
        txtlp_.style.display ='block';
        this.loadProjecttxt ="Yes";
        }
       else{
        modletxtlp.style.display ='none';
        txtlp_.style.display ='block';
        this.loadProjecttxt ="No";
        }

}


// Submit users permission to the server
submitPermission()
{

this.userPermission.instrument_destination = this.permissions.value.instrument_destination;
this.userPermission.audit_report = this.permissions.value.audit_report;
this.userPermission.load_project = this.permissions.value.load_project;
this.selectClient();

let modletxt = document.getElementById("modletxt_"+this.userPermission.unique_id);
      let txt_ = document.getElementById("txt_"+this.userPermission.unique_id);
      let modletxtar = document.getElementById("modletxtar_"+this.userPermission.unique_id);
      let txtar_ = document.getElementById("txtar_"+this.userPermission.unique_id);
      let modletxtlp = document.getElementById("modletxtlp_"+this.userPermission.unique_id);
      let txtlp_ = document.getElementById("txtlp_"+this.userPermission.unique_id);

if(this.clientArray)
{
    this.userPermission.clients = this.clientArray;
}

// Submit users permission to the server by using addUserPermission API
this.userpermissionService.addUserPermission(this.userPermission).subscribe(
  (response) => {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Permission set successfully',life: 3000}),console.log(response);
    setTimeout(()=>{
      const currentRoute = 'userpermissions';
      this.document.location.href = currentRoute;
     },500)
  },
 error => this.messageService.add({severity:'error', summary: 'error', detail: 'Something went wrong please, try again.', life: 3000})
 )
 this.userPermissionDialog = false;

 if( this.userPermission.instrument_destination)
    {
     modletxt.style.display ='none';
     txt_.style.display ='block';
     this.instrumentDestinationtxt ="Yes";
     }
    else{
     modletxt.style.display ='none';
     txt_.style.display ='block';
     this.instrumentDestinationtxt ="No";
     }
    if(this.userPermission.audit_report)
    {
     modletxtar.style.display ='none';
     txtar_.style.display ='block';
     this.auditReporttxt ="Yes";
    }
    else{
     modletxtar.style.display ='none';
     txtar_.style.display ='block';
     this.auditReporttxt ="No";
     }
    if( this.userPermission.load_project)
    {
     modletxtlp.style.display ='none';
     txtlp_.style.display ='block';
     this.loadProjecttxt ="Yes";
     }
    else{
     modletxtlp.style.display ='none';
     txtlp_.style.display ='block';
     this.loadProjecttxt ="No";
     }
  }

  // Close user permission dialog
closeDialog()
{
  this.cancelClient();
  this.userPermissionDialog = false;
  const currentRoute = 'userpermissions';
  this.document.location.href = currentRoute;
}
selectClient()
{
  this.clientArray = this.targetClient;
  this.targetClient = [];
  this.userDialog = false;
}
cancelClient()
{
  this.targetClient = [];
}

// This function is for instrument destination checkbox
changeInstrumentDestination(eve:any,id:any){
  let txtId = document.getElementById("txt_"+id);
  let modletxt = document.getElementById("modletxt_"+id)
  if(eve){
    this.instrumentDestinationtxt ="Yes"
    txtId.style.display='block';
    modletxt.style.display ='none'
  }else{
    this.instrumentDestinationtxt ="No"
  }
  // console.log(id)
}

 // This function is for audit report checkbox
changeAuditReport(eve:any,id:any){
 let txtId = document.getElementById("txt_"+id);
  let modletxt = document.getElementById("modletxt_"+id)
  if(eve){
    this.auditReporttxt ="Yes"
    txtId.style.display='block';
    modletxt.style.display ='none'
  }else{
    this.auditReporttxt ="No"
  }
  // console.log(id)
}
 
// This function is for load project checkbox
change(eve:any,id:any){
  let txtId = document.getElementById("txt_"+id);
  let modletxt = document.getElementById("modletxt_"+id)
  if(eve){
    this.loadProjecttxt ="Yes"
    txtId.style.display='block';
    modletxt.style.display ='none'
  }else{
    this.loadProjecttxt ="No"
  }
  // console.log(id)
}

}
