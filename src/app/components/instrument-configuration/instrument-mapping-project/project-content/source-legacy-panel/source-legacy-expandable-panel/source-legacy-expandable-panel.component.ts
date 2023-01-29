import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProjectsServiceService } from '../../../../../../services/projects-service.service';
import { Projects, SourceLegacyDataColn, SourceLegacy } from '../../../../../../model/projects.model';
import { ActivatedRoute } from '@angular/router';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';


@Component({
  selector: 'app-source-legacy-expandable-panel',
  templateUrl: './source-legacy-expandable-panel.component.html',
  styleUrls: ['./source-legacy-expandable-panel.component.css']
})
export class SourceLegacyExpandablePanelComponent implements OnInit {

  id!: any;
  projects!: Projects[];
  project!: Projects;
  isMasterSelSource!: any;
  sourceID!: SourceLegacy[];
  SourcecategoryList!: SourceLegacyDataColn[][];

  mappingStatus!: boolean;
  destiStatus: boolean = false;
  checkedCategoryList: any;
  groupID!: any
  allComplete: boolean = false;

  projectName!: any
  if!: string;
  where!: string;

  filterSelected!: boolean;
  isUIdSelection!: boolean;

  isInstrumetSelected!: any;
  isload!: boolean;
  loadProjectID!: any;
  isEdit!: boolean;
  clearStat!: any;
  removeGryout!:boolean;

  isMultimappingEnable:boolean = false

  constructor(private projectService: ProjectsServiceService,
    private route: ActivatedRoute,
    private mappingServ: MappingService,
    private passMappingService: PassMappingService,
    private renderer: Renderer2) {
    this.isMasterSelSource = false;
    this.mappingStatus = false;
    this.project = {};
    this.if = 'if';
    this.where = 'where';

    this.filterSelected = false

  }


  ngOnInit(): void {
    this.projectService.pId.subscribe(
      projectID => {


        if (projectID) {
          this.id = projectID
        }
      }
    );

    this.mappingServ.getuidStatus.subscribe(checkSt => {
      this.isUIdSelection = checkSt
    });

    this.mappingServ.getInstrumentSelection.subscribe(isSelected => {
      this.isInstrumetSelected = isSelected;
      // console.log( this.isInstrumetSelected)
    });

    this.mappingServ.getTouncheckSource.subscribe(
      stat=> this.removeGryout = stat
    )

    this.projectService.pname.subscribe(
      projectName => {


        if (projectName) {
          this.projectName = projectName
          this.projectName = this.projectName.replace(/\s/g, "_");
        }
      }
    );
    // this.projectName= this.projectService.getProjectName();
    this.projectService.getisLoad.subscribe(
      res => {
        // console.log(res);
        this.isload = res.isLoad,
          this.isEdit = res.isEdit
        this.loadProjectID = res.projectID;
        if (this.isload) {
          this.projectService.getSourceDataIdwise(this.loadProjectID).subscribe(res => {
            if (res) {
              document.getElementById("progressSpin").style.display = "none"
              document.getElementById("noSourceData").style.display = "none"
              this.project = res
              console.log("this.project-108",this.project)
              this.SourcecategoryList = this.project.sourceLegacy.map(val => val.sourceLegacyData);
              this.sourceID = this.project.sourceLegacy;
              this.selectUncheckAllInitial();
              console.log("this.project-112",this.project);
            }
          })
        }

        if (this.isEdit) {
          // getprojectData
          this.projectService.getNewProject_SourceDataIdwise(this.loadProjectID).subscribe(data => {
            // console.log(data)
            if (data) {
              document.getElementById("progressSpin").style.display = "none"
              document.getElementById("noSourceData").style.display = "none"
              this.project = data
            console.log("this.project-125",this.project)
              this.SourcecategoryList = this.project.sourceLegacy.map(val => val.sourceLegacyData);
              this.sourceID = this.project.sourceLegacy;

              console.log("this.sourceID-129",this.sourceID);
              this.selectUncheckAllInitial();
            }
          });
        }





      }



    );
    // console.log(  this.id )
    if (!this.isload && !this.isEdit) {
      // getprojectData
      // getNewProject_SourceDataIdwise
      this.projectService.getprojectData.subscribe(data => {
        // console.log(data)
        if (data) {
          document.getElementById("progressSpin").style.display = "none"
          document.getElementById("noSourceData").style.display = "none"
          this.project = data

          this.SourcecategoryList = this.project.sourceLegacy.map(val => val.sourceLegacyData);
          this.sourceID = this.project.sourceLegacy;

          // console.log( this.project)
          this.selectUncheckAllInitial();
        }
      });
    }

    this.mappingServ.desStatus.subscribe(

      destinationStatus => {
        this.destiStatus = destinationStatus;
        // console.log("Destination Status: " + this.destiStatus)
      })

    this.passMappingService.condiv.subscribe(
      conditon => {

        if (conditon === this.if) {
          console.log('conditon: IF')
        }
        if (conditon === this.where) {
          console.log('conditon: where')
        }

      }
    )

    this.mappingServ.mapStatus.subscribe(
      status => {

        this.mappingStatus = status
        // console.log("Is Mapping Done:" + this.mappingStatus);
        // let SoourcePanID= document.getElementById("sourcePanMain")
        this.mappingServ.sourceRowD.subscribe(
          data => {
            // console.log(data)

            if (status) {
               if(data){
                data.isSourceDataRow = false
               }
             
              status = false;
              this.mappingStatus = status;
              this.destiStatus = status
              if (this.mappingStatus) {
                this.destiStatus == false
              }

              for (var i = 0; i < this.SourcecategoryList.length; i++) {
                this.SourcecategoryList[i].map(val => {

                  if (val.LDgroup) {
                    val.isSourceDataRow = false

                  }
                })
              }


            }
          }
        )

      }
    );

    this.mappingServ.getEnablestatus.subscribe(
      status=>{
          this.destiStatus = status
      }
    )

    this.mappingServ.instTypeStatus.subscribe(status => {
      if (status) {
        this.filterSelected = status;

        if (this.filterSelected) {
          this.selectUncheckAllInitial();
          // this.mappingServ.sendSourceRowData('clear insttype')
        }
      }
    });


    this.mappingServ.getchboxCancelstuts.subscribe(status => {
      if (status) {
        this.clearStat = status;

        if (this.clearStat) {
          this.selectUncheckAllInitial();
          // this.mappingServ.sendSourceRowData('clear insttype')
        }
      }
    });

  }

  selectUncheckAllInitial() {
    for (var i = 0; i < this.sourceID.length; i++) {
      this.sourceID[i].isMasterSel = this.isMasterSelSource

    }

    for (var i = 0; i < this.SourcecategoryList.length; i++) {
      this.SourcecategoryList[i].map(val => {

        if (val.LDgroup) {
          val.isSourceDataRow = this.isMasterSelSource

        }
      })
    }

  }
 
  checkUncheckAllSource(sourceName: any, source: any, eve: any) {
    // this.isMasterSel =!this.isMasterSel 
    for (var i = 0; i < this.SourcecategoryList.length; i++) {
      this.SourcecategoryList[i].map(val => {

        if (val.LDgroup == sourceName) {
          val.isSourceDataRow = eve

        }
      })
    }

  }

  isSourceSelected(SourcerowData: any, eve: any) {
    this.isMasterSelSource = this.SourcecategoryList.every((sourceItem: any) => {
      return sourceItem.isSourceDataRow == eve;
    })
    if (eve) {
      this.mappingServ.sendSourceRowData(SourcerowData)
    }

    this.mappingServ.sourceDataEvent(eve)
    // console.log(SourcerowData)
  }



}