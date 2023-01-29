import { Component, OnInit } from '@angular/core';
import { Ifonly } from 'src/app/model/If.model';
import { AutoMapRule } from 'src/app/model/projects.model';
import { Criteria, FilltredArray, IfconcatGetData, IfConcatSend, IfConditionOnly, ProjectUids } from 'src/app/model/Uid.model';
import { MappingService } from 'src/app/services/mapping.service';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';

@Component({
  selector: 'app-if-concat-criteria',
  templateUrl: './if-concat-criteria.component.html',
  styleUrls: ['./if-concat-criteria.component.css']
})
export class IfConcatCriteriaComponent implements OnInit {

  if_concat_cri_wait: boolean;

  if_concat_criteria_Col: any;
  if_concat_cri_arr: any[];

  sendDataToBkend_if_criteria!: any[];

  ParentconditionCheck_ifcocat: string[] = ['If', 'Filter', 'Concatenate', 'Criteria'];
  ChildConditionCheck_ifConcat: string[] = ['If Only', 'If & Concat', 'If & Concat & Criteria'];

  ifchCondition!: any;

  ifistypeSelected!: boolean;
  nestedIFstatus!: any;

  projectID!: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;




  uids_if_concat!: ProjectUids;

  instrumetnTypes_if!: any;

  //FirstUid
  SelectedFirstUid!: any;
  SelectedFirstUid_2!: any;
  selectedFirstUidFilter!: any;

  selectedFirstUidFilter_2!: any;

  fisrstuidFilterOBJ!: any;
  fisrstuidFilterOBJ_2!: any;
  filterFirstUIDOBJ!: any
  FinalfilterFirstUIDOBJ_2!: any

  //secondUid
  SelectedSecondUid_if_con!: any;
  SelectedSecondUid_if_con_2!: any;
  SelectedSecondUid_if_conFilter!: any
  selectedsecondfilterOBJ!: any;
  filterSecondUIDOBJ!: any;

  SelectedSecondUid_if_conFilter_2!: any
  selectedsecondfilterOBJ_2!: any;
  filterSecondUIDOBJ_2!: any;

  filterResult!: any;
  filterResult_2!: any;

  isFirstUiSelected_if_con: boolean = false;

  getFillterUIDResult_if: FilltredArray = {};

  rec_if_concat_uid_final!: any;
  rec_if_concat_uid_final_2!: any;

  selectedCondition_if!: any;

  removedDuplicatedFromSelectedColn!: any;

  firstValue_if!: string;
  secondValue_if!: string;

  uidDone_if_con!: boolean;
  ifonlydata: Ifonly = {};

  selectedValues: any[] = [];
  conditionalValues: any[] = [];

  ifOnlyFinalResult: IfConditionOnly = {};

  sendToMapFromIF_only: any[] = [];

  uidDone_if_con_2!: boolean;

  conditionSelected: boolean = false;

  IfConcatSend: IfConcatSend = {};

  finalCriteriaResult!: any


  IfconcatGetData: IfconcatGetData = {};

  if_criteria: Criteria = {};

  if_findValue: any = {};
  if_replaceValue: any = {};
  if_compareValue: any = {};

  if_compareValue_findvalue: any[] = [];

  if_Concat_criteria: IfConcatSend = {};

  if_criteria_sendDataTomapping: any[] = [];

  isSelectedIfConcat_criteria!: boolean;

  regex: any = /\d+/g;
  uidMatchnumber_1!: any;
  uidMatchnumber_2!: any;


  uidMatchnumber_1_1!: any;
  uidMatchnumber_2_2!: any;

  msgs: any = [];
  msgs2: any = [];
  msgs3: any = [];
  dataForAutomap_ifConcat_criteria: AutoMapRule = {}
  filterargsPosition!: any;
  postionUID!: any;
  isnotPositionUid!: any;

  isWrongUIDSelection!: boolean

  constructor(private mappingServices: MappingService, private ProjectService: ProjectsServiceService) {
    this.if_concat_criteria_Col = {};
    // this.uids ={};
    this.if_concat_cri_arr = [];
    this.sendDataToBkend_if_criteria = []
    this.if_concat_cri_wait = false;
    this.isWrongUIDSelection = false

  }

  ngOnInit(): void {

    this.mappingServices.nestedIfStus.subscribe(nestedStuts => {
      this.nestedIFstatus = nestedStuts;
    });



    this.mappingServices.condiStatus.subscribe(checkCondition => {
      this.ifchCondition = checkCondition
      if (checkCondition == this.ParentconditionCheck_ifcocat[0]) {
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
          this.if_concat_cri_arr.splice(0, 1);
          this.if_concat_cri_arr = [];
          this.if_compareValue_findvalue.splice(0, 1);
          this.if_compareValue_findvalue = [];
        }
        // } 

      }
    }
    );


    if (this.isWrongUIDSelection) {
      this.clearCriteria()
    }
    //getCOlumn for if only
    this.mappingServices.sourceRowD.subscribe(
      data => {
        this.if_concat_criteria_Col = data;
        if (this.nestedIFstatus == this.ChildConditionCheck_ifConcat[2]) {
          //  console.log(this.nestedIFstatus+"==="+this.ChildConditionCheck_ifConcat[1])
          this.if_concat_criteria_Col = { ...this.if_concat_criteria_Col }
          this.if_concat_cri_arr.push(this.if_concat_criteria_Col);
          // console.log(this.if_concat_cri_arr)
          if (this.if_concat_cri_arr.length > 2) {

            this.if_concat_cri_arr.splice(2, 1);
          }

        }
        // console.log(this.if_concat_cri_arr)
      });


    this.mappingServices.sourceRowD.subscribe(compareValues => {
      this.if_compareValue = compareValues;
      this.if_compareValue = { ... this.if_compareValue }
      this.if_compareValue_findvalue.push(this.if_compareValue)

      if (this.if_compareValue_findvalue.length > 0) {
        this.if_concat_cri_arr.splice(2, 1)
      }


      if (this.if_compareValue_findvalue.length > 0) {
        this.if_findValue = this.if_compareValue_findvalue[0].LDcolData
      }

      if (this.if_compareValue_findvalue.length > 1) {
        this.if_replaceValue = this.if_compareValue_findvalue[1].LDcolData
      }

    });

    this.projectID = this.ProjectService.getProjectI();
    this.mappingServices.getInstrumentTypeFileName.subscribe(fileName => (this.filterargsPosition = fileName))

    //Get uids set
    this.mappingServices.getUidsData.subscribe(
      uidsData => {
        this.uids_if_concat = uidsData;
        this.postionUID = uidsData.uidArr.filter(uid => uid.udname === this.filterargsPosition);
        this.isnotPositionUid = uidsData.uidArr.filter(uid => uid.udname !== this.filterargsPosition);

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
      this.if_concat_cri_arr.splice(index, 1);
    }
  }

  remove2(i: any): void {
    const index = i;

    if (index >= 0) {
      this.if_concat_cri_arr.splice(index, 1);
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

    this.isFirstUiSelected_if_con = true
    // console.log(this.filterFirstUIDOBJ);
    // console.log( this.fisrstuidFilterOBJ)
  }


  onSelectSecondUid_if_concat() {
    this.SelectedSecondUid_if_conFilter = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid_if_con);

    this.uidMatchnumber_2 = this.SelectedSecondUid_if_conFilter[0].uidName.match(this.regex);

    const uid1 = this.uidMatchnumber_1.toString();
    const uid2 = this.uidMatchnumber_2.toString();

    if (uid1 != uid2) {
      this.msgs = [
        { severity: 'error', summary: 'Error', detail: 'Please select equal column uid', life: 3000 },];
      return;
    }


    if (uid1 === uid2) {

      this.SelectedSecondUid_if_conFilter = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid_if_con);
      this.selectedsecondfilterOBJ = this.SelectedSecondUid_if_conFilter[0].Results;

      //  console.log(this.selectedsecondfilterOBJ);
      this.sendDataToBkend_if_criteria.push(this.filterFirstUIDOBJ, this.selectedsecondfilterOBJ);
      this.getFillterUIDResult_if.RawfilterArray = this.sendDataToBkend_if_criteria
      // console.log(this.getFillterUIDResult_if);

      this.ProjectService.sendDataForFilltred(this.getFillterUIDResult_if).subscribe(Response => { })
      //  this.filterSecondUIDOBJ = this.diff(this.filterFirstUIDOBJ,this.selectedsecondfilterOBJ);
      const selectiondoneConcat = true
      this.mappingServices.sendFilterInstTypeStatus(selectiondoneConcat);
      this.if_concat_cri_wait = true;
      setTimeout(() => {
        this.ProjectService.getFillteredUid().subscribe(
          result => {

            if (result) {
              this.if_concat_cri_wait = false;
            }
            this.filterSecondUIDOBJ = result.final_result;
            // console.log(this.filterSecondUIDOBJ);
            this.filterResult = this.if_concat_criteria_Col.LDcolData
            if (this.filterSecondUIDOBJ) {
              //  this.GetFinalResult.final_result =this.filterFirstUIDOBJ.final_result;
              //  console.log( this.GetFinalResult.final_result)
              if (this.filterSecondUIDOBJ.length > 1) {
                const tradeIDkey_0 = [... new Set(Object.keys(this.filterSecondUIDOBJ))];
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
                this.rec_if_concat_uid_final= finalConcateObject
                const toNeset = Object.values(this.rec_if_concat_uid_final);
  
                this.removedDuplicatedFromSelectedColn = [...new Set(toNeset)];
  
                // console.log(this.removedDuplicatedFromSelectedColn)
  
                this.uidDone_if_con = true;
                this.sendDataToBkend_if_criteria = [];
                // this.if_compareValue_findvalue=[];
              }else{
                const tradeIDkey = [... new Set(Object.keys(this.filterSecondUIDOBJ))];

                this.rec_if_concat_uid_final = Object.keys(this.filterResult)
                  .filter(key => tradeIDkey.includes(key))
                  .reduce((obj, key) => {
                    obj[key] = this.filterResult[key];
                    return obj;
                  }, {});
  
                const toNeset = Object.values(this.rec_if_concat_uid_final);
  
                this.removedDuplicatedFromSelectedColn = [...new Set(toNeset)];
  
                // console.log(this.removedDuplicatedFromSelectedColn)
  
                this.uidDone_if_con = true;
                this.sendDataToBkend_if_criteria = [];
                // this.if_compareValue_findvalue=[];
              }
         
            }
          }
        )
      }, 5000);
    }
  }


  onconditionSelect() {
    this.conditionSelected = true
  }


  onSelectFirstUid_if_concat_1() {


    this.selectedFirstUidFilter_2 = this.postionUID.filter(val => val.id === this.SelectedFirstUid_2);
    this.uidMatchnumber_1_1 = this.selectedFirstUidFilter_2[0].uidName.match(this.regex);

    // console.log(this.selectedFirstUidFilter_2);

    this.fisrstuidFilterOBJ_2 = this.selectedFirstUidFilter_2[0].Results;
    // console.log(this.selectedFirstUidFilter_2);

    const instTypeKey = [... new Set(Object.keys(this.instrumetnTypes_if))]

    this.FinalfilterFirstUIDOBJ_2 = Object.keys(this.fisrstuidFilterOBJ_2)
      .filter(key => instTypeKey.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.fisrstuidFilterOBJ_2[key];
        return obj;
      }, {});

    // console.log(this.FinalfilterFirstUIDOBJ_2)
    // this.isFirstUiSelected_if_con = true
  }


  onSelectSecondUid_if_concat_2() {
    this.SelectedSecondUid_if_conFilter_2 = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid_if_con_2);

    this.uidMatchnumber_2_2 = this.SelectedSecondUid_if_conFilter_2[0].uidName.match(this.regex);

    const uid1 = this.uidMatchnumber_1_1.toString();
    const uid2 = this.uidMatchnumber_2_2.toString();

    if (uid1 != uid2) {
      this.msgs2 = [
        { severity: 'error', summary: 'Error', detail: 'Please select equal column uid', life: 3000 },];
      return;
    }

    if (uid1 === uid2) {
      this.SelectedSecondUid_if_conFilter_2 = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid_if_con_2);
      this.selectedsecondfilterOBJ_2 = this.SelectedSecondUid_if_conFilter_2[0].Results;

      //  console.log(this.selectedsecondfilterOBJ);
      this.sendDataToBkend_if_criteria.push(this.FinalfilterFirstUIDOBJ_2, this.selectedsecondfilterOBJ_2);
      this.getFillterUIDResult_if.RawfilterArray = this.sendDataToBkend_if_criteria
      // console.log(this.getFillterUIDResult_if);

      this.ProjectService.sendDataForFilltred(this.getFillterUIDResult_if).subscribe(Response => { })
      //  this.filterSecondUIDOBJ = this.diff(this.filterFirstUIDOBJ,this.selectedsecondfilterOBJ);
      this.uidDone_if_con_2 = true

      const selectiondoneConcat = true
      this.mappingServices.sendFilterInstTypeStatus(selectiondoneConcat);
      this.if_compareValue_findvalue = [];
      this.if_concat_cri_wait = true;
      setTimeout(() => {
        this.ProjectService.getFillteredUid().subscribe(
          result => {

            if (result) {
              this.if_concat_cri_wait = false;
            }
            this.filterSecondUIDOBJ_2 = result.final_result;
            //  console.log(this.filterSecondUIDOBJ_2);
            this.filterResult_2 = this.if_concat_criteria_Col.LDcolData
            if (this.filterSecondUIDOBJ_2) {
              //  this.GetFinalResult.final_result =this.filterFirstUIDOBJ.final_result;
              //  console.log( this.GetFinalResult.final_result)
              if (this.filterSecondUIDOBJ_2.length > 1) {
                const tradeIDkey_0 = [... new Set(Object.keys(this.filterSecondUIDOBJ_2))];
                let concate_0 = Object.keys(this.filterResult_2)
                  .filter(key => tradeIDkey_0.includes(key))
                  .reduceRight((obj, key) => {
                    obj[key] = this.filterResult_2[key];
                    return obj;
                  }, {});
                // console.log(concate_0)   
                const rawobjectKeys = this.filterSecondUIDOBJ_2[1].map(res => [... new Set(Object.keys(res))])
                const tradeIDkey_1 = Array.prototype.concat.apply([], rawobjectKeys);
    
                // console.log(tradeIDkey_1)
                let concate_1 = Object.keys(this.filterResult_2)
                  .filter(key => tradeIDkey_1.includes(key))
                  .reduceRight((obj, key) => {
                    obj[key] = this.filterResult_2[key];
                    return obj;
                  }, {});
                // console.log(concate_1) 
                const result_0_index = Object.values(concate_0)
                const result_1_index = Object.values(concate_1)
                const finalConcateArray = [...result_0_index, ...result_1_index]
                var finalConcateObject = Object.assign({}, finalConcateArray);
                this.rec_if_concat_uid_final_2 =finalConcateObject;
                this.uidDone_if_con = true;
                this.sendDataToBkend_if_criteria = [];
              }else{
                //console.log(this.filterSecondUIDOBJ_2)

                const tradeIDkey = [... new Set(Object.keys(this.filterSecondUIDOBJ_2[0]))];        

                this.rec_if_concat_uid_final_2 = Object.keys(this.filterResult_2)
                  .filter(key => tradeIDkey.includes(key))
                  .reduce((obj, key) => {
                    obj[key] = this.filterResult_2[key];
                    return obj;
                  }, {});
  
  
  
                // console.log(this.rec_if_concat_uid_final_2)
  
                this.uidDone_if_con = true;
                this.sendDataToBkend_if_criteria = [];
              }

            }
          }
        )
      }, 5000);
      if (this.if_compareValue_findvalue.length > 0) {
        this.if_compareValue_findvalue.splice(0, 2)
      }
    }

  }


  setCondition_withCriteria() {

    this.if_criteria.LegacyColn = this.if_findValue
    this.if_criteria.replaceValue = this.if_replaceValue
     
    this.if_criteria.filterCheck = this.rec_if_concat_uid_final_2;
    this.sendDataForIfCriteria(this.if_criteria);

    console.log(this.if_criteria)

  }


  sendToserver(data: IfConcatSend) {
    this.mappingServices.sendToservere_If_concat(data).subscribe(res => { })
  }


  sendDataForIfCriteria(data: Criteria) {
    this.ProjectService.sendDataForCriteria(data).subscribe(res => { });
    this.if_concat_cri_wait = true;
    // this.asynMSG='Setting up criteria!'
    setTimeout(() => {
      this.ProjectService.getCriteriaData().subscribe(
        data => {
          // console.log(data)
          if (data) {
            this.finalCriteriaResult = data.filterCheck;

            if (this.finalCriteriaResult) {
              this.IfConcatSend.selectedCondition = this.selectedCondition_if
              this.IfConcatSend.filtercheckIfConcat = this.rec_if_concat_uid_final
              this.IfConcatSend.valueReplace = this.finalCriteriaResult;
              //  console.log( this.IfConcatSend);

              this.sendToserver_if_criteria(this.IfConcatSend);
              const errorTrue = false;
              this.ProjectService.sendMappingbtnstats(errorTrue);
            }
            // this.mappingServices.sendCriteriatoMap(this.sendCriateriatomap)


          }
        }
        ,
        error => {
          if (error) {
            this.if_concat_cri_wait = false;
            const errorTrue = true;
        this.ProjectService.sendMappingbtnstats(errorTrue);
            this.msgs2 = [
              { severity: 'error', summary: 'Error', detail: 'Somthing went wrong please try again!', life: 3000 },];
          }
        }
      )

    }, 5000)

  }


  removeanother(i: any): void {
    const index = i;

    if (index >= 0) {
      this.if_compareValue_findvalue.splice(index, 1);
    }
  }


  sendToserver_if_criteria(data: IfConcatSend) {
    this.mappingServices.sendToservere_If_concat(data).subscribe(res => { });
    setTimeout(() => {
      this.mappingServices.getIfConcatData().subscribe(resFinal => {
        if (resFinal) {

          this.if_concat_cri_wait = false;
        }
        this.IfconcatGetData.finalIFConcateArray = resFinal.finalIFConcateArray;

        // console.log(this.IfconcatGetData.finalIFConcateArray)
        //send to mapping screen satrt
        let selectedValueif = this.selectedCondition_if;
        let colname = this.if_concat_cri_arr[0].LDgroup;
        let gropuName = this.if_concat_cri_arr[0].LDname;



        const uidsName = [];
        uidsName.push(this.selectedFirstUidFilter[0].udname, this.SelectedSecondUid_if_conFilter[0].udname)
        this.dataForAutomap_ifConcat_criteria.uidsName = uidsName;

        const uidsLength = [];
        uidsLength.push(this.selectedFirstUidFilter[0].uidLength, this.SelectedSecondUid_if_conFilter[0].uidLength);
        this.dataForAutomap_ifConcat_criteria.uidsLength = uidsLength;

        const actualUidName = [];
        actualUidName.push(this.selectedFirstUidFilter[0].uidName, this.SelectedSecondUid_if_conFilter[0].uidName)
        this.dataForAutomap_ifConcat_criteria.actualUidName = actualUidName;

        const uidID = [];
        uidID.push(this.selectedFirstUidFilter[0].id, this.SelectedSecondUid_if_conFilter[0].id)
        this.dataForAutomap_ifConcat_criteria.uidID = uidID;

        const sourceName = [];
        sourceName.push(this.if_concat_cri_arr[0].LDgroup, this.if_concat_cri_arr[1].LDgroup, this.if_compareValue_findvalue[0].LDgroup)
        this.dataForAutomap_ifConcat_criteria.sourceName = sourceName;

        const sourceColName = [];
        sourceColName.push(this.if_concat_cri_arr[0].LDname, this.if_concat_cri_arr[1].LDname, this.if_compareValue_findvalue[0].LDname, this.if_compareValue_findvalue[1].LDname)
        this.dataForAutomap_ifConcat_criteria.sourceColName = sourceColName;

        const sourceColID = [];
        sourceColID.push(this.if_concat_cri_arr[0].LDcolId, this.if_concat_cri_arr[1].LDcolId, this.if_compareValue_findvalue[0].LDcolId, this.if_compareValue_findvalue[1].LDcolId)
        this.dataForAutomap_ifConcat_criteria.sourceColID = sourceColID;


        const uidsName_2 = [];
        uidsName_2.push(this.selectedFirstUidFilter_2[0].udname, this.SelectedSecondUid_if_conFilter_2[0].udname)
        this.dataForAutomap_ifConcat_criteria.uidsName_2 = uidsName_2;

        const uidsLength_2 = [];
        uidsLength_2.push(this.selectedFirstUidFilter_2[0].uidLength, this.SelectedSecondUid_if_conFilter_2[0].uidLength);
        this.dataForAutomap_ifConcat_criteria.uidsLength_2 = uidsLength_2;

        const actualUidName_2 = [];
        actualUidName_2.push(this.selectedFirstUidFilter_2[0].uidName, this.SelectedSecondUid_if_conFilter_2[0].uidName)
        this.dataForAutomap_ifConcat_criteria.actualUidName_2 = actualUidName_2;

        const uidID_2 = [];
        uidID_2.push(this.selectedFirstUidFilter_2[0].id, this.SelectedSecondUid_if_conFilter_2[0].id)
        this.dataForAutomap_ifConcat_criteria.uidID_2 = uidID_2;

        this.dataForAutomap_ifConcat_criteria.selectedIf_condition = selectedValueif

        // console.log(this.dataForAutomap_ifConcat_criteria);
        this.isWrongUIDSelection = false
        this.if_criteria_sendDataTomapping.push(colname, gropuName, selectedValueif, this.IfconcatGetData.finalIFConcateArray, this.dataForAutomap_ifConcat_criteria);
        this.mappingServices.sendDataToMapping_If_concat_criteria(this.if_criteria_sendDataTomapping);
        this.isSelectedIfConcat_criteria = true;
        this.if_concat_cri_arr = [];
        this.if_compareValue_findvalue = [];
      },
        error => {
          this.isWrongUIDSelection = true
          if (error.error = "Smothing Went wrong! please try again this mapping") {
            this.msgs2 = [
              { severity: 'error', summary: 'Error', detail: error.error, life: 3000 },];
            this.clearCriteria();
          }
          this.if_concat_cri_wait = false;
          this.uidDone_if_con_2 = false;
         this.if_compareValue_findvalue = []
          this.msgs2 = [
            { severity: 'error', summary: 'Error', detail: 'Please select correct UID or Check your source data, Please try again.', life: 3000 },];
        }
      )
    }, 3000);
  }


  clearCriteria() {
    this.if_concat_cri_arr = [];
    const clearConcat = true
    this.mappingServices.sendClearStatus(clearConcat);
  }


}

