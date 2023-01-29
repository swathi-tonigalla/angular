import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { concat, Subscription } from "rxjs";
import { ErrorConst } from '../../../../../../shared/errorConst'
import { AutoMap, AutoMapRule, InstrumentsData, InstrumentType, MappedInstruments, Projects, sourceLegacyautoMap } from '../../../../../../model/projects.model'
import { DestinationManagementService } from 'src/app/services/destination-management.service';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Key } from 'protractor';




@Component({
  selector: 'app-mp-expandable-panel',
  templateUrl: './mp-expandable-panel.component.html',
  styleUrls: ['./mp-expandable-panel.component.css'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
  providers: [ConfirmationService]
})
export class MpExpandablePanelComponent implements OnInit {

  insttypeStatInN!:boolean

  id!: any;
  msgs: Message[] = [];
  isntrumentId!: any
  projects!: Projects[];
  project!: Projects;
  allComplete: boolean = false;
  //DestionaData
  data!: any;
  currentInstrumentID!: any
  mappingRow!: InstrumentsData[][];
  checkedCategoryList: any;
  isMasterSel!: boolean
  isDestionationwrok!: boolean
  rowData!: any;
  rowId!: any;
  groupName!: any;

  afterMappingDonemsgConcat!: any;
  isAutomap: boolean = false
  afterMappingDonemsgcriteria!: any;
  //SourceData
  groupid!: any;
  buttonRowgrp!: any;
  isMappingReady!: boolean;
  sourceData!: any;
  sourceId!: any;
  sourceGroup!: any;

  checking!: boolean;
  mappingDone!: boolean;
  SelecctionError!: boolean;

  categoryList!: any[];
  msgs1: Message[];

  afterMappingDonemsg!: any


  mappedInstruments: MappedInstruments[];
  M_instrument!: MappedInstruments;

  mappedinstData!: MappedInstruments[]
  mappedData?: any;
  colArray!: any;

  // instdata?: MappedInstruments;
  isInstrumentTypeEditAllowed:boolean = false
  resultCheck: boolean
  sourceColData: any[];
  btnHighlight!: boolean;
  defaultText: string;
  mdcheck!: InstrumentsData[];
  allInstrumentTypes!: any[]
  selectedInstType!: any;
  sourceForFilter: any[];
  instTypesFromDestination!: any[];

  sourceFileName!:any

  isTypeSelDisabled!: boolean;

  selectedCol: any
  selectedColForFilter: any[] = [];
  isFilterSelectionDone: boolean = false;

  afterFilter!: any

  isTypeSelected!: boolean;
  selectedType!: string;

  selectionPanelID!: any

  isCanceld!: boolean;

  whereConditionObject!: any;
  whereConditionData: any[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  isFromUID!: boolean

  //if
  isIf: boolean;
  getDataFromIfonly!: any[];
  tempInstTyp:any = [];



  //where
  paneID!: any;
  whereTrue!: any;
  whereRowID!: any;
  isWhereMappingDone!: boolean;


  //concat
  isConcate!: any;
  uidDilog?: boolean;
  isGoingForUID?: boolean;
  concatData!: any;

  //Criteria
  _criteriaData!: any
  fillterInstrumentType!: any;

  isSaved!:boolean;
  onerrMapping!:boolean;

  private insttypeSubscription: Subscription;
  private getDesData!: any;
  private getSourceData!: any;
  private _sourceSubscriptions!: any;

  isUIdSelection: boolean

  conditionSelected: string;
  conditions: string[] = ['If', 'Filter', 'Concatenate', 'Criteria'];
  ChildConditionCheck_ifConcat: string[] = ['If Only', 'If & Concat', 'If & Concat & Criteria'];

  isHardcoded!: boolean;
  hdcdStat!: boolean;

  // chkwher:string = 'where';

  isCriteria!: boolean;
  wentCondition!: boolean

  Mapping_nestedIFstatus!: any;

  hardcodedData!: any[]
  getDataFromIf_concat!: any;
  getDataFromIf_concat_criteria!: any;
  iscancelledInstrument!: boolean;
  recivecanStatus!: boolean;
  projectName!: any

  isload!: boolean;

  mpResult: Projects = {};

  isEdit!: boolean;
  isDisabledrp!:boolean

  sourceLagacydata: Projects = {};
  projID!: any;
  checkSelctedtype!: any;
  istypeSend!: any;
  ismappingGoingOn!: boolean;

  Dsbled_group!: any;
  Dsbled_colID!: any;
  autoMap: AutoMap = {
    OneToOne: [],
    Hardecoded: [],
    Concatinate: [],
    Criteria: [],
    If_Only: [],
    If_Concate: [],
    If_Concate_Criteria: [],
    Filter: [],
    Blank: [],
  };

  alreadyAutomapResponse!: any;

  saveInsttypeData_newProject:InstrumentType = {}
  tempInstrumentTypeData:any =[]

  Hardcoded: any[] = [];
  hardcode: AutoMapRule = {};

  Concate: any[] = [];
  concate: AutoMapRule = {};

  Criteria_automap: any[] = [];
  criteria_automap: AutoMapRule = {};

  Blank_automap: any[] = [];
  blank_automap: AutoMapRule = {};

  OneToOne_automap: any[] = [];
  one_To_one_automap: AutoMapRule = {};

  If_only: any[] = [];
  if_only: AutoMapRule = {};

  If_Concate: any[] = [];
  if_Concate: AutoMapRule = {};

  If_Concate_Criteria: any[] = [];
  if_concate_criteria: AutoMapRule = {};

  Filter: any[] = [];
  filter: AutoMapRule = {};

  sourceLegacyData: sourceLegacyautoMap = {}
  uidDatatus: boolean = false;
  instrumentTypesIsedit!: any
  currentinstID!: any
  instrumenttp!: any;

  isenable!: boolean;
  isloadingAutomap!:boolean;

  // flag for one to one mapping
  isOneToOne: boolean = true;  

  constructor(
    private mappingServices: MappingService,
    private passmappingServce: PassMappingService,
    private confirmationService: ConfirmationService,
    private projectService: ProjectsServiceService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private destinationService: DestinationManagementService
    // private route: ActivatedRoute,
    // private confirmationService: ConfirmationService, 
  ) {
    this.isMasterSel = false
    this.isMappingReady = false;
    this.checking = false;
    this.mappingDone = false;
    this.btnHighlight = false;
    this.resultCheck = false;

    this.project = {};
    this.projects = [];
    this.selectedCol = {};
    this.mappedInstruments = [];
    this.mappedData = {};
    // this.sourceLegacyData.sourcedata = {}
    this.sourceColData = [];

    this.isUIdSelection = false;

    this.colArray = []
    this.M_instrument = {};
    this.mappedinstData = [];

    this.whereTrue = false;
    this.isIf = false;

    this.defaultText = 'Not mapped yet';

    this.sourceForFilter = [];
    // this.whereConditionData =[];
  }

  ngOnInit(): void {

    console.log('this.isOneToOne=',this.isOneToOne);

    this.projectService.getmappingbtnStatus.subscribe(res=>{
      this.onerrMapping = res
    })

this.projectService.getisLoad.subscribe(
      res => {
        // console.log(res);
        this.isload = res.isLoad
        this.isEdit = res.isEdit;
        this.projID = res.projectID
        if (this.isEdit) {
          this.projectService.getInstrumentID.subscribe(instID => {
            this.currentinstID = instID;

            
          });

          if(this.isEdit){
                       
            //if(this.isEdit && this.isInstrumentTypeEditAllowed){
             this.projectService.getInstrumentTypeSourceN.subscribe(fileName=>{
               this.sourceFileName = fileName
               if(this.sourceFileName.sourceName){
                this.mappingServices.sendInstrumentTypeName(this.sourceFileName.sourceName)
                 
              
               }

              //  if( this.sourceFileName.isInstrumentSaved){
              //   let ifNo_ul_ = document.getElementById("ifNo_ul_"+ this.sourceFileName.instrumentID);
              //   //  document.getElementById("mapping_ul_" + this.isntrumentId);
               
              //        ifNo_ul_.style.display='none';
              //        document.getElementById("mapping_ul_" +this.sourceFileName.instrumentID).style.display = 'block'

              //  }
               
               
              // console.log(this.sourceFileName)

             })
           // }
         
        }

          this.projectService.getDisableDrpdownstat.subscribe(res=>{
            this.isDisabledrp = res
          })
          this.projectService.getInstrumentTypesStats.subscribe(
            stat => {
              this.istypeSend = stat

              if (this.istypeSend) {
                setTimeout(() => {
                  this.mappingServices.getAllowtypeStat.subscribe(
                    stats=>{
                      // if(stats){
                        this.isInstrumentTypeEditAllowed = stats;

                      
                        if(!this.isInstrumentTypeEditAllowed){

                           let ifNo_ul_ = document.getElementById("ifNo_ul_"+ this.currentinstID);
                          //  document.getElementById("mapping_ul_" + this.isntrumentId);
                         
                               ifNo_ul_.style.display='none';
                            
                            //  document.getElementById("mapping_ul_" + this.isntrumentId).style.display = 'block'
                            // console.log(this.selectedColForFilter)
                               }else{
                                  // document.getElementById("mapping_ul_" + this.isntrumentId).style.display = 'none'
                                  // document.getElementById("ifNo_ul_"+ this.currentinstID).style.display='flex';
                               }
                      // }
                    }
                  )
                  //  console.log(this.isInstrumentTypeEditAllowed)
                  if(this.isEdit && !this.isInstrumentTypeEditAllowed || this.isload){
                    this.projectService.getInstrumentTypeIdwise(this.projID, this.currentinstID).subscribe(
                      res => {
                          //  if(res.instrumentTypeData){
                           
                          this.checkSelctedtype = this.project.instruments.map(val => val.selectedInstrumentType);
                          //  console.log(this.checkSelctedtype)
                          if (this.checkSelctedtype[0]) {
    
                            this.fillterInstrumentType = res.instrumentTypeData;
                            this.afterFilter = this.fillterInstrumentType[0].instrumentFiltterData
                            //  console.log(this.afterFilter)
  
                            this.mappingServices.sendInstrumetnTypes(this.afterFilter);
                            this.mappingServices.sendFilterInstTypeStatus(this.isFilterSelectionDone);
                          } 
                         }
                      
  
                        // }
                    )
                  }
                  
                }, 3000)
              }
           
        
            }
          )

          this.projectService.getautomapPost(this.projID,this.currentinstID).subscribe(automap => {
            this.alreadyAutomapResponse = automap

            if (this.alreadyAutomapResponse) {
              this.isAutomap = true
            } else {
              this.isAutomap = false
            }
            //  console.log(this.alreadyAutomapResponse)
          });


        }

      });

    
        if(this.isEdit && !this.isload || !this.isload){                
        this.projectService.getDataClear.subscribe(res=>{
          this.isSaved = res;
          if(this.isSaved || this.isEdit && !this.isSaved){
          this.projectService.getautomapExisitingData.subscribe(savedall=>{

               this.alreadyAutomapResponse = savedall;
              this.autoMap = {
                OneToOne: [],
                Hardecoded: [],
                Concatinate: [],
                Criteria: [],
                If_Only: [],
                If_Concate: [],
                If_Concate_Criteria: [],
                Filter: [],
                Blank: [],
              };
                // console.log(this.alreadyAutomapResponse);

                if(Array.isArray(this.alreadyAutomapResponse.Blank) && this.alreadyAutomapResponse.Blank.length){
                  const mergedArray= this.Blank_automap.concat(this.alreadyAutomapResponse.Blank);
                  const duplicateRemoved= this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.Blank =filltredArray 
                  // console.log(this.autoMap.Blank)
                }
                if(Array.isArray(this.alreadyAutomapResponse.Hardecoded) && this.alreadyAutomapResponse.Hardecoded.length){
                  const mergedArray = this.Hardcoded.concat(this.alreadyAutomapResponse.Hardecoded);
                  const duplicateRemoved= this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.Hardecoded = filltredArray
                  // console.log( this.autoMap.Hardecoded)
                }

                if (Array.isArray(this.alreadyAutomapResponse.OneToOne) && this.alreadyAutomapResponse.OneToOne.length) {
                  const mergedArray = this.OneToOne_automap.concat(this.alreadyAutomapResponse.OneToOne);
                  const duplicateRemoved = this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.OneToOne = filltredArray 
                }

                if (Array.isArray(this.alreadyAutomapResponse.If_Only) && this.alreadyAutomapResponse.If_Only.length) {
                  const mergedArray =  this.If_only.concat(this.alreadyAutomapResponse.If_Only)
                  const duplicateRemoved = this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.If_Only= filltredArray 
                }

                if (Array.isArray(this.alreadyAutomapResponse.If_Concate) && this.alreadyAutomapResponse.If_Concate.length) {
                  const mergedArray =  this.If_Concate.concat(this.alreadyAutomapResponse.If_Concate);
                  const duplicateRemoved = this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.If_Concate= filltredArray 
                }

                if (Array.isArray(this.alreadyAutomapResponse.If_Concate_Criteria) && this.alreadyAutomapResponse.If_Concate_Criteria.length) {
                  const mergedArray = this.If_Concate_Criteria.concat(this.alreadyAutomapResponse.If_Concate_Criteria);
                  const duplicateRemoved = this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.If_Concate_Criteria= filltredArray     
                }

                if (Array.isArray(this.alreadyAutomapResponse.Filter) && this.alreadyAutomapResponse.Filter.length) {
                  const mergedArray = this.Filter.concat(this.alreadyAutomapResponse.Filter);
                  const duplicateRemoved = this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.Filter = filltredArray
                }

                if (Array.isArray(this.alreadyAutomapResponse.Concatinate) && this.alreadyAutomapResponse.Concatinate.length) {
                  const mergedArray = this.Concate.concat(this.alreadyAutomapResponse.Concatinate);
                  const duplicateRemoved = this.removeDuplicatesfromArray(mergedArray,'instColID');
                  const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                  this.autoMap.Concatinate = filltredArray
                }
                
               if (Array.isArray(this.alreadyAutomapResponse.Criteria) && this.alreadyAutomapResponse.Criteria.length) {
                const mergedArray =  this.Criteria_automap.concat(this.alreadyAutomapResponse.Criteria);
                const duplicateRemoved = this.removeDuplicatesfromArray(mergedArray,'instColID');
                const filltredArray =  duplicateRemoved.filter(res=>(res.instrumentID == this.currentinstID));
                this.autoMap.Criteria = filltredArray;
                }

          
          });
        }else{
          // if(this.isEdit){
          //   this.projectService.getautomapExisitingData.subscribe(automap => {
          //     if(automap != 'Instrument automap data is not available'|| 
          //     automap != 'Project is not available'){
          //       this.alreadyAutomapResponse = automap 
          //       // console.log(this.alreadyAutomapResponse)
          //     }
             
          //     if (this.alreadyAutomapResponse != 'Instrument automap data is not available'|| 
          //     this.alreadyAutomapResponse != 'Project is not available') {
          //       this.isAutomap = true
          //     } else {
          //       this.isAutomap = false
          //     }
          //       //  console.lo(automap)
          //   }  
          //   );
          //   console.log(this.alreadyAutomapResponse)
          // }
        
          console.log("automap not saved")
        }
        });

       

          this.projectService.getInstrumentID.subscribe(instID => {
            this.currentinstID = instID; 
           // this.project.autoMap.instrumentID = this.currentinstID
            // console.log(instID)       
            // this.projectService.getProjectID_new.subscribe(
              // projectID=>{
                 if(this.currentinstID){
                this.projectService.getautomapExisitingData.subscribe(automap => {
                  if(automap != 'Instrument automap data is not available'|| 
                  automap != 'Project is not available'){
                    this.alreadyAutomapResponse = automap 
                    // console.log(this.alreadyAutomapResponse)
                  }
                 
                  if (this.alreadyAutomapResponse != 'Instrument automap data is not available'|| 
                  this.alreadyAutomapResponse != 'Project is not available') {
                    this.isAutomap = true
                  } else {
                    this.isAutomap = false
                  }
                    //  console.log(automap)
                }  
                 );
                }
              // }
            // )
            this.projectService.getsendInsttypstatN.subscribe(stat => {

              this.insttypeStatInN = stat
               
              if(this.insttypeStatInN){
                // if(this.tempInstTyp.length >0){
                  if(Array.isArray(this.tempInstTyp) && this.tempInstTyp.length){
                    const finalFIlter = this.tempInstTyp.filter(ele=>(ele.instrumentID ==  this.currentinstID))
                    if(finalFIlter){
                      this.mappingServices.sendInstrumetnTypes(finalFIlter[0]?.instrumentTypeData);
                      // console.log(finalFIlter)
                    }
                  }
                 
                  
                // }
              }else{
                console.log("not saved")
                // const typetxt = document.getElementById("lblType_" + this.currentinstID);
                // typetxt.style.display='block'
              }
            
             
            })
       
          })
        }

     
    this.mappingServices.getuidGeneratedAutomapStatus.subscribe(status => { this.uidDatatus = status })
    this.projectService.pId.subscribe(
      projectID => {
        if (projectID) {
          this.id = projectID
        }
      }
    );

    this.mappingServices.getHardCodeValueSetupStatus.subscribe(stat => {
      this.hdcdStat = stat;
      if (!this.hdcdStat) {
        let disabledBtn_ = document.getElementById("disbaleBtn_" + this.Dsbled_group + "_" + this.Dsbled_colID);
        if (disabledBtn_) {
          disabledBtn_.style.display = 'none'
        }
      }
    })

    this.mappingServices.nestedIfStus.subscribe(nestedStuts => {
      this.Mapping_nestedIFstatus = nestedStuts;
    })


    this.mappingServices.condiStatus.subscribe(checkCondition => {
      this.isUIdSelection = checkCondition
    });
    this.projectService.pname.subscribe(
      projectName => {
        if (projectName) {
          this.projectName = projectName;
          this.projectName = this.projectName.replace(/\s/g, "_");
        }
      }
    );
    // setTimeout(() => {
    this.projectService.getprojectData.subscribe((projectData) => {

      if (projectData) {
        document.getElementById("progressSpinMidPan").style.display = 'none'
        this.project = projectData;
        this.currentInstrumentID = this.project.instruments.map(val => val.instrumentName);
        this.mappingRow = this.project.instruments.map(val => val.instrumentsData);

        if (this.isEdit) {
          this.destinationService.getAllDestinations().subscribe(
            (data: any) => {
              //  console.log(data)

              this.instrumentTypesIsedit = data
              this.instrumentTypesIsedit = this.instrumentTypesIsedit.filter(res => {
                if (res.id === this.project.destinationID) {
                  this.instrumenttp = res.insrtumentTypes

                }
              });
              // console.log(this.instrumenttp)
            })
        } else {
          this.allInstrumentTypes = this.project.instrumentTypes;
        }
        this.groupid = this.project.instruments.map(id => id.instrumentID);
        this.mappedData = this.mappedInstruments.map(val => val.instumentDataMapped);

        // this.mpResult = this.project.instruments.map(res=>res.instrumentsData);
        this.checkSelctedtype = this.project.instruments.map(val => val.selectedInstrumentType);
        // console.log( this.checkSelctedtype)
        this.mappingRow.map(val => val.map(val => {
          if (!this.isload && !this.isEdit) {
            val.MDisChecked = false;
            val.isMultiple = false
          };

          if (this.isEdit && !this.checkSelctedtype[0] && val.MDisChecked && val.isMultiple) {
            val.MDisChecked = false;
            val.isMultiple = false
          }


        }))
      }
    })
    // }, 1)

    this.primengConfig.ripple = true;

    this.mappingServices.getCancelStatus.subscribe(
      stat => {
        this.recivecanStatus = stat;

        //  console.log(this.recivecanStatus)
      }
    );


    //getDestinationData
    this.mappingServices.currentMsg.subscribe(
      msg => {
        this.data = msg
        this.isntrumentId = this.data.instrumentID;
        // this.selectionPanelID = "selectType_"+this.isntrumentId

        if (this.isntrumentId) {
          let panelID = document.getElementById("panel_" + this.isntrumentId);
          const typetxt = document.getElementById("lblType_" + this.isntrumentId);
          // let ifNo_ul_ = document.getElementById("ifNo_ul_"+ this.isntrumentId);
         
          const type = this.project.instruments.map(val => val.selectedInstrumentType)
          if (type && typetxt) {
            typetxt.style.display = 'none'
            // ifNo_ul_.style.display='flex';
            // mapping_ul_.style.display = 'none'
            this.isFilterSelectionDone = true
            this.mappingServices.sendFilterInstTypeStatus(this.isFilterSelectionDone);
          }

          // if(this.isInstrumentTypeEditAllowed){
          //   ifNo_ul_.style.display='none';
          //   mapping_ul_.style.display = 'block'
          // }
          this.mappingServices.canStatus.subscribe(stats => {


            this.isCanceld = stats
            if (!this.isCanceld && this.data.isMasterSel) {
              panelID.style.display = 'block';
            } else { panelID.style.display = 'none'; }

          })


          if (!this.data.isMasterSel) {
            panelID.style.display = 'none';
          } else {
            panelID.style.display = 'block';
            //FilterCOln DATA
           
            this.mappingServices.sourceRowD.subscribe(
              slectionForFilter => {

                if (slectionForFilter) {
                  if (this.colArray.length == 0 || this.colArray.length == 1) {
                    this.selectedCol = slectionForFilter;

                    this.selectedCol = { ...this.selectedCol };
                    const type = this.project.instruments.map(val => val.selectedInstrumentType)
                    // if(!type){
                    this.selectedColForFilter.push(this.selectedCol);

                    if (this.isEdit && !this.sourceFileName?.isInstrumentSaved || !this.isEdit) {
                        //console.log(this.sourceFileName);
                       this.mappingServices.sendInstrumentTypeName(this.selectedColForFilter[0].LDgroup)
                    }

                    if (this.selectedColForFilter.length > 1) {
                      this.selectedColForFilter.splice(1, 1);
                    }

                    // console.log(this.selectedColForFilter);
                  }

                }

                if (this.colArray.length >= 1) {
                   console.log('mapping is done');
                  // return;
                }
              }

            )
            //END FilterCOln DATA
          }


        }

      }
    );
    

    this.mappingServices.getuidStatus.subscribe(checkSt => {
      this.isFromUID = checkSt;

    });

    //getDestionRowData
    this.mappingServices.desRowMsg.subscribe(
      rowMsg => {
        this.rowData = rowMsg
        this.rowId = this.rowData.colId;
        this.groupName = this.rowData.group;

        // console.log(newSourcerowButtonID)
        // console.log( this.groupName)

        if (this.rowId) {
          let newrowID = document.getElementById("mappingrow_" + this.groupName + "_" + this.rowId);


          if (!this.rowData.isDestination) {

            newrowID.style.display = 'none';
          } else {

            newrowID.style.display = 'block';
          }
          // console.log(newrowID)
        }
      });

    this.mappingServices.sourceRowD.subscribe(
      status => {
        if (status.isSourceDataRow) {
          this.btnHighlight = status.isSourceDataRow
        }

        else {
          this.btnHighlight = false
        }

      }
    )

  }
  onEnabledrp() {
    this.isTypeSelDisabled = !this.isTypeSelDisabled
  }

  remove() {
    this.selectedColForFilter = []
  }

  closebox(group: any, id: any) {
    let hrdpanel = document.getElementById("hardcoded_" + group + "_" + id);
    hrdpanel.style.display = 'none'
    let hardcodeCloseButton = document.getElementById("hdcClosebtn_" + group + "_" + id);
    hardcodeCloseButton.style.display = 'none'
    this.isOneToOne = true;
    console.log('closebox - this.isOneToOne=',this.isOneToOne);
  }

  hardcoded(group: any, id: any) {
    this.isHardcoded = !this.isHardcoded;
    let disabledBtn_ = document.getElementById("disbaleBtn_" + group + "_" + id);
    if (disabledBtn_) {
      disabledBtn_.style.display = 'block'
    }
    this.hardcodedData = [];
    this.mappedData = {};
    this.M_instrument = {};
    let hdcd = document.getElementById("hdcRow_" + group + '_' + id);
    let hdcClosebtn_ = document.getElementById("hdcClosebtn_" + group + '_' + id);
    let disbaleBtn_ = document.getElementById("disbaleBtn_" + + group + '_' + id);
    let mappedbtn = "mappingButton_" + group + "_" + id;
    this.Dsbled_group = group;
    this.Dsbled_colID = id;
    let creatElementbtn = document.getElementById(mappedbtn) as HTMLInputElement;
    this.whereRowID = group + id;
    if (disbaleBtn_) {
      disbaleBtn_.style.display = 'none';
    }
    const errorTrue = false;
      this.projectService.sendMappingbtnstats(errorTrue)
    if (mappedbtn && this.isHardcoded) {
      creatElementbtn.disabled = false;
      this.hdcdStat = true;
    } else {
      creatElementbtn.disabled = true;
      this.hdcdStat = false;
    }
    if (this.isHardcoded) {
      hdcd.style.display = 'block';
      hdcClosebtn_.style.display = 'block';
    } else {
      hdcd.style.display = 'none'
      hdcClosebtn_.style.display = 'none';
    }

    const isHRDselected = true;
    this.isOneToOne = false;
    console.log('hardcoded - this.isOneToOne=',this.isOneToOne);

    this.mappingServices.sendHrdCOdeStatus(isHRDselected)
    //   hdcd = document.getElementById("hdcRow_" + group + '_' + id);
    hdcClosebtn_.innerHTML = "X";
    // let xbutton = document.getElementById("hardcodebutton");
    // // xbutton.innerHTML = "X";
    // if( xbutton.innerHTML == "X")
    // {
    //   xbutton.innerHTML = "H";
    // }
    // else{
    //   xbutton.innerHTML = "X";
    // }

  }

  closeHardcode(item: any, group: any, id: any) {
    let hdcd = document.getElementById("hdcRow_" + group + '_' + id);
    let hdcClosebtn_ = document.getElementById("hdcClosebtn_" + group + '_' + id);
    let mappedbtn = "mappingButton_" + group + "_" + id;
    let creatElementbtn = document.getElementById(mappedbtn) as HTMLInputElement;
    creatElementbtn.disabled = false;
    this.hdcdStat = false;
    let disbaleBtn_ = document.getElementById("disbaleBtn_" + + group + '_' + id);
    if (disbaleBtn_) {
      disbaleBtn_.style.display = 'none';
    }

    this.ismappingGoingOn = false;
    item.MDisChecked = false;
    //  if (this.isHardcoded) {
    // hdcd.style.display = 'block';
    //   hdcClosebtn_.style.display = 'block';
    //   } else {
    hdcd.style.display = 'none'
    hdcClosebtn_.style.display = 'none';
    // }
    const isHRDselected = false;
    this.isOneToOne = true;
    console.log('closeHardcode - this.isOneToOne=',this.isOneToOne);
    this.mappingServices.sendHrdCOdeStatus(isHRDselected)

    hdcClosebtn_.innerHTML = "H";
    //  let xbutton = document.getElementById("hardcodebutton");
    //   // xbutton.innerHTML = "X";
    //   if( xbutton.innerHTML == "X")
    //   {
    //     xbutton.innerHTML = "H";
    //   }
    //   else{
    //     xbutton.innerHTML = "X";
    //   }
  }

  onOpenUidDIlog(id: any, inst: any) {
    this.isGoingForUID = !this.isGoingForUID;
    let uidpnle = document.getElementById("uid_" + id);
    if (this.isGoingForUID) {
      uidpnle.style.display = 'block';
      this.isUIdSelection = true;
      // flag for one to one mapping
      this.isOneToOne = false; 
      console.log( 'onOpenUidDIlog -isGoingForUID- this.isOneToOne',this.isOneToOne);
      inst.instrumentsData.map(res => {
        res.isMultiple = false;
      })
      // mappingList.isMultiple = false;
      if(this.isload){
        this.projectService.clearAutomapUID().subscribe(res=>{})
      }
    } else {
      uidpnle.style.display = 'none';
      this.isUIdSelection = false;
      // flag for one to one mapping
      this.isOneToOne = true; 
      console.log( 'onOpenUidDIlog -Not-GoingForUID this.isOneToOne',this.isOneToOne);
    }
    this.mappingServices.sendCondition(this.isUIdSelection);
  }

  OnresetHardcode(mapGroup: any, mapID: any) {
    let hrdcoded_pan = document.getElementById("hardcoded_" + mapGroup + "_" + mapID);
    hrdcoded_pan.style.display = 'none';
    const isRest = true
    this.passmappingServce.sendResetStats(isRest);
  }

  resetMapping(group: any, colId: any) {
    let hidePanel = document.getElementById("whereDone_" + group + "_" + colId);
    hidePanel.style.display = 'none'
  }

  onSelecttype(instrumentName:string,lblID: any, typ: any) {
      let msg ='Please ensure selected '+typ+' Instrument type is correct for '+instrumentName+'.'+' You will not be able to change the instrument type once you start mapping columns or thereafter at a future date.'
    this.confirmationService.confirm({
      message: msg,
      header: 'Instrument Type',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.router.navigate(['instrumentmapping'])
        // private messageService: MessageService,
        this.selectedType = typ
        if (this.isntrumentId == lblID) {
          let hideLbl = document.getElementById("lblType_" + lblID);
          let ulPanel = document.getElementById("mapping_ul_" + lblID)
          let ifNo_ul_ = document.getElementById("ifNo_ul_"+ lblID)
       
          this.isTypeSelDisabled = false;
    
          this.isTypeSelected = true;
    
          this.isFilterSelectionDone = true;
          this.SelecctionError = false;
    
          const filterKey = this.selectedType;
    
          (<any>Object).filter = (obj, predicate) =>
            Object.keys(obj)
              .filter(key => predicate(obj[key]))
              .reduce((res, key) => (res[key] = obj[key], res), {});
    
          this.afterFilter = (<any>Object).filter(this.selectedColForFilter[0].LDcolData, res => res == filterKey);
          //  console.log( this.afterFilter)
          // if (this.afterFilter) {
        
          this.project.instruments.map(
            val => {
              if (val.instrumentID == lblID) {
                val.selectedInstrumentType = this.selectedType
                val.sourceName = this.selectedColForFilter[0].LDgroup
                let sourceID = this.project.sourceLegacy.filter(res => this.selectedColForFilter[0].LDgroup === res.sourceName);
                val.instTypeSourceID = sourceID[0].sourceID;
                const colds: any[] = []
                colds.push(this.selectedColForFilter[0].LDcolId)
                val.LDcolId = colds;
                val.instTypeSourceColName = this.selectedColForFilter[0].LDname;
                const tyepsaved = true;
                val.isInstrumentSaved = tyepsaved;
                  if(val.isInstrumentSaved){
                    ulPanel.style.display = 'block';
                      ifNo_ul_.style.display= 'none';
                    hideLbl.style.display = 'none'
                  }else{
                    ulPanel.style.display = 'none';
                    ifNo_ul_.style.display= 'flex'
                    hideLbl.style.display = 'block'
                  }
                if (this.isEdit) {
                  val.projectID = this.projID
                } else {
                  val.projectID = this.id
                }
              }
              //  console.log(val)
            }
          )
    
          // }
            //   let counts = this.tempInstrumentTypeData.reduce((acc, curr)=>{
              //     const str = JSON.stringify(curr);
              //     acc[str] = (acc[str] || 0) + 1;
              //     return acc;
              //  }, {});
              //  console.log(counts)
    
          if(!this.isEdit && !this.isload){
            this.saveInsttypeData_newProject.instrumentID = this.isntrumentId;
            this.saveInsttypeData_newProject.instrumentTypeData = this.afterFilter;
            // this.saveInsttypeData_newProject = {...this.saveInsttypeData_newProject}
            this.tempInstrumentTypeData.push(this.saveInsttypeData_newProject);
             this.saveInsttypeData_newProject = {}
     
             const duplicateRemove= this.removeDuplicates(this.tempInstrumentTypeData, "instrumentID")
             this.tempInstTyp = duplicateRemove
     
          }
    
          this.mappingServices.sendInstrumetnTypes(this.afterFilter);
          this.mappingServices.sendFilterInstTypeStatus(this.isFilterSelectionDone);
        }
        else {
          console.log("ID not matched")
        }
            
        this.messageService.add({ severity: 'info', summary: 'Info', detail:typ+' is selected for '+instrumentName , life: 9000 }) 

      }
    });
  }

  isMappingRowSelected(rowData: any, eve: any) {
    // if(this.isOneToOne){
    //   this.isOneToOne = false;
    // }
    // else{
    //   this.isOneToOne = true;
    // }
    //  console.log(rowData)
    let disblebtn = document.getElementById("disbaleBtn_" + rowData.group + "_" + rowData.colId);
    if (eve) {
      this.ismappingGoingOn = true;
    }else{
      this.ismappingGoingOn = false;
      this.onerrMapping =  false
    }
    

    this.mappingRow.every((item: any) => {

      return item.MDisChecked == eve;

    })
    if (this.isEdit) {

      disblebtn.style.display = 'none'
    }
    if (!this.isload) {

      disblebtn.style.display = 'none'
    }
    const errorTrue = false;
    this.projectService.sendMappingbtnstats(errorTrue)
    
    this.mappingServices.sendDestinationStatus(eve)
    this.passmappingServce.sendDestinationDataTomappedResult(rowData)
    this.getDesData = rowData;
    this.project.instruments.map(val => val.instrumentsData.map(val => {

      if (val.isMultiple) {
        val.isMultiple = false
      }

    }
    ));

  }


  isMapping(check: boolean, id: any) {

    this.mappingRow.every((item: any) => {

      if (item.colId == id) {
        item.MDisDesabled = check;
      }
      return item.MDisDesabled = false
    })
  }

  onConditionCheck(eveData: any, eve: any, rowID: any, rowName: any) {

    let ifPanel = document.getElementById("ifCondition_" + rowName + "_" + rowID);
    let wherePanel = document.getElementById("where_" + rowName + "_" + rowID);

    let WhereDoneAns = document.getElementById("whereDone_" + rowName + "_" + rowID);
    let concatPanel = document.getElementById("concat_" + rowName + "_" + rowID);

    let criteria = document.getElementById("citeria_" + rowName + "_" + rowID);
    let disbaleBtn_ = document.getElementById("disbaleBtn_" + rowName + "_" + rowID);

    // "concat_"
    this.whereRowID = rowName + rowID;
    //  this.wentCondition =true
    this.mappingRow.every((item: any) => {

      item.MDwhereChecked == eve;
      item.MDCondition = eveData;
      //ifCondition
      if (item.MDCondition === this.conditions[0]) {
        this.isIf = true;
        this.paneID = ifPanel;
        ifPanel.style.display = 'block';
        // disbaleBtn_.style.display = 'block'
        let conditionif = this.conditions[0];
        this.mappingServices.sendCondition(conditionif);
        this.whereTrue = false;
        this.isConcate = false;
        this.isCriteria = false;
        this.isOneToOne = false;
        console.log('isIf - this.isOneToOne=',this.isOneToOne);
        this.isenable = true
        this.mappingServices.sendEnableStatusTOSource(this.isenable)

      } else {
        ifPanel.style.display = 'none';
        //disbaleBtn_.style.display = 'none'
        this.isIf = false;
         
      }

      //Where Condition
      if (item.MDCondition === this.conditions[1]) {
        this.whereTrue = true;
        this.paneID = wherePanel;
        wherePanel.style.display = 'block';

        let conditionW = this.conditions[1];
        this.mappingServices.sendCondition(conditionW);
        this.isIf = false;
        this.isConcate = false;
        this.isCriteria = false;
        this.isOneToOne = false;
        console.log('whereTrue - this.isOneToOne=',this.isOneToOne);
        this.isenable = true
        this.mappingServices.sendEnableStatusTOSource(this.isenable)
      }
      else {
        wherePanel.style.display = 'none';
        WhereDoneAns.style.display = "none";
        this.whereTrue = false;
        
      }

      //Concat condition
      if (item.MDCondition === this.conditions[2]) {
        this.isConcate = true;
        concatPanel.style.display = 'block';

        let concatCondition = this.conditions[2];
        this.mappingServices.sendCondition(concatCondition);
        this.isIf = false;
        this.whereTrue = false;
        this.isCriteria = false;
        this.isOneToOne = false;
        console.log('isConcate - this.isOneToOne=',this.isOneToOne);
        this.isenable = true
        this.mappingServices.sendEnableStatusTOSource(this.isenable)
      } else {
        concatPanel.style.display = 'none';
        this.isConcate = false;
         
      }

      //criteria
      if (item.MDCondition === this.conditions[3]) {
        this.isCriteria = true;
        criteria.style.display = 'block';
        let criteriaCondition = this.conditions[3];
        this.mappingServices.sendCondition(criteriaCondition);
        this.isIf = false;
        this.whereTrue = false;
        this.isConcate = false;
        this.isOneToOne = false;
        console.log('isCriteria - this.isOneToOne=',this.isOneToOne);
        this.isenable = true
        this.mappingServices.sendEnableStatusTOSource(this.isenable)
      } else {
        criteria.style.display = 'none';
        this.isCriteria = false;
         
      }
    })
    this.passmappingServce.sendConditionsToOtherCompo(eveData);
  }

  multipleMappingButton(mappingList: any, group: any, colId: any) {
    mappingList.isMultiple = !mappingList.isMultiple
    let ifPanel = document.getElementById("ifCondition_" + group + "_" + colId);
    let multiMappingPanel_ = document.getElementById("multiMappingPanel_" + group + "_" + colId);
    let radiogroup_ = document.getElementById("radiogroup_" + group + "_" + colId) as HTMLInputElement


    if (multiMappingPanel_) {
      multiMappingPanel_.style.display = 'block'
    }

    if (!mappingList.isMultiple) {
      this.isIf = false;
      this.whereTrue = false;
      this.isConcate = false;
      this.isCriteria = false;
      this.isOneToOne = true;
      console.log('multipleMappingButton - this.isOneToOne=',this.isOneToOne);
      this.hardcode = {};
      this.concate = {};
      this.criteria_automap = {}
      this.one_To_one_automap = {};
      this.blank_automap = {};
      this.if_concate_criteria = {};
      this.if_Concate = {};
      this.filter = {};
      this.if_only = {};
      this.hardcodedData = [];
      const errorTrue = false;
      this.projectService.sendMappingbtnstats(errorTrue)
      // radiogroup_.value = null;
      this.mappingRow.every((item: any) => {

        item.MDconditionChecked = null
      }
      )

    }

    let mappedbtn = "mappingButton_" + group + "_" + colId;
    let creatElementbtn = document.getElementById(mappedbtn) as HTMLInputElement;
    if (mappedbtn) {
      if (creatElementbtn.disabled) {
        creatElementbtn.disabled = false
      } else { creatElementbtn.disabled = false }
    }

    let disabledBtn_ = document.getElementById("disbaleBtn_" + group + "_" + colId);
    if (disabledBtn_) {
      if (disabledBtn_.style.display = 'block') {
        disabledBtn_.style.display = 'none'
      }
    }
  }

  mapping(rowData: any, mapGroup: any, mapID: any, colName: string, mappingList: any) {

    // this.isOneToOne = true;
    let btnID = "result_" + mapGroup + "_" + mapID;
    let creatElement = document.getElementById(btnID);

    let compareIDFormultiple = mapGroup + mapID;

    let mappedbtn = "mappingButton_" + mapGroup + "_" + mapID;
    let creatElementbtn = document.getElementById(mappedbtn) as HTMLInputElement;

    let WhereDone = "whereDone_" + mapGroup + "_" + mapID;
    let whereateWhereDonePanel = document.getElementById(WhereDone) as HTMLInputElement;

    let HidewherePanel = document.getElementById("where_" + mapGroup + "_" + mapID);

    let hrdcoded = document.getElementById("hardcoded_" + mapGroup + "_" + mapID);
    let HaarcodedPanel = document.getElementById("hdcRow_" + mapGroup + "_" + mapID);

    let concatP = document.getElementById("concat_" + mapGroup + "_" + mapID);
    let criteriaP = document.getElementById("citeria_" + mapGroup + "_" + mapID);

    let concaHeading = document.getElementById("concatH4_" + mapGroup + "_" + mapID);
    let criteriaHeading = document.getElementById("criteriaH4_" + mapGroup + "_" + mapID);
    let DefaultHeading = document.getElementById("default_" + mapGroup + "_" + mapID);


    let ifCondition = document.getElementById("ifCondition_" + mapGroup + "_" + mapID)
    let skeleton_ = document.getElementById("skeleton_" + mapGroup + "_" + mapID);
    let disable_panel_ = document.getElementById("disable_panel_" + mapGroup + "_" + mapID)

    let dropdown = document.getElementById("instrumentTypeFor_"+mapGroup) as HTMLInputElement

    this.project.instruments.map(instruments=>{
      if(instruments.instrumentID==rowData.instrumentID){
        instruments.isMappingStartedForInstrument = true;
      } 
    })

    this.closebox(mapGroup, mapID);
    // if(this.isntrumentId == instrumentID){

    // skeleton_.style.display = 'block';
    // disable_panel_.style.display = 'none'
    this.resultCheck = true;
    this.M_instrument.instumentDataMapped = [];
    this.hardcodedData = [];
    this.M_instrument.mappedInstID = rowData.instrumentID;
    this.M_instrument.mappedInstrumentName = rowData.instrumentName;
    this.M_instrument = { ...this.M_instrument }
    this.mappedinstData.push(this.M_instrument)
    // console.log(this.getDesData);
    this.mappedData.mpColName = colName;
    this.mappedData.mpgroup = mapGroup;
    this.mappedData.instID = rowData.instrumentID;
    this.mappedData.mpColID = mapID;
    //getWhereCOnditionData
    if (!this.whereTrue &&
      !this.isConcate &&
      !this.isHardcoded &&
      !this.isCriteria &&
      !this.isIf &&
      !this.isIf && this.Mapping_nestedIFstatus != this.ChildConditionCheck_ifConcat[1] &&
      !this.isIf && this.Mapping_nestedIFstatus != this.ChildConditionCheck_ifConcat[2]
    ) {    //getSourceData
      this._sourceSubscriptions = this.mappingServices.sourceRowD.subscribe(
        sourceRow => {

          this.sourceData = sourceRow;
          this.sourceId = this.sourceData.LDcolId;
          this.sourceGroup = this.sourceData.LDgroup;
          this.sourceColData = sourceRow.LDcolData;

          if (this.sourceId) {
            if (this.sourceData.isSourceDataRow) {
              this.isMappingReady = this.sourceData.isSourceDataRow
              this.mappedData.mappedFile = this.sourceGroup
              this.mappedData.mappedSourceName = sourceRow.LDname;
              const onetooneData = this.sourceColData;
              const oneTooneFillterData = this.afterFilter
              const tradeIDkey = [... new Set(Object.keys(oneTooneFillterData))];
              const FinalResultTradeID = Object.keys(onetooneData)
                .filter(key => tradeIDkey.includes(key))
                .reduce((obj, key) => {
                  obj[key] = onetooneData[key];
                  return obj;
                }, {});
              this.mappedData.mpcolData = FinalResultTradeID;
              //  this.mappedData = this.mappedData;
              // console.log(this.mappedData.mpcolData);
              console.log('maplist check',mappingList);
              // one to one mapping 
              if (this.mappedData.mpcolData && this.isOneToOne) {
                this.one_To_one_automap.projectID = this.project.id;
                console.log('this.one_To_one_automap.projectID.....',this.one_To_one_automap.projectID)
                this.one_To_one_automap.instrumentName = mapGroup;
                this.one_To_one_automap.instrumentID =  this.currentinstID;
                this.one_To_one_automap.instColName = mappingList.name;
                this.one_To_one_automap.instColID = mapID;
                this.one_To_one_automap.resultValue = '';

                const one2one_Source_Name = [];
                one2one_Source_Name.push(sourceRow.LDgroup)
                this.one_To_one_automap.sourceName = one2one_Source_Name;
                // console.log(one2one_Source_Name)
                const one2one_sourceColName = [];
                one2one_sourceColName.push(sourceRow.LDname)
                this.one_To_one_automap.sourceColName = one2one_sourceColName;
                console.log('one2one_sourceColName...',one2one_sourceColName);
                const one2one_sourceColID = [];
                one2one_sourceColID.push(sourceRow.LDcolId)
                console.log('one2one_sourceColID...',one2one_sourceColID);
                this.one_To_one_automap.sourceColID = one2one_sourceColID;

                this.one_To_one_automap.condition = 'OneToOne';

               // this.OneToOne_automap = [...this.OneToOne_automap]
                this.OneToOne_automap.push(this.one_To_one_automap);

                const filltredOneToOne=  this.OneToOne_automap.filter(res=>(res.instrumentID == this.currentinstID))
                const uniqoneToOneAutomap = this.removeDuplicatesfromArray(filltredOneToOne,'instColID');
                // this.OneToOne_automap = this.OneToOne_automap.reduce((a, b) => {
                //   if (!a.find(data => data.instColName === b.instColName)) {
                //     a.push(b);
                //   }
                //   return a;
                // }, []);
               

                if (this.isEdit || !this.isload) {
                  if (Array.isArray(this.alreadyAutomapResponse.OneToOne) && this.alreadyAutomapResponse.OneToOne.length &&
                    Array.isArray(uniqoneToOneAutomap) && uniqoneToOneAutomap.length) {
                    this.autoMap.OneToOne = uniqoneToOneAutomap.concat(this.alreadyAutomapResponse.OneToOne);
                  } else {                   
                      this.autoMap.OneToOne = uniqoneToOneAutomap
                   // this.project.autoMap = this.autoMap
                  }
                }
                else {
                  this.autoMap.OneToOne = uniqoneToOneAutomap
                 // this.project.autoMap = this.autoMap
                }
              }

        

            }
          }
        });
    }

    if (!this.whereTrue &&
      !this.isConcate &&
      !this.isHardcoded &&
      !this.isCriteria &&
      !this.isIf &&
      this.one_To_one_automap.condition === 'OneToOne'
    ) {
      creatElement.innerText = this.mappedData.mappedFile + "." + this.mappedData.mappedSourceName
      creatElement.className = "mappedP"
      // console.log(creatElement.innerText)
      this.project.instruments.map(val => val.instrumentsData.
        map(res => {
          if (res.colId == mapID && res.group === mapGroup) {
            res.mappedResultText = creatElement.innerText;
            console.log('res.mappedResultText=',res.mappedResultText);
          }
        }
        ))
    }


    if (this.isIf &&
      this.Mapping_nestedIFstatus != this.ChildConditionCheck_ifConcat[1] &&
      this.Mapping_nestedIFstatus != this.ChildConditionCheck_ifConcat[2]
    ) {
      if (this.whereRowID == compareIDFormultiple) {
        this.mappingServices.ifonlyData.subscribe(
          data => {
            if (data) {
              this.getDataFromIfonly = data
              this.mappedData.mpcolData = this.getDataFromIfonly[3];

              //automap
              this.if_only.projectID = this.project.id;
              this.if_only.instrumentName = mapGroup;
              this.if_only.instrumentID =  this.currentinstID;
              this.if_only.instColID = mapID;
              this.if_only.instColName = mappingList.name;
              this.if_only.resultValue = '';
              this.if_only.uidsName = this.getDataFromIfonly[4].uidsName;
              this.if_only.uidsLength = this.getDataFromIfonly[4].uidsLength;
              this.if_only.actualUidName = this.getDataFromIfonly[4].actualUidName;
              this.if_only.uidID = this.getDataFromIfonly[4].uidID;
              this.if_only.sourceName = this.getDataFromIfonly[4].sourceName;
              this.if_only.sourceColName = this.getDataFromIfonly[4].sourceColName;
              this.if_only.sourceColID = this.getDataFromIfonly[4].sourceColID;
              this.if_only.Condition_Value = this.getDataFromIfonly[4].Condition_Value;
              this.if_only.selectedIf_condition = this.getDataFromIfonly[4].selectedIf_condition
              this.if_only.condition = 'If_only'
              // console.log(this.hardcode);
              // this.If_only = [...this.If_only]
              this.If_only.push(this.if_only);
              // this.If_only = this.If_only.reduce((a, b) => {
              //   if (!a.find(data => data.instColName === b.instColName)) {
              //     a.push(b);
              //   }
              //   return a;
              // }, []);

              const filltredIfOnly=  this.If_only.filter(res=>(res.instrumentID == this.currentinstID))
                const uniqoneIfOnlyAutomap = this.removeDuplicatesfromArray(filltredIfOnly,'instColID');

                if(this.autoMap.OneToOne.length>0){
                  this.autoMap.OneToOne.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                      this.autoMap.OneToOne=[];
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                }

              if (this.isEdit || !this.isload) {
                if (Array.isArray(this.alreadyAutomapResponse.If_Only) && this.alreadyAutomapResponse.If_Only.length &&
                  Array.isArray(uniqoneIfOnlyAutomap) && uniqoneIfOnlyAutomap.length) {
                  this.autoMap.If_Only = uniqoneIfOnlyAutomap.concat(this.alreadyAutomapResponse.If_Only);

                } else {       
                    this.autoMap.If_Only = uniqoneIfOnlyAutomap;
                 // this.project.autoMap = this.autoMap
                }
              } else {
                this.autoMap.If_Only = uniqoneIfOnlyAutomap
               // this.project.autoMap = this.autoMap
              }
            }
          }
        );


      }
      // if(this.autoMap.OneToOne.length >=1){
      //   this.autoMap.OneToOne.splice(0,1);
      //   this.autoMap.OneToOne = []
      // } 
    }

    if (this.isIf &&
      this.Mapping_nestedIFstatus != this.ChildConditionCheck_ifConcat[1] &&
      this.Mapping_nestedIFstatus != this.ChildConditionCheck_ifConcat[2]
    ) {
      if (this.getDataFromIfonly?.length) {
        //  console.log(this.getDataFromIfonly)
        creatElement.innerText = this.getDataFromIfonly[0] + '.' + this.getDataFromIfonly[1] + ' IF = ' + this.getDataFromIfonly[2];
        this.project.instruments.map(val => val.instrumentsData.
          map(res => {
            if (res.colId == mapID && res.group === mapGroup) {
              res.mappedResultText = creatElement.innerText
            }
          }
          ))
        creatElement.className = "mappedP";
        this.afterMappingDonemsg = 'If Condition Mapping is done!'
        whereateWhereDonePanel.style.display = "flex";
        ifCondition.style.display = "none";

      } else {
        // console.log(this.getDataFromIfonly)
        creatElement.innerText = ErrorConst.errorBlankMap
        creatElement.className = "classRed"
      }

    }


    if (this.isIf && this.Mapping_nestedIFstatus === this.ChildConditionCheck_ifConcat[1]) {
      this.mappingServices.get_if_Data.subscribe(data => {
        if (data) {
          this.getDataFromIf_concat = data;
          this.mappedData.mpcolData = this.getDataFromIf_concat[3];

          //automap
          this.if_Concate.projectID = this.project.id;
          this.if_Concate.instrumentName = mapGroup;
          this.if_Concate.instrumentID =  this.currentinstID;
          this.if_Concate.instColID = mapID;
          this.if_Concate.instColName = mappingList.name;
          this.if_Concate.resultValue = '';
          this.if_Concate.uidsName = this.getDataFromIf_concat[4].uidsName;
          this.if_Concate.uidsLength = this.getDataFromIf_concat[4].uidsLength;
          this.if_Concate.actualUidName = this.getDataFromIf_concat[4].actualUidName;
          this.if_Concate.uidID = this.getDataFromIf_concat[4].uidID;
          this.if_Concate.sourceName = this.getDataFromIf_concat[4].sourceName;
          this.if_Concate.sourceColName = this.getDataFromIf_concat[4].sourceColName;
          this.if_Concate.sourceColID = this.getDataFromIf_concat[4].sourceColID;
          this.if_Concate.Condition_Value = this.getDataFromIf_concat[4].Condition_Value;

          this.if_Concate.uidID_2 = this.getDataFromIf_concat[4].uidID_2;
          this.if_Concate.uidsLength_2 = this.getDataFromIf_concat[4].uidsLength_2;
          this.if_Concate.actualUidName_2 = this.getDataFromIf_concat[4].actualUidName_2;
          this.if_Concate.uidsName_2 = this.getDataFromIf_concat[4].uidsName_2;

          this.if_Concate.selectedIf_condition = this.getDataFromIf_concat[4].selectedIf_condition
          this.if_Concate.condition = 'If_Concat'
          //console.log(this.hardcode);
          // this.If_Concate = [...this.If_Concate]
          this.If_Concate.push(this.if_Concate);
          // this.If_Concate = this.If_Concate.reduce((a, b) => {
          //   if (!a.find(data => data.instColName === b.instColName)) {
          //     a.push(b);
          //   }
          //   return a;
          // }, []);

          const filltredIf_Concate=  this.If_Concate.filter(res=>(res.instrumentID == this.currentinstID))
          const uniqoneIf_ConcateAutomap = this.removeDuplicatesfromArray(filltredIf_Concate,'instColID');

          if(this.autoMap.OneToOne.length>0){
            this.autoMap.OneToOne.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                this.autoMap.OneToOne=[];
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }

          if (this.isEdit || !this.isload) {
            if (Array.isArray(this.alreadyAutomapResponse.If_Concate) && this.alreadyAutomapResponse.If_Concate.length &&
              Array.isArray(uniqoneIf_ConcateAutomap) && uniqoneIf_ConcateAutomap.length) {
               this.autoMap.If_Concate = uniqoneIf_ConcateAutomap.concat(this.alreadyAutomapResponse.If_Concate);

            } else {
                this.autoMap.If_Concate = uniqoneIf_ConcateAutomap;
             // this.project.autoMap = this.autoMap
            }
          }
          else {
            this.autoMap.If_Concate = uniqoneIf_ConcateAutomap
           // this.project.autoMap = this.autoMap
          }

        }
      });
      // if(this.autoMap.OneToOne.length >=1){
      //   this.autoMap.OneToOne.splice(0,1);
      //   this.autoMap.OneToOne = []
      // } 
    }




    if (this.isIf && this.Mapping_nestedIFstatus === this.ChildConditionCheck_ifConcat[1]) {
      if (this.getDataFromIf_concat?.length) {
        creatElement.innerText = this.getDataFromIf_concat[0] + '.' + this.getDataFromIf_concat[1] + ' IF = ' + this.getDataFromIf_concat[2];
        creatElement.className = "mappedP";
        this.project.instruments.map(val => val.instrumentsData.
          map(res => {
            if (res.colId == mapID && res.group === mapGroup) {
              res.mappedResultText = creatElement.innerText
            }
          }
          ))
      } else {
        creatElement.innerText = ErrorConst.errorBlankMap
        creatElement.className = "classRed"
      }

    }


    if (this.isIf && this.Mapping_nestedIFstatus === this.ChildConditionCheck_ifConcat[2]) {
      this.mappingServices.get_if_criteria_Data.subscribe(data => {
        if (data) {
          this.getDataFromIf_concat_criteria = data;
          this.mappedData.mpcolData = this.getDataFromIf_concat_criteria[3];

          //automap
          this.if_concate_criteria.projectID = this.project.id;
          this.if_concate_criteria.instrumentName = mapGroup;
          this.if_concate_criteria.instrumentID =  this.currentinstID;
          this.if_concate_criteria.instColName = mappingList.name;
          this.if_concate_criteria.instColID = mapID;
          this.if_concate_criteria.resultValue = '';
          this.if_concate_criteria.uidsName = this.getDataFromIf_concat_criteria[4].uidsName;
          this.if_concate_criteria.uidsLength = this.getDataFromIf_concat_criteria[4].uidsLength;
          this.if_concate_criteria.actualUidName = this.getDataFromIf_concat_criteria[4].actualUidName;
          this.if_concate_criteria.uidID = this.getDataFromIf_concat_criteria[4].uidID;
          this.if_concate_criteria.sourceName = this.getDataFromIf_concat_criteria[4].sourceName;
          this.if_concate_criteria.sourceColName = this.getDataFromIf_concat_criteria[4].sourceColName;
          this.if_concate_criteria.sourceColID = this.getDataFromIf_concat_criteria[4].sourceColID;
          this.if_concate_criteria.Condition_Value = this.getDataFromIf_concat_criteria[4].Condition_Value;

          this.if_concate_criteria.uidID_2 = this.getDataFromIf_concat_criteria[4].uidID_2;
          this.if_concate_criteria.uidsLength_2 = this.getDataFromIf_concat_criteria[4].uidsLength_2;
          this.if_concate_criteria.actualUidName_2 = this.getDataFromIf_concat_criteria[4].actualUidName_2;
          this.if_concate_criteria.uidsName_2 = this.getDataFromIf_concat_criteria[4].uidsName_2;

          this.if_concate_criteria.selectedIf_condition = this.getDataFromIf_concat_criteria[4].selectedIf_condition
          this.if_concate_criteria.condition = 'If_Concat_criteria'
          //console.log(this.hardcode);
          // this.If_Concate_Criteria = [...this.If_Concate_Criteria]
          this.If_Concate_Criteria.push(this.if_concate_criteria);
          // this.If_Concate_Criteria = this.If_Concate_Criteria.reduce((a, b) => {
          //   if (!a.find(data => data.instColName === b.instColName)) {
          //     a.push(b);
          //   }
          //   return a;
          // }, []);

          const filltredIf_Concate_Criteria=  this.If_Concate_Criteria.filter(res=>(res.instrumentID == this.currentinstID))
          const uniqoneIf_Concate_CriteriaAutomap = this.removeDuplicatesfromArray(filltredIf_Concate_Criteria,'instColID');

          if(this.autoMap.OneToOne.length>0){
            this.autoMap.OneToOne.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                this.autoMap.OneToOne=[];
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
         
          if (this.isEdit || !this.isload) {
            if (Array.isArray(this.alreadyAutomapResponse.If_Concate_Criteria) && this.alreadyAutomapResponse.If_Concate_Criteria.length &&
              Array.isArray(uniqoneIf_Concate_CriteriaAutomap) && uniqoneIf_Concate_CriteriaAutomap.length) {
              this.autoMap.If_Concate_Criteria = uniqoneIf_Concate_CriteriaAutomap.concat(this.alreadyAutomapResponse.If_Concate_Criteria);
            } else {
                this.autoMap.If_Concate_Criteria = uniqoneIf_Concate_CriteriaAutomap;
             // this.project.autoMap = this.autoMap
            }
          } else {
            this.autoMap.If_Concate_Criteria = uniqoneIf_Concate_CriteriaAutomap
           // this.project.autoMap = this.autoMap
          }
        }
      });
      // if(this.autoMap.OneToOne.length >=1){
      //   this.autoMap.OneToOne.splice(0,1);
      //   this.autoMap.OneToOne = []
      // } 
    }

    if (this.isIf && this.Mapping_nestedIFstatus === this.ChildConditionCheck_ifConcat[2]) {
      if (this.getDataFromIf_concat_criteria?.length) {
        creatElement.innerText = this.getDataFromIf_concat_criteria[0] + '.' + this.getDataFromIf_concat_criteria[1] + ' IF = ' + this.getDataFromIf_concat_criteria[2];
        creatElement.className = "mappedP";
        this.project.instruments.map(val => val.instrumentsData.
          map(res => {
            if (res.colId == mapID && res.group === mapGroup) {
              res.mappedResultText = creatElement.innerText
            }
          }
          ))
      } else {
        creatElement.innerText = ErrorConst.errorBlankMap
        creatElement.className = "classRed"
      }
    }


    if (this.whereTrue) {
      if (this.whereRowID == compareIDFormultiple) {
        this.mappingServices.getDatafromMultiple.subscribe(
          data => {
            if (data) {
              this.whereConditionData = data;

              if (this.whereConditionData.length > 0) {

                this.mappedData.mpcolData = this.whereConditionData[5];
                //automap
                this.filter.projectID = this.project.id;
                this.filter.instrumentName = mapGroup;
                this.filter.instrumentID =  this.currentinstID;
                this.filter.instColID = mapID;
                this.filter.instColName = mappingList.name;
                this.filter.resultValue = '';
                this.filter.sourceName = this.whereConditionData[6].sourceName;
                this.filter.sourceColName = this.whereConditionData[6].sourceColName;
                this.filter.sourceColID = this.whereConditionData[6].sourceColID;
                this.filter.selected_filter_condition = this.whereConditionData[6].selected_filter_condition
                this.filter.condition = 'Filter'
                // console.log(this.hardcode);
                // this.Filter = [...this.Filter]
                this.Filter.push(this.filter);
                // this.Filter = this.Filter.reduce((a, b) => {
                //   if (!a.find(data => data.instColName === b.instColName)) {
                //     a.push(b);
                //   }
                //   return a;
                // }, []);

                const filltredFilter=  this.Filter.filter(res=>(res.instrumentID == this.currentinstID))
                const uniqoneFilterAutomap = this.removeDuplicatesfromArray(filltredFilter,'instColID');
      
                
               if(this.autoMap.Criteria.length == 1){
                this.autoMap.Criteria.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Criteria.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              } 
              if(this.autoMap.Hardecoded.length>0){
                this.autoMap.Hardecoded.every(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Hardecoded =[]
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              } 
              if(this.autoMap.Blank.length == 1){
                this.autoMap.Blank.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Blank.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              } 
              if(this.autoMap.OneToOne.length>0){
                this.autoMap.OneToOne.every(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                    this.autoMap.OneToOne=[];
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.Concatinate.length == 1){
                this.autoMap.Concatinate.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Concatinate.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.If_Only.length == 1){
                this.autoMap.If_Only.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.If_Only.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.If_Concate.length == 1){
                this.autoMap.If_Concate.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.If_Concate.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.If_Concate_Criteria.length == 1){
                this.autoMap.If_Concate_Criteria.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.If_Concate_Criteria.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }



            
                if (this.isEdit || !this.isload) {
                  if (Array.isArray(this.alreadyAutomapResponse.Filter) && this.alreadyAutomapResponse.Filter.length &&
                    Array.isArray(uniqoneFilterAutomap) && uniqoneFilterAutomap.length) {
                    this.autoMap.Filter = uniqoneFilterAutomap.concat(this.alreadyAutomapResponse.Filter);
                     
                  } else {    
                      this.autoMap.Filter = uniqoneFilterAutomap;                
                   // this.project.autoMap = this.autoMap
                  }
                }
                else {
                  this.autoMap.Filter = uniqoneFilterAutomap
                 // this.project.autoMap = this.autoMap
                }
                // console.log("WHERE:" + this.whereTrue);
                this.isWhereMappingDone = true;
                this.mappingServices.sendWhereOther(this.isWhereMappingDone)
                // console.log(this.mappedData.mpcolData)
              }

            }
            //  console.log(this.whereConditionData)

          }
        );

        if (!this.whereConditionData) {
          creatElement.innerText = ErrorConst.errorBlankMap
          creatElement.className = "classRed"
        }
      }

      // if(this.autoMap.OneToOne.length >=1){
      //   this.autoMap.OneToOne.splice(0,1);
      //   this.autoMap.OneToOne = []
      // } 
    }



    if (this.whereTrue) {

      if (this.whereConditionData?.length) {
        // console.log(this.whereConditionData)
        creatElement.innerText = this.whereConditionData[0] + "." + this.whereConditionData[1] + "=" + this.whereConditionData[2] + "." + this.whereConditionData[3] + ".WHERE." + this.whereConditionData[4];
        this.project.instruments.map(val => val.instrumentsData.
          map(res => {
            if (res.colId == mapID && res.group === mapGroup) {
              res.mappedResultText = creatElement.innerText
            }
          }
          ))
        creatElement.className = "mappedP";
        this.afterMappingDonemsg = 'Filter Mapping is done!'
        whereateWhereDonePanel.style.display = "flex";
        HidewherePanel.style.display = "none";
      }
      if (!this.whereConditionData?.length) {
        creatElement.innerText = ErrorConst.errorBlankMap
        creatElement.className = "classRed"
      }

    }



    if (this.isConcate) {
      if (this.whereRowID == compareIDFormultiple) {
        this.mappingServices.getConcatFinalData.subscribe(
          concatData => {
            this.concatData = concatData;
            if (this.concatData.length > 0) {
              this.mappedData.mpcolData = this.concatData[4];
              //automap
              this.concate.projectID = this.project.id;
              this.concate.instrumentName = mapGroup;
              // console.log(mapGroup)
              this.concate.instrumentID = this.currentinstID;
              this.concate.instColName = mappingList.name;
              this.concate.instColID = mapID;
              this.concate.resultValue = '';
              this.concate.uidsName = this.concatData[5].uidsName;
              this.concate.uidsLength = this.concatData[5].uidsLength;
              this.concate.actualUidName = this.concatData[5].actualUidName;
              this.concate.uidID = this.concatData[5].uidID;
              this.concate.sourceName = this.concatData[5].sourceName;
              this.concate.sourceColName = this.concatData[5].sourceColName;
              this.concate.sourceColID = this.concatData[5].sourceColID;
              this.concate.condition = 'Concate'
              // console.log(this.hardcode);
              // this.Concate = [...this.Concate]
              this.Concate.push(this.concate);

              // this.Concate = this.Concate.reduce((a, b) => {
              //   if (!a.find(data => data.instColName === b.instColName)) {
              //     a.push(b);
              //   }
              //   return a;
              // }, []);
               const filltredConcate=  this.Concate.filter(res=>(res.instrumentID == this.currentinstID))
               const uniqConcateAutomap = this.removeDuplicatesfromArray(filltredConcate,'instColID');


               if(this.autoMap.Criteria.length == 1){
                this.autoMap.Criteria.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Criteria.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              } 
              if(this.autoMap.Hardecoded.length>0){
                this.autoMap.Hardecoded.every(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Hardecoded =[]
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              } 
              if(this.autoMap.Blank.length == 1){
                this.autoMap.Blank.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Blank.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              } 
              if(this.autoMap.OneToOne.length>0){
                this.autoMap.OneToOne.every(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                    this.autoMap.OneToOne=[];
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.Filter.length == 1){
                this.autoMap.Filter.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.Filter.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.If_Only.length == 1){
                this.autoMap.If_Only.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.If_Only.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.If_Concate.length == 1){
                this.autoMap.If_Concate.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.If_Concate.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }
              if(this.autoMap.If_Concate_Criteria.length == 1){
                this.autoMap.If_Concate_Criteria.map(ctrData=>{
                  if(ctrData.instrumentID != this.currentinstID){
                    this.autoMap.If_Concate_Criteria.splice(0,1);
                  }else{
                    console.log("HaveCorrectAutomapData")
                  }
                })
              }



              if (this.isEdit || !this.isload) {
                if (Array.isArray(this.alreadyAutomapResponse.Concatinate) && this.alreadyAutomapResponse.Concatinate.length &&
                  Array.isArray(uniqConcateAutomap) && uniqConcateAutomap.length) {
                  this.autoMap.Concatinate = uniqConcateAutomap.concat(this.alreadyAutomapResponse.Concatinate);
           
                } else {
                    this.autoMap.Concatinate = uniqConcateAutomap;
                 // this.project.autoMap = this.autoMap
                }
              } else {
                this.autoMap.Concatinate = uniqConcateAutomap
               // this.project.autoMap = this.autoMap
              }
            }
          }
        )
      }
      // if(this.autoMap.OneToOne.length >=1){
      //   this.autoMap.OneToOne.splice(0,1);
      //   this.autoMap.OneToOne = []
      // } 
    };


    if (this.isConcate) {
      if (this.concatData?.length) {
        // console.log(this.concatData)
        creatElement.innerText = this.concatData[1] + "." + this.concatData[0] + "-mapping is done after checking-" + this.concatData[5].actualUidName[0] + "&" + this.concatData[5].actualUidName[1]

        this.project.instruments.map(val => val.instrumentsData.
          map(res => {
            if (res.colId == mapID && res.group === mapGroup) {
              res.mappedResultText = creatElement.innerText
            }
          }
          ))
        creatElement.className = "mappedP";
        this.afterMappingDonemsgConcat = 'Concat Mapping is done!'
        concaHeading.style.display = 'block';
        DefaultHeading.style.display = 'none'

        whereateWhereDonePanel.style.display = "flex";
        concatP.style.display = "none";
      }
      else {
        creatElement.innerText = ErrorConst.errorBlankMap
        creatElement.className = "classRed"
      }

    }


    if (this.isHardcoded) {
      if (this.whereRowID == compareIDFormultiple) {
        this.mappingServices.getHardcodedData.subscribe(
          hdcData => {
            this.hardcodedData = hdcData;
            if (this.hardcodedData.length > 0) {
              this.mappedData.mpcolData = this.hardcodedData[1];
              //automap
              this.hardcode.projectID = this.project.id;
              this.hardcode.instrumentName = mapGroup;
              this.hardcode.instrumentID =  this.currentinstID;
              this.hardcode.instColID = mapID;
              this.hardcode.instColName = mappingList.name;
              this.hardcode.resultValue = this.hardcodedData[0];
              this.hardcode.condition = 'Hardecoded'
               // this.Hardcoded = [...this.Hardcoded]
              this.Hardcoded.push(this.hardcode);
            const filltredHRDCD =  this.Hardcoded.filter(res=>(res.instrumentID == this.currentinstID))
            const uniqHardcodeAutomap = this.removeDuplicatesfromArray(filltredHRDCD,'instColID');
                if(this.autoMap.Criteria.length>0){
                  this.autoMap.Criteria.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID){
                      this.autoMap.Criteria.splice(0,1);
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                } 
                if(this.autoMap.Concatinate.length>0){
                  this.autoMap.Concatinate.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID){
                      this.autoMap.Concatinate =[]
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                } 
                if(this.autoMap.Blank.length>0){
                  this.autoMap.Blank.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID){
                      this.autoMap.Blank=[]
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                } 
                if(this.autoMap.OneToOne.length>0){
                  this.autoMap.OneToOne.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                      this.autoMap.OneToOne=[];
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                }
                if(this.autoMap.Filter.length>0){
                  this.autoMap.Filter.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID){
                      this.autoMap.Filter.splice(0,1);
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                }
                if(this.autoMap.If_Only.length>0){
                  this.autoMap.If_Only.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID){
                      this.autoMap.If_Only=[]
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                }
                if(this.autoMap.If_Concate.length>0){
                  this.autoMap.If_Concate.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID){
                      this.autoMap.If_Concate=[]
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                }
                if(this.autoMap.If_Concate_Criteria.length>0){
                  this.autoMap.If_Concate_Criteria.every(ctrData=>{
                    if(ctrData.instrumentID != this.currentinstID){
                      this.autoMap.If_Concate_Criteria=[]
                    }else{
                      console.log("HaveCorrectAutomapData")
                    }
                  })
                }
              // console.log(uniqHardcodeAutomap);
              if (this.isEdit && !this.isload || !this.isload) {
                if (Array.isArray(this.alreadyAutomapResponse.Hardecoded) && this.alreadyAutomapResponse.Hardecoded.length &&
                  Array.isArray(uniqHardcodeAutomap) && uniqHardcodeAutomap.length) { 
                  this.autoMap.Hardecoded = uniqHardcodeAutomap.concat(this.alreadyAutomapResponse.Hardecoded);
                  console.log('this is 2')
                } else {
                  this.autoMap.Hardecoded = uniqHardcodeAutomap;
                  // if(this.isEdit){
                  //   if(Array.isArray( this.autoMap.Hardecoded) && this.autoMap.Hardecoded.length){
                  //     this.autoMap.Hardecoded = uniqHardcodeAutomap.concat(this.alreadyAutomapResponse.Hardecoded);
                  //   //  this.autoMap.Hardecoded = editFinalAutomap
                  //   }else{
                  //     this.autoMap.Hardecoded =uniqHardcodeAutomap
                  //   }
                  // }else{
                  //   this.autoMap.Hardecoded = uniqHardcodeAutomap;
                  // }
                    // console.log('this is 2')
                }
              }

              else {
                this.autoMap.Hardecoded = uniqHardcodeAutomap;
                // console.log('this is 3')
               // this.project.autoMap = this.autoMap
              }

            }
          }
        )
      }
      // if(this.autoMap.OneToOne.length >=1){
      //   this.autoMap.OneToOne.splice(0,1);
      //   this.autoMap.OneToOne = []
      // } 
    }



    if (this.isHardcoded) {
      creatElement.innerText = this.hardcodedData[0];
      if (!this.hardcodedData[0]) {
        creatElement.innerText = 'Hardcoded value seted as blank'
      }
      // instrumentID


      creatElement.className = "mappedP";
      this.project.instruments.map(val => val.instrumentsData.
        map(res => {
          if (res.colId == mapID && res.group === mapGroup) {
            res.mappedResultText = creatElement.innerText
          }
        }
        ))
      this.afterMappingDonemsg = 'Hardcoded Mapping is done!'
      hrdcoded.style.display = "flex";
      HaarcodedPanel.style.display = "none";
    };

    if (this.isCriteria) {
      if (this.whereRowID == compareIDFormultiple) {
        this.mappingServices.getCriteria.subscribe(criteriaData => {
          this._criteriaData = criteriaData;
          this.mappedData.mpcolData = this._criteriaData[3];
          //automap
          this.criteria_automap.projectID = this.project.id;
          this.criteria_automap.instrumentName = mapGroup;
          this.criteria_automap.instrumentID = this.currentinstID;
          this.criteria_automap.instColID = mapID;
          this.criteria_automap.instColName = mappingList.name;
          this.criteria_automap.resultValue = '';
          this.criteria_automap.uidsName = this._criteriaData[4].uidsName;
          this.criteria_automap.uidsLength = this._criteriaData[4].uidsLength;
          this.criteria_automap.actualUidName = this._criteriaData[4].actualUidName;
          this.criteria_automap.uidID = this._criteriaData[4].uidID;
          this.criteria_automap.sourceName = this._criteriaData[4].sourceName;
          this.criteria_automap.sourceColName = this._criteriaData[4].sourceColName;
          this.criteria_automap.sourceColID = this._criteriaData[4].sourceColID;
          this.criteria_automap.mapping_sourceName = this.criteria_automap.sourceName[1]
          this.criteria_automap.condition = 'Criteria';
       
         
          // console.log(this.hardcode);
          this.Criteria_automap.push(this.criteria_automap);
          // this.Criteria_automap = this.Criteria_automap.reduce((a, b) => {
          //   if (!a.find(data => data.instColName === b.instColName)) {
          //     a.push(b);
          //   }
          //   return a;
          // }, []);
          const filltredCriteria=  this.Criteria_automap.filter(res=>(res.instrumentID == this.currentinstID))
          const uniqCriteriaAutomap = this.removeDuplicatesfromArray(filltredCriteria,'instColID')
         
 
          if(this.autoMap.Concatinate.length>0){
            this.autoMap.Concatinate.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.Concatinate =[]
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          } 
          if(this.autoMap.Blank.length>0){
            this.autoMap.Blank.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.Blank=[]
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          } 
          // ctrData.instrumentName != mapGroup
          if(this.autoMap.OneToOne.length>0){
            this.autoMap.OneToOne.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                this.autoMap.OneToOne=[];
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.Filter.length>0){
            this.autoMap.Filter.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.Filter=[]
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.If_Only.length>0){
            this.autoMap.If_Only.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.If_Only=[]
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.If_Concate.length>0){
            this.autoMap.If_Concate.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.If_Concate=[]
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.If_Concate_Criteria.length>0){
            this.autoMap.If_Concate_Criteria.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.If_Concate_Criteria=[]
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }


          if (this.isEdit || !this.isload) {
            if (Array.isArray(this.alreadyAutomapResponse.Criteria) && this.alreadyAutomapResponse.Criteria.length &&
              Array.isArray(uniqCriteriaAutomap) && uniqCriteriaAutomap.length) {
              this.autoMap.Criteria = uniqCriteriaAutomap.concat(this.alreadyAutomapResponse.Criteria);

            } else {
                this.autoMap.Criteria = uniqCriteriaAutomap
            }
          } else {
            this.autoMap.Criteria = uniqCriteriaAutomap
           // this.project.autoMap = this.autoMap
          }

          //  console.log(this.project.autoMap)

        })
      }

      // if(this.autoMap.OneToOne.length >=1){
      //   this.autoMap.OneToOne.splice(0,1);
      //   this.autoMap.OneToOne = []
      // } 

    }

    if (this.isCriteria) {
      if (this._criteriaData?.length) {
        creatElement.innerText = "Mapped Criteria of " + this._criteriaData[0] + 'file' + ' = ' + this._criteriaData[1] + ' & ' + this._criteriaData[2]
        creatElement.className = "mappedP";
        this.project.instruments.map(val => val.instrumentsData.
          map(res => {
            if (res.colId == mapID && res.group === mapGroup) {
              res.mappedResultText = creatElement.innerText
            }
          }
          ))
        this.afterMappingDonemsgcriteria = 'Criteria Mapping is done!'
        criteriaHeading.style.display = 'block';
        DefaultHeading.style.display = 'none'
        whereateWhereDonePanel.style.display = "flex";
        criteriaP.style.display = "none";
      } else {
        creatElement.innerText = ErrorConst.errorBlankMap
        creatElement.className = "classRed"
      }

    };


    // if(!this.mappedData.mappedFile && !this.mappedData.mappedSourceName){

    // }

    //console.log(this.mappedData.mappedFile + ""+this.mappedData.mappedSourceName)
    if (!this.mappedData.mappedFile && !this.mappedData.mappedSourceName) {
      //  console.log(this.isIf)
      if (!this.whereTrue &&
        !this.isConcate &&
        !this.isHardcoded &&
        !this.isCriteria &&
        !this.isIf &&
        !this.mappedData.mpcolData
      ) {

        creatElement.innerText = "Blank Mapping"
        creatElement.className = "blankedP"

        //  console.log(this.isIf)
        this.project.instruments.map(val => val.instrumentsData.
          map(res => {
            if (res.colId == mapID && res.group === mapGroup) {
              res.mappedResultText = creatElement.innerText
            }
          }
          ));

        //automap

        if (!this.mappedData.mpcolData) {
          this.mappedData.mpcolData = {};
          this.blank_automap.projectID = this.project.id;
          this.blank_automap.instrumentName = mapGroup;
          this.blank_automap.instrumentID =this.currentinstID;
          this.blank_automap.instColID = mapID;
          this.blank_automap.instColName = mappingList.name;
          this.blank_automap.resultValue = '';
          this.blank_automap.sourceName = [];
          this.blank_automap.sourceColName = [];
          this.blank_automap.sourceColID = [];
          this.blank_automap.mapping_sourceName = []
          this.blank_automap.condition = 'Blank';

          // this.Blank_automap = [...this.Blank_automap]
            this.Blank_automap.push(this.blank_automap);

          // this.Blank_automap = this.Blank_automap.reduce((a, b) => {
          //   if (!a.find(data => data.instColName === b.instColName)) {
          //     a.push(b);
          //   }
          //   return a;
          // }, []);
          const filltredBlank=  this.Blank_automap.filter(res=>(res.instrumentID == this.currentinstID))
          const uniqBlankAutomap = this.removeDuplicatesfromArray(filltredBlank,'instColID');
          if(this.autoMap.Criteria.length == 1){
            this.autoMap.Criteria.map(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.Criteria.splice(0,1);
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          } 
          if(this.autoMap.Concatinate.length == 1){
            this.autoMap.Concatinate.map(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.Concatinate.splice(0,1);
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          } 
          if(this.autoMap.Hardecoded.length == 1){
            this.autoMap.Hardecoded.map(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.Hardecoded.splice(0,1);
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          } 
          if(this.autoMap.OneToOne.length>0){
            this.autoMap.OneToOne.every(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID || ctrData.instrumentName != mapGroup){
                this.autoMap.OneToOne=[];
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.Filter.length == 1){
            this.autoMap.Filter.map(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.Filter.splice(0,1);
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.If_Only.length == 1){
            this.autoMap.If_Only.map(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.If_Only.splice(0,1);
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.If_Concate.length == 1){
            this.autoMap.If_Concate.map(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.If_Concate.splice(0,1);
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
          if(this.autoMap.If_Concate_Criteria.length == 1){
            this.autoMap.If_Concate_Criteria.map(ctrData=>{
              if(ctrData.instrumentID != this.currentinstID){
                this.autoMap.If_Concate_Criteria.splice(0,1);
              }else{
                console.log("HaveCorrectAutomapData")
              }
            })
          }
    
          if (this.isEdit || !this.isload) {
            if (Array.isArray(this.alreadyAutomapResponse.Blank) && this.alreadyAutomapResponse.Blank.length &&
              Array.isArray(uniqBlankAutomap) && uniqBlankAutomap.length) {
                // this.OneToOne_automap= [];
              this.autoMap.Blank = uniqBlankAutomap.concat(this.alreadyAutomapResponse.Blank);
            } else {
                this.autoMap.Blank = uniqBlankAutomap;
             // this.project.autoMap = this.autoMap
            }
          } else {
            this.autoMap.Blank = uniqBlankAutomap;
            // this.project.autoMap = this.autoMap
          }

          // if(this.autoMap.OneToOne.length>=1){
          //   this.autoMap.OneToOne.splice(0,1);
          //   this.autoMap.OneToOne = [];
          // }
        }

      }
    }

    this.autoMap.instrumentID = this.currentinstID;
  
    this.autoMap.instrumentName = mapGroup
console.log("this.autoMap",this.autoMap);
  //  if(!dropdown.disabled){
   // }
    // console.log(this.autoMap);
    dropdown.disabled = true;
    //console.log(dropdown)
    this.projectService.SendAllAutomapData(this.autoMap);

    let index = this.M_instrument.mappedInstID
    let rowIndex = this.mappedData.instID
    const resultcolCheck = false;
    //  const forResultCOlchk =   this.mappedinstData.map(val=>val.instumentDataMapped.map(val=> val.mpcolResultCOl))

    this.mappedData = { ...this.mappedData };


    if (index == rowIndex) {
      this.colArray.push(this.mappedData);

    }
    this.M_instrument.instumentDataMapped = this.colArray;

    this.mappedinstData = this.mappedinstData.reduce((a, b) => {
      if (!a.find(data => data.mappedInstrumentName === b.mappedInstrumentName)) {
        a.push(b);
      }
      return a;
    }, []);

    // this.mappedinstData.map(ele=>{
    //   ele.instumentDataMapped = ele.instumentDataMapped.filter(filter=> (filter.instID === ele.mappedInstID))
    // })
    //  console.log(this.project.autoMap)
    creatElementbtn.disabled = true
    this.passmappingServce.sendMappedResult(this.mappedinstData)

    // console.log(this.mappedinstData)

    this.mappedData = {};
    this.M_instrument = {};
    this.whereConditionData = [];
    this.concatData = [];
    this._criteriaData = [];
    this.hardcodedData = [];
    this.getDataFromIfonly = [];
    this.getDataFromIf_concat = [];
    this.hardcode = {};
    this.concate = {};
    this.criteria_automap = {}
    this.one_To_one_automap = {};
    this.blank_automap = {};
    this.if_concate_criteria = {};
    this.if_Concate = {};
    this.filter = {};
    this.if_only = {};
    // this.colArray =[];
    if( this.hardcodedData){
      this.hardcodedData[1] = {};
    }
    
    this.getDataFromIf_concat_criteria = [];
    // skeleton_.style.display = 'none';
    // disable_panel_.style.display = 'felx'
    this.isIf = false;
    this.ismappingGoingOn = false;
    this.whereTrue = false;
    this.mappingDone = true;
    this.isHardcoded = false;
    this.isCriteria = false;
    this.isConcate = false;
    mappingList.isMultiple = false;
    this.isOneToOne = true;
    console.log('isOneToOne in mapping function',this.isOneToOne);
    // console.log(rowData)
    this.mappingServices.sendMappingStatus(this.mappingDone);

  }



  removeDuplicates(originalInstruments: any, prop: any) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalInstruments) {
      lookupObject[originalInstruments[i][prop]] = originalInstruments[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  removesaved(id: any) {
    let panel_selected = document.getElementById("edit_selectedType_" + id);
    panel_selected.style.display = 'none';
    this.project.instruments.map(
      val => {
        if (val.instrumentID == id) {

          val.sourceName = ""

          val.instTypeSourceColName = ""



        }

        // console.log(val)
      }
    )
  }

  removeDuplicatesfromArray(originalArray, prop) {
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

  count_duplicate(a) {
    let counts = {}

    for (let i = 0; i < a.length; i++) {
      if (counts[a[i]]) {
        counts[a[i]] += 1
      } else {
        counts[a[i]] = 1
      }
    }
    for (let prop in counts) {
      if (counts[prop] >= 2) {
        console.log(prop + " counted: " + counts[prop] + " times.")
      }
    }
    // console.log(counts)
  }


  automap(instID: any) {
    this.sourceLegacyData.projectID = this.projID
    this.sourceLegacyData.sourceLegacy = this.project.sourceLegacy;
    this.sourceLegacyData.instrumentID = instID
    console.log( "automap-sourceLegacyData",this.sourceLegacyData.sourceLegacy)
    this.isloadingAutomap = true
    // console.log( this.sourceLegacyData)
    this.projectService.getAutomap(this.sourceLegacyData).subscribe(
      res => {
        // console.log(res);
        if (res) {
          this.projectService.getAutomapResult(res);
          const saveEnabled = true;
          this.mappingServices.sendMappingStatus(saveEnabled);
          this.isloadingAutomap = false
            this.messageService.add({ severity: 'success', summary: 'Success', detail:'Auto mapping done successfuly.' , life: 4000 })    
    
            
        }
      },

      error => {
        // console.log(error.error);
        this.isloadingAutomap = false
        if(error.error.message==='foreach() argument must be of type array|object, null given'){
        this.messageService.add({ severity: 'error', summary: 'Error', detail:'Please regenerate all UIDs.' , life: 5000 })    

        }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail:'Somthing went wrong!\nPlease try again.' , life: 5000 })    

        }

      }
    )
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

  // setOneToOne(){
  // if(this.isOneToOne){
  //     this.isOneToOne = false;
  //   }
  //   else{
  //     this.isOneToOne = true;
  //   }
  //   console.log('this.isOneToOne=',this.isOneToOne)
  // }

}
