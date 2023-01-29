import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPassword: FormGroup;
  hide = true;
  forgetPasswordDialog?: boolean;
  msgs1!: Message[];

  constructor(public fb: FormBuilder, private messageService: MessageService,
    private primengConfig: PrimeNGConfig,) {
    this.forgetPassword = fb.group({
      emailID:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    })
   }

  ngOnInit(): void {
    this.forgetPasswordDialog = true;
  }

  updatePassword(){
    this.forgetPasswordDialog = false;
  }

}
