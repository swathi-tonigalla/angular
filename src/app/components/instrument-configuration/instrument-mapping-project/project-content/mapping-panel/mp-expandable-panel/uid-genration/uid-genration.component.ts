import { Component, OnInit } from '@angular/core';
import { uidRepost, Uids, Uid_regenrate_post } from '../../../../../../../model/Uid.model';
import { MappingService } from 'src/app/services/mapping.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ProjectsServiceService } from 'src/app/services/projects-service.service';
import { Projects } from 'src/app/model/projects.model';

@Component({
  selector: 'app-uid-genration',
  templateUrl: './uid-genration.component.html',
  styleUrls: ['./uid-genration.component.css']
})
export class UidGenrationComponent implements OnInit {

  concat_result!: any[];
  resultArrObj!: any;


  concat_c1: any[];
  responses1: Uids[] = []

  response1: Uids = {};
  //any!:any
  concat_c1Obj: any;

  concat_c2: any[];
  concatArrObj!: any;

  c1_Uid!: any;
  c2_Uid!: any;
  id!: any;
  isLoading!: boolean;
  isSucessmsg!: boolean;
  isuidStarted!: boolean

  conditionCheck: string[] = ['If', 'Filter', 'Concatenate'];

  isTypeSelected!: boolean;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isGoingForUID!: boolean;
  isUidSelectionDone!: boolean;
  msgs1: Message[];

  uids!: any[];
  alreadygenrateduids!: any[];
  isload!: boolean;

  projectID!: any;
  is_regenration!: boolean;
  regen_post: Uid_regenrate_post = {};

  projectuidAutomapdata:uidRepost = {}
  regen_status!: any;
  project: Projects;
  colid!: any[];
  colname!: any[];
  afterGenration!: any[]
  finalaftergen!:any;
  isEdit!:boolean;
  status:any =''

  constructor(private mappingServices: MappingService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private projectService: ProjectsServiceService
  ) {
    this.concat_c1Obj = {}
    this.concat_result = [];
    this.concat_c1 = [];
    this.concat_c2 = [];
    this.responses1 = [];
    this.response1.LDcolID = [];
    this.response1.LDcolname = [];
    this.isUidSelectionDone = false;
    this.regen_status = 'Not regenrated'

  }

  ngOnInit(): void {

    this.projectService.getisLoad.subscribe(
      res => {
      // console.log(res);
        this.isload = res.isLoad
        this.isEdit = res.isEdit
       
       if(this.isEdit){
        this.projectID = res.projectID;
        this.projectService.getUidIdwise(this.projectID).subscribe(
          response => {

            if(response){
              this.uids = response;

              this.alreadygenrateduids = response.uidArr;
              // console.log(this.alreadygenrateduids)
              this.mappingServices.sendUidData(this.uids)
            }
            }
        
        )
       }

        if (this.isload) {
          this.projectID = res.projectID;
          setTimeout(() => {

            this.projectService.getprojectData.subscribe((data: any) => {
      
              if (data) {
                // document.getElementById("progressSpinDesti_sepec").style.display = "none"
                // document.getElementById("NodataID").style.display = "none"
                this.project = data
                console.log("this.isload",this.project)
              }
      
            })
          }, 1)



          this.projectService.getUidIdwise(this.projectID).subscribe(
            response => {
              this.uids = response;
              // console.log(this.uids);
              this.alreadygenrateduids = response.uidArr;
                //  this.alreadygenrateduids = Object.values(this.alreadygenrateduids)
              // console.log(this.alreadygenrateduids);
             

            //  if(this.alreadygenrateduids){
            //     this.finalaftergen = this.alreadygenrateduids;
            //   //  this.finalaftergen = this.finalaftergen.fillter(res=>(res.status === 'Regenrated'));
            //   //  console.log(this.finalaftergen);
            //  }
              this.projectService.automapgetUidIdwise(this.projectID).subscribe(res => {

                if(res){
                    //  console.log(res)

                  this.finalaftergen  = res.uidArr


                  this.finalaftergen.filter(
                    val=>{
                      this.alreadygenrateduids.map(res=>{
                        if(val.id == res.id){
                          // this.status ='Regenerated'
                        } 
                      })  
                    }
                  )
                  // console.log(this.finalaftergen)
                  // this.afterGenration = res
                  // if(this.afterGenration){
                  //   this.afterGenration =  this.afterGenration.map(el=>el.uidArr);
                  //   let hideBeforeUid = document.getElementById("beforUID")
 
                  // // this.finalaftergen =  this.afterGenration[0].filter((res)=>{
                  // //   if(res){
                  // //     return res.status
                  // //   }
                        
                  //   // })
                  //  // console.log(this.finalaftergen)
                  //   if(this.finalaftergen.length == this.alreadygenrateduids.length){
                  //    hideBeforeUid.style.display ='none'
                  //   }
                  // }
                  
                }
      
              },
               error=>{
                 if(error.error==="UID's not generated yet for this project."){
                   console.log("No UID's available for this project")
                 }
               }
              
              )

            }

          )
        }

      })
    this.mappingServices.condiStatus.subscribe(checkCondition => {
      this.isuidStarted = checkCondition
      // console.log(this.isuidStarted)
      if (this.isuidStarted) {
        this.mappingServices.instTypeStatus.subscribe(
          instTypeSelection => {

            this.isTypeSelected = instTypeSelection
            // this.compareKeyData.splice(0,1);
            // console.log(this.isTypeSelected);
            // console.log(this.concat_c1)

          }

        );
        if (this.isTypeSelected) {
          // console.log(this.concat_c1)
          this.concat_c1.splice(0, 1);
          this.concat_c1 = [];
          this.concat_c1Obj = {};
        }
      }


    }
    );

    this.projectService.pId.subscribe(
      projectID => {
        if (projectID) {
          this.id = projectID;
          // console.log(this.id)
        }
      }
    );
    // setTimeout(() => {
    this.projectService.getprojectData.subscribe((projectData) => {
      console.log("projectData",projectData)

      if (projectData) {
        // document.getElementById("progressSpinMidPan").style.display = 'none'
        this.project = projectData;
      }
    })

    // const DefaultprojectID = this.projectService.getProjectI();
    //  console.log(this.id)

    // if(this.uids){
    //   this.mappingServices.getUid().subscribe(res=>{
    //     if(res){
    //       this.alreadygenrateduids = res;
    //     }
    //   })
    // }


    this.mappingServices.sourceRowD.subscribe(
      concatData => {
        this.concat_c1Obj = concatData;
        this.concat_c1Obj = { ...this.concat_c1Obj }
        this.concat_c1.push(this.concat_c1Obj);
        // if (this.concat_c1) {
        //   this.colid = this.concat_c1.map(el => { return el.LDcolId });
        //   this.colname = this.concat_c1.map(el => { return el.LDname });
        // }

        //  console.log(this.concat_c1)
      });

  }

  remove(i: any): void {
    const index = i;

    if (index >= 0) {
      this.concat_c1.splice(index, 1);
    }
    // console.log(index);
    // console.log(this.concat_c1)
  }

  OngenrateC1(event: Event) {
    event.preventDefault();
    //getProjId
// console.log(this.concat_c1)
    if(this.isEdit){
      var projectID= this.projectID ;
      this.response1.prid = projectID;
    }else{
    var projectID = this.id;
    this.response1.prid = projectID;
    }
    // console.log(projectID)
    // endget Proj ID
    if (this.concat_c1) {
      this.colid = this.concat_c1.map(el => { return el.LDcolId });
      this.colname = this.concat_c1.map(el => { return el.LDname });
    }
    this.response1.id = this.createId();
 

    this.response1.uids = this.concat_c1.map(val => val.LDcolData);
    this.response1.uidLength = this.concat_c1.length;
    this.response1.uidName = this.concat_c1[0].LDgroup + "-" + this.response1.uidLength;
    this.response1.LDcolID = this.colid;
    this.response1.LDcolname = this.colname;
    this.response1.status = 'New';
    this.response1.autoStatus = 'Not Regenerated'
      // if(this.project.sourceLegacy){
        let SourceID = this.project.sourceLegacy.filter(res => this.concat_c1[0].LDgroup === res.sourceName);
      this.response1.sourceID = SourceID[0].sourceID
       this.response1.udname = SourceID[0].sourceName
      // console.log( this.project.sourceLegacy)
    // }
   

    // 
    // sourceID

    this.sendUidGenration(this.response1);
    // console.log(this.response1)
    this.isLoading = true

    setTimeout(() => {
      this.mappingServices.getUid().subscribe(response => {

        if (response) {
          this.isSucessmsg = true;
          this.isLoading = false;
          this.msgs1 = [
            { severity: 'success', summary: 'Success', detail: 'UID Generation successful for' + '\n' + this.response1.uidName + '-' + 'Columns', life: 6000 },]

          setTimeout(() => { this.isSucessmsg = false }, 5500);
          // console.log(response)
          if (response) {
            this.projectService.getUidIdwise(projectID).subscribe(
              response => {
                this.uids = response;
                // console.log(this.uids);
                this.alreadygenrateduids = response.uidArr;
                  // console.log( this.alreadygenrateduids );
                this.mappingServices.sendUidData(this.uids)
              }

            )
          }
        }

      }

      )
    }, 6000);

    // setTimeout(()=>{

    // },5000);


    this.isUidSelectionDone = false
    this.mappingServices.sendConditionToSOurce(this.isUidSelectionDone);

    const uidGenrated = true
    this.mappingServices.sendFilterInstTypeStatus(uidGenrated);

    this.concat_c1 = [];
    // this.response1 ={};
  }

  sendUidGenration(data: Uids) {
    this.mappingServices.sendUIDArray(data).subscribe(
      response => {
        // console.log(response)
      })
  }
  oncloseUidDIlog() {
    this.isGoingForUID = false;
    this.concat_c1 = [];
    this.isUidSelectionDone = false
    this.mappingServices.sendCondition(this.isUidSelectionDone);
  }
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }



  genrateNew() {
    const genartionallow = true
    this.mappingServices.sendConditionToSOurce(genartionallow);
  }

  closeBox() {
    let isCloseUID = true;
    const genartionallow = false
    this.mappingServices.sendConditionToSOurce(genartionallow);
  }

  //regenration
  regenratUID(skel_id: any, colID: any, sourceID: any, projectID: any, uidNamev: any) {
    let skeltn = document.getElementById("skeleton_" + skel_id);
    let stuts = document.getElementById("statusText_" + skel_id);
    let uidName = document.getElementById("uidName_" + skel_id);
    let regnbtn = document.getElementById("reGenBtn_" + skel_id);
    let statusTextSpan = document.getElementById("statusTextSpan_" + skel_id)
    skeltn.style.display = 'block';
    stuts.style.display = 'none';
    uidName.style.display = 'none';
    regnbtn.style.display = 'none';
    this.is_regenration = true;

    this.regen_post.projectID = projectID;
    // console.log( this.regen_post)
    this.regen_post.id = skel_id;
    this.regen_post.uidName = uidNamev
    this.regen_post.LDcolId = colID;
    this.regen_post.sourceID = sourceID;
    this.regen_post.status = "Regenerated"
    this.regen_post.autoStatus =  this.regen_post.status;
    this.regen_post.sourceLegacy = this.project.sourceLegacy
    this.regen_post = { ...this.regen_post }

    this.projectuidAutomapdata.uidProjectAutomapData =   this.regen_post
    // console.log( this.projectuidAutomapdata)
    this.projectService.regenrationUID(this.projectuidAutomapdata).subscribe(
      res => {//console.log(res)
        if (res) {
          skeltn.style.display = 'none';
         stuts.style.display = 'block';
          uidName.style.display = 'block';
         
          this.is_regenration = false;
          
          if (stuts) {
            
            statusTextSpan.innerText = 'Regenerated'
            // this.status ='Regenerated'
            regnbtn.style.display = 'none';
            // stuts.style.display = 'block';
            statusTextSpan.className = "success";
            this.mappingServices.getUid().subscribe(response => {

              if (response) {
                this.isSucessmsg = true;
                this.isLoading = false;
                // this.msgs1 = [
                //   { severity: 'success', summary: 'Success', detail: 'Uid Genration successful for' + '\n' + this.response1.uidName + '-' + 'Columns', life: 6000 },]
               
                setTimeout(() => { this.isSucessmsg = false }, 6000);
                  // console.log(response)
                if (response) {
                  this.projectService.automapgetUidIdwise(projectID).subscribe(
                    response => {
                      // this.uids = response;
                     const uids = response
                      // console.log(this.uids);
                      // this.alreadygenrateduids = response.uidArr;
                        // console.log(response.uidArr);
                        if(response.uidArr.length >1){
                          let isUidGenerated = true;
                          this.mappingServices.sendUidStatusTomapping(isUidGenerated)
                        }
                      this.mappingServices.sendUidData(uids)
                    }
      
                  )
                }
              }
      
            }
      
            )

          }
        }
      },
      error => {
        if (error) {
          skeltn.style.display = 'none';
          stuts.style.display = 'block';
          uidName.style.display = 'block';
          regnbtn.style.display = 'block';
          this.is_regenration = false;
          statusTextSpan.innerText = 'Something Went Wrong!'
          // statusTextSpan.innerText = JSON.stringify(error.error)
          statusTextSpan.className = "error"
        }

      }
    )
  }

  sendregen_post(data: Uid_regenrate_post) {

  }

}

