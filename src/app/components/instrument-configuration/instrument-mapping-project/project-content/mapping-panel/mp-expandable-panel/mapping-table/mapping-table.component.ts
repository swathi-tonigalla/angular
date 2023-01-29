import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstrumentsData, Projects } from 'src/app/model/projects.model';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
 

@Component({
  selector: 'app-mapping-table',
  templateUrl: './mapping-table.component.html',
  styleUrls: ['./mapping-table.component.css'],
  
})
export class MappingTableComponent implements OnInit {

  data = this.mappingServices.getData();   
  id!:any
  projects!:Projects[];
  project!:Projects;
  instrumnetData!:InstrumentsData;
  allComplete: boolean = false;

  constructor(private mappingServices:MappingService,private projectService:ProjectsServiceService,private route:ActivatedRoute) {
    this.project ={}

    if(this.data){
      console.log("iget it"+this.data)
    }
   }

  ngOnInit(): void {
    // this.passMappingService.checkStatus.subscribe(value=>{this.isDestinationChecked=value, console.log('mappingPanel:'+this.isDestinationChecked)})
 
    // this.id = "1000";
    // this.projectService.getProjectDetails(this.id).subscribe((projectData)=> {
    //   this.project= projectData;
    // }
    // )}

    
}

}
