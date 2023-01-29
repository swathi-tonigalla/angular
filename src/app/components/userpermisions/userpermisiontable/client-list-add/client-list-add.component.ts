import { Component, OnInit } from '@angular/core';
import{UsersClientService} from '../../../../services/users-client.service';
import {Client} from '../../../../model/usersclient.model';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-list-add',
  templateUrl: './client-list-add.component.html',
  styleUrls: ['./client-list-add.component.css'],
 
})
export class ClientListAddComponent implements OnInit {
  
  
  clientForm: FormGroup;
 

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder) 
    { 
   

    this.clientForm = this.fb.group({
      fieldName: ['', Validators.required],
    })
  }

  ngOnInit(): void {
   
    this.primengConfig.ripple = true;
  //  console.log(this.targetClient);

    
  }

}
