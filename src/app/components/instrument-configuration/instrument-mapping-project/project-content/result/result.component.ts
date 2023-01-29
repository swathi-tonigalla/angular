import { KeyValue } from '@angular/common';
import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { AutoMapRule, Projects } from 'src/app/model/projects.model';
import { ExportService } from 'src/app/services/Export.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';

import { DOCUMENT } from '@angular/common';
import * as moment from 'moment';
import { GlobalConstants } from 'src/app/shared/global.constants';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MappingService } from 'src/app/services/mapping.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

export interface ResultID {
  mappedInstID?: number;
  instrumentName?: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, DoCheck {

  mappedFileResult: any[];
  mappingCheck: boolean;

  project: Projects = {}

  mappedColnData: any[];

  mappedColnData2!: any

  filetrData!: any[]

  activeIndexNumber!: any

  activeIndex: number = 0;

  isDownloadWait: boolean = false;

  savedInstumentData!: any;

  oldrecord!: any;
  newrecordObj!: any;
  isEditNewRecords!: any;
  msgs: Message[] = [];

  checked: boolean = false;
  listResultData: any[] = [];
  panelOpenState = false;
  operationButtonDisable: boolean = true;
  selectedResultCol1: any;
  selectedResultCol2: any;

  private dummy!: any

  automapRuleSave: AutoMapRule = {}

  operationMode: any = [
    { name: "Add", symbol: "+" },
    { name: "Substract", symbol: "-" },
    { name: "Multiply", symbol: "*" },
    { name: "Divide", symbol: "/" },
    { name: "Remainder", symbol: "%" },
  ];
  featureDataValue: {} = {};

  isload!: any;
  isEdit!: any;
  projID!: any;
  checkSelctedtype!: any;
  isAscendic!: boolean;
  param!: any;
  automapSaveRule: Projects = {};
  ddDisabled!: boolean;

  dateBtnDisabled!: boolean;
  dateBtnDisabledMMDDYY!: boolean

  readonly fileurl = GlobalConstants.apiBaseURL + 'api/download-csv';
  readonly flieExcels = GlobalConstants.apiBaseURL + 'api/download-xls'

  // readonly fileurl = 'http://localhost:8000/api/download-csv';
  // readonly flieExcels = 'http://localhost:8000/api/download-xls'

  sendId: ResultID = {};
  isTypesaved!: any

  autmapResult!: any;

  ExistingAutomap!: any;

  testarray!: any;

  drpToggle!: boolean;

  ddmmyy: string = 'DD/MM/YYYY';
  mmddyy: string = 'MM/DD/YYYY';
  isArthmaticCol!: boolean

  constructor(@Inject(DOCUMENT) private document: Document,
    private messageService: MessageService,
    private projectService: ProjectsServiceService,
    private confirmationService: ConfirmationService,
    private mappingService: PassMappingService,
    private exportService: ExportService,
    private mappingServices: MappingService) {
    this.mappedFileResult = [];
    this.mappingCheck = false;
  }

  ngOnInit() {

    this.projectService.getDonloadDisableStatus.subscribe(stat => {
      this.ddDisabled = stat
    }
    )

    this.projectService.getisLoad.subscribe(
      res => {
        // console.log(res);
        this.isload = res.isLoad;
        this.isEdit = res.isEdit;
        this.projID = res.projectID;
        // getProjectIdwiseFromMONGO()
        if (this.isload) {
          this.projectService.getAutoMapResult.subscribe(
            res => {

              if (res.message === 'Auto map successfuly done.') {

                this.projectService.getAutomappingResult(this.projID).subscribe(
                  mapped_result => {
                    //  console.log(mapped_result)
                    if (mapped_result) {

                      let beforeResultdiv = document.getElementById("beforeResult");
                      beforeResultdiv.style.display = 'none'
                      // this.isDownloadWait = true;
                      let automapResult = []
                      automapResult = mapped_result.mappedInstruments
                      const finalRes = this.mappedFileResult.concat(automapResult)
                      this.mappedFileResult = finalRes;
                      //uniqueArrayOfObject();
                      // console.log(this.mappedFileResult);

                      this.mappedFileResult.map(arr =>{this.uniqueArrayOfObject(arr.instumentDataMapped,'mpColID');});
                      console.log(this.mappedFileResult);                      
                      
                      this.projectService.sendAutomapSaveResultTosave(this.mappedFileResult)

                      if (this.mappedFileResult) {
                        // this.isDownloadWait = false;
                        this.mappedFileResult.map(val => val.instumentDataMapped.sort(function (a, b) {


                          let mpColIDA = a.mpColID
                          let mpColIDB = b.mpColID
                          if (mpColIDA < mpColIDB) {
                            return -1;
                          }
                          else if (mpColIDA > mpColIDB) {
                            return 1;
                          }
                          return 0;
                        }));
                      }
                    }
                  }
                )

              }
            }
          )
        }
        if (this.isEdit) {
         
          this.projectService.getprojectData.subscribe(
            loadData => {
              //  console.log(loadData)
              if (loadData) {
                // this.asynawiat = false;
                let beforeResultID = document.getElementById("beforeResult")
                beforeResultID.style.display = 'none'
                this.project = loadData;
                this.mappedFileResult = this.project.mappedInstruments;
                //  this.projectService.onGetMappedInstrument(this.projID).subscribe(mappedData=>{
              //  console.log(this.mappedFileResult)
                this.savedInstumentData = this.mappedFileResult;

                // if (this.isEdit) {
                this.mappingService.mapRes.subscribe(
                  result => {
                    // let beforeResultID = document.getElementById("beforeResult")
                    // beforeResultID.style.display = 'block'
                    //  console.log(result)
                    if (result) {

                      let beforeResultID = document.getElementById("beforeResult")
                      beforeResultID.style.display = 'none'
                      const mappedResult= result;
                      // this.mappedFileResult = mappedResult
                      // this.mappedFileResult
                      //console.log(this.mappedFileResult )
                      let newRecord = mappedResult.map(val => val.instumentDataMapped);
                      // console.log(newRecord)
                      this.checkSelctedtype = this.project.instruments.map(val => val.selectedInstrumentType);
                      this.isTypesaved = this.project.instruments.every(val => val.isInstrumentSaved);
                      // console.log(this.savedInstumentData)
                      //  if (this.checkSelctedtype && this.isTypesaved) {
                      if (this.savedInstumentData) {
                        //  console.log(newRecord)
                        this.savedInstumentData.map(val => val.instumentDataMapped = val.instumentDataMapped.concat(newRecord[0]))
                        this.mappedFileResult = mappedResult.concat(this.savedInstumentData)
                         
                        this.mappedFileResult = this.removeDuplicates(this.mappedFileResult, "mappedInstrumentName")
                         //  console.log(this.mappedFileResult)
                        this.mappedFileResult.map(ele => {
                          ele.instumentDataMapped = ele.instumentDataMapped.filter(filter => (filter.mpgroup === ele.mappedInstrumentName))
                          // console.log(ele.instumentDataMapped)
                          ele.instumentDataMapped.map(
                            res => {
                              if (res.mpgroup === ele.mappedInstrumentName) {
                                ele.instumentDataMapped = this.removeDuplicates(ele.instumentDataMapped, "mpColID");
                              }
                            }
                          )

                        })

                      }
                      // this.mappedFileResult.forEach(element => {
                      //   element.instumentDataMapped.forEach(element1 => {
                      //      element1.mappedColDataCheckbox = false;
                      //     this.featureDataValue[element1.mpColName] = {
                      //       isTrim: false,
                      //       isLowerCase: false,
                      //       isUpperCase: false,
                      //       isStringToNumber: false,
                      //       isTruncateDecimal: false,
                      //       isRemoveZero: false,
                      //       isUKDate: false,
                      //       isUSDate: false,
                      //     };
                      //   });
                      // });
                      this.filetrData = this.mappedFileResult.map(val => val.instumentDataMapped)
                      // console.log(this.featureDataValue);
                      this.mappedFileResult.map(val => val.instumentDataMapped.sort(function (a, b) {

                        let mpColIDA = a.mpColID
                        let mpColIDB = b.mpColID
                        if (mpColIDA < mpColIDB) {
                          return -1;
                        }
                        else if (mpColIDA > mpColIDB) {
                          return 1;
                        }
                        return 0;
                      }));
                      // console.log(this.mappedFileResult)
                      this.projectService.sendProjectDataFromResult(this.mappedFileResult)
                    }
                  }
                );
              }
              // }); // console.log(this.mappedFileResult)
              // }
            }
          )
        }
      }
    )

    if (!this.isload && !this.isEdit) {
      this.mappingService.mapRes.subscribe(
        result => {

          if (result) {

            let beforeResultID = document.getElementById("beforeResult")
            beforeResultID.style.display = 'none'

            this.mappedFileResult = result;
            // this.savedInstumentData = this.mappedFileResult;
            this.mappedFileResult.forEach(element => {
              element.instumentDataMapped.forEach(element1 => {
                element1.mappedColDataCheckbox = false;
                this.featureDataValue[element1.mpColName] = {
                  isTrim: false,
                  isLowerCase: false,
                  isUpperCase: false,
                  isStringToNumber: false,
                  isTruncateDecimal: false,
                  isRemoveZero: false,
                  isUKDate: false,
                  isUSDate: false,
                };
              });
            });
            // this.filetrData = this.mappedFileResult.map(val => val.instumentDataMapped)
            // console.log(this.mappedFileResult);

            this.mappedFileResult.map(val => val.instumentDataMapped.sort(function (a, b) {
              let mpColIDA = a.mpColID
              let mpColIDB = b.mpColID
              if (mpColIDA < mpColIDB) {
                return -1;
              }
              else if (mpColIDA > mpColIDB) {
                return 1;
              }
              return 0;
            }));



          }

        }
      );


    }

  }

  ngDoCheck() {
    // console.log("feature data", this.featureDataValue);
  }

  UniqByKeepLast(data, key) {
    return [
      ...new Map(
        data.map(x => [key(x), x])
      ).values()
    ]
  };



  exportExls(id: any, instrumentName: string) {
    this.sendId.mappedInstID = id;
    this.sendId.instrumentName = instrumentName;
    //  console.log(this.sendId)
    this.sendtoExls(this.sendId);
    this.isDownloadWait = true;
    setTimeout(() => {
      this.document.location.href = this.flieExcels + '/' + instrumentName + '_' + id;
      this.isDownloadWait = false;
    }, 6000);


  }
  exportCSV(id: any, instrumentName: string) {
    this.sendId.mappedInstID = id;
    this.sendId.instrumentName = instrumentName;
    // console.log(this.sendId)
    this.sendIDTojsonCSV(this.sendId);

    this.isDownloadWait = true;
    setTimeout(() => {
      this.document.location.href = this.fileurl + '/' + instrumentName + '_' + id;
      this.isDownloadWait = false;
    }, 6000)


  }


  moveArrayItemToNewIndex(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };


  removeColumn(id: any, instID: any, instrumentName: string, colName: string) {
    this.confirmationService.confirm({
      message: 'Are you sure! do you want to delete ' + colName,
      header: 'Delete ' + colName + ' column',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let index = id
        this.mappedFileResult.map(val => {
          if (instID == val.mappedInstID) {
            val.instumentDataMapped.splice(index, 1)
          }

        }
        )
        this.operationButtonDisable = true
        this.messageService.add({ severity: 'info', summary: 'Delete Confirmed', detail: colName + ' is deleted from ' + instrumentName, life: 5000 })
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });

    //  

  }


  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  isResultColSelected(data: any, eve: any, mappedInstID: any, mpColNam: any) {

    // console.log(data)
    let createbtn = document.getElementById("rsultDeletBtn_" + data.mpColID + "_" + mappedInstID) as HTMLButtonElement;
    // let disablebtn_ =document.getElementById("disablebtn_" + data.mpColID + "_" + mappedInstID);
    if (eve) {
      createbtn.disabled = false;
      // disablebtn_.style.display  = 'none';
      //  disablebtn_
    }
    else {
      createbtn.disabled = true
      // disablebtn_.style.display = 'block'
      // disablebtn_.style.display  = 'block';

    }

    data.mappedColDataCheckbox = eve;
    // if(data.mappedColDataCheckbox ){
    //   createbtn.disabled = false
    // }else{createbtn.disabled = true}
    let index = this.listResultData.findIndex(el => {
      return el.mpColName === data.mpColName;
    })
    if (!this.operationButtonDisable) {

      if (index > -1) {
        this.listResultData.splice(index, 1);
      } else {

        this.listResultData.push(data);
        this.listResultData = [...this.listResultData];
        // console.log(this.listResultData)
        // 
      }

      this.operationButtonDisable = this.listResultData.length === 0 ? true : false;


    }
    // console.log(index)

    if (data.mappedColDataCheckbox) {
      // this.listResultData = []

      this.listResultData.push(data);
      const toNeset = Object.values(this.listResultData);

      this.listResultData = [...new Set(toNeset)];
      // this.listResultData = [...this.listResultData];

      this.operationButtonDisable = false;
      // console.log(this.listResultData)
    } else {
      this.operationButtonDisable = true;
    }


  }

  // trimString() {
  //   let item = this.listResultData;
  //   item.forEach(element => {
  //     for (let key in element.mpcolData) {
  //       if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
  //         element.mpcolData[key] = element.mpcolData[key].trim();
  //       }
  //     }
  //     // this.featureDataValue[element.mpColName].isTrim = true;
  //     this.mappedFileResult.map(
  //       res => {
  //         res.instumentDataMapped.filter(
  //           res => {
  //             if (res.mpColName === element.mpColName) {
  //               res.isTrim = true;
  //               this.automapRuleSave.isTrim = res.isTrim
  //             }

  //           }
  //         )
  //       }
  //     )
  //   });

  //   // console.log( this.mappedFileResult)
  // }

  lowerCaseString() {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
          element.mpcolData[key] = element.mpcolData[key].toLowerCase();
          const saveEnabled = true;
          this.mappingServices.sendMappingStatus(saveEnabled);
        }
      }
      // this.featureDataValue[element.mpColName].isLowerCase = true;
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.isLowerCase = true;
                this.automapRuleSave.isLowerCase = res.isLowerCase
                // this.project.autoMap = this.automapRuleSave;
              }

            }
          )
        }
      )
    });
  }

  upperCaseString() {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
          element.mpcolData[key] = element.mpcolData[key].toUpperCase();
          const saveEnabled = true;
          this.mappingServices.sendMappingStatus(saveEnabled);
        }
      }
      // this.featureDataValue[element.mpColName].isUpperCase = true;
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.isUpperCase = true;
                this.automapRuleSave.isUpperCase = res.isUpperCase
              }

            }
          )
        }
      )
    });
  }

  stringToNumber() {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
          if (!isNaN(Number(element.mpcolData[key]))) {
            element.mpcolData[key] = Number(element.mpcolData[key]);
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
        }
      }
      // this.featureDataValue[element.mpColName].isStringToNumber = true;
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.isStringToNumber = true;
                this.automapRuleSave.isStringToNumber = res.isStringToNumber
              }

            }
          )
        }
      )
    });
  }

  truncateDecimal() {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if ((element.mpcolData[key] && typeof element.mpcolData[key] === 'string') || element.mpcolData[key] && typeof element.mpcolData[key] === 'number') {
          if (!isNaN(Number(element.mpcolData[key]))) {
            element.mpcolData[key] = parseFloat(element.mpcolData[key]).toFixed(2);
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
        }
      }
      // this.featureDataValue[element.mpColName].isTruncateDecimal = true;
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.isTruncateDecimal = true;
                this.automapRuleSave.isTruncateDecimal = res.isTruncateDecimal
              }

            }
          )
        }
      )

    });
  }

  removeLeadingZero() {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
          element.mpcolData[key] = element.mpcolData[key].replace(/^0+/, '');
          const saveEnabled = true;
          this.mappingServices.sendMappingStatus(saveEnabled);
        }
      }
      // this.featureDataValue[element.mpColName].isRemoveZero = true;
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.isRemoveZero = true;
              }

            }
          )
        }
      )
    });
  }

  replaceText(findVal: any, replaceVal: any) {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string' && findVal) {
          var regEx = new RegExp(findVal, 'gi');
          var regChar = new RegExp(/\$/g);
          element.mpcolData[key] = element.mpcolData[key].replace(regEx, replaceVal);
          const saveEnabled = true;
          this.mappingServices.sendMappingStatus(saveEnabled);
        }
      }
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.replaceText = true;
              }

            }
          )
        }
      )


    });

  }
  // dateCheck() {
  //   this.drpToggle = !this.drpToggle
  //   // if(this.drpToggle){
  //   let item = this.listResultData;
  //   item.forEach(element => {
  //     for (let key in element.mpcolData) {
  //       if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
  //         var pattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/;
  //         if (element.mpcolData[key].match(pattern)) {
  //           if (moment(element.mpcolData[key]).format("DD/MM/YYYY")) {
  //             // console.log('DD/MM/YY/true');
  //             this.dateBtnDisabled = true;
  //             // this.dateBtnDisabledMMDDYY=false;
  //           }
  //           else if (moment(element.mpcolData[key]).format("MM/DD/YYYY")) {
  //             // console.log('MM/DD/YY/true');
  //             // this.dateBtnDisabledMMDDYY=true;
  //             this.dateBtnDisabled = false
  //           }
  //         }
  //       }
  //     }
  //   })
  //   // }

  // }
  dateConversionUK() {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
          var pattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/;
          if (element.mpcolData[key].match(pattern)) {
            element.mpcolData[key] = moment(element.mpcolData[key], 'MM/DD/YYYY').format("DD/MM/YYYY");
            if (moment(element.mpcolData[key]).format("MM/DD/YYYY")) {
              this.dateBtnDisabled = false
            }
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);

          }
        }
      }
      // this.featureDataValue[element.mpColName].isUKDate = true;
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.isUKDate = true;
              }

            }
          )
        }
      )

    });
  }

  dateConversionUS() {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if (element.mpcolData[key] && typeof element.mpcolData[key] === 'string') {
          var pattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
          if (element.mpcolData[key].match(pattern)) {
            element.mpcolData[key] = moment(element.mpcolData[key], 'DD/MM/YYYY').format("MM/DD/YYYY");
            if (moment(element.mpcolData[key]).format("DD/MM/YYYY")) {
              this.dateBtnDisabled = true
            }
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }

        }
      }
      // this.featureDataValue[element.mpColName].isUSDate = true;
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.isUSDate = true;
              }

            }
          )
        }
      )
    });
  }

  sliceCharacters(startval: any, endval: any) {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if ((element.mpcolData[key] && typeof element.mpcolData[key] === 'string') || typeof startval === 'string' || typeof endval === 'string') {
          if (startval || endval) {
            var sv = Number(startval);
            var ev = Number(endval);
            if (ev == 0) {
              element.mpcolData[key] = element.mpcolData[key].slice(sv);
            }
            else {
              element.mpcolData[key] = element.mpcolData[key].slice(sv, ev);
            }
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
        }
      }

      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.sliceCharacters = true;
              }

            }
          )
        }
      )

    });
  }

  addNumber(val: any) {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if ((element.mpcolData[key] && (typeof element.mpcolData[key] === 'string' || typeof element.mpcolData[key] === 'number')) || typeof val === 'string') {
          if (!isNaN(Number(element.mpcolData[key])) && val) {
            element.mpcolData[key] = Number(element.mpcolData[key]) + Number(val);
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
          else {
            console.log("Error: Not a Number");
          }
        }
      }

      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.addNumber = true;
              }

            }
          )
        }
      )
    });
  }


  subtractNumber(val: any) {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if ((element.mpcolData[key] && (typeof element.mpcolData[key] === 'string' || typeof element.mpcolData[key] === 'number')) || typeof val === 'string') {
          if (!isNaN(Number(element.mpcolData[key])) && val) {
            element.mpcolData[key] = Number(element.mpcolData[key]) - Number(val);
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
          else {
            console.log("Error: Not a Number");
          }
        }
      }

      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.subtractNumber = true;
              }

            }
          )
        }
      )
    });
  }


  multiplyNumber(val: any) {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if ((element.mpcolData[key] && (typeof element.mpcolData[key] === 'string' || typeof element.mpcolData[key] === 'number')) || typeof val === 'string') {
          if (!isNaN(Number(element.mpcolData[key])) && val) {
            element.mpcolData[key] = Number(element.mpcolData[key]) * Number(val);
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
          else {
            console.log("Error: Not a Number");
          }
        }
      }

      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.multiplyNumber = true;
              }

            }
          )
        }
      )

    });
  }


  divideNumber(val: any) {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if ((element.mpcolData[key] && (typeof element.mpcolData[key] === 'string' || typeof element.mpcolData[key] === 'number')) || typeof val === 'string') {
          if (!isNaN(Number(element.mpcolData[key])) && val) {
            element.mpcolData[key] = Number(element.mpcolData[key]) / Number(val);
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
          else {
            console.log("Error: Not a Number");
          }
        }
      }


      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.divideNumber = true;
              }

            }
          )
        }
      )

    });
  }

  modulusNumber(val: any) {
    let item = this.listResultData;
    item.forEach(element => {
      for (let key in element.mpcolData) {
        if ((element.mpcolData[key] && (typeof element.mpcolData[key] === 'string' || typeof element.mpcolData[key] === 'number')) || typeof val === 'string') {
          if (!isNaN(Number(element.mpcolData[key])) && val) {
            element.mpcolData[key] = Number(element.mpcolData[key]) % Number(val);
            const saveEnabled = true;
            this.mappingServices.sendMappingStatus(saveEnabled);
          }
          else {
            console.log("Error: Not a Number");
          }
        }
      }
      this.mappedFileResult.map(
        res => {
          res.instumentDataMapped.filter(
            res => {
              if (res.mpColName === element.mpColName) {
                res.modulusNumber = true;
              }

            }
          )
        }
      )
    });
  }

  airthmeticOnNumber(val1: any, val2: any, operationMode: any) {
    let item = this.listResultData;
    let obj1 = item.find(o => o.mpColName === val1);
    let obj2 = item.find(o => o.mpColName === val2);
    let colid = Math.random() * (10000 - 650) + 1;
    let roundColID = Math.round(colid);
    let obj3 = {
      mpColID: roundColID,
      instID: obj1.instID,
      mappedColDataCheckbox: false,
      mpColName: obj1.mpColName + ' ' + operationMode.symbol + ' ' + obj2.mpColName,
      mpgroup: obj1.mpgroup,
      mpcolData: {}
    };
    const saveEnabled = true;
    this.mappingServices.sendMappingStatus(saveEnabled);
    if (!this.isEdit) {
      this.mappedFileResult.map(data => {
        data.instumentDataMapped.filter(
          ele => {

            if (ele.mpColName === obj3.mpColName) {
              this.isArthmaticCol = true
              return this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: obj3.mpColName + ' ' + 'is available already!' })
            } else {
              this.isArthmaticCol = false
            }
          }
        )
      });
    }

    if (this.isEdit) {
      this.savedInstumentData.map(data => {
        data.instumentDataMapped.filter(
          ele => {

            if (ele.mpColName === obj3.mpColName) {
              this.isArthmaticCol = true
              return this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: obj3.mpColName + ' ' + 'is available already!' })
            } else {
              this.isArthmaticCol = false
            }
          }
        )
      });
    }


    if (!this.isArthmaticCol) {
      for (let i in obj1.mpcolData) {
        for (let j in obj2.mpcolData) {
          if ((typeof obj1.mpcolData[i] === 'string' || typeof obj1.mpcolData[i] === 'number') && (typeof obj2.mpcolData[j] === 'string' || typeof obj2.mpcolData[j] === 'number') && operationMode) {
            if (!isNaN(Number(obj1.mpcolData[i])) && !isNaN(Number(obj2.mpcolData[j]))) {
              obj1.mpcolData[i] = Number(obj1.mpcolData[i]);
              obj2.mpcolData[j] = Number(obj2.mpcolData[j]);

              if (operationMode.name === "Add") {
                obj3.mpcolData[i] = obj1.mpcolData[i] + obj2.mpcolData[j];
              }
              if (operationMode.name === "Substract") {
                obj3.mpcolData[i] = obj1.mpcolData[i] - obj2.mpcolData[j];
              }
              if (operationMode.name === "Multiply") {
                obj3.mpcolData[i] = obj1.mpcolData[i] * obj2.mpcolData[j];
              }
              if (operationMode.name === "Divide") {
                obj3.mpcolData[i] = obj1.mpcolData[i] / obj2.mpcolData[j];
              }
              if (operationMode.name === "Remainder") {
                obj3.mpcolData[i] = obj1.mpcolData[i] % obj2.mpcolData[j];
              }

            }

          }
          else {
            console.log("Error: Not a Number");
          }
        }
      }
      this.mappedFileResult.forEach(element => {
        element.instumentDataMapped.push(obj3);
      });
      this.filetrData = this.mappedFileResult.map(val => val.instumentDataMapped)
    }

  }

  sendtoExls(id: any) {
    this.exportService.exportExls(id).subscribe(res => { })
  }


  sendIDTojsonCSV(id: any) {
    this.exportService.exportCSV(id).subscribe(res => { })
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  //for feuture use 
  // Order by ascending property value for feuture use 


  valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value.localeCompare(b.value);
  }


  //for feuture use 
  // Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  // clickIndex(id:any){
  //   return this.activeIndexNumber = id
  // }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.mappedFileResult.map(val => val.instumentDataMapped), event.previousIndex, event.currentIndex);
  }

  uniqueArrayOfObject(array, keyToBeUnique) {
    return Object.values(array.reduce((tmp, x) => {
      // You already get a value
      if (tmp[x[keyToBeUnique]]) return tmp;

      // You never envcountered this key
      tmp[x[keyToBeUnique]] = x;

      return tmp;
    }, {}));
  }

}
