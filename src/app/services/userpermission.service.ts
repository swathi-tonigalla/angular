import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserP, UserPermission } from '../model/userpermission.model';
import { GlobalConstants } from '../shared/global.constants';

@Injectable()
export class UserpermissionService {

  private sendPermissionData
  private PermissionNext = new BehaviorSubject<any>('');
  getPer = this.PermissionNext.asObservable();

  private searchStatus;
  private searchStatusNext = new BehaviorSubject<any>('');
  getSearchStatus = this.searchStatusNext.asObservable();

  private searchData;
  private searchDataNext = new BehaviorSubject<any[]>([]);
  getSearchData = this.searchDataNext.asObservable();


  private sendclientData
  private nextclientdata = new BehaviorSubject<any>('');
  getseleclient = this.nextclientdata.asObservable();

  constructor(private http: HttpClient) { }

  getUserFromUsers() {
    return this.http.get<any>( GlobalConstants.apiBaseURL + "api/permissions");
  }

  addUserPermission(userpermission: UserP): Observable<UserP> {
    return this.http.post<UserP>( GlobalConstants.apiBaseURL+ "api/set-user-permission", userpermission);
  }


  getAllUsersPermissions() {
    //  return this.http.get<any>(`${this._url+'/api/get-user-permission'}`);
    return this.http.get<any>( GlobalConstants.apiBaseURL+ 'api/all-users-permission');
  }


  getPerticularUserPermission(uniquId: any) {
    return this.http.get<any>(`${ GlobalConstants.apiBaseURL + 'api/get-net-user-permission'}/${uniquId}`);
  }



  sendPermisssion(data: any) {
    this.sendPermissionData = data;
    this.PermissionNext.next(this.sendPermissionData)
  }

  sendppermissionforClient(data: any) {
    this.sendclientData = data;
    this.nextclientdata.next(this.sendclientData);
  }



  searchUserPermission(userpermission: UserPermission): Observable<any> {
    return this.http.post<UserPermission>( GlobalConstants.apiBaseURL + "api/search-permission", userpermission);
  }


  sendSearchStatus(data: any) {
    this.searchStatus = data;
    this.searchStatusNext.next(this.searchStatus);
  }

  sendSearchData(data: any) {
    this.searchData = data;
    this.searchDataNext.next(this.searchData);
  }
}
