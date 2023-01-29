import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoMapRule, SourceLegacyDataColn } from 'src/app/model/projects.model';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';

@Component({
  selector: 'app-multi-mapping',
  templateUrl: './multi-mapping.component.html',
  styleUrls: ['./multi-mapping.component.css']
})
export class MultiMappingComponent implements OnInit {


  resultColData!: any;
  multipleMappingArray!: any[]
  compareKeyData!: any[];
  resultColName!: any;

  isAddMoreChecked!: boolean;
  isTypeSelected!: boolean


  selectedKeyForFilter!: string;
  afterFilterForNextFiltr!: any;


  FilterResultColn!: any;
  resultcoln!: any

  isWhereDone!: boolean;

  dropdowneView!: any;

  resultcolumFile!: string;
  resultColnName!: string;

  whereKeyFile!: string;
  whereKeyColn!: string;


  formulatext!: string
  formula: any[] = [];

  isWhereDoneFromMapping!: boolean;

  isSelectedWhere!:boolean;


  instrumentTypesDrpValue!:any;
 

  conditionCheck: string[] = ['If', 'Filter', 'Concatenate'];

   dataFitelrRule:AutoMapRule ={}

  constructor(
    private mappingServices: MappingService,
    private passmappingServce: PassMappingService,) {
    this.resultColData = {}
    this.multipleMappingArray = []
    this.compareKeyData = [];

  }

  ngOnInit(): void {

    this.mappingServices.condiStatus.subscribe(checkCondition => {
      if (checkCondition == this.conditionCheck[1]) {
        this.mappingServices.instTypeStatus.subscribe(
          instTypeSelection => {
            if (instTypeSelection) {
              this.isTypeSelected = instTypeSelection
              // this.compareKeyData.splice(0,1);
            }
          }
        );

        if (this.isTypeSelected) {
          this.compareKeyData.splice(0, 1);
          this.compareKeyData = [];

        }
      }
    }

    );

    this.mappingServices.sourceRowD.subscribe(
      srcData => {

        this.resultColData = srcData
        this.resultColData = { ...this.resultColData };

        this.compareKeyData.push(this.resultColData);
 
        // console.log(this.compareKeyData);
        if (this.compareKeyData.length > 1) {
          this.resultcolumFile = this.compareKeyData[0].LDgroup;
          this.resultColnName = this.compareKeyData[0].LDname;
          this.whereKeyFile = this.compareKeyData[1].LDgroup;
          this.whereKeyColn = this.compareKeyData[1].LDname;
       
          const toNeset = Object.values(this.compareKeyData[1].LDcolData);
      
          this.instrumentTypesDrpValue = [...new Set(toNeset)];
          // console.log( this.instrumentTypesDrpValue )
        }



      });

  }



  onFilterKeySelect() {

    //filter Key Coln
    const filterKeySelected = this.selectedKeyForFilter;
    (<any>Object).filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});
    this.afterFilterForNextFiltr = (<any>Object).filter(this.compareKeyData[1].LDcolData, res => res == filterKeySelected);

    const filerKey = [... new Set(Object.keys(this.afterFilterForNextFiltr))]
    // console.log(this.afterFilterForNextFiltr);

    //filterResultColn
    this.resultcoln = this.compareKeyData[0].LDcolData
    // console.log(this.resultcoln)
    this.FilterResultColn = Object.keys(this.resultcoln)
      .filter(key => filerKey.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.resultcoln[key];
        return obj;
      }, {});

    this.isWhereDone = true;

    const sourceName = [];
    sourceName.push(this.compareKeyData[0].LDgroup,this.compareKeyData[1].LDgroup)
    this.dataFitelrRule.sourceName=sourceName; 

    const sourceColName = [];
    sourceColName.push(this.compareKeyData[0].LDname,this.compareKeyData[1].LDname)
    this.dataFitelrRule.sourceColName=sourceColName; 

    const sourceColID = [];
    sourceColID.push(this.compareKeyData[0].LDcolId,this.compareKeyData[1].LDcolId)
    this.dataFitelrRule.sourceColID=sourceColID;

    this.dataFitelrRule.selected_filter_condition = this.selectedKeyForFilter;

    // this.formulatext = this.resultcolumFile+"."+this.resultColnName+"="+this.whereKeyFile+"."+this.whereKeyColn+".WHERE."+this.selectedKeyForFilter
    this.formula.push(this.resultcolumFile, this.resultColnName, this.whereKeyFile, this.whereKeyColn, this.selectedKeyForFilter, this.FilterResultColn,this.dataFitelrRule)
    //  console.log(this.formula)

    // console.log(this.FilterResultColn);



    this.mappingServices.sendDataToMapping(this.formula)
    this.mappingServices.sendFilterInstTypeStatus(this.isWhereDone);

    this.resultColData = {};
    this.compareKeyData = [];
    this.isSelectedWhere = true;

  }


  ngOnDestroy() {
    // this.subscriptionForWhere.unsubscribe();
  }

}


// const resultFiltred = Object.keys(tradeID)
//   .filter(key => fitlerKey.includes(key))
//   .reduce((obj, key) => {
//     obj[key] = tradeID[key];
//     return obj;
//   }, {});

// console.log(resultFiltred);

// unique3 = [...new Set(yourArray.map(propYoureChecking => Object.keys(propYoureChecking)))];