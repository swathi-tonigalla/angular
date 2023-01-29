import { Injectable } from '@angular/core';
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handel(token: any) {
    this.set(token);
  }

  set(token: any) {

    localStorage.setItem('token', token)

  }

  get() {
    return localStorage.getItem('token')
  }
  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    localStorage.removeItem('permission');
  
  }

  isValid() {
    const token = this.get()
    if (token) {
      const paylod = this.payload(token)
      if (paylod) {
        let test3= paylod.iss === GlobalConstants.apiBaseURL+'api/login' ? true : false;
        return test3;
      }
    }
    return false
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    let test= this.decodePayload(payload);
    return test;
  }

  decodePayload(payload: any) {
    let test2= JSON.parse(atob(payload));
    return test2;
  }


  loggedIn() {
    let test5 = this.isValid();
    return true;
  }

  getlogin(data: any) {
    this.setUsername(data)
  }
  getUserId(data:any)
  {
    this.setUid(data)
  }

  setUsername(username: any) {
    localStorage.setItem('username', username)

  }

  getname() {
    return localStorage.getItem('username')
  }

  getLoginRole(role: any) {
    this.setRole(role)
  }
  setRole(role: any) {
    localStorage.setItem('role', role)
  }

  getRole() {
    return localStorage.getItem('role')
  }
  setUid(uid: any) {
    localStorage.setItem('uid', uid)
  }

  getUid() {
    return localStorage.getItem('uid')
  }
  setEmai(email: any) {
    localStorage.setItem('email', email)
  }

  getEmail() {
    return localStorage.getItem('email')
  }
  getUserPermission() {
    return localStorage.getItem('permission');
  }

  setUserPermission(data:any) {
    localStorage.setItem('permission',data)
  }

  
  


}
