import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmPassword, User } from '../model/user.model';
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class ConfirmpasswordService {
 
  constructor(private http: HttpClient) { }

  confirmpassword(confirmpassword:ConfirmPassword):Observable<ConfirmPassword>{
    return this.http.post<ConfirmPassword>(GlobalConstants.apiBaseURL+"api/change-password",confirmpassword);
  }
  getconfirmpassword(token:any){
    return this.http.get<any>(`${GlobalConstants.apiBaseURL+'api/reset-password'}/${token}`);
  }

}
