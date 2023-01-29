
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFilesService } from 'src/app/services/fileUpload.service';

import { Projects } from '../../model/projects.model'
import { ProjectsServiceService } from '../../services/projects-service.service'

@Component({
  selector: 'app-instrument-configuration',
  templateUrl: './instrument-configuration.component.html',
  styleUrls: ['./instrument-configuration.component.css']
})
export class InstrumentConfigurationComponent implements OnInit {
  isStarted?: boolean;
  id!: string;

  getStatus!: any;

  project: Projects = {};

  projectName!: any;
  asynawiat!: boolean;

  isload!: boolean;
  loadProjectID!: any;

  isEdit!: boolean;

  sourceData!: any;
  mappedInstrument!: any;
  isTypesaved!: any;
  checkSelctedtype!: any

  constructor(private projectService: ProjectsServiceService,
    private route: ActivatedRoute,
    private uploadService: UploadFilesService,
    private router: Router) {
    this.isStarted = false;
    this.isload = false;
    this.asynawiat = false
  }

  ngOnInit(): void {
    this.projectService.getisLoad.subscribe(
      res => {
        // console.log(res);
        this.isload = res.isLoad,
          this.isEdit = res.isEdit
        this.loadProjectID = res.projectID
        if (this.isload || this.isEdit) {
          //console.log(this.isload)
          this.asynawiat = true;
          //  setTimeout(()=>{
          this.projectService.getProjectIdwiseFromMONGO(this.loadProjectID).subscribe(
            loadData => {
              // console.log(loadData)
              if (loadData) {
                this.asynawiat = false;
                this.project = loadData.data[0];

                if(this.isload){
                  this.projectService.getSourceDataIdwise(this.loadProjectID).subscribe(
                    res => {
                      console.log(res)
                      this.sourceData = res.sourceLegacy
                      console.log("IF-ngOnInit - this.sourceData",this.sourceData);
                      this.project.sourceLegacy = this.sourceData;
                      this.project = { ...this.project }
                      // console.log(this.project)
                      this.projectService.sendProjectDestials(this.project)
                    })
                }else{
                  this.projectService.getNewProject_SourceDataIdwise(this.loadProjectID).subscribe(
                    res => {
                      this.sourceData = res.sourceLegacy
                      console.log("Else-ngOnInit - this.sourceData",this.sourceData);
                      this.project.sourceLegacy = this.sourceData;
                      this.project = { ...this.project }
                      // console.log(this.project)
                      this.projectService.sendProjectDestials(this.project)
                    })
                }
          
                // this.projectService.sendProjectDestials(this.project)
              }
              this.isTypesaved = this.project.instruments.every(val => val.isInstrumentSaved);
              this.checkSelctedtype = this.project.instruments.map(val => val.selectedInstrumentType);
              // console.log(this.project)
              // if(this.project){
              if (this.isEdit) {

                this.projectService.onGetMappedInstrument(this.loadProjectID).subscribe(
                  mappedData => {
                    if (mappedData) {
                      this.mappedInstrument = mappedData.mappedInstruments
                      this.project.mappedInstruments = this.mappedInstrument;
                      this.project = { ...this.project }
                      // console.log(this.project)
                      this.projectService.sendProjectDestials(this.project)
                    }

                  }
                )
              }

              // }
            });
          // if(this.project.instruments){
          // this.checkSelctedtype = this.project.instruments.map(val => val.selectedInstrumentType);
          // this.isTypesaved =this.project.instruments.every(val => val.isInstrumentSaved);
          // }
          //  },3000)

        }
      }
    )
    if (!this.isload) {
      this.uploadService.getStartStatus.subscribe(
        status => {
          //  console.log(status)
          if (status) {
            // this.isStarted = true;
          }


        }
      )

      this.projectService.pId.subscribe(
        projectID => {
          if (projectID) {
            this.id = projectID
            this.projectService.pname.subscribe(
              projectName => {


                if (projectName) {
                  this.projectName = projectName
                  this.projectName = this.projectName.replace(/\s/g, "_");
                  // console.log(  this.projectName)
                }
              }
            );

            // this.getStatus = this.projectService.getProjectStartStatus();

            this.isStarted = true
            if (this.isStarted) {
              this.asynawiat = true;
            }

            // GET projectFromnogDB

            this.uploadService.getSavedMsg.subscribe(
              res => {
                // console.log(res)
                if (res) {
                  this.projectService.getProject_id_Mongo(this.id).subscribe((data: any) => {
                    if (data) {
                      this.asynawiat = false;
                      // console.log(data)
                    }
                    this.project = data[0]


                    this.projectService.getNewProject_SourceDataIdwise(this.id).subscribe(
                      res => {
                        // console.log(res)


                        this.sourceData = res.sourceLegacy
                        console.log("173-ngOnInit - this.sourceData",this.sourceData);
                        this.project.sourceLegacy = this.sourceData;
                        this.project = { ...this.project }

                        this.projectService.sendProjectDestials(this.project)

                      }

                    )

                  });
                }

              }
            )
            //   if(this.getStatus === 'started'){
            //    
            //   }
            //   else{
            //     this.isStarted = false
            //   }
          }



        }
      );

    }
  }


}
