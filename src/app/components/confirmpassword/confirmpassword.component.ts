import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmPassword, User } from 'src/app/model/user.model';
import { ConfirmpasswordService } from 'src/app/services/confirmpassword.service';
import { TokenService } from 'src/app/services/token.service';
import { checkMatchValidator } from 'src/app/shared/Validators';


@Component({
  selector: 'app-confirmpassword',
  templateUrl: './confirmpassword.component.html',
  styleUrls: ['./confirmpassword.component.css']
})
export class ConfirmpasswordComponent implements OnInit {
  confirmPassword: FormGroup;
  confirmPasswordDialog?: boolean;
  confirmPasswordModel: ConfirmPassword = {};
  confirmPasswordModelResponse: ConfirmPassword = {};
  msg: Message[];
  email!: any;
  passwordToken!: any;
  isShown: boolean = false;
  uniquId!: any;
  token!: any;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private confirmpasswordService: ConfirmpasswordService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private tokenser: TokenService,
  ) {
    this.confirmPassword = fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      passwordToken: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    },
      { validator: checkMatchValidator('password', 'password_confirmation') }
    )
  }

  ngOnInit(): void {
    //this.email = this.tokenser.getEmail();
    this.uniquId = this.tokenser.getUid();
    this.token = this.tokenser.get();

  }

  hideDilog() {
    this.confirmPasswordDialog = false;
    //this.submitted = false;
    this.confirmPassword.reset();

  }
  confirmUserPassword() {

    this.confirmPasswordModel.email = this.confirmPassword.controls['email'].value;
    console.log(this.confirmPasswordModel.email);

    this.confirmPasswordModel.password = this.confirmPassword.controls['password'].value;
    console.log(this.confirmPasswordModel.password);
    this.confirmPasswordModel.password_confirmation = this.confirmPassword.controls['password_confirmation'].value;
    console.log(this.confirmPasswordModel.password_confirmation);

    this.confirmpasswordService.confirmpassword(this.confirmPasswordModel).subscribe(
      (response) => {
        //  this.messageService.add({severity:'success', summary: 'Success', detail: 'Password updated',life: 3000}),console.log(response);

      },
      // error => this.messageService.add({severity:'error', summary: 'error', detail: 'Something went wrong please, try again.', life: 3000})
    )
  }



}
