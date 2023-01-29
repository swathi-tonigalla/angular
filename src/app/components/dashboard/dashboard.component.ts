import { Component,OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-homeIndex',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  islogin!: boolean;
  role!:any;
  isAdmin:boolean = false
  constructor(
    private auth: AuthService,
    private token:TokenService
  ) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.islogin = value)
    this.role =this.token.getRole()
    this.roleCheck();
  }

  // For checking logged in Users role
  roleCheck(){
    if(this.role == 'Administrator'){
      this.isAdmin = true
    }
   
    else {this.isAdmin =false}
  }

}
