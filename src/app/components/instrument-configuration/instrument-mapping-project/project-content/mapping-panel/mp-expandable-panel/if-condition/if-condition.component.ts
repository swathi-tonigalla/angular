import { Component, OnInit } from '@angular/core';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';

@Component({
  selector: 'app-if-condition',
  templateUrl: './if-condition.component.html',
  styleUrls: ['./if-condition.component.css']
})
export class IfConditionComponent implements OnInit {


  conditionCheked!:any;

  nestIf:boolean = false;
  isIf_concat_criteria:boolean =false;
  isIf_concat:boolean = false;

  Ifconditions: string[] = ['If Only', 'If & Concat', 'If & Concat & Criteria'];
  
  constructor(private mappingService:MappingService) { }

  ngOnInit(): void {
  }



  onIfConditionCheck(condition:any,event:any){
    let IfnestedPanel = document.getElementById("if_only");
    let IfconcatPanel = document.getElementById("if_Concat");
    let IfcpncatCriteriaPanel = document.getElementById("if_Concat_criteria");

    //ONLY IF
    if (condition === this.Ifconditions[0]){
     this.nestIf= true;
     IfnestedPanel.style.display ='block';
     this.mappingService.sendCheckedConditionToOthers(condition)

    }else{
      this.nestIf= false;
      IfnestedPanel.style.display ='none'
    }

    //IF_CONCAT
    if (condition === this.Ifconditions[1]){
      this.isIf_concat= true;
      IfconcatPanel.style.display ='block'
      this.mappingService.sendCheckedConditionToOthers(condition)
 
     }else{
       this.isIf_concat= false;
       IfconcatPanel.style.display ='none'
     }

         //IF_CONCAT_criteria
    if (condition === this.Ifconditions[2]){
      this.isIf_concat_criteria= true;
      IfcpncatCriteriaPanel.style.display ='block'
      this.mappingService.sendCheckedConditionToOthers(condition)
 
     }else{
       this.isIf_concat_criteria= false;
       IfcpncatCriteriaPanel.style.display ='none'
     }

  }

}
