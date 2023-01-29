import { Component, OnInit } from '@angular/core';
import { AutoMapRule, SourceLegacyDataColn } from 'src/app/model/projects.model';
import { FilltredArray, GetFinalResult, ProjectUids, Uids } from '../../../../../../../model/Uid.model';
import { MappingService } from 'src/app/services/mapping.service';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-concatenate',
  templateUrl: './concatenate.component.html',
  styleUrls: ['./concatenate.component.css']
})
export class ConcatenateComponent implements OnInit {

  conditionCheck: string[] = ['If', 'Filter', 'Concatenate', 'Criteria'];
  isTypeSelected!: boolean;

  concatCol: any;
  concatArr: any[];
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

  tosendMapping: any[] = []

  GetFinalResult: GetFinalResult = {};


  isFirstUiSelected: boolean = false;

  filterargsPosition!: any

  chCondition!: any;

  isSelectedconcat!: boolean
  regex: any = /\d+/g;
  uidMatchnumber_1!: any;
  uidMatchnumber_2!: any;

  postionUID!: any;
  isnotPositionUid!: any

  msgs: any = [];

  dataForAutomap: AutoMapRule = {};
  ConcateFinalResultTradeID!: any

  constructor(private mappingServices: MappingService,
    private messageService: MessageService,
    private ProjectService: ProjectsServiceService) {
    this.concatCol = {};
    // this.uids ={};
    this.concatArr = [];
    this.sendDataToBkend = []

  }

  ngOnInit(): void {
    //check for removing insttrument type obj
    this.mappingServices.condiStatus.subscribe(checkCondition => {
      this.chCondition = checkCondition
      if (checkCondition == this.conditionCheck[2]) {
        this.mappingServices.instTypeStatus.subscribe(
          instTypeSelection => {
            if (instTypeSelection) {
              this.isTypeSelected = instTypeSelection
              // this.compareKeyData.splice(0,1);

            }
          }

        );
        if (this.isTypeSelected) {
          this.concatArr.splice(0, 1);
          this.concatArr = [];
        }
      }
    }
    );

    //Get data for concat
    // if (this.chCondition == this.conditionCheck[2]) {
    this.mappingServices.sourceRowD.subscribe(
      data => {
        // console.log(data)
        this.concatCol = data;
        this.concatCol = { ...this.concatCol }
        this.concatArr.push(this.concatCol);
        // console.log(this.concatArr)
      });

    // }
    //getproject ID

    this.projectID = this.ProjectService.getProjectI();

    this.mappingServices.getInstrumentTypeFileName.subscribe(fileName => (this.filterargsPosition = fileName))
    //getUIdsData
    //Get uids set
    this.mappingServices.getUidsData.subscribe(
      uidsData => {
        this.uids = uidsData;
        // console.log(this.uids);
        //  console.log(this.filterargsPosition)
        this.postionUID = uidsData.uidArr.filter(uid => uid.udname === this.filterargsPosition);
        this.isnotPositionUid = uidsData.uidArr.filter(uid => uid.udname !== this.filterargsPosition);
        // console.log(this.postionUID)
      }
    )
    //getInstrumentTyps
    this.mappingServices.getinstTyps.subscribe(selectedType => {
      this.instrumetnTypes = selectedType
      // console.log(this.instrumetnTypes)
    });
    // this.fiuid = this.uids.uidArr.map(val=>val.uidName);
    // 

  }


  remove(i: any): void {
    const index = i;

    if (index >= 0) {
      this.concatArr.splice(index, 1);
    }
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
    // console.log( this.filterFirstUIDOBJ)
  }

  onSelectSecondUid() {
    this.selectedSecondUidFilter = this.isnotPositionUid.filter(val => val.id === this.SelectedSecondUid);
    this.uidMatchnumber_2 = this.selectedSecondUidFilter[0].uidName.match(this.regex);

    const uid1 = this.uidMatchnumber_1.toString();
    const uid2 = this.uidMatchnumber_2.toString();

    // console.log(uid1+' === '+uid2)
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
      //  console.log(this.getFillterUIDResult);

      this.ProjectService.sendDataForFilltred(this.getFillterUIDResult).subscribe(Response => { })
      //  this.filterSecondUIDOBJ = this.diff(this.filterFirstUIDOBJ,this.selectedsecondfilterOBJ);
      const selectiondoneConcat = true
      this.mappingServices.sendFilterInstTypeStatus(selectiondoneConcat);
      this.concatWait = true;
      setTimeout(() => {
        this.ProjectService.getFillteredUid().subscribe(
          result => {
            // console.log(result);

            if (result) {
              this.concatWait = false;
            }
            this.filterSecondUIDOBJ = result.final_result;
            //  console.log(this.filterSecondUIDOBJ);

            if (this.filterSecondUIDOBJ) {
              //  this.GetFinalResult.final_result =this.filterFirstUIDOBJ.final_result;
              //  console.log(this.filterSecondUIDOBJ);
              this.filterResult = this.concatCol.LDcolData
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
              } else {
                const tradeIDkey = [... new Set(Object.keys(this.filterSecondUIDOBJ))];
                this.ConcateFinalResultTradeID = Object.keys(this.filterResult)
                  .filter(key => tradeIDkey.includes(key))
                  .reduceRight((obj, key) => {
                    obj[key] = this.filterResult[key];
                    return obj;
                  }, {});


              }
              if (this.ConcateFinalResultTradeID) {
                // console.log(FinalResultTradeID);
                const uidsName = [];
                uidsName.push(this.selectedFirstUidFilter[0].udname, this.selectedSecondUidFilter[0].udname)
                this.dataForAutomap.uidsName = uidsName;

                const uidsLength = [];
                uidsLength.push(this.selectedFirstUidFilter[0].uidLength, this.selectedSecondUidFilter[0].uidLength);
                this.dataForAutomap.uidsLength = uidsLength;

                const actualUidName = [];
                actualUidName.push(this.selectedFirstUidFilter[0].uidName, this.selectedSecondUidFilter[0].uidName)
                this.dataForAutomap.actualUidName = actualUidName;

                const uidID = [];
                uidID.push(this.selectedFirstUidFilter[0].id, this.selectedSecondUidFilter[0].id)
                this.dataForAutomap.uidID = uidID;

                const sourceName = [];
                sourceName.push(this.concatArr[0].LDgroup)
                this.dataForAutomap.sourceName = sourceName;

                const sourceColName = [];
                sourceColName.push(this.concatArr[0].LDname)
                this.dataForAutomap.sourceColName = sourceColName;

                const sourceColID = [];
                sourceColID.push(this.concatArr[0].LDcolId)
                this.dataForAutomap.sourceColID = sourceColID;

                this.tosendMapping.push(this.concatCol.LDname, this.concatCol.LDgroup, this.SelectedFirstUid, this.SelectedSecondUid, this.ConcateFinalResultTradeID, this.dataForAutomap)
                // console.log(this.tosendMapping)
              } else { console.log('somthing went wrong at server') }

              const errorTrue = false;
              this.ProjectService.sendMappingbtnstats(errorTrue);
              this.mappingServices.sendConcatDataToMap(this.tosendMapping);

              this.isSelectedconcat = true
              this.concatArr = [];
              this.tosendMapping = [];


            }
          },
          error => {
            const errorTrue = true;
            this.ProjectService.sendMappingbtnstats(errorTrue);

            if (error.error.message === 'Undefined variable $final_result') {
              this.concatWait = false;
              this.concatArr = [];
              this.tosendMapping = [];
              this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Somthing went wrong!\nPlease check your instrument type or source data.', life: 5000 })

            }
            if (error.error.message != 'Undefined variable $final_result') {
              this.concatWait = false;
              this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Somthing went wrong!\nPlease try again.', life: 5000 })

            }
          }
        )
      }, 5000);
    }

  }

  onEdit() {
    this.isSelectedconcat = false;
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
}




