import { Component, OnInit } from '@angular/core';
import {Projects} from '../../../../model/projects.model'
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { ActivatedRoute } from '@angular/router';
import { UsersClientService } from 'src/app/services/users-client.service';
import { UserP } from 'src/app/model/userpermission.model';


@Component({
  selector: 'app-project-content',
  templateUrl: './project-content.component.html',
  styleUrls: ['./project-content.component.css']
})
export class ProjectContentComponent implements OnInit {

  id?:any
  constructor(private projService:ProjectsServiceService,private route:ActivatedRoute, private clser:UsersClientService) { }

  ngOnInit(): void {
    let projectid = this.route.snapshot.params.id;
  // console.log( this.route.snapshot.params['id'])

   this.route.params.subscribe(
     params => {
       projectid=params['id']
   //  console.log(projectid)
    }
   )
  }


}
