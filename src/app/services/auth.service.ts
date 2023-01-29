import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedin = new BehaviorSubject<boolean>(this.tokenser.loggedIn())

  authStatus = this.isLoggedin.asObservable();
  constructor(private tokenser:TokenService) { }

  changeAuthStatus(value:boolean){
  this.isLoggedin.next(value)
  }
}
