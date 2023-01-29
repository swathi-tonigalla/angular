import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllProjectConfigCount, Projects } from 'src/app/model/projects.model';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersClientService } from 'src/app/services/users-client.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  reciveallConfigCount:AllProjectConfigCount={};
  userID:Projects ={};
  isDashboardModel!:any;

  constructor(
    // private UserService:UserService,
    private ClientService:UsersClientService,
    private router: Router,
    private  sharedService:SharedService,
    private projectservice:ProjectsServiceService,
    private tokenser:TokenService
    ){}
  ngOnInit(): void {
    this.userID.user_id= this.tokenser.getUid();

    // Get user wise count for instrument configuration
    this.projectservice.dashboardUserWiseCount(this.userID).subscribe(
      res=>{

        if(res){
          this.reciveallConfigCount.instrumentConfuguredByYou = res.instrumentConfuguredByYou
        }
        else{
          this.reciveallConfigCount.instrumentConfuguredByYou = "0"
        }
        
      }
    )
  }

  newProjectDashboard(){
 
    this.router.navigateByUrl('/instrumentConfiguration');
    this.isDashboardModel = true;
    // Send dashboard model status to the shared service
    this.sharedService.sendNewProjectStatusToOthers(this.isDashboardModel)

}

}
