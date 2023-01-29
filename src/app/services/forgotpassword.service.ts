import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPassword } from '../model/user.model';
import { User } from '../model/userlist.model';
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  users:User[];
  user!:User

  constructor(private http: HttpClient) {
    this.users =[];
   }

   forgotPassword(forgotPassword:ForgotPassword):Observable<ForgotPassword>{
    return this.http.post<ForgotPassword>(GlobalConstants.apiBaseURL+'api/reset-password-request',forgotPassword);
  }
}
