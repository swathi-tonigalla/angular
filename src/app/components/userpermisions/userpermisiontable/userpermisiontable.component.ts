import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserpermissionService } from '../../../services/userpermission.service';
import { UserP } from '../../../model/userpermission.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';
import { UsersClientService } from 'src/app/services/users-client.service';
import { Client } from 'src/app/model/usersclient.model';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-userpermisiontable',
  templateUrl: './userpermisiontable.component.html',
  styleUrls: ['./userpermisiontable.component.css'],

})

export class UserpermisiontableComponent implements OnInit {
  userPermissions: UserP[];
  userP: UserP[] = [];
  userPermission: UserP = {};
  userpObject: UserP = {};

  msg: Message[];
  clientArray: any[];

  users: UserP[];
  user?: UserP;
  first = 0;
  rows = 10;
  userDialog?: boolean;
  permissions: FormGroup;
  selectedUser!: string;
  ch1!: boolean;
  ch2!: boolean;
  ch3!: boolean;
  uniquId!: any;
  audit_report!: boolean;
  userPermissionDialog?: boolean;
  editpermissionvar?: any;
  sourceClient: Client[];
  targetClient: Client[];
  checkbox1 !: string;
  checkbox2 !: string;
  checkbox3 !: string;
  instrumentDestination!: any;
  auditReport!: any;
  loadProject!: any;
  currentDate!: any;
  instrumentDestinationtxt !: string;
  auditReporttxt !: string;
  loadProjecttxt !: string;
  isLoading!: boolean

  constructor(private userpermissionService: UserpermissionService,
    fb: FormBuilder,
    private messageService: MessageService,
    private tokenser: TokenService,
    private clientService: UsersClientService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.users = [];
    this.targetClient = [];
    this.sourceClient = [];
    this.permissions = fb.group({
      instrument_destination: [false],
      audit_report: [false],
      load_project: [false],
    });
  }


  ngOnInit() {
    this.isLoading = true

    // Get All user's permissions
    this.userpermissionService.getAllUsersPermissions().subscribe((data) => {
      if (data) {
        this.isLoading = false
      }
      this.userPermissions = data;
      this.userPermissions = this.userPermissions.filter(res => { return res.primary_role === "Normal User" })

      // console.log( this.userPermissions);
      //  this.userPermissions.map(val => console.log(val.instrument_destination));
    })

    // Get all clients
    this.clientService.getallClients().subscribe((data: any[]) => {
      this.sourceClient = data;
    });
    this.uniquId = this.tokenser.getUid();

    // Get perticular user's permission
    this.userpermissionService.getPerticularUserPermission(this.uniquId).subscribe((data) => {
      if (data) {
        this.userpObject = data.permission;
      }
    })
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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

  // Edit users permission
  editUserPermission(userPermission) {
    console.log(userPermission)
    let modletxt = document.getElementById("modletxt_" + userPermission.unique_id);
    let txt_ = document.getElementById("txt_" + userPermission.unique_id);
    let modletxtar = document.getElementById("modletxtar_" + userPermission.unique_id);
    let txtar_ = document.getElementById("txtar_" + userPermission.unique_id);
    let modletxtlp = document.getElementById("modletxtlp_" + userPermission.unique_id);
    let txtlp_ = document.getElementById("txtlp_" + userPermission.unique_id);

    this.userPermissionDialog = true;
    this.userPermission = userPermission;

    // Get all clients
    this.clientService.getallClients().subscribe((data: any[]) => {
      this.sourceClient = data;
    });

    if (userPermission.instrument_destination.toString() === "Yes") {
      this.userPermission.instrument_destination = true;
    }
    else {
      this.userPermission.instrument_destination = false

    }
    if (userPermission.audit_report.toString() === "Yes") {
      this.userPermission.audit_report = true
    }
    else {
      this.userPermission.audit_report = false
    }
    if (userPermission.load_project.toString() === "Yes") {
      this.userPermission.load_project = true
    }
    else {
      this.userPermission.load_project = false;
    }

    if (this.userPermission.instrument_destination) {
      modletxt.style.display = 'none';
      txt_.style.display = 'block';
      this.instrumentDestinationtxt = "Yes";
    }
    else {
      modletxt.style.display = 'none';
      txt_.style.display = 'block';
      this.instrumentDestinationtxt = "No";
    }
    if (this.userPermission.audit_report) {
      modletxtar.style.display = 'none';
      txtar_.style.display = 'block';
      this.auditReporttxt = "Yes";
    }
    else {
      modletxtar.style.display = 'none';
      txtar_.style.display = 'block';
      this.auditReporttxt = "No";
    }
    if (this.userPermission.load_project) {
      modletxtlp.style.display = 'none';
      txtlp_.style.display = 'block';
      this.loadProjecttxt = "Yes";
    }
    else {
      modletxtlp.style.display = 'none';
      txtlp_.style.display = 'block';
      this.loadProjecttxt = "No";
    }

  }

  // Submit users permission to the server
  submitPermission() {
    this.userPermission.instrument_destination = this.permissions.value.instrument_destination;
    this.userPermission.audit_report = this.permissions.value.audit_report;
    this.userPermission.load_project = this.permissions.value.load_project;
    this.selectClient();

    let modletxt = document.getElementById("modletxt_" + this.userPermission.unique_id);
    let txt_ = document.getElementById("txt_" + this.userPermission.unique_id);
    let modletxtar = document.getElementById("modletxtar_" + this.userPermission.unique_id);
    let txtar_ = document.getElementById("txtar_" + this.userPermission.unique_id);
    let modletxtlp = document.getElementById("modletxtlp_" + this.userPermission.unique_id);
    let txtlp_ = document.getElementById("txtlp_" + this.userPermission.unique_id);

    if (this.clientArray) {
      this.userPermission.clients = this.clientArray;
    }

    // Submit users permission to the server by using addUserPermission API
    this.userpermissionService.addUserPermission(this.userPermission).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Permission set successfully', life: 3000 })
        setTimeout(() => {
          const currentRoute = 'userpermissions';
          this.document.location.href = currentRoute;
        }, 500)
      },
      error => this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something went wrong please, try again.', life: 3000 })
    );
    this.userPermissionDialog = false;

    if (this.userPermission.instrument_destination) {
      modletxt.style.display = 'none';
      txt_.style.display = 'block';
      this.instrumentDestinationtxt = "Yes";
    }
    else {
      modletxt.style.display = 'none';
      txt_.style.display = 'block';
      this.instrumentDestinationtxt = "No";
    }
    if (this.userPermission.audit_report) {
      modletxtar.style.display = 'none';
      txtar_.style.display = 'block';
      this.auditReporttxt = "Yes";
    }
    else {
      modletxtar.style.display = 'none';
      txtar_.style.display = 'block';
      this.auditReporttxt = "No";
    }
    if (this.userPermission.load_project) {
      modletxtlp.style.display = 'none';
      txtlp_.style.display = 'block';
      this.loadProjecttxt = "Yes";
    }
    else {
      modletxtlp.style.display = 'none';
      txtlp_.style.display = 'block';
      this.loadProjecttxt = "No";
    }

  }

  // Close user permission dialog
  closeDialog() {
    this.cancelClient();
    this.userPermissionDialog = false;

    const currentRoute = 'userpermissions';
    this.document.location.href = currentRoute;

  }
  selectClient() {
    this.clientArray = this.targetClient;
    this.targetClient = [];
    this.userDialog = false;
  }
  cancelClient() {
    this.targetClient = [];
  }

  // This function is for instrument destination checkbox
  changeInstrumentDestination(eve: any, id: any) {
    let txtId = document.getElementById("txt_" + id);
    let modletxt = document.getElementById("modletxt_" + id)
    if (eve) {
      this.instrumentDestinationtxt = "Yes"
      txtId.style.display = 'block';
      modletxt.style.display = 'none'
    } else {
      this.instrumentDestinationtxt = "No"
    }
    // console.log(id)
  }

  // This function is for audit report checkbox
  changeAuditReport(eve: any, id: any) {
    let txtId = document.getElementById("txt_" + id);
    let modletxt = document.getElementById("modletxt_" + id)
    if (eve) {
      this.auditReporttxt = "Yes"
      txtId.style.display = 'block';
      modletxt.style.display = 'none'
    } else {
      this.auditReporttxt = "No"
    }
    // console.log(id)
  }

  // This function is for load project checkbox
  change(eve: any, id: any) {
    let txtId = document.getElementById("txt_" + id);
    let modletxt = document.getElementById("modletxt_" + id)
    if (eve) {
      this.loadProjecttxt = "Yes"
      txtId.style.display = 'block';
      modletxt.style.display = 'none'
    } else {
      this.loadProjecttxt = "No"
    }
    // console.log(id)
  }

}
