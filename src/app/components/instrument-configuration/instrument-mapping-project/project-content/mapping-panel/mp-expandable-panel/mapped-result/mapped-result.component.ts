import { Component, OnInit } from '@angular/core';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';

@Component({
  selector: 'app-mapped-result',
  templateUrl: './mapped-result.component.html',
  styleUrls: ['./mapped-result.component.css']
})
export class MappedResultComponent implements OnInit {

  mappedFileResult:any;
  mappingCheck:boolean

  constructor(private mappingService:PassMappingService) {
    this.mappedFileResult=[];
    this.mappingCheck = false
   }

  ngOnInit() {

    this.mappingService.mapRes.subscribe(
      result =>{
        this.mappedFileResult= result
        console.log(this.mappedFileResult.mpgroup)
         this.mappingService.Ddata.subscribe(
           val=>{

            if(this.mappedFileResult.mpgroup ===val.group )
            {
              this.mappingCheck = true
            }
         
           }
         )

     
      }
    )
  }

}
