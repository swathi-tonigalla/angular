import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/abstract_emitter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../model/user.model'
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    
   users:User[];
   user!:User

  constructor(private http: HttpClient) { 
    this.users =[];
  }


  loginService(singinval:User){
    return this.http.post(GlobalConstants.apiBaseURL+'Auth/Login',singinval)
  }
  refreshingToken(tokenModel:any){
    return this.http.post(GlobalConstants.apiBaseURL+'Auth/refresh-token',tokenModel)
    //this.http.post(environment.baseUrl + "authenticate/refresh-token", tokenModel)
  }

}