import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Projects } from 'src/app/model/projects.model';
import { Instruments } from 'src/app/model/projects.model';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { MenuItem } from 'primeng/api';
import { ExportService } from 'src/app/services/Export.service';
import { DOCUMENT } from '@angular/common';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { zip } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/global.constants';

export interface ExportName{
  zipname?:any
}

export interface ProjectID {
  project_id?: string;
}

@Component({
  selector: 'app-audit-table',
  templateUrl: './audit-table.component.html',
  styleUrls: ['./audit-table.component.css']
})
export class AuditTableComponent implements OnInit {

  projects: Projects[] = [];
  cols!: any[];
  instruments!: Instruments[];
  ProjectID: ProjectID = {};
  ExportName:ExportName ={};
  isLoading!:boolean;
  noRecords:boolean = false
  private readonly fileurl = GlobalConstants.apiBaseURL+'api/download-csv-excel'

  constructor(
    private psService: ProjectsServiceService,
    private exportser: ExportService,
    @Inject(DOCUMENT) private document: Document,
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true
    // Get all configured Projects
    this.psService.getAllconfiugredProject().subscribe(projectData => {
   
      if(projectData){
        this.projects = projectData;
        this.projects = this.removeDuplicates(this.projects, 'projectName');
        this.isLoading = false
      }

     
      //  console.log(this.projects )
    },
    error=>{
      if(error.error = "No Projects Available."){
        this.isLoading = false;
        this.noRecords = true
      }else{
        this.noRecords = false
      }
    }
    );
  }

  // Remove duplicate projects

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

  exportCSVZIPALL(projectID: any) {

    this.ProjectID.project_id = projectID
    // console.log(this.ProjectID)
    this.sendIDTojsonCSV(this.ProjectID);
    // this.isDownloadWait = true;
  }



  exportAllExls(projectID:any){
   this.ProjectID.project_id = projectID;
   this.sendIDTojsonExcls(this.ProjectID)
  }

  sendtoExls(id: any) {
    this.exportser.exportExls(id).subscribe(res => { })
  }

// Send Id to export service to export all csv files
  sendIDTojsonCSV(id: any) {
    this.exportser.exportALLCSV(id).subscribe(res => { 
      this.isLoading=  true
      setTimeout(() => {
       
        // this.sendZipnametoDownload(this.ExportName);
        this.document.location.href = this.fileurl;
        this.isLoading=  false;
        }, 5000)
    });

  }

// Send Id to export service to export all exlc files.
  sendIDTojsonExcls(id: any) {
    this.exportser.exportALLExls(id).subscribe(res => { 
      this.isLoading=  true
      setTimeout(() => {
       
        // this.sendZipnametoDownload(this.ExportName);
        this.document.location.href = this.fileurl;
        this.isLoading=  false;
        }, 5000)
    });

  }

}
