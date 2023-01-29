import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserpermissionService } from "./userpermission.service";
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  role:any;
  offsignin!:boolean;
  

  
  constructor(
    private userpermissionService: UserpermissionService,
    private tokenser: TokenService,
    private router: Router) {
    
      this.role =this.tokenser.getRole();
    
     }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.role === 'Normal User' || this.role === 'Administrator')
      {
        this.offsignin= false;
       
    }
    else 
    {  
      this.offsignin= false;
    }
      return this.offsignin;
    }

}


