import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Destinations } from 'src/app/model/DestinationManage.model';
import { DestinationManagementService } from 'src/app/services/destination-management.service';
import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CustomDateFormatPipe } from '../../shared/custom-date-format.pipe'
import { Client } from 'src/app/model/usersclient.model';
import { UsersClientService } from 'src/app/services/users-client.service';
import { UploadFilesService } from 'src/app/services/fileUpload.service';
import { UserpermissionService } from 'src/app/services/userpermission.service';
import { TokenService } from 'src/app/services/token.service';
import { DOCUMENT } from '@angular/common';
//import * as XLSX from 'xlsx'
export interface DeleteAllDestinations {
  ids?: any[];
}
@Component({
  selector: 'app-instrument-destination',
  templateUrl: './instrument-destination.component.html',
  styleUrls: ['./instrument-destination.component.css'],
  providers: [MessageService, ConfirmationService, CustomDateFormatPipe],
})
export class InstrumentDestinationComponent implements OnInit {
  // users?:string;
  destinationDilog?: boolean;
  multiple?: boolean;
  destinationForm: FormGroup;
  uploadedFiles: any[] = [];
  submitted = false;
  destinations: Destinations[] = [];
  destination!: Destinations;
  msg: Message[];
  selectedClientdrp!: Client;
  clients!: Client[];
  client!: Client;
  status?: string;
  isEdit?: boolean;
  selectedDestination: Destinations[];
  instrumentData?: any;
  isUpdate!: boolean;
  isEditInstAdd!: boolean;

  deleteDisabled!: boolean;

  selectedClientForUser!: any;
  destinationStatus!: any;

  instEditAddset!: any;
  isnormalUSer!: boolean;

  role!: any
  checkedIDs: any[];
  idaArray: any[];
  selectedId: DeleteAllDestinations = {};
  selectAll: boolean = false;
  addBtnType = false
  isProjectNameExists = false;
  isEditMode: boolean = false;
  isEditModeEnable: boolean = false;
  isUpdateNewInstrument: boolean = false;
  updateMode!: boolean;
  constructor(
    public fb: FormBuilder,
    private messageService: MessageService,
    private destinationService: DestinationManagementService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private customdtFormat: CustomDateFormatPipe,
    private clientService: UsersClientService,
    private fileup: UploadFilesService,
    private upser: UserpermissionService,
    private tokenser: TokenService,
    @Inject(DOCUMENT) private document: Document,

  ) {
    //  this.destinations =[];
    this.msg = [];
    this.instEditAddset = [];
    this.selectedDestination = [];
    this.destinationForm = fb.group({
      destinationName: ['', Validators.required],
      selectedClientName: ['', Validators.required],
      insrtumentTypes: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.destinationService.getAllDestinations().subscribe(
      destinationData => this.destinations = destinationData
    );
    this.getClientList();
    this.primengConfig.ripple = true;
    this.isEdit = false;

    // if(this.destination.instruments.length > 0){
    //   this.addBtnType=  true;
    // }
    // else{
    //   this.addBtnType=  false;
    // }
    this.fileup.instmsg.subscribe(instrumentData => {
      this.instrumentData = instrumentData
      // console.log(this.instrumentData);
    })
    this.fileup.destiStats.subscribe(
      status => {
        this.destinationStatus = status
        // console.log(this.destinationStatus)
      }
    );

    this.role = this.tokenser.getRole();
    if (this.role === 'Normal User') {
      this.isnormalUSer = true
    }
    else {
      this.isnormalUSer = false
    }
    this.upser.getseleclient.subscribe(res => {

      this.selectedClientForUser = res;

      //  const obj =  this.selectedClientForUser.split(',') 
      // console.log( obj)
      // console.log(this.selectedClientForUser )

    })
    this.checkedIDs = [];
  }

  instrumentTypes(): FormArray {
    return this.destinationForm.get("insrtumentTypes") as FormArray
  }


  newInstType(): FormGroup {
    return this.fb.group({
      instrumentTypename: ['', Validators.required]
    })
  }

  addInstrumentType() {
    this.instrumentTypes().push(this.newInstType());
    if (this.isUpdate) {
      this.isEditInstAdd = true
    }
  }

  removeInstrumentType(i: number) {
    this.instrumentTypes().removeAt(i);
  }



  getClientList() {
    this.clientService.getallClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }


  onUpload(event: any) {
    this.multiple = true;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      // console.log("working")
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  onUploadtest(event: any) {

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });


  }

  newDestination() {
    this.destination = {};

    if (this.instrumentTypes().length >= 0) {
      this.instrumentTypes().reset();
    }

    if (this.instrumentTypes().length == 0) {
      this.addInstrumentType();

    }
    // console.log (this.instrumentTypes())
    if (!this.destinationDilog) {
      this.destinationForm.reset();
    }
    this.destinationDilog = true;
    this.submitted = false;
    this.isUpdate = false;
    //This is for new instrument dialog hence, isUpdateNewInstrument is false
    this.isUpdateNewInstrument = false;
  }

  hideDilog() {
    this.destinationDilog = false;
    this.submitted = false;
    this.destinationForm.reset();
    // this.instrumentTypes().reset();
  }

  deleteType(id: number) {

    this.destination.insrtumentTypes = this.destination.insrtumentTypes.filter((v, i) => i !== id);
  }

  onSubmit() {
    this.submitted = true;

    if (this.destination.destinationName?.trim()) {
      if (this.destination.id) {

        this.destinations[this.findIndexById(this.destination.id)] = this.destination;
        this.destination.destinationName = this.destinationForm.controls['destinationName'].value;
        if (this.isEditInstAdd) {
          this.instEditAddset = this.destinationForm.controls['insrtumentTypes'].value
          // console.log(this.instEditAddset)
          this.destination.insrtumentTypes = [...this.destination.insrtumentTypes]
          this.destination.insrtumentTypes = this.destination.insrtumentTypes.concat(this.instEditAddset);
          // console.log(this.destination.insrtumentTypes)

        }

        this.onUpdateOnDestinationsJSON(this.destination);
        this.onUpdateOnDestinations(this.destination);
        this.isEditMode = false
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Destination is updated', life: 3000 });
        setTimeout(() => {
          const currentRoute = 'instrumentDestination';
          this.document.location.href = currentRoute;
        }, 2000)

      }

      else {
        this.destination.instruments = this.instrumentData;
        this.destination.insrtumentTypes = this.destinationForm.controls['insrtumentTypes'].value;
        // console.log( this.destination.insrtumentTypes)


        // this.destination.insrtumentTypes = [{instrumentTypename:["TRS"]}];
        this.destination.destinationName = this.destinationForm.controls['destinationName'].value;
        this.destination.selectedClientName = this.destinationForm.controls['selectedClientName'].value;

        this.destination.createdAt = Date.now();
        this.destination.id = this.createId();

        this.destinations.push(this.destination);
        // console.log(this.destinations);
        this.sendToJSONserver(this.destination);
        this.sendToserver(this.destination);
      }
      this.destinations = [...this.destinations];
      this.destinationDilog = false;
      this.destinationStatus = false;
      this.destination = {};
      this.instrumentTypes().reset();

      this.fileup.clearFiles().subscribe(res => {
        // console.log(res)
      });
      this.fileup.clearJsonFiles().subscribe(res => {
        // console.log(res)
        this.isEditMode = false
      });
    }
  }

  onUpdateOnDestinations(destination: Destinations) {
    this.destinationService.updateDestination(destination).subscribe(
      () => this.status = 'Update successful'
    )
  }

  onUpdateOnDestinationsJSON(destination: Destinations) {
    this.destinationService.updateDestinationJSON(destination).subscribe(
      () => this.status = 'Update successful'
    )
  }


  sendToserver(destination: Destinations) {
    this.destinationService.addDestination(destination).subscribe(
    );
  }

  sendToJSONserver(destination: Destinations) {
    this.destinationService.addDestinationJSON(destination).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New Destination added', life: 3000 })
        //  console.log(response);
        //this.client = response
        this.hideDilog()
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somthing went wrong at server,data is not updated to server please try again!', life: 3500 }), console.error(error);
      }
    );
  }




  editDestination(destination: Destinations) {
    this.isEditMode = true
    this.destination = { ...destination };
    this.destinationDilog = true;
    this.isUpdate = true;
    // this.instrumentTypes() 
    this.isEditModeEnable = true;
    this.instrumentTypes().controls = []
    // console.log(this.destination)
    // Because of this is update destination, hence it is true
    this.isUpdateNewInstrument = true;
  }



  deleteDestination(destination: Destinations) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + destination.destinationName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (destination.id) {
          const findID = destination["id"]
          // console.log(findID)
          this.OnDeleteDestination(findID);
          this.OnDeleteDestinationJSON(findID);
        }
        this.destinations = this.destinations.filter(val => val.id !== destination.id);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Destination Deleted', life: 3000 });
      }
    });
  }

  OnDeleteDestination(id: string) {
    this.destinationService.deleteClient(id).subscribe(
      () => this.status = 'Delete successful from server'
    )
  }

  OnDeleteDestinationJSON(id: string) {
    this.destinationService.deleteClientJSON(id).subscribe(
      () => this.status = 'Delete successful from JSON'
    )
  }

  deleteSelectedDestinations() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectAll) {
          this.destinations = this.destinations.filter(val => !this.checkedIDs[0].includes(val));
          this.idaArray = this.checkedIDs[0].map(ids => ids.id);
        }
        else {
          this.destinations = this.destinations.filter(val => !this.checkedIDs.includes(val));
          this.idaArray = this.checkedIDs.map(ids => ids.id);
        }
        this.selectedId.ids = this.idaArray;
        this.onDeleteSelectedDestinations(this.selectedId);
        //  this.checkedIDs = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Selected Destinations are deleted', life: 3000 });
      }
    });
  }

  onDeleteSelectedDestinations(ids: any) {
    this.destinationService.deleteSelectedDestinations(ids).subscribe(
      () => this.status = 'Selected Destination is deleted'
    )
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
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }


  onDivClick() {
    this.destination.instruments.every(
      val => val.toggleCheck = false
    )
  }


  space(event: any) {
    if (event.target.selectionStart === 0 && event.code === "Space") {
      event.preventDefault();
    }
  }
  changeSelection(destination: Destinations) {
    this.checkedIDs.push(destination);

  }

  changeAllSelectedDestination(event) {
    this.deleteDisabled = !this.deleteDisabled
    this.checkedIDs.push(this.destinations);
    if (this.selectAll === true) {
      this.destinations.map((val) => {
        val.checkedDestination = true;
      });

    } else {
      this.destinations.map((val) => {
        val.checkedDestination = false;
      });
    }
  }

  OnchangeDestinationName(destinationName: any, Dname: any) {

    const name = (<HTMLInputElement>destinationName.target).value
    let destinationNameExists = document.getElementById("destNameExists");

    destinationNameExists.innerText = "";
    this.isProjectNameExists = false;
    //Enable save button for new and edit box.
    this.updateMode = false;
    // let saveButton = document.getElementById("");

    this.destinations.filter(el => {
      if (el.destinationName == name || el.destinationName == name.toLowerCase() || el.destinationName == name.toUpperCase()) {
        this.isProjectNameExists = true;
        //  console.log('exists')
        destinationNameExists.innerText = "Destination name already exists";
        destinationNameExists.style.display = 'block';
        destinationNameExists.style.color = 'tomato';
        destinationNameExists.style.position = 'absolute';
        destinationNameExists.style.top = '65px';
        this.updateMode = true;
      }
      if (el.destinationName.length != name.length) {
        if (this.isProjectNameExists) {
          if (!Dname || Dname === '') {
            destinationNameExists.style.display = 'none';
            destinationNameExists.innerText = ''
            this.isProjectNameExists = false
          }

        }
      }
    }
    )
  }
  //  onDestinationname(destinationName:any)
  //  {
  //  const isUserExists = this.destinations.some(({ destinationName }) => destinationName === destinationName);
  // console.log(isUserExists);

  // if (isUserExists) {
  //   console.log('Username already exists');
  //  } else {
  //   console.log('....');
  //  }
  // if(isUserExists)
  // {
  //   console.log('Username already exists');
  //   let destinationNameExists = document.getElementById("destNameExists");
  //   destinationNameExists.innerText="Destination name already exists";
  //   destinationNameExists.style.display='block';
  //   destinationNameExists.style.color='tomato';
  //   destinationNameExists.style.position='absolute';
  //   destinationNameExists.style.top='65px';  
  // }
  // else{
  //   console.log('...');
  //   let destinationNameExists = document.getElementById("destNameExists");
  //   destinationNameExists.innerText="Destination name available";
  //   destinationNameExists.style.display='block';
  //   destinationNameExists.style.color='green';
  //   destinationNameExists.style.position='absolute';
  //   destinationNameExists.style.top='65px';  
  // }
  //}

}
