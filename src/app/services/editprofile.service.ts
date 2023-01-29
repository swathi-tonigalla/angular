import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/userlist.model';
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class EditprofileService {

  users:User[];
  user!:User

  constructor(private http: HttpClient) {
    this.users =[];
 }

 editProfile(profileEdit:User):Observable<User>{
   return this.http.post<User>(GlobalConstants.apiBaseURL+'api/editProfile',profileEdit);
 }

}
