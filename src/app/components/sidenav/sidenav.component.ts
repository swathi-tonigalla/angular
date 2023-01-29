import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {SidenavEventsService} from '../../shared/sidenav-events.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  toggleSidebarNavEvent?:Subscription;
  
  classToggled = false;
  
   constructor(private toggleSidnavEventService:SidenavEventsService) {
     this.toggleSidebarNavEvent =
     this.toggleSidnavEventService.getClickEvent().subscribe(()=>{
       this.toggleField()
     })
   }

   public toggleField() {
     this.classToggled = !this.classToggled;  
   }
}
