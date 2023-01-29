import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/services/fileUpload.service';

@Component({
  selector: 'app-destination-fileup',
  templateUrl: './destination-fileup.component.html',
  styleUrls: ['./destination-fileup.component.css']
})
export class DestinationFileupComponent {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  inst?: any;
  destinationStatus!:any;
  loadingAsyncTask:any=false

  fileCount!:any
  slectedMsg!:any;
  msg: Message[];
  isupload!:boolean

  fileInfos?: Observable<any>;
  constructor ( private uploadService: UploadFilesService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,){
    // this.inst=[]
    this.isupload = false
  }
  @ViewChild('fileInput', {static: false})
  InputVar: ElementRef;
    
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];

    if(event){
      this.selectedFiles = event.target.files;
      this.isupload = false;
      this.fileCount=this.selectedFiles.length
  
      if(this.fileCount==0)
      {   this.fileCount=''
          this.slectedMsg="Instrument Files is not selected! Please Select"
      }else if(this.fileCount==1){
        this.slectedMsg="instrument file is selected"
      }else if(this.fileCount>1){
        this.slectedMsg="instrument files is selected"
      }
    }
   
  }

  cancel(){
    this.InputVar.nativeElement.value = "";
    this.selectedFiles = null;
    this.message = [];
    this.progressInfos = [];
    
    this.uploadService.clearFiles().subscribe(res=>{
      // console.log(res)
    });
    this.uploadService.clearJsonFiles().subscribe(res=>{
      // console.log(res)
    });
    this.destinationStatus = false
    this.uploadService.sendDestinationUploadStatus(this.destinationStatus);
    this.loadingAsyncTask= false
  }

  uploadDestinationFiles(event:any): void {
    event.preventDefault();
    this.message = [];

    if (this.selectedFiles) {
      this.loadingAsyncTask= true;
      // this.selectedFiles = null;
      this.isupload = true
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
    setTimeout(() =>
    {
      this.uploadService.getInstruments().subscribe(res=>{
        this.inst=res;
          //  console.log(this.inst)
        this.uploadService.sendInstrumenttoDestination(this.inst)
        this.destinationStatus = true
        this.uploadService.sendDestinationUploadStatus(this.destinationStatus);
        this.loadingAsyncTask= false
      })
      
    },
    5500
    )
  
   
 

  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      this.uploadService.uploadDestination(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'check_circle'
            // + file.name;
            this.message.push(msg);
           
            if(event.body.message === 'File should be contain only headers - no data.'){
               document.getElementById("blankFile").style.display='flex';
               this.msg = [
                { severity:'error', summary: 'Error', detail: event.body.message, life: 3000}
              ]
              setTimeout(()=>{
                this.cancel();
                document.getElementById("blankFile").style.display='none';
              },3000);
              this.destinationStatus = false;
                this.uploadService.sendDestinationUploadStatus(this.destinationStatus);
            }else if(event.body.message === 'File Uploaded Succesfully'){
              document.getElementById("blankFile").style.display='none'
            }
            // this.fileInfos = this.uploadService.getFiles();
          }
        },
 
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'cancel'
          const iconId = document.getElementById("progressIcon")

          // iconId.style.color='#e84118'
        //  + file.name;
          this.message.push(msg);
          // this.fileInfos = this.uploadService.getFiles();
        });
    }
  }
}
