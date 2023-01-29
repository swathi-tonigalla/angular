import { Component, Input, OnInit } from '@angular/core';
import { UserpermissionService } from 'src/app/services/userpermission.service';
 
@Component({
  selector: 'app-userpermisions',
  templateUrl: './userpermisions.component.html',
  styleUrls: ['./userpermisions.component.css']
})
export class UserpermisionsComponent implements OnInit {
 // @Input()permisssionSearchData;
  isSearch :boolean = false;
  
  constructor(
    private userpermissionService:UserpermissionService
  ) { }

  ngOnInit(): void {

   this.userpermissionService.getSearchStatus.subscribe(response =>{
    //  console.log(response)
     this.isSearch = response;
   })
  }

}
