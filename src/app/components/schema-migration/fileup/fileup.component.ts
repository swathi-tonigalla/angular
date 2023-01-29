import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFilesService } from '../../../services/fileUpload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fileup',
  templateUrl: './fileup.component.html',
  styleUrls: ['./fileup.component.css']
})
// class FileSelectDirective

export class FileupComponent  {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  sourceResponse!:any;
  sourceStatus:boolean = false;
  fileCount!:any
  slectedMsg!:any;
  fileInfos?: Observable<any>;
  loadingAsyncTask!:boolean;
  isuploadStart:boolean = false;
   testarray:any []=[];

  constructor ( private uploadService: UploadFilesService){}
  
  @ViewChild('fileInput', {static: false})
  InputVar: ElementRef;
  
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];

    if(event){
      this.selectedFiles = event.target.files;
      this.isuploadStart = false;
      if(this.selectedFiles){
        this.fileCount=this.selectedFiles.length
      }
     
         if(this.fileCount){
          if(this.fileCount<1)
          {   this.fileCount=''
              this.slectedMsg="Source Files is not selected! Please Select"
          }else if(this.fileCount==1){
            this.slectedMsg="source file is selected"
          }else if(this.fileCount==this.selectedFiles.length){
            this.slectedMsg="source files is selected"
          }}
    }
    // this.isuploadStart = true;

  }

  cancel(){

    this.InputVar.nativeElement.value = "";
   this.selectedFiles = null;
 
     this.message = [];
     this.isuploadStart = true;
    this.progressInfos = [];
    this.sourceStatus = false
    this.uploadService.sendDestinationUploadStatus(this.sourceStatus);
    this.loadingAsyncTask= false;
    this.uploadService.clearFiles().subscribe(res=>{
      //console.log(res)
    });
    this.uploadService.clearJsonFiles().subscribe(res=>{
     // console.log(res)
    });
    this.loadingAsyncTask= false
  }

  uploadFiles(event:any): void {
    event.preventDefault();
    this.message = [];
    
    if (this.selectedFiles) {
      this.loadingAsyncTask= true;
      this.isuploadStart = true;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
   
   
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'check_circle';
            // + file.name;
            this.message.push(msg);
            // this.fileInfos = this.uploadService.getFiles();
            
             this.testarray.push(this.progressInfos[idx]);

             if(this.testarray.length == this.selectedFiles.length){
              // setTimeout(() =>
              // {

              // console.log("file "+this.testarray.length,"returnres: "+this.selectedFiles.length);
              // getNewProject_SourceDataparsed
              this.uploadService.getNewProject_SourceDataparsed().subscribe(
                res=>{
          
                  if(res){
                    this.loadingAsyncTask= false;
                // console.log(res)
                  }
                this.sourceResponse =res
                 this.uploadService.sendSourceData(this.sourceResponse);
                 this.sourceStatus = true
                 this.uploadService.sendDestinationUploadStatus(this.sourceStatus);
          
                }
              )
            // },1000)
             }
           
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'cancel';
          // + file.name
          this.message.push(msg);
          // this.fileInfos = this.uploadService.getFiles();
        });
    }
  }

}