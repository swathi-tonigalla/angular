import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from "@angular/forms";
import{Client} from '../../model/usersclient.model';
import{UsersClientService} from '../../services/users-client.service'; 
import {Message,MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import{CustomDateFormatPipe} from '../../shared/custom-date-format.pipe'

export interface DeleteAllClients{
  ids?:any[];
}
@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css'],
  providers:[MessageService,ConfirmationService,CustomDateFormatPipe],
 
})
export class ClientManagementComponent implements OnInit {

  //clients:Client[];
  clients:any[]
  client!:Client;
  clientDilog?: boolean;
  submitted=false;
  clientRegistration:FormGroup;
  selectedClient : Client[];
  msg:Message[];
  searchValue?:string;
  status?:string;
  router: any;
  checkedIDs:any[];
  idaArray:any[];
  selectedId:DeleteAllClients = {};
  selectAll:boolean = false;

  constructor(
    public clientservice:UsersClientService, 
    public fb: FormBuilder,private messageService: MessageService,
    private primengConfig: PrimeNGConfig,private confirmationService: ConfirmationService, private customdtFormat:CustomDateFormatPipe
    ) 
    {
     this.clients =[];
    this.selectedClient =[];
    this.msg =[];
    this.clientRegistration = fb.group({
      id:'',
      clientName:['',Validators.required],
      remarks:['',Validators.required]

    })
    
   }

  ngOnInit(): void {
    this.clientservice.getallClients().subscribe((data:any[])=>{
      this.clients =data;
      // console.log(this.clients)

    });
    this.primengConfig.ripple = true;
     this.checkedIDs = [];
  }

  newClient() {
    this.client = {};
    if(!this.clientDilog){
        this.clientRegistration.reset()
    }
    this.clientDilog = true;
    this.submitted = false;

  }
 
  onSubmit() {
    this.submitted = true;
  
        if(this.client.clientName?.trim()){
          if(this.client.id){
            this.clients[this.findIndexById(this.client.id)] = this.client; 
            this.onUpdateOnClient(this.client);
            this.onUpdateOnClientJSON(this.client);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Client Updated', life: 3000});
          }
          else {         
            this.client.id = this.createId();
            this.client.clientName = this.clientRegistration.controls['clientName'].value
            this.client.remarks = this.clientRegistration.controls['remarks'].value
            this.client.createdAt = Date.now();
            this.clients.push(this.client);
              // console.log(this.client)
           this.sendToserver(this.client);
             this.sendToserverjson(this.client);    
        }
        this.clients = [...this.clients];  
        this.clientDilog =false;
        
        this.client = {};
      }
    
        setTimeout(()=>{
        this.clientservice.getallClients().subscribe((data:any[])=>{
          this.clients =data;
          // console.log(this.clients)
    
        });
        },1000)
  
  }

     sendToserver(clientData:Client){
       this.clientservice.addClient(clientData).subscribe(
          response => {
           this.messageService.add({severity:'success', summary: 'Success', detail: 'New client added',life: 3000}),console.log(response);
          //  this.client = response
            this.hideDilog()
          },
          error => {this.messageService.add({severity:'error', summary: 'Error', detail: 'The client name is already exist',life: 3000}),console.error(error);
          }
        );
     }

       sendToserverjson(clientData:Client){
       this.clientservice.addClienttojson(clientData).subscribe(
          response => {
            // this.messageService.add({severity:'success', summary: 'Success', detail: 'New client added',life: 3000}),console.log(response);
            // this.client = response
            this.hideDilog()
          },
          // error => {this.messageService.add({severity:'error', summary: 'Error', detail: 'The client name is already exist',life: 3000}),console.error(error);
          // }
        );
     }



  onUpdateOnClient(client: Client) {
    this.clientservice.updateClient(client).subscribe(
      () => this.status = 'Update successful in DB'
    )
  }

  onUpdateOnClientJSON(client: Client) {
    this.clientservice.updateClientJSON(client).subscribe(
      () => this.status = 'Update successful in JSON'
    )
  }


   editClients(client: Client) {
    this.client = {...client};
    this.clientDilog = true;
    // console.log(this.client)
  }


  deleteClient(client: Client) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + client.clientName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if(client.id != undefined){
            const findID = client["id"]
            // console.log(findID);
            this.ondeletCLient(findID);
            this.ondeletCLientJSON(findID);
          }
          this.clients = this.clients.filter(val => val.id !== client.id);
          this.client = {};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Client Deleted', life: 3000});
        }
    });
}

  ondeletCLient(id: string) {
    this.clientservice.deleteClient(id).subscribe(
      () => this.status = 'Delete successful from server'
    )
  }

  ondeletCLientJSON(id: string) {
    this.clientservice.deleteClientJSON(id).subscribe(
      () => this.status = 'Delete successful'
    )
  }

deleteSelectedClients(){
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected Clients?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      if(this.selectAll){
        this.clients = this.clients.filter(val => !this.checkedIDs[0].includes(val));
        this.idaArray = this.checkedIDs[0].map(ids =>ids.id);
      }
      else{
        this.clients = this.clients.filter(val => !this.checkedIDs.includes(val));
        this.idaArray = this.checkedIDs.map(ids =>ids.id);
        }
      this.selectedId.ids = this.idaArray;
        this.onDeleteSelectedClients(this.selectedId);
       //  this.checkedIDs = [];
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Selected Clients are deleted', life: 3000});
     }
});
}
  

 onDeleteSelectedClients(ids:any){
     this.clientservice.deleteSelectedclients(ids).subscribe(
       () => this.status = 'Selected Client is deleted'
      )
  }


    hideDilog() {
      this.clientDilog = false;
      this.submitted = false;
      this.clientRegistration.reset();
    }

    findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.clients.length; i++) {
          if (this.clients[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  changeSelection(clients:Client)
  {
    this.checkedIDs.push(clients);
  }
 
  changeAllSelectedClients(event)
  {
    this.checkedIDs.push(this.clients);
    if(this.selectAll === true){
      this.clients.map((val)=>{
        val.checked=true;
      });

    }else {
      this.clients.map((val)=>{
        val.checked=false;
      });
    }
  }

  space(event:any) {
    if(event.target.selectionStart === 0  && event.code === "Space"){
      event.preventDefault();
    }
  }
}
