import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/model/projects.model';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css']
})
export class ProjectHeaderComponent implements OnInit {
  
  project!:Projects
  projects!:Projects[]
  id!:any;
  projectName!:any;
  constructor(private projectService:ProjectsServiceService) {}

  ngOnInit(): void {
    
    this.projectService.pId.subscribe(
      projectID => {


        if (projectID) {
          this.id = projectID
        }
      }
    );


      this.projectService.pname.subscribe(
      projectName => {


        if (projectName) {
          this.projectName = projectName;
          this.projectName =this.projectName.replace(/\s/g, "_");
        }
      }
    );

   

    // this.id = this.projectService.getProjectI()
    // = this.projectService.getProjectName();
  // setTimeout(() => {
    
      this.projectService.getprojectData.subscribe((data:any) => {

        if (data) {
          this.project =  data
          // console.log(this.project)

        }
      })
    // }, 1)

  }

}
