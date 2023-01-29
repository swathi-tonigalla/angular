import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/userlist.model';
import { Message, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CustomDateFormatPipe } from '../../shared/custom-date-format.pipe';
import { checkMatchValidator, checkPasswordMatchValidator } from 'src/app/shared/Validators';
import { TokenService } from 'src/app/services/token.service';

export interface DeleteAllUsers {
  ids?: any[];
}

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
  providers: [MessageService, ConfirmationService, CustomDateFormatPipe]
})
export class UsermanagementComponent implements OnInit {

  // users:User[];
  // users?:string;
  users: User[];
  user!: User;
  userDilog?: boolean;
  submitted = false;
  userRegistration: FormGroup;
  selectedUser: User[];
  msg: Message[];
  searchValue?: string;
  status?: string;
  errorMsg?: any;
  errorMsg2?: any;
  editPasswordField?: boolean;
  editpass?: boolean;
  checkedIDs: User[];
  idaArray: any[];
  selectedId: DeleteAllUsers = {};
  uid?: any;
  selectAll: boolean = false;
  analyst!: any;
  duplicate: boolean = false;


  constructor(public userservice: UserService,
    public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private tokenService: TokenService) {
    this.users = [];
    this.selectedUser = [];
    this.msg = [];
    this.userRegistration = fb.group({
      userName: ['', Validators.required],
      emailID: ['', [Validators.required,
      Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      //  Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]{2,4}$')]],
      confirmEmail: ['', Validators.required,],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]],
      confirmPassword: ['', Validators.required],
      roles: ['', Validators.required]
    },
      {
        validator: [
          checkMatchValidator('emailID', 'confirmEmail'),
          checkPasswordMatchValidator('password', 'confirmPassword')

        ]
      }
    )
  }

  ngOnInit(): void {
    this.uid = this.tokenService.getUid();
    this.userservice.getallUsers().subscribe((data: User[]) => {
      this.users = data;
      this.users = this.users.filter(userid => userid.id !== this.uid)
      if (this.duplicate) {
        this.users = this.users.splice(this.users.length, 1);
        // console.log(this.users);
      }
      // console.log(this.users);
      //this.users.map((res:Response)=> res.json())
      //  console.log(this.users);
      // this.users.map(res => res.userName)
    });
    this.primengConfig.ripple = true;
    this.editPasswordField = false;
    this.analyst = 'Analyst'
    this.checkedIDs = [];
  }



  newUser() {
    this.user = {}
    this.userRegistration.reset()
    this.userDilog = true
    this.submitted = false
    this.editPasswordField = false;
    this.editpass = false;

  }

  onSubmit() {
    //  console.log('test');
    this.submitted = true;
    if (this.user.userName?.trim()) {
      if (this.user.id) {
        this.users[this.findIndexById(this.user.id)] = this.user;
        this.onUpdateOnUser(this.user);
        //  this.onUpdateOnUserJSON(this.user)
        // this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
      }
      else {

        this.user.id = this.createId();
        this.user.userName = this.userRegistration.controls['userName'].value
        this.user.email_id = this.userRegistration.controls['emailID'].value
        this.user.email_verified_at = this.userRegistration.controls['confirmEmail'].value
        this.user.password = this.userRegistration.controls['password'].value
        this.user.password_confirmation = this.userRegistration.controls['confirmPassword'].value
        this.user.roles = this.userRegistration.controls['roles'].value
        this.user.createdAt = Date.now();
        this.users.push(this.user);
        this.sendToserver(this.user);
        this.sendToserverJSON(this.user);

      }

      this.users = [...this.users];
      this.userDilog = false;
      this.editpass = false;
      this.user = {};

    }

  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  // onUpdateOnUser(user: User) {
  //   this.userservice.updateUser(user).subscribe(
  //     () => this.status = 'Update successful'
  //   )
  // }

  onUpdateOnUser(user: User) {
    this.userservice.updateUser(user).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 }), console.log(response);
        this.hideDilog()
      },
      error => {
        this.errorMsg = error.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errorMsg, life: 3500 }), console.error(error);
      }
    );
  }

  // onUpdateOnUserJSON(user: User) {
  //   this.userservice.updateUserJSON(user).subscribe(
  //     () => this.status = 'Update successful'
  //   )
  // }


  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  sendToserver(userData: User) {
    this.userservice.addUser(userData).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New user added', life: 3000 }), console.log(response);
        this.hideDilog()
      },
      error => {
        this.errorMsg = error.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errorMsg, life: 3500 }), console.error(error);

        if (this.errorMsg) {
          this.duplicate = true;
          this.userservice.getallUsers().subscribe((data: User[]) => {
            this.users = data;
            this.users = this.users.filter(userid => userid.id !== this.uid)

          });
        }
      }
    );
  }


  sendToserverJSON(userData: User) {
    this.userservice.addUserJSON(userData).subscribe(
      response => {
        //  this.messageService.add({severity:'success', summary: 'Success', detail: 'New user added',life: 3000}),console.log(response);
        this.hideDilog()
      },
      //  error => {this.messageService.add({severity:'error', summary: 'Error', detail: 'Somthing went wrong at server data is not updated to server please try again!',life: 3500}),console.error(error);
      //  }
    );
  }

  editUsers(user: User) {
    this.user = { ...user };
    this.userDilog = true;
    // console.log(this.user)
    this.editPasswordField = true;
  }

  deleteUsers(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.userName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (user.id != undefined) {
          const findID = user["id"]
          // console.log(findID)
          this.ondeletUser(findID);
          this.ondeletUserJSON(findID);
        }
        this.users = this.users.filter(val => val.id !== user.id);
        this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }

  ondeletUser(id: string) {
    this.userservice.deleteUser(id).subscribe(
      () => this.status = 'Delete successful from server'
    )
  }

  ondeletUserJSON(id: string) {
    this.userservice.deleteUserJSON(id).subscribe(
      () => this.status = 'Delete successful from json'
    )
  }


  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        //  console.log(this.checkedIDs);
        if (this.selectAll) {
          this.users = this.users.filter(val => !this.checkedIDs[0].includes(val));
          this.idaArray = this.checkedIDs[0].map(ids => ids.id);
        }
        else {
          this.users = this.users.filter(val => !this.checkedIDs.includes(val));
          this.idaArray = this.checkedIDs.map(ids => ids.id);
        }
        this.selectedId.ids = this.idaArray;
        this.onDeleteSelectedUsers(this.selectedId);
        //  this.checkedIDs = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Selected Users are deleted', life: 3000 });
      }
    });
  }

  onDeleteSelectedUsers(ids: any) {
    this.userservice.deleteSelectedUsers(ids).subscribe(
      () => this.status = 'Selected User is deleted'
    )
  }

  hideDilog() {
    this.userDilog = false;
    this.submitted = false;
    this.editpass = false;
    this.userRegistration.reset();
  }

  editPass() {
    this.editpass = true;
  }
  changeSelection(user: User) {
    this.checkedIDs.push(user);
  }
  // changeAllSelectedUser(event)
  // {
  //  // console.log(event.checked);
  //   this.checkedIDs.push(this.users);
  // }

  changeAllSelectedUser(event) {
    // console.log(event.checked);
    this.checkedIDs.push(this.users);

    // console.log(this.checkedIDs);
    if (this.selectAll === true) {
      this.users.map((val) => {
        val.checked = true;
      });

    } else {
      this.users.map((val) => {
        val.checked = false;
      });
    }
  }










}
