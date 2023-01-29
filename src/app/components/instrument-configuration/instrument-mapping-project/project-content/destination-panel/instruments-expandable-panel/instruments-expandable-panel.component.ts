import { Component, OnInit } from '@angular/core';
import { ProjectsServiceService } from '../../../../../../services/projects-service.service';
import { Projects, InstrumentsData, Instruments, InstrumentType } from '../../../../../../model/projects.model';
import { ActivatedRoute } from '@angular/router';
import { MappingService } from 'src/app/services/mapping.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-instruments-expandable-panel',
  templateUrl: './instruments-expandable-panel.component.html',
  styleUrls: ['./instruments-expandable-panel.component.css']
})
export class InstrumentsExpandablePanelComponent implements OnInit {

  id!: any;
  projects!: Projects[];
  project!: Projects;
  isMasterSel!: any;
  instrumentId!: Instruments[];
  categoryList!: InstrumentsData[][];
  checkedCategoryList: any;
  groupID!: any
  allComplete: boolean = false;
  isAfterSelection: boolean;
  projectName!: any
  isload!: boolean
  disabled = false;
  isEdit!: boolean;
  projectStat!: any;
  checkSelctedtype!: any;
  isLoading!:boolean
  postInstrumentTypes: InstrumentType = {}

  constructor(private projectService: ProjectsServiceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private mappingServ: MappingService) {

    this.project = {};

    this.isAfterSelection = true
  }



  ngOnInit(): void {

    this.projectService.getisLoad.subscribe(
      res => {
        this.isload = res.isLoad
        this.isEdit = res.isEdit
        // console.log(res)
      })

    this.projectService.pId.subscribe(
      projectID => {


        if (projectID) {
          this.id = projectID
        }
      }
    )

    this.projectService.pname.subscribe(
      projectName => {


        if (projectName) {
          this.projectName = projectName
          this.projectName = this.projectName.replace(/\s/g, "_");
        }
      }
    );
    //  this.projectName= this.projectService.getProjectName();
    setTimeout(() => {

      this.projectService.getprojectData.subscribe((data: any) => {

        if (data) {
          document.getElementById("progressSpinDesti_sepec").style.display = "none"
          // document.getElementById("NodataID").style.display = "none"
          this.project = data
          this.instrumentId = this.project.instruments
          this.categoryList = this.project.instruments.map(val => val.instrumentsData);
          this.groupID = this.project.instruments.map(id => id.instrumentID)
          this.isMasterSel = this.project.instruments.map(ismaster => ismaster.isMasterSel);
          this.checkSelctedtype = this.project.instruments.map(val => val.selectedInstrumentType);
          // console.log(this.checkSelctedtype)
          this.selectAllInitial();
        }





      })
    }, 1)

    // console.log(this.isload)
    this.mappingServ.canStatus.subscribe(stats => {

      this.isAfterSelection = stats

      if (!this.isAfterSelection) {
        this.disabled = false;

        if (this.instrumentId) {
          for (var i = 0; i < this.instrumentId.length; i++) {
            if (this.instrumentId[i].isMasterSel) {
              // if(!this.isload){
              this.instrumentId[i].isMasterSel = false;
              // }

            }
          }
        }

        if (this.categoryList) {
          for (var i = 0; i < this.categoryList.length; i++) {
            this.categoryList[i].map(val => {

              if (val.group) {
                if (val.isDestination) {
                  // if(!this.isload){
                  val.isDestination = false
                  // }

                }
              }
            });

          }
        }

      }

    }
    )

    // this.project = data

  }



  selectAllInitial() {
    for (var i = 0; i < this.instrumentId.length; i++) {
      // if(!this.isload){
      this.instrumentId[i].isMasterSel = false
      // }
      // break;
    }

    for (var i = 0; i < this.categoryList.length; i++) {
      this.categoryList[i].map(val => {

        if (val.group) {
          // if(!this.isload){
          val.isDestination = false
          // }

        }
      });
      // break;
    }


    // this.mappingServ.setData(instrument);
  }


  checkUncheckAll(instrumentName: any, instrument: any, eve: any) {
  // console.log(instrument)

    if(!instrument.isInstrumentSaved){
      const isdisable = false
      this.projectService.sendDisabledrpstat(isdisable)
    }else{
      const isdisable = true
      this.projectService.sendDisabledrpstat(isdisable)
    }
    if(instrument.isInstrumentSaved){
      // this.mappingServ.sendInstrumentTypeName(instrument.sourceName)
      this.projectService.sendInstrumentTypeSourcefileName(instrument)
    }

    this.disabled = true;
    const cancelOFF = false;

    if(!this.isload && !this.isEdit){
      this.getAutomapData(this.id,instrument.instrumentID);
      this.projectService.send__NewProject_ID(this.id);
      // const clearData = false
      // this.projectService.sendDataClear(clearData)
    }

    if(this.isEdit){
      this.getAutomapData(instrument.projectID,instrument.instrumentID);
      this.projectService.send__NewProject_ID(instrument.projectID);
// console.log(instrument.projectID)
    }
    if(instrument.isInstrumentSaved){
      
      this.projectService.send_Instrument_StatusIn_NewProject(instrument.isInstrumentSaved)
    }
    this.mappingServ.sendcancelStatus(cancelOFF);
    if (this.instrumentId) {
      for (var i = 0; i < this.instrumentId.length; i++) {
        if (this.instrumentId[i].isMasterSel) {
          this.instrumentId[i].isMasterSel = true
          // console.log(this.instrumentId)
          break;
        }
      }
    }
    for (var i = 0; i < this.categoryList.length; i++) {
      this.categoryList[i].forEach(val => {

        if (instrumentName == val.group) {
          val.isDestination = eve

        }

      })

    }

    this.mappingServ.setData(instrument);

    if (this.isload) {
      this.projectStat = 'isAuto'
      instrument.projectStatus = this.projectStat;
    }

    if (this.isEdit && this.checkSelctedtype[0]) {
      this.projectStat = 'isEdit'
      instrument.projectStatus = this.projectStat
    }
    // this.project.instruments.map(val=>{
    if (this.isload || this.isEdit && this.checkSelctedtype[0] && instrument.isInstrumentSaved) {
      instrument = { ...instrument };
      this.postInstrumentTypes.projectID = instrument.projectID;
      this.postInstrumentTypes.sourceName = instrument.sourceName;
      this.postInstrumentTypes.instrumentName= instrument.instrumentName;
      this.postInstrumentTypes.selectedInstrumentType = instrument.selectedInstrumentType;
      this.postInstrumentTypes.instrumentID = instrument.instrumentID;
      this.postInstrumentTypes.LDcolId = instrument.LDcolId;
      this.postInstrumentTypes.sourceLegacy = this.project.sourceLegacy;
      this.postInstrumentTypes.projectStatus = instrument.projectStatus
        // console.log(this.postInstrumentTypes)
      this.sendInstrumentTypeFiltteration(this.postInstrumentTypes);
      if(this.isEdit){
      this.mappingServ.sendInstrumentTypeName(this.postInstrumentTypes.sourceName)
      }
      //  console.log(instrument);
      const status = true;
      this.projectService.sendInstrumentTypeCheckingStatus(status);
      this.projectService.sendInstrumentID(instrument.instrumentID);
 
    }

  // })
    if(this.isEdit){
      const uncheckSource=  true;
      if(instrument.isInstrumentSaved){
        this.project.instruments.map(val=>{
         if(val.isInstrumentSaved && val.selectedInstrumentType){
          val.isInstrumentSaved = true
         }else{
          val.isInstrumentSaved = false
         }
         
        } 
          )
      }
      this.mappingServ.sendDestinationStatus(uncheckSource);
    //  console.log(instrument) 
    }
    if(!this.isload){
      this.projectService.sendInstrumentID(instrument.instrumentID);
    }
  }

  

  sendInstrumentTypeFiltteration(instData: any) {
    document.getElementById("progressSpinDesti_sepec").style.display = "flex";
    this.isLoading = true;
    let instrumentDestination = document.getElementById("Destination_panel_" + instData.instrumentID);
    // let instrumentPanel =  document.getElementById("instrumentsList");
    instrumentDestination.style.display = "none"
    this.projectService.getInstrumentType(instData).subscribe(
      res => {
        //  console.log(res)
        if (res) {
          
          document.getElementById("progressSpinDesti_sepec").style.display = "none"
          this.isLoading = false;
          instrumentDestination.style.display = "block";
        }
      
      },
      error => { 
        document.getElementById("progressSpinDesti_sepec").style.display = "none";
        instrumentDestination.style.display = "block";
        this.isLoading = false;
        if(error.error.msg){
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail:error.error.msg , life: 8000 }) 
          // console.log(error.error.msg);
          const allowUID = true;
          this.mappingServ.allowEditInstrumentTypeinEdit(allowUID)
        }
        

        // else{
        //   // this.messageService.add({ severity: 'error', summary: 'Error', detail:error.error.notFoundtypeInsourceData, life: 6000 })
        //   // const allowEditTypePermission = true;
        //   // this.mappingServ.allowEditInstrumentTypeinEdit(allowEditTypePermission)
        //   document.getElementById("progressSpinDesti_sepec").style.display = "none";
        //   instrumentDestination.style.display = "block";
        //   this.isLoading = false;
        // }
      }
    )
  }


  getAutomapData(projectID:any,instrumentID:any){
    this.isLoading = true;
   let spinner = document.getElementById("progressSpinDesti_sepec");
    spinner.style.display = "flex";
    this.projectService.getautomapPost(projectID,instrumentID).subscribe(
      automap => {
      // this.alreadyAutomapResponse = automap
      if(automap){
        this.isLoading = false;
        spinner.style.display = "none";
        // console.log(automap)
        const sendata = automap
        this.projectService.sendautomapPostresponse(sendata)
      }
    
    },
    error=>{
      this.isLoading = false
      spinner.style.display = "none";
      const errorData = error.error
        this.projectService.sendautomapPostresponse(errorData)
   
    }

    );
  }


  isAllSelected(rowData: any, eve: any) {

    this.isMasterSel = this.categoryList.every((item: any) => {

      return item.isDestination == true;
    })
    this.mappingServ.setRowData(rowData);
    // this.getCheckedItemList();
    this.mappingServ.sendInstrumentSelectiondata(rowData);

  }

  getCheckedItemList() {
    this.checkedCategoryList = [];
    for (var i = 0; i < this.categoryList.length; i++) {
      this.categoryList[i].map(

        val => {
          if (val.isDestination) {
            this.checkedCategoryList.push(this.categoryList[i]);
          }
        })

    }
    // this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  }

  warnMsgCloseInstrument(){
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail:'Before selecting another instrument, \n please cancel currently selected instrument!' , life: 5000 })

  }

}