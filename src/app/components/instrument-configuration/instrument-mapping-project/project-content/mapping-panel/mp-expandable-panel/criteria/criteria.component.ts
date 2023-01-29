import { Component, OnInit } from '@angular/core';
import { Criteria, FilltredArray, GetFinalResult, ProjectUids } from 'src/app/model/Uid.model';
import { MappingService } from 'src/app/services/mapping.service';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
 
import {MessageService, PrimeNGConfig } from "primeng/api";
import { FormControl } from '@angular/forms';
import { AutoMapRule } from 'src/app/model/projects.model';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  conditionCheck: string[] = ['If', 'Filter', 'Concatenate','Criteria'];
  isTypeSelected!: boolean;

  criteriaCol: any;
  criteriaArr: any[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  instrumetnTypes!: any

  //FirstUid
  SelectedFirstUid!: any;
  selectedFirstUidFilter!: any;
  fisrstuidFilterOBJ!: any;
  filterFirstUIDOBJ!: any

  //secondUid
  SelectedSecondUid!: any;
  selectedSecondUidFilter!: any
  selectedsecondfilterOBJ!: any;
  filterSecondUIDOBJ!: any;

  filterResult!: any;

  projectID!: string;

  uids!: ProjectUids;
  fiuid!: any[];

  sendDataToBkend!: any[]

  getFillterUIDResult: FilltredArray = {};

  concatWait!: boolean;

  tosendMapping: any = []

  GetFinalResult: GetFinalResult = {};


  isFirstUiSelected:boolean = false;
  
  selectedCriteria_1: string[] = [];
  selectedCriteria_2: string[] = [];
 
  toppings = new FormControl();
  toppings_2 = new FormControl();

  compareValue:any={}
  compareValue_findvalue: any[];


  findValue:any = {};
  replaceValue:any = {};


  comapreCol:any ={}
 
  chCondition!:any

  criteria:Criteria = {};

  finalCriteriaResult!:any;

  asynMSG:string = '';
  isUidMatch!:boolean;

  sendCriateriatomap:any[] = [];

  isSelectedCriteria!:boolean;

  regex: any = /\d+/g;
  uidMatchnumber_1!: any;
  uidMatchnumber_2!: any;
 
  msgs: any = [];

  dataForAutomap_criteria:AutoMapRule = {}
  filterargsPosition!: any;
  postionUID!: any;
  isnotPositionUid!: any;
  ConcateFinalResultTradeID!:any;

  constructor( private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private mappingServices: MappingService, private ProjectService: ProjectsServiceService) {
    this.criteriaCol = {};
    // this.uids ={};
    this.criteriaArr = [];
    this.sendDataToBkend = [];
    this.isUidMatch = false;
    this.compareValue_findvalue = [];
 
  }

  ngOnInit(): void {

    this.primengConfig.ripple = true;
    //check for removing insttrument type obj
    this.mappingServices.condiStatus.subscribe(checkCondition => {

      this.chCondition = checkCondition
      if (checkCondition == this.conditionCheck[3]) {
        this.mappingServices.instTypeStatus.subscribe(
          instTypeSelection => {
            if (instTypeSelection) {
              this.isTypeSelected = instTypeSelection
              // this.compareKeyData.splice(0,1);

            }
          }

        );
        if (this.isTypeSelected) {
          this.criteriaArr.splice(0, 1);
          this.criteriaArr = [];
          this.compareValue_findvalue.splice(0,1);
          this.compareValue_findvalue =[]

        }
      }
    }
    );

    //Get data for concat
    // if (this.chCondition == this.conditionCheck[3]) {
    this.mappingServices.sourceRowD.subscribe(
      data => {
        this.criteriaCol = data;
        this.criteriaCol = { ...this.criteriaCol }
        this.criteriaArr.push(this.criteriaCol);

        if(this.criteriaArr.length>1){
          
          this.criteriaArr.splice(1,1);
        }
        // if(this.compareValue_findvalue.length>0){
         
        // }
        // console.log(this.criteriaArr)
      });

    // }
    //getproject ID

    this.projectID = this.ProjectService.getProjectI();
    //getUIdsData
    this.mappingServices.getInstrumentTypeFileName.subscribe(fileName=>(this.filterargsPosition = fileName))

    //Get uids set
    this.mappingServices.getUidsData.subscribe(
      uidsData => {
        this.uids = uidsData;
        this.postionUID= uidsData.uidArr.filter(uid=>uid.udname === this.filterargsPosition);
        this.isnotPositionUid = uidsData.uidArr.filter(uid=>uid.udname !== this.filterargsPosition);
      }
    )
    //getInstrumentTyps
    this.mappingServices.getinstTyps.subscribe(selectedType => {
      this.instrumetnTypes = selectedType
    });
    // this.fiuid = this.uids.uidArr.map(val=>val.uidName);
  //  console.log(this.uids);

    //getCriteriaDetails
    this.mappingServices.sourceRowD.subscribe(compareValues=>{
      //if(this.criteriaArr.length>0){
       
         this.compareValue = compareValues;
         this.compareValue ={... this.compareValue}
         this.compareValue_findvalue.push( this.compareValue)
        
         if(this.compareValue_findvalue.length>0){
              this.criteriaArr.splice(1,1)
        }
        
        if(this.compareValue_findvalue.length >0){
          this.findValue=this.compareValue_findvalue[0].LDcolData
        }
        
        if(this.compareValue_findvalue.length >1){
          this.replaceValue =this.compareValue_findvalue[1].LDcolData
        }
       

        // console.log(this.compareValue_findvalue)
      //}
    })

  }


  onSelectFirstUid() {
  
    this.selectedFirstUidFilter = this.postionUID.filter(val => val.id === this.SelectedFirstUid);
    this.uidMatchnumber_1 = this.selectedFirstUidFilter[0].uidName.match(this.regex);
    this.fisrstuidFilterOBJ = this.selectedFirstUidFilter[0].Results;
    const instTypeKey = [... new Set(Object.keys(this.instrumetnTypes))]

    this.filterFirstUIDOBJ = Object.keys(this.fisrstuidFilterOBJ)
      .filter(key => instTypeKey.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.fisrstuidFilterOBJ[key];
        return obj;
      }, {});

      this.isFirstUiSelected = true
    // console.log(this.filterFirstUIDOBJ);
    // console.log( this.fisrstuidFilterOBJ)
  }

  onSelectSecondUid() {
    this.selectedSecondUidFilter = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid);

    this.uidMatchnumber_2 = this.selectedSecondUidFilter[0].uidName.match(this.regex);

    const uid1 = this.uidMatchnumber_1.toString();
    const uid2 = this.uidMatchnumber_2.toString();

    if (uid1 != uid2) {
      this.msgs = [
        { severity: 'error', summary: 'Error', detail: 'Please select equal column uid', life: 3000 },];
      return;
    }
    if (uid1 === uid2) {
    this.selectedSecondUidFilter = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid);
    this.selectedsecondfilterOBJ = this.selectedSecondUidFilter[0].Results;

    //  console.log(this.selectedsecondfilterOBJ);
    this.sendDataToBkend.push(this.filterFirstUIDOBJ, this.selectedsecondfilterOBJ);
    this.getFillterUIDResult.RawfilterArray = this.sendDataToBkend
   // console.log(this.getFillterUIDResult);

    this.ProjectService.sendDataForFilltred(this.getFillterUIDResult).subscribe(Response => { })
    //  this.filterSecondUIDOBJ = this.diff(this.filterFirstUIDOBJ,this.selectedsecondfilterOBJ);

    const selectiondone = true
    this.mappingServices.sendFilterInstTypeStatus(selectiondone);

    this.concatWait = true;
    this.asynMSG='Checking both uids!'
    setTimeout(() => {
      this.ProjectService.getFillteredUid().subscribe(
        result => {

          if (result) {
            this.concatWait = false;
            this.isUidMatch = true;
          }
          this.filterSecondUIDOBJ = result.final_result;
          // console.log(this.filterSecondUIDOBJ);

          if (this.filterSecondUIDOBJ) {
            this.filterResult = this.criteriaCol.LDcolData
            if (this.filterSecondUIDOBJ.length > 1) {
              const tradeIDkey_0 = [... new Set(Object.keys(this.filterSecondUIDOBJ[0]))];
              let concate_0 = Object.keys(this.filterResult)
                .filter(key => tradeIDkey_0.includes(key))
                .reduceRight((obj, key) => {
                  obj[key] = this.filterResult[key];
                  return obj;
                }, {});
              // console.log(concate_0)   
              const rawobjectKeys = this.filterSecondUIDOBJ[1].map(res => [... new Set(Object.keys(res))])
              const tradeIDkey_1 = Array.prototype.concat.apply([], rawobjectKeys);

              // console.log(tradeIDkey_1)
              let concate_1 = Object.keys(this.filterResult)
                .filter(key => tradeIDkey_1.includes(key))
                .reduceRight((obj, key) => {
                  obj[key] = this.filterResult[key];
                  return obj;
                }, {});
              // console.log(concate_1) 
              const result_0_index = Object.values(concate_0)
              const result_1_index = Object.values(concate_1)
              const finalConcateArray = [...result_0_index, ...result_1_index]
              var finalConcateObject = Object.assign({}, finalConcateArray);
              this.ConcateFinalResultTradeID = finalConcateObject;
            console.log("If_finalConcateObject",finalConcateObject);

            } else {
              const tradeIDkey = [... new Set(Object.keys(this.filterSecondUIDOBJ))];
              this.ConcateFinalResultTradeID = Object.keys(this.filterResult)
                .filter(key => tradeIDkey.includes(key))
                .reduceRight((obj, key) => {
                  obj[key] = this.filterResult[key];
                  return obj;
                }, {});
            console.log("Else_finalConcateObject",this.ConcateFinalResultTradeID);

            }
            this.comapreCol =this.ConcateFinalResultTradeID
            // this.mappingServices.sendConcatDataToMap(this.tosendMapping)
          }
        }
      )
    }, 5000);
    if(this.compareValue_findvalue.length > 0){
      this.compareValue_findvalue.splice(0,1);
    }

  }
  }

  onSelectComapreValue(){
  //  console.log(this.selectedCriteria_1)
  }

  onSelectCriteriaValue(){
   // console.log(this.selectedCriteria_2)
  }

 OnsetCriteria(event:Event){
    event.preventDefault();

        this.criteria.LegacyColn =this.findValue
        this.criteria.replaceValue = this.replaceValue
        this.criteria.filterCheck =this.comapreCol;

        this.dataForAutomap_criteria.LegacyColn = this.criteria.LegacyColn;
        this.dataForAutomap_criteria.replaceValue = this.criteria.replaceValue

        this.sendDataForFinal(this.criteria);
        const criteriaSetDone = true
        this.mappingServices.sendFilterInstTypeStatus(criteriaSetDone);

    //  console.log(this.criteria)
 }

 sendDataForFinal(data:Criteria){
   this.ProjectService.sendDataForCriteria(data).subscribe(res=>{});
   this.concatWait = true;
   this.asynMSG='Setting up criteria!'
 setTimeout(()=>{
   this.ProjectService.getCriteriaData().subscribe(
    data=>{
      if(data){
        this.finalCriteriaResult= data.filterCheck;

        let resultTextFIleName = this.compareValue_findvalue[0].LDgroup
        let col1st =  this.compareValue_findvalue[0].LDname
        let col2nd = this.compareValue_findvalue[1].LDname;
        const uidsName = [];
        uidsName.push(this.selectedFirstUidFilter[0].udname,this.selectedSecondUidFilter[0].udname)
        this.dataForAutomap_criteria.uidsName= uidsName; 

        const uidsLength = [];
        uidsLength.push(this.selectedFirstUidFilter[0].uidLength,this.selectedSecondUidFilter[0].uidLength);
        this.dataForAutomap_criteria.uidsLength= uidsLength; 

       const actualUidName = [];
       actualUidName.push(this.selectedFirstUidFilter[0].uidName,this.selectedSecondUidFilter[0].uidName)
       this.dataForAutomap_criteria.actualUidName= actualUidName;  

        const uidID = [];
        uidID.push(this.selectedFirstUidFilter[0].id,this.selectedSecondUidFilter[0].id)
        this.dataForAutomap_criteria.uidID= uidID; 
         
        const sourceName = [];
        sourceName.push(this.criteriaArr[0].LDgroup,this.compareValue_findvalue[0].LDgroup)
        this.dataForAutomap_criteria.sourceName=sourceName; 

        const sourceColName = [];
        sourceColName.push(this.criteriaArr[0].LDname,this.compareValue_findvalue[0].LDname,this.compareValue_findvalue[1].LDname)
        this.dataForAutomap_criteria.sourceColName=sourceColName; 

        const sourceColID = [];
        sourceColID.push(this.criteriaArr[0].LDcolId)
        this.dataForAutomap_criteria.sourceColID=sourceColID;

        this.sendCriateriatomap.push(resultTextFIleName,col1st,col2nd,this.finalCriteriaResult,this.dataForAutomap_criteria);
        this.mappingServices.sendCriteriatoMap(this.sendCriateriatomap)
        // console.log(this.sendCriateriatomap);
        const errorTrue = false;
        this.ProjectService.sendMappingbtnstats(errorTrue);
        this.concatWait = false;
        this.isSelectedCriteria = true; 
        this.criteriaArr = [];
        this.compareValue_findvalue =[]
      } 
    },    
     error=>{
      if(error){
        this.concatWait = false;
        const errorTrue = true;
        this.ProjectService.sendMappingbtnstats(errorTrue);
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail:'Somthing went wrong!\nPlease check mapping rule or source data.' , life: 5000 }) 

      }
    }
  )
   
 },5000)
   
 }

onEdit(){
  this.isSelectedCriteria = false; 
}
  
 
  // diff(x, y) {
  //   var target = {};
  //   var diffProps = Object.keys(x).filter(function (i: any) {
  //     if (x[i] != y[i]) {
  //       return true;
  //     }
  //     return false;
  //   }).map(function (j: any) {
  //     var obj = {};
  //     obj[j] = x[j];
  //     target = Object.assign(target, obj)
  //   });
  //   return target;
  // }
  removeanother(i: any): void {
    const index =i;
    if (index >= 0) {
      this.compareValue_findvalue.splice(index, 1);
    }
  }


  remove(i: any): void {
    const index =i;
    if (index >= 0) {
      this.criteriaArr.splice(index, 1);
    }
  }

  clearCriteria(){
    this.criteriaArr =[];
  }

}




