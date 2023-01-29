import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import {SidenavEventsService} from './shared/sidenav-events.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  islogin!:boolean;
  toggleSidebarNavEvent?:Subscription;

  constructor(
    private toggleSidnavEventService: SidenavEventsService,
    private auth: AuthService
    ) { }



    ngOnInit(){
      this.auth.authStatus.subscribe(value=> this.islogin = value)

    }
  // onClick() {
  //   this.islogin = true;
  // }

  logOut() {
    this.islogin = false;
  }


}
