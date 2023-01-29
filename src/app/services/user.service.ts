import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../model/userlist.model'
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:User[];
  user!:User;

  constructor(private http: HttpClient) { 
    this.users =[];
  }

  getUsers() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/userjson')
        .toPromise()
        .then(res => <User[]>res.data)
        .then(data => { return data; });
  }

  getallUsers(){
    return this.http.get<User[]>(GlobalConstants.apiBaseURL+'api/User/GetAll')

  }

  addUser(newUser:User){
    this.users.push(newUser);
    return this.http.post<any>(GlobalConstants.apiBaseURL+'api/client/usercreate',newUser,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        responseType: 'text'
      })
    })
  }

  
  addUserJSON(newUser:User){
    this.users.push(newUser);
    return this.http.post<any>(GlobalConstants.apiBaseURL+'api/userjson/create',newUser)}

  updateUser(user:User):Observable<User>{
    return this.http.post<User>(`${GlobalConstants.apiBaseURL+'api/client/userupdate'}/${user.id}`,user ,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
         
      })
    })
  }

  updateUserJSON(user:User):Observable<User>{
    return this.http.post<User>(`${GlobalConstants.apiBaseURL+'api/userjson/update'}/${user.id}`,user)}

  deleteUser(id:string):Observable<any>{
    return this.http.get<any>(`${GlobalConstants.apiBaseURL+'api/client/deleteuser'}/${id}`,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        responseType: 'text'
      })
    });
  }

  
  deleteUserJSON(id:string):Observable<any>{
    return this.http.get<any>(`${GlobalConstants.apiBaseURL+'api/userjson/delete'}/${id}`);
  }

  deleteSelectedUsers(users:any): Observable < string > {  
    const httpOptions = {  
         headers: new HttpHeaders({  
             'Content-Type': 'application/json'  
         })  
     };  
     return this.http.post<string>(`${GlobalConstants.apiBaseURL}api/client/userdelall`, users, httpOptions);  
 }



}
