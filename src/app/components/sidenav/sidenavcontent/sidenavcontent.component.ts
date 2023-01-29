import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {SidenavEventsService} from '../../../shared/sidenav-events.service';

@Component({
  selector: 'app-sidenavcontent',
  templateUrl: './sidenavcontent.component.html',
  styleUrls: ['./sidenavcontent.component.css']
})
export class SidenavcontentComponent   {

  logName = {
  fullName:'ProdktrSegue',
  shortname:'PS'
  }

  toggleSidebarNavEvent?:Subscription;
  classToggled = false;

  constructor(private toggleSidnavEventService:SidenavEventsService) {
    this.toggleSidebarNavEvent =
    this.toggleSidnavEventService.getClickEvent().subscribe(()=>{
      this.toggleNameChange()
    })
  }

  public toggleNameChange() {
    this.classToggled = !this.classToggled;  
  }
}
