import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';
import { Observable } from 'rxjs';
import { UploadFilesService } from '../../services/fileUpload.service';
import { DestinationManagementService } from 'src/app/services/destination-management.service';
import { Destinations } from 'src/app/model/DestinationManage.model';
import { ClearSourceData, LoadProjectID_Status, Projects, SourceDataForLoad } from 'src/app/model/projects.model';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { UserpermissionService } from 'src/app/services/userpermission.service';




@Component({
  selector: 'app-schema-migration',
  templateUrl: './schema-migration.component.html',
  styleUrls: ['./schema-migration.component.css'],
  providers: [MessageService]
})
export class SchemaMigrationComponent implements OnInit {

  username!: any;
  users?: string;
  userDilog?: boolean;
  newprojectForm: FormGroup;


  newProjectDialog?: boolean;
  multiple?: boolean;
  destinationForm: FormGroup;
  uploadedFiles: any[] = [];
  msgs1!: Message[];
  msgs2!: Message[];
  msgs3!: Message[];
  project!: Projects;
  Projects: Projects[] = [];

  ConfiguredProjects: Projects[] = [];

  sourceDestination: Destinations[];
  targetDestination: Destinations[];

  selectedInstruments!: any
  isProjectSelcted: boolean = false
  resposnse!: any;
  userID: any;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  selectedClientName!: any;
  clientsName!: Destinations[];

  destinames!: Destinations[]

  getSoruceData!: any;

  sourceStatus: any = false;

  private dashSub;

  isFromDashboard!: boolean

  fileInfos?: Observable<any>;
  instrumentTypes!: any[];
  role!: any;

  isnormalUSer: boolean = false;
  loadProjectPermission!: any;
  allowPermission!: boolean;
  admin!: boolean;

  //LOAD PROJECT
  isLodeProject: boolean;
  selectedCLientForLoad!: any;
  loadedProjectsForClient!: any;
  isAllowedtoselectProject!: boolean;
  selectedProjectName!: any
  selectedProject!: any
  LoadProjectID_Status: LoadProjectID_Status = {};
  sourceDataForLoad: SourceDataForLoad = {};
  removedDuplicatedFromSelectedColn!: any;

  colloectioName: ClearSourceData = {}
  isGettingData!:boolean

  projectTypes: string[] = ['Edit Project', 'Auto Mapping'];

  selectedProjectType!: any
  isEditProject!: boolean;
  isEditP!: boolean
  checkProjectName!: any
  isSourcebox!: boolean;
  isProjectNameExists!: boolean;

  notEmptyDestination!: boolean;

  saveButtonAlready!:boolean;
  destinationID!:any;
  theWord:string = '_A'
 
  

  constructor(public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private tokenser: TokenService,
    private uploadService: UploadFilesService,
    private destinationService: DestinationManagementService,
    private ProjectService: ProjectsServiceService,
    private sharedService: SharedService,
    private router: Router,
    private upser: UserpermissionService



  ) {
    this.targetDestination = [];
    this.sourceDestination = [];
    this.selectedInstruments = [];
    this.destinames = [];
    this.sourceStatus = false
    // const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
    this.isLodeProject = false;
    this.newprojectForm = fb.group({
      projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      // formControlName:['',Validators.required]
    })

    this.destinationForm = fb.group({
      userName: ['', Validators.required],
      Roles: ['', Validators.required]
    });

    this.userID = this.tokenser.getUid();
  }

  ngOnInit(): void {

    this.isFromDashboard = false
     this.isGettingData = true
    this.destinationService.getAllDestinations().subscribe(
      (data: any[]) => {

        if (!this.selectedClientName) {
          this.clientsName = data
          this.clientsName = this.clientsName.reduce((a, b) => {
            if (!a.find(data => data.selectedClientName === b.selectedClientName)) {
              a.push(b);
            }
            return a;
          }, []);
        }

        if (!this.clientsName?.length) {
          this.notEmptyDestination = true;
        } else {
          this.notEmptyDestination = true;
        }
      }
    );

    this.primengConfig.ripple = true;
    this.username = this.tokenser.getname();

    this.role = this.tokenser.getRole();

    if (this.role === 'Administrator') {
      this.admin = true
    }

    if (this.role === 'Normal User') {
      this.isnormalUSer = true;
      const panel = document.getElementById("wrper")
      panel.style.width = "100%"
    }
    else {
      this.isnormalUSer = false
    }
    this.upser.getseleclient.subscribe(res => {
      this.loadProjectPermission = res.load_project;
      if (this.loadProjectPermission === 'Yes') {
        this.allowPermission = true
      } else {
        this.allowPermission = false
      }
      // console.log(res)
    });





    this.uploadService.srcMsg.subscribe(
      srcData => {
        this.getSoruceData = srcData;
        // console.log(this.getSoruceData)

      }
    )

    this.uploadService.destiStats.subscribe(
      status => {
        this.sourceStatus = status
        // console.log(this.sourceStatus)
      }
    )



    //   this.sharedService.isdashModel.subscribe(
    //     ModelStatus=>{

    //     if(!ModelStatus)
    //     {
    //       this.isFromDashboard = false;
    //       this.newProjectDialog = this.isFromDashboard;
    //       // ModelStatus = false

    //     } 
    //     else{
    //       this.isFromDashboard = true;
    //       this.newProjectDialog = this.isFromDashboard
    //     }
    //     }
    //   );


    //CONFIGURED PROJECTS
    this.ProjectService.getallFromMONOG().subscribe(projectData => {

      if (projectData) {
        this.ConfiguredProjects = projectData.data;
//  console.log(this.ConfiguredProjects)
        const filterclietnName = this.ConfiguredProjects.map(val => val.clientName)
        // this.isLoading = false
        const toNeset = Object.values(filterclietnName);


        this.removedDuplicatedFromSelectedColn = [...new Set(toNeset)];
        
        if(this.removedDuplicatedFromSelectedColn){
          this.isGettingData = false

        }
        
        
        // if(this.checkProjectName !=''){

        // }
        // console.log( this.removedDuplicatedFromSelectedColn)

      }


    },error=>{
      console.log(error)
      this.isGettingData = false
    }
    
    );



  }


  ngOnDestroy() {
    // this.dashSub.unsubscribe()
  }

  newProject() {
    this.msgs1 = [];
    this.project = {};
    this.Projects = []
    this.newProjectDialog = true;
    this.newprojectForm.reset();
  }

  loadProject() {
    this.userDilog = true;
  }

  hideDilog() {
    this.msgs1 = [];
    this.targetDestination = [];
    this.sourceDestination = [];
    this.newProjectDialog = false;
    this.sourceStatus = false;
    this.newprojectForm.reset();
    this.isFromDashboard = false;
    this.sharedService.sendNewProjectStatusToOthers(this.isFromDashboard)
    this.uploadService.clearSourceFiles().subscribe(
      res => {
        //  console.log(res)
      }
    )
    this.colloectioName.table_name = 'source-results'
    this.uploadService.ClearSourceTempData(this.colloectioName).subscribe(clearRes => { })
    this.uploadService.cliearSourceJsonFiles().subscribe(clearRes => {
      // console.log(clearRes)
    })

  };

  OnchangeProjectName(perojectName: any) {

  const name = (<HTMLInputElement>perojectName.target).value
    let projectNameExists = document.getElementById("projectNameExists");

    // This is for already project name exists
    projectNameExists.innerText = "";
    this.isProjectNameExists = false;
    this.saveButtonAlready = false;

    this.ConfiguredProjects.filter(el => {
      if (el.projectName === name) {
        this.isProjectNameExists = true;
        //  console.log('exists')
        projectNameExists.innerText = "Project name already exists";
        projectNameExists.style.display = 'block';
        projectNameExists.style.color = 'tomato';
        projectNameExists.style.position = 'absolute';
        projectNameExists.style.top = '65px';
        
        this.saveButtonAlready = true;
      }
      if (el.projectName.length != name.length) {
        if (this.isProjectNameExists) {
          if (!this.checkProjectName || this.checkProjectName === '') {
            projectNameExists.style.display = 'none';
            projectNameExists.innerText = ''
            this.isProjectNameExists = false
          }

        }
      }
    }
    )
  }

  onClientChange() {

    this.destinationService.getAllDestinations().subscribe(
      (data: any[]) => {

        this.sourceDestination = data
        this.sourceDestination = this.sourceDestination.filter(val => val.selectedClientName === this.selectedClientName);
        // console.log(this.sourceDestination)
      }
    );
  }
  onSubmit() {

    if (this.targetDestination.length == 0) {
      this.msgs1 = [
        { severity: 'error', summary: 'Error', detail: 'Please select at least one destination' }
      ]

    } else if (this.targetDestination.length > 1) {
      this.msgs1 = [
        { severity: 'error', summary: 'Error', detail: 'Cannot select more than one destination' }
      ]
    } else {

      if (this.targetDestination.length == 1) {
        this.msgs1 = []
        this.targetDestination.filter(val => {
          if (val) {
            this.selectedInstruments = val.instruments;
            this.instrumentTypes = val.insrtumentTypes;

          }
        }
        )
        const DesId = this.targetDestination.map(res=>res.id);
        
        this.destinationID = DesId[0]
        this.project.id = this.createId();
        this.project.destinationID = this.destinationID;
        this.project.projectName = this.newprojectForm.controls['projectName'].value;
        this.project.clientName = this.newprojectForm.controls['clientName'].value;
        this.project.userName = this.username;
        this.project.createdAt = Date.now();

        this.project.instruments = this.selectedInstruments;
        this.project.instrumentTypes = this.instrumentTypes
        // this.project.sourceLegacy = this.getSoruceData;
        this.project.user_id = this.userID;
        const isStarted = true;
        this.project.isProjectStarted = isStarted
        this.targetDestination.find(name => this.project.destinationName = name.destinationName)

        this.Projects.push(this.project);
        // this.sendToJson(this.project);
        this.sendtomongo(this.project)

        this.onSaveProjectinDB(this.project);

        this.sourceDataForLoad.projectID = this.project.id
        this.sourceDataForLoad.sourceLegacy = this.getSoruceData;
        this.sourceDataForLoad = { ...this.sourceDataForLoad }
        // console.log(this.sourceDataForLoad)
        this.saveNewProject_SourcedatainMongo(this.sourceDataForLoad)
        // this.ProjectService.getProjectID(this.project.id+);

        this.ProjectService.getProjectID(this.project.id, this.project.projectName);


        //  const isStarted= 'started';
        //  this.ProjectService.setProjectStartStatus(isStarted);
        //  this.router.navigate(['instrumentmapping','projectcontent']);
        this.Projects = [...this.Projects];



        this.project = {};
        this.sourceDataForLoad = {}
        this.newProjectDialog = false;
        this.isFromDashboard = false;
        this.uploadService.clearSourceFiles().subscribe(
          res => {
            //  console.log(res)
          }
        );


        this.uploadService.cliearSourceJsonFiles().subscribe(clearRes => {
          // console.log(clearRes)
        });
        this.colloectioName.table_name = 'source-results'
        this.uploadService.ClearSourceTempData(this.colloectioName).subscribe(clearRes => { })

        if (this.sourceStatus) {
          this.sourceStatus = false;
        }
      }

      if (this.getSoruceData.length == 0) {
        this.msgs2 = [
          { severity: 'error', summary: 'Error', detail: 'Please Upload Source Data!' }
        ]
        // console.log('upload data')
      }


    }
  }




  saveNewProject_SourcedatainMongo(data: SourceDataForLoad) {
    this.ProjectService.saveNewProject_SourceDataMDB(data).subscribe(
      res => {
        // console.log(res);
        if (res === 'Project Save Sucessfully') {
          let startProject = true;
          this.uploadService.sendProjectStatusToOthers(startProject)

          this.sharedService.sendNewProjectStatusToOthers(this.isFromDashboard)
        }
        this.uploadService.projectSavedStat(res)
      }
    )
  }

  sendtomongo(project: Projects) {
    this.ProjectService.saveProjectinMongo(project).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New Project Created successfully', life: 3000 });
        //this.client = response
        this.hideDilog()
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somthing went wrong at server,data is not updated to server please try again!', life: 2500 }), console.error(error);
      }
    )

  }

  sendToJson(project: Projects) {
    this.ProjectService.createProject(project).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New Project Created successfully', life: 3000 });
        //this.client = response
        this.hideDilog()
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somthing went wrong at server,data is not updated to server please try again!', life: 2500 }), console.error(error);
      }
    );
  };


  onSaveProjectinDB(data: Projects) {
    this.ProjectService.savePorjectInDB(data).subscribe(res => { })
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  //LOAD PROJECT

  onLoadClientChange() {
    this.loadedProjectsForClient = this.ConfiguredProjects.filter(val => val.clientName === this.selectedCLientForLoad);
    if (this.loadedProjectsForClient) {
      this.isAllowedtoselectProject = true;
        // console.log(this.loadedProjectsForClient)
      // this.loadedProjectsForClient.map(res=>{
      //   if(res.projectName){
      //     if (res.projectName.indexOf(this.theWord) !== -1) {
      //       // console.log('The word "' + this.theWord + '" exists in given string.');
      //       let smalltag = document.getElementById("indexID_"+res.projectName);
      //         smalltag.style.display ='block'
      //     }else{
         
      //     }
      //   }
      // })
    }
  }

  onLoadProjectChange() {
    this.isProjectSelcted = true
    this.selectedProject = this.loadedProjectsForClient.filter(val => val.projectName === this.selectedProjectName);
    // console.log(this.selectedProject) 
   


  }

  projectSelection(selectedProjectType: any) {

    //console.log(selectedProjectType)
    if (selectedProjectType === this.projectTypes[0]) {
      this.isEditProject = true
    } else {
      this.isEditProject = false;
    }
    if (selectedProjectType === this.projectTypes[1]) {
      this.isSourcebox = true
    } else {
      this.isSourcebox = false;
    }
  }


  onLoadProject() {
    this.colloectioName.table_name = 'source-results'
    this.uploadService.ClearSourceTempData(this.colloectioName).subscribe(clearRes => { })

    const project_id = this.selectedProject[0].id
    this.LoadProjectID_Status.projectID = project_id;
    this.isLodeProject = this.isSourcebox;
    this.isEditP = this.isEditProject;

    if (this.isLodeProject) {
      this.LoadProjectID_Status.isLoad = this.isLodeProject
      this.sourceDataForLoad.projectID = project_id
      this.sourceDataForLoad.sourceLegacy = this.getSoruceData;
      //  this.sourceDataForLoad ={...this.sourceDataForLoad}
      this.saveSOurcedatainMongo(this.sourceDataForLoad);
      // this.saveNewProject_SourcedatainMongo(this.sourceDataForLoad)
      // console.log(this.sourceDataForLoad)
      this.ProjectService.sendProjectLoadStatus(this.LoadProjectID_Status);
      this.colloectioName.table_name = 'source-results'
      this.uploadService.ClearSourceTempData(this.colloectioName).subscribe(clearRes => { })
      this.isProjectSelcted = false
    }

    if (this.isEditP) {
      this.LoadProjectID_Status.isEdit = this.isEditP
      this.sourceDataForLoad.projectID = project_id
      this.ProjectService.sendProjectLoadStatus(this.LoadProjectID_Status)
    }
    //  this.LoadProjectID_Status ={...this.LoadProjectID_Status}

    this.uploadService.clearSourceFiles().subscribe(
      res => {
        //  console.log(res)
      }
    )

    this.uploadService.cliearSourceJsonFiles().subscribe(clearRes => {
      // console.log(clearRes)
    })

  }

  cacleLoadProject() {
    this.userDilog = false;
    this.isLodeProject = false;
    this.isEditProject = false;
    this.isSourcebox = false;
    this.newprojectForm.reset();
    this.uploadService.clearSourceFiles().subscribe(
      res => {
        //  console.log(res)
      }
    )
    this.colloectioName.table_name = 'source-results'
    this.uploadService.ClearSourceTempData(this.colloectioName).subscribe(clearRes => { })

    this.uploadService.cliearSourceJsonFiles().subscribe(clearRes => {
      // console.log(clearRes)
    })
  }


  saveSOurcedatainMongo(data: SourceDataForLoad) {
    this.ProjectService.saveSourceDataMDB(data).subscribe(
      res => { }
    )
  }



  // getIdWiseProjectFroDB(id:any){
  //   this.ProjectService.getProjectIdwiseFromMONGO(id).subscribe(
  //     res=>{

  //       if(res){
  //           console.log(res.data);

  //       }

  //     }
  //   )
  // }

}
