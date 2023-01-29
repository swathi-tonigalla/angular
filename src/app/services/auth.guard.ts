import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserpermissionService } from "./userpermission.service";
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  role:any;
  permission:any={};
  isNormarUser:boolean;
  isAdmin:boolean;
  returnValue:boolean;
  isInstrumentDestination:boolean;
  isAuditReport:boolean;
  isLoadProject:boolean;
  uid!:any;
  sendclientData!:any
  public jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(
    private userpermissionService: UserpermissionService,private auth: AuthService,
    private tokenser: TokenService,private loginserveice: LoginService,
    private router: Router) {
    
      this.role =this.tokenser.getRole();
      //  this.permission = this.tokenser.getUserPermission();
      this.uid = this.tokenser.getUid();
      if(this.uid){
        this.userpermissionService.getPerticularUserPermission(this.uid).subscribe((data) =>{
          if(data){
           this.permission = data.permission;
          }else{
       
          }
      
      // console.log(this.permission);
      })
      }


     }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {
      const token = localStorage.getItem("token");

      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      else
      {
        this.auth.changeAuthStatus(false);
      }
      if(this.role === 'Normal User')
      {
        this.isNormarUser = true;
        this.isAdmin = false;
        this.returnValue = this.isNormarUser;
     //   console.log("normal user");
      //  console.log(this.permission.permission.instrument_destination);
      if(this.permission){
      if(this.permission.permission.instrument_destination === 'Yes')
          {
            this.isInstrumentDestination = true;
          }
          else{
            this.isInstrumentDestination = false;
          }
          if(this.permission.permission.audit_report === 'Yes')
          {
            this.isAuditReport = true;
          }
          else{
            this.isAuditReport = false;
          }
          if(this.permission.permission.load_project === 'Yes')
          {
            this.isLoadProject = true;
          }
          else{
            this.isLoadProject = false;
          }
        }
        }

    else{
      this.isNormarUser = false;

    }
    if(this.role ==='Administrator')
    {
      this.isAdmin = true;
    //  console.log("admin");
      this.isNormarUser = false;
      this.returnValue = this.isAdmin;
     // return this.isAdmin;
      
    }
      return this.returnValue;
    }
    private async refreshingTokens(token: string | null): Promise<boolean> {
      const refreshToken: string | null = localStorage.getItem("refreshToken");
      let isRefreshSuccess: boolean;
      if (!token || !refreshToken) {
        return false;
      }
      const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
      try {
        this.loginserveice.refreshingToken(tokenModel).subscribe(
          (response: any) => {
            const newToken = (<any>response).accessToken;
            const newRefreshToken = (<any>response).refreshToken;
            localStorage.setItem("token", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);       
            isRefreshSuccess = true;
          }    
        )
      }
      catch (ex) {
        isRefreshSuccess = false;
        this.auth.changeAuthStatus(false);
      }
      return isRefreshSuccess;
    }

}



