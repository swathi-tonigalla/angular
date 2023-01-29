import { Component, OnInit } from '@angular/core';
import { Ifonly } from 'src/app/model/If.model';
import { FilltredArray, IfConditionOnly, ProjectUids } from 'src/app/model/Uid.model';
import { MappingService } from 'src/app/services/mapping.service';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AutoMapRule } from 'src/app/model/projects.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-if-only',
  templateUrl: './if-only.component.html',
  styleUrls: ['./if-only.component.css']
})
export class IfOnlyComponent implements OnInit {

  ifWait: boolean;

  ifOnlyCOl: any;
  ifonlyArry: any[];

  sendDataToBkend_if!: any[];

  ParentconditionCheck: string[] = ['If', 'Filter', 'Concatenate', 'Criteria'];
  ChildConditionCheck: string[] = ['If Only', 'If & Concat', 'If & Concat & Criteria'];

  ifchCondition!: any;

  ifistypeSelected!: boolean;
  nestedIFstatus!: any;

  projectID!: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  uids_if!: ProjectUids;

  instrumetnTypes_if!: any;

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

  isFirstUiSelected: boolean = false;

  getFillterUIDResult_if: FilltredArray = {};

  recivedConditionalCheckOBJ!: any;

  selectedCondition_if!: any;

  removedDuplicatedFromSelectedColn!: any;

  firstValue_if!: string;
  secondValue_if!: string;

  uidDone!: boolean;
  ifonlydata: Ifonly = {};

  ifonlyfrom: FormGroup;

  selectedValues: any[] = [];
  conditionalValues: any[] = [];

  ifOnlyFinalResult: IfConditionOnly = {};

  sendToMapFromIF_only: any[] = [];
  isSelectedIfOnly!: boolean;

  regex: any = /\d+/g;
  uidMatchnumber_1!: any;
  uidMatchnumber_2!: any;

  msgs: any = [];

  dataForAutomap_ifonly:AutoMapRule = {}
  filterargsPosition!: any;
  postionUID!: any;
  isnotPositionUid!: any;

  constructor(public fb: FormBuilder,
    private messageService: MessageService,
    private mappingServices: MappingService, private ProjectService: ProjectsServiceService) {
    this.ifOnlyCOl = {};
    // this.uids ={};
    this.ifonlyArry = [];
    this.sendDataToBkend_if = []
    this.ifWait = false;


    this.ifonlyfrom = fb.group({

      selectCondtion: ['', Validators.required],
      firstValue: ['', Validators.required],
      otherwiseValue: ['', Validators.required]

    })
  }

  ngOnInit(): void {

    this.mappingServices.nestedIfStus.subscribe(nestedStuts => {
      this.nestedIFstatus = nestedStuts;
    })

    this.mappingServices.condiStatus.subscribe(checkCondition => {
      this.ifchCondition = checkCondition
      if (checkCondition == this.ParentconditionCheck[0]) {
        //  if(this.nestedIFstatus == this.ChildConditionCheck[0]){
        this.mappingServices.instTypeStatus.subscribe(
          instTypeSelection => {
            if (instTypeSelection) {
              this.ifistypeSelected = instTypeSelection
              // this.compareKeyData.splice(0,1);

            }
          }

        );
        if (this.ifistypeSelected) {
          this.ifonlyArry.splice(0, 1);
          this.ifonlyArry = [];
        }
        // } 

      }
    }
    );
    //getCOlumn for if only
    this.mappingServices.sourceRowD.subscribe(
      data => {
        this.ifOnlyCOl = data;
        if (this.nestedIFstatus == this.ChildConditionCheck[0]) {
          // console.log(this.nestedIFstatus+"==="+this.ChildConditionCheck[0])
          this.ifOnlyCOl = { ...this.ifOnlyCOl }
          this.ifonlyArry.push(this.ifOnlyCOl);
        }
        // console.log(this.ifonlyArry)
      });

    this.projectID = this.ProjectService.getProjectI();
    this.mappingServices.getInstrumentTypeFileName.subscribe(fileName=>(this.filterargsPosition = fileName))

    //Get uids set
    this.mappingServices.getUidsData.subscribe(
      uidsData => {
        this.uids_if = uidsData;
        this.postionUID= uidsData.uidArr.filter(uid=>uid.udname === this.filterargsPosition);
        this.isnotPositionUid = uidsData.uidArr.filter(uid=>uid.udname !== this.filterargsPosition);
      }
    )
    //getInstrumentTyps
    this.mappingServices.getinstTyps.subscribe(selectedType => {
      this.instrumetnTypes_if = selectedType
    });
  }

  remove(i: any): void {
    const index = i;

    if (index >= 0) {
      this.ifonlyArry.splice(index, 1);
    }
  }


  //firstUID
  onSelectFirstUid_if() {
    this.selectedFirstUidFilter = this.postionUID.filter(val => val.id === this.SelectedFirstUid);
    this.uidMatchnumber_1 = this.selectedFirstUidFilter[0].uidName.match(this.regex);
    
    this.fisrstuidFilterOBJ = this.selectedFirstUidFilter[0].Results;
    const instTypeKey = [... new Set(Object.keys(this.instrumetnTypes_if))]

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


  onSelectSecondUid_if() {
    this.selectedSecondUidFilter = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid);

    this.uidMatchnumber_2 = this.selectedSecondUidFilter[0].uidName.match(this.regex);

    const uid1= this.uidMatchnumber_1.toString();
    const uid2 = this.uidMatchnumber_2.toString();
 
    if (uid1 != uid2) {
      this.msgs = [
        { severity: 'error', summary: 'Error', detail: 'Please select equal column uid', life: 3000 },];
        return;
    }
    if(uid1 === uid2){
    this.selectedSecondUidFilter = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid);
      this.selectedsecondfilterOBJ = this.selectedSecondUidFilter[0].Results;
      this.msgs = [];
      //  console.log(this.selectedsecondfilterOBJ);
      this.sendDataToBkend_if.push(this.filterFirstUIDOBJ, this.selectedsecondfilterOBJ);
      this.getFillterUIDResult_if.RawfilterArray = this.sendDataToBkend_if
      // console.log(this.getFillterUIDResult_if);

      this.ProjectService.sendDataForFilltred(this.getFillterUIDResult_if).subscribe(Response => { })
      //  this.filterSecondUIDOBJ = this.diff(this.filterFirstUIDOBJ,this.selectedsecondfilterOBJ);
      const selectiondoneConcat = true
      this.mappingServices.sendFilterInstTypeStatus(selectiondoneConcat);
      this.ifWait = true;
      setTimeout(() => {
        this.ProjectService.getFillteredUid().subscribe(
          result => {

            if (result) {
              this.ifWait = false;
            }
            this.filterSecondUIDOBJ = result.final_result;
            // console.log(this.filterSecondUIDOBJ);
            this.filterResult = this.ifOnlyCOl.LDcolData
            if (this.filterSecondUIDOBJ) {
              //  this.GetFinalResult.final_result =this.filterFirstUIDOBJ.final_result;
              //  console.log( this.GetFinalResult.final_result)
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
                
                 this.recivedConditionalCheckOBJ= finalConcateObject;
                 const toNeset = Object.values(this.recivedConditionalCheckOBJ);
  
                 this.removedDuplicatedFromSelectedColn = [...new Set(toNeset)];
   
                 //  console.log( this.removedDuplicatedFromSelectedColn)
   
                 this.uidDone = true;
              } else {
                const tradeIDkey = [... new Set(Object.keys(this.filterSecondUIDOBJ))];

                this.recivedConditionalCheckOBJ = Object.keys(this.filterResult)
                  .filter(key => tradeIDkey.includes(key))
                  .reduce((obj, key) => {
                    obj[key] = this.filterResult[key];
                    return obj;
                  }, {});
  
                const toNeset = Object.values(this.recivedConditionalCheckOBJ);
  
                this.removedDuplicatedFromSelectedColn = [...new Set(toNeset)];
  
                //  console.log( this.removedDuplicatedFromSelectedColn)
  
                this.uidDone = true;
              }
            
            }
          }
        )
      }, 5000);
  
   

  }
    
  }

  OnsetIfOnlyCondition() {
    // console.log(this.recivedConditionalCheckOBJ);
    let firstVal = this.ifonlyfrom.controls['firstValue'].value;
    let secondVal = this.ifonlyfrom.controls['otherwiseValue'].value;

    this.conditionalValues.push(firstVal, secondVal);
    this.selectedValues.push(this.selectedCondition_if);

    this.ifonlydata.conditionFilterCheck = this.recivedConditionalCheckOBJ;
    this.ifonlydata.conditionValues = this.conditionalValues;
    this.ifonlydata.selectedCondition = this.selectedValues;
    // console.log(this.ifonlydata);
    this.sendToServerifData(this.ifonlydata);
    this.ifWait = true
    setTimeout(() => {
      this.mappingServices.getIfData().subscribe(
        res => {
          this.ifOnlyFinalResult.filterCheck = res.filterCheck;
          let selectedValueif = this.selectedCondition_if
          let colname = this.ifonlyArry[0].LDgroup
          let gropuName = this.ifonlyArry[0].LDname;

          const uidsName = [];
        uidsName.push(this.selectedFirstUidFilter[0].udname,this.selectedSecondUidFilter[0].udname)
        this.dataForAutomap_ifonly.uidsName= uidsName; 

        const uidsLength = [];
        uidsLength.push(this.selectedFirstUidFilter[0].uidLength,this.selectedSecondUidFilter[0].uidLength);
        this.dataForAutomap_ifonly.uidsLength= uidsLength; 

       const actualUidName = [];
       actualUidName.push(this.selectedFirstUidFilter[0].uidName,this.selectedSecondUidFilter[0].uidName)
       this.dataForAutomap_ifonly.actualUidName= actualUidName;  

        const uidID = [];
        uidID.push(this.selectedFirstUidFilter[0].id,this.selectedSecondUidFilter[0].id)
        this.dataForAutomap_ifonly.uidID= uidID; 
         
        const sourceName = [];
        sourceName.push(this.ifonlyArry[0].LDgroup)
        this.dataForAutomap_ifonly.sourceName=sourceName; 

        const sourceColName = [];
        sourceColName.push(this.ifonlyArry[0].LDname)
        this.dataForAutomap_ifonly.sourceColName=sourceColName; 

        const sourceColID = [];
        sourceColID.push(this.ifonlyArry[0].LDcolId)
        this.dataForAutomap_ifonly.sourceColID=sourceColID;

        this.dataForAutomap_ifonly.selectedIf_condition = selectedValueif

        const conditionvalues=[];
        let firstVal_selcted = this.ifonlyfrom.controls['firstValue'].value;
        let secondVal_selcted = this.ifonlyfrom.controls['otherwiseValue'].value;
        conditionvalues.push(firstVal_selcted,secondVal_selcted)
        this.dataForAutomap_ifonly.Condition_Value= conditionvalues;

       
      

        this.sendToMapFromIF_only.push(gropuName, colname, selectedValueif, this.ifOnlyFinalResult.filterCheck,this.dataForAutomap_ifonly);
        this.mappingServices.sendToMappingFromIF(this.sendToMapFromIF_only);
        this.ifWait = false;
        const errorTrue = false;
        this.ProjectService.sendMappingbtnstats(errorTrue);
        this.isSelectedIfOnly = true;
        this.ifonlyArry = [];
        this.ifOnlyCOl ={};
        this.sendToMapFromIF_only = [];
        },
        error=>{
          if(error){
            this.ifWait = false;
            const errorTrue = true;
            this.ProjectService.sendMappingbtnstats(errorTrue);
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail:'Somthing went wrong!\nPlease check mapping rule or source data.' , life: 5000 }) 

          }
        }
      )
    }, 6000)

  }


  sendToServerifData(data: Ifonly) {
    this.mappingServices.sendIfDataToLaravel(data).subscribe(res => { })
  }

}
