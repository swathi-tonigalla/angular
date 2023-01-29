import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {SidenavEventsService} from '../../shared/sidenav-events.service';
@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent   {
  
  toggleSidebarNavEvent?:Subscription;
  classToggled = false;

  constructor(private toggleSidnavEventService:SidenavEventsService) {
    this.toggleSidebarNavEvent =
    this.toggleSidnavEventService.getClickEvent().subscribe(()=>{
      this.toggleFieldWraper()
    })
  }

  public toggleFieldWraper() {
    this.classToggled = !this.classToggled;  
  }
  
}
