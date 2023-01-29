import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllProjectConfigCount, Projects } from 'src/app/model/projects.model';
import { User } from 'src/app/model/userlist.model';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { UsersClientService } from 'src/app/services/users-client.service';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  userData!:any
  clientData!:any
  isDashboardModel!:any;
  reciveallConfigCount:AllProjectConfigCount={};
  userID:Projects ={}

  constructor(
    private UserService:UserService,
    private ClientService:UsersClientService,
    private router: Router,
    private  sharedService:SharedService,
    private projectservice:ProjectsServiceService,
    private tokenser:TokenService
    ) {

      this.isDashboardModel = false
     }

  ngOnInit(): void {
    // Get all users data
    this.UserService.getallUsers().subscribe(
      data=> this.userData = data
    );

    //Get all clients data
    this.ClientService.getallClients().subscribe(
      client=>{this.clientData = client},

      // this.clientData.length.toFixed(2)
    )

    // Get status of dashboard model
    this.sharedService.isdashModel.subscribe(
      stat=>{
        if(stat){
          this.isDashboardModel = stat  
        }
      }
    );

    // Get all users wise count for instrument configuration
    this.projectservice.dashboardAllUserWiseCount().subscribe(res=>{
      if(res){
          this.reciveallConfigCount.AllUserInstrumentConfigured = res.AllUserInstrumentConfigured;
      }
      else{
        this.reciveallConfigCount.AllUserInstrumentConfigured ="00"
      }
    });

    // Get perticular user's id
    this.userID.user_id= this.tokenser.getUid();

    // Get Perticular user wise count for instrument configuration
    this.projectservice.dashboardUserWiseCount(this.userID).subscribe(
      res=>{

        if(res){
          this.reciveallConfigCount.instrumentConfuguredByYou = res.instrumentConfuguredByYou
        }
        else{
          this.reciveallConfigCount.instrumentConfuguredByYou = "00"
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
