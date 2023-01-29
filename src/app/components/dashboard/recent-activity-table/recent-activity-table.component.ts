import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/model/projects.model';
import { Instruments } from 'src/app/model/projects.model';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import {MenuItem} from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-recent-activity-table',
  templateUrl: './recent-activity-table.component.html',
  styleUrls: ['./recent-activity-table.component.css']
})
export class RecentActivityTableComponent implements OnInit {

  projects!:Projects[];
  cols!: any[];
  instruments!:Instruments[];
  role!:any
  isLoading!:boolean;
  noRecords:boolean = false
  constructor(private psService:ProjectsServiceService,private tokenser:TokenService) { 
    // this.projects =[]
  }

  ngOnInit(): void {
   // this.psService.getProjects().then(projectData => this.projects = projectData);
   this.isLoading = true

   // Get all configured projects
   this.psService.getAllconfiugredProject().subscribe(projectData => {
     
     if(projectData){
       this.projects = projectData;
       this.projects = this.removeDuplicates(this.projects, 'projectName');
       this.isLoading = false
     }

     // console.log(this.projects )
   },error=>{
    if(error.error = "No Projects Available."){
      this.isLoading = false;
      this.noRecords = true
    }else{
      this.noRecords = false
    }
  }
   );
      this.role =this.tokenser.getRole()
    }

    // Remove duplicate projects
    removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject = {};
  
      for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
      }
  
      for (i in lookupObject) {
        newArray.push(lookupObject[i]);
      }
      return newArray;
    }
}

 

 