import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AutoMap, MappedInstrumentData, Projects, ResultSend } from 'src/app/model/projects.model';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';
import { MessageService } from 'primeng/api';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { Router } from '@angular/router';
import { ExportService } from 'src/app/services/Export.service';
import { DOCUMENT } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { GlobalConstants } from 'src/app/shared/global.constants';
import { validateBasis } from '@angular/flex-layout';
@Component({
  selector: 'app-mapping-panel',
  templateUrl: './mapping-panel.component.html',

  styleUrls: ['./mapping-panel.component.css'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
  providers: [ConfirmationService, MessageService]
})
export class MappingPanelComponent implements OnInit {

  mappedFileResult: any;
  mappingCheck: boolean;

  saveProject!: any

  projects!: Projects[]
  project!: Projects

  proid!: any;

  mappedColnData: any[];

  isMappingReady!: boolean
  msgs: Message[] = [];

  instrumentMappedData!: any[];
  instrumentId!: any

  position: string;
  isInstrumentSelected!: boolean;
  afterCancel!: boolean;
  ResultSend: ResultSend = {};

  id!: any;

  isExportReady: boolean = false;
  projectUser!: string;
  projectName!: any;
  username!: any;


  private letsClose!: boolean
  isload!: any;
  isEdit!: any;
  projectFromResult!: any;
  checkSelctedtype!: any;
  MappedInstrumentData: MappedInstrumentData = {}

  instrumentID!:any;
   spinner!:boolean
  projID: any;

automapAfterFillter:AutoMap = {
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

  constructor(private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private mappingServ: MappingService,
    private mappingService: PassMappingService,
    private messageService: MessageService,
    private projetcService: ProjectsServiceService,
    private exportService: ExportService,
    private router: Router,
    private projectService: ProjectsServiceService,
    private tokenser: TokenService,
    @Inject(DOCUMENT) private document: Document,
  ) {

    this.isMappingReady = false;
    this.project = {}
    this.projects = [];
    this.saveProject = []
    this.project.mappedInstruments = []
    this.mappedFileResult = [];
    // this.MappedInstrumentData.mpinst = [];
  }


  ngOnInit(): void {
    if(this.isMappingReady){
      let status = false
      this.projectService.sendDowneloadStatus(status);
    }else{
      let status = true
      this.projectService.sendDowneloadStatus(status); 
    }
    this.projectService.getisLoad.subscribe(
      res => {
        // console.log(res);
        this.isload = res.isLoad
        this.isEdit = res.isEdit;
        this.projID = res.projectID;

        if(this.isload){
          this.projectService.getAutomapData.subscribe(res=>{
            // console.log(res)
            this.mappedFileResult = res;
           
         
            // console.log(this.project);
            // console.log(this.MappedInstrumentData)
          },
          error=>{console.log(error)})
        }
        

        if (this.isEdit) {
          this.projectService.getProjectFromResult.subscribe(
            dataFromResult => {
              if (dataFromResult) {
                this.projectFromResult = dataFromResult
                if (this.projectFromResult.instruments) {
                  this.checkSelctedtype = this.projectFromResult.instruments.map(val => val.selectedInstrumentType);

                }
              }
            }
          )
        }
      })

      

    this.mappingServ.currentMsg.subscribe(
      isInstrument => {
        // console.log(isInstrument)
        this.instrumentID = isInstrument.instrumentID;
        if (isInstrument.isMasterSel) {

          this.isInstrumentSelected = true

        } else {
          this.isInstrumentSelected = false
        }
      })
    this.username = this.tokenser.getname()
    // this.id = this.projectService.getProjectI();
    //  this.projectName= this.projectService.getProjectName();
    this.projectService.pname.subscribe(
      projectName => {


        if (projectName) {
          this.projectName = projectName
          this.projectName = this.projectName.replace(/\s/g, "_");
          // console.log(  this.projectName)
        }
      }
    );

    this.projectService.pId.subscribe(
      projectID => {


        if (projectID) {
          this.id = projectID
        }
      }
    );

    // setTimeout(() => {

    this.projectService.getprojectData.subscribe((data: any) => {

      if (data) {

        this.project = data;
        // console.log(this.project)
      }
      // this.selectAllInitial();

    })
    // }, 1);

    this.primengConfig.ripple = true;

    this.mappingServ.mapStatus.subscribe(
      status => {
        this.isMappingReady = status
        if(this.isMappingReady){
          let status = false
          this.projectService.sendDowneloadStatus(status);
        }else{
          let status = true
          this.projectService.sendDowneloadStatus(status); 
        }
      }
    );

    this.mappingService.mapRes.subscribe(
      result => {

        if (result) {
          this.mappedFileResult = result
          this.mappedFileResult.map(
            val => {
              this.instrumentMappedData = val.instumentDataMapped
              this.instrumentId = val.instrumentID
            }
          )


          // this.instrumentMappedData.reduce(
          //   colData=>{
          //       if(colData.instID != this.instrumentId)
          //      {
          //       console.log(colData)
          //      // return colData
          //      }
          //   }
          // ) 
        }


      })
  }


  onSave() {
    this.spinner = true;
    this.mappedFileResult = [...this.mappedFileResult]
    this.saveProject = this.mappedFileResult

    if(this.isload){
      this.saveProject.map(val => val.instumentDataMapped.sort(function (a, b) {


        let mpColIDA = a.mpColID
        let mpColIDB = b.mpColID
        if (mpColIDA < mpColIDB) {
          return -1;
        }
        else if (mpColIDA > mpColIDB) {
          return 1;
        }
        return 0;
      }))
    }
    //  this.saveProject = [...this.saveProject];
    const mpdata = this.saveProject.map(val => val.instumentDataMapped)
    // console.log(this.saveProject);
    //  console.log(mpdata)
    this.project.userName = this.username
    this.project = { ...this.project }

    if(!this.isload){
      this.projectService.getAllAutomapData.subscribe(
        data=>{
          this.project.autoMap = data;
        }
      )
    }

    if(this.isload){
      if( this.mappedFileResult){
        const projectID = this.createId();
        this.project.id = projectID;
        //  let instrumentName = this.mappedFileResult[0].mappedInstrumentName
        // +'_'+this.project.id+"_Auto"
          const NewProject_name = this.project.projectName+'_'+this.project.id
        this.project.projectName = NewProject_name
        this.MappedInstrumentData.projectName = NewProject_name
        this.MappedInstrumentData.projectID =projectID;
        this.MappedInstrumentData.isprojectAutommaped = true
        if(this.MappedInstrumentData.isprojectAutommaped){
          this.project.isProjectAutoomapped=true
        }
      } 
    }else{
      this.MappedInstrumentData.isprojectAutommaped = false
      if(!this.MappedInstrumentData.isprojectAutommaped){
        this.project.isProjectAutoomapped=false
      }
    }
      //  console.log(this.saveProject);
    if (this.isEdit && this.checkSelctedtype) {
      this.project.mappedInstruments.map(val => val.instumentDataMapped = [...val.instumentDataMapped, mpdata[0][0]])
    } else {
      this.project.mappedInstruments = this.saveProject;
    }

    if (this.projectFromResult && this.isEdit) {
      this.project.mappedInstruments = this.projectFromResult;
      this.project = { ...this.project }
      this.onsaveinMONGO(this.project);
    } else {
      this.onsaveinMONGO(this.project);


    }

    this.MappedInstrumentData.projectID = this.project.id;
    this.MappedInstrumentData.projectName = this.project.projectName;
    this.MappedInstrumentData.clientName = this.project.clientName;
    this.MappedInstrumentData.userName = this.project.userName;
    this.MappedInstrumentData.mappedInstruments = this.project.mappedInstruments;
    this.MappedInstrumentData.mappedInstruments.
    map(el => el.instumentDataMapped.
      map(res => {
        if (!res.mpcolData) {
          res.mpcolData = []
        }
      }))
    // this.MappedInstrumentData.mappedInstruments.map(ele=>{
    //   // ele.ins  ele.instumentDataMapped.filter(filter=> (filter.instID === ele.mappedInstID))
    //   ele.instumentDataMapped = this.removeDuplicates( ele.instumentDataMapped,'mpColID')
    // });

    // console.log(this.MappedInstrumentData);
            
  
      // console.log(this.MappedInstrumentData);
      // if(!this.isload){
        this.onSaveMappedInstrumentInMongo(this.MappedInstrumentData);
      // }
     if(!this.isload){

    this.project.autoMap.projectID= this.project.id    
     this.project.autoMap.instrumentID = this.instrumentID
    // console.log(this.project.autoMap); 
    this.onSaveAutomap(this.project.autoMap);

    const clearData = true
    this.projectService.sendDataClear(clearData)
  
   
  }
    this.ResultSend.mappedInstruments = this.project.mappedInstruments;
    // 
    this.project.mappedInstrumentCount = this.ResultSend.mappedInstruments.length;

    this.onupSaveProjectinDB(this.project);
    this.onSaveResult(this.ResultSend);
    this.OnUpdateProject(this.project);

    this.isMappingReady = false;

    if(this.isMappingReady){
      let status = false
      this.projectService.sendDowneloadStatus(status);
    }else{
      let status = true
      this.projectService.sendDowneloadStatus(status); 
    }
    

  }

  onSaveMappedInstrumentInMongo(data: any) {
    this.projetcService.onsaveMappedInstrument(data).subscribe(res => {
      if(res){
        // this.project.projectName = ''
      }
    })
  }


 onSaveAutomap(data:any){
   this.projectService.saveAutoMap(data).subscribe(res=>{
        
    // console.log(res)
    if(res.message){
      if(this.isEdit && !this.isload || !this.isload){
        // console.log(this.instrumentID)
        this.getAutomapExistingData(this.project.id,this.instrumentID);
  
      }
    }
  

   })
 }

  onSaveResult(data: any) {
    this.projetcService.OnsaveResult(data).subscribe(res => {

      // this.messageService.add({severity:'success', summary: 'Success', detail: 'Result successfully saved',life: 3000})

    })
  }

  OnUpdateProject(project: Projects) {
    this.projetcService.updateProjectJSON(project).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project successfully saved', life: 3000 })

      }
    )
  }



  getAutomapExistingData(projectID:any,instrumentID:any){
    // this.isLoading = true;
  //  let spinner = document.getElementById("progressSpinDesti_sepec");
    // spinner.style.display = "flex";
   
    this.projectService.getautomapPost(projectID,instrumentID).subscribe(
      automap => {
      // this.alreadyAutomapResponse = automap
      if(automap){
        //this.isLoading = false;
        //spinner.style.display = "none";
        // console.log(automap);
        console.log(projectID);
        console.log(instrumentID)
        const sendata = automap
        this.projectService.sendautomapPostresponse(sendata)
      }
    
    },
    error=>{
      // this.isLoading = false
      // spinner.style.display = "none";
      const errorData = error.error
        this.projectService.sendautomapPostresponse(errorData)
   
    }

    );
  }




  onCloseProject() {
    this.confirmationService.confirm({
      message: 'Are you sure! Do you want to close this project.\nMake sure you have saved all instruments',
      header: 'Close Project',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.router.navigate(['instrumentmapping'])
        this.letsClose = false
        this.projetcService.getProjectCloseStatus(this.letsClose)
        this.projetcService.removeProject();
        const currentRoute = GlobalConstants.apiBaseURL + 'instrumentConfiguration';
        this.project = {}
        this.document.location.href = currentRoute;
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //     this.router.navigate([currentRoute]); // navigate to same route
        // }); 
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  cancel() {
    this.confirmationService.confirm({
      message: 'Do you want to close this instrument',
      header: 'Close Selected Instrument',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.router.navigate(['instrumentmapping'])
        this.afterCancel = true;
        this.isInstrumentSelected = false;
        const sendcanstat = true;
        this.mappingServ.sendcancelStatus(sendcanstat);
        this.mappingServ.senCancelStatus(this.isInstrumentSelected);
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  onupSaveProjectinDB(data: Projects) {
    this.projetcService.updateProjectInDB(data).subscribe(res => { })
  }

  onsaveinMONGO(data: Projects) {
    this.projectService.saveProjectinDB(data).subscribe(res => {
      if(res.message){
        this.spinner = false;
        let status = true
        this.projectService.sendDowneloadStatus(status);
      }else{
        let status = false
        this.projectService.sendDowneloadStatus(status);
      }
     })
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


  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}


}
