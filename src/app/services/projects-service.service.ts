import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projects, SourceDataForLoad } from '../model/projects.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Criteria, Uid_regenrate_post } from '../model/Uid.model';
import { map, delay } from "rxjs/operators";
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectsServiceService {


  public message: string = "Uninitialized";
  public response;
  private projectID: string
  private projectIdSource = new BehaviorSubject<any>('')
  pId = this.projectIdSource.asObservable()

  private projectnm: string
  private projectName = new BehaviorSubject<any>('')
  pname = this.projectName.asObservable()


  private isClose: boolean
  private isPorjectClosed = new BehaviorSubject<any>('')
  isCl = this.isPorjectClosed.asObservable();


  private sendProjectData
  private projectDataNext = new BehaviorSubject<any>('');
  getprojectData = this.projectDataNext.asObservable();

  projects!: Projects[];

  private sendisLoad;
  private nextIsLoad = new BehaviorSubject<any>('');
  getisLoad = this.nextIsLoad.asObservable();

  private project;
  private projectNext = new BehaviorSubject<any>('');
  getProjectFromResult = this.projectNext.asObservable();


  private instrumentTypeStat;
  private instrumentTypeNext = new BehaviorSubject<any>('');
  getInstrumentTypesStats =  this.instrumentTypeNext.asObservable();


  private automapResult;
  private SendautoMapResult = new BehaviorSubject<any>('');
  getAutoMapResult =  this.SendautoMapResult.asObservable();


  private instID;
  private  sendInstrumentIDto_mapping = new BehaviorSubject<any>('');
  getInstrumentID = this.sendInstrumentIDto_mapping.asObservable();


  private downloadDisabledStatus;
  private  sendDownloadDisabledStatus = new BehaviorSubject<any>('');
  getDonloadDisableStatus = this.sendDownloadDisabledStatus.asObservable();


  private sendAutomapData;
  private  automapData = new BehaviorSubject<any>('');
  getAutomapData = this.automapData.asObservable();

  constructor(private http: HttpClient) {
    // this.projects =[]
  }

  // getProjects() {
  //   return this.http.get<any>(this.baseUrl)
  //     .toPromise()
  //     .then(res => <Projects[]>res.porjectData)
  //     .then(data => { return data; });
  // }

  getAllProjects() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-all-project');
  }

  // async getProjectDetailsawait(id:any,projectname:any){
  //   this.message = "Fetching..";
  //   this.response = "";
  //   this.response = await this.http
  //     .get<any>(this.baseUrl+'api/get-project/'+id+'/'+projectname)
  //     .pipe(delay(6000))
  //     .toPromise();
  //   this.message = "Fetched";
  // }


  getProjectDetails(id: any, projectname: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-project/' + id + '/' + projectname);
  }

  sendProjectDestials(project: any) {
    this.sendProjectData = project;
    this.projectDataNext.next(this.sendProjectData);
  }

  getUidIdwise(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/uidwise-get/' + id);
  }

  automapgetUidIdwise(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get_Automap_Uid/' + id);
  }

  getAutomappingResult(id:any){
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-automapping-result/' + id);
    
  }

  getFillteredUid() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/filter-data-uid')
  }


  sendDataForFilltred(data: any) {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/Post-filter-data-uid', data)
  }

  sendDataForCriteria(data: Criteria) {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/criteria', data)
  }

  getCriteriaData() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-criteria')
  }

  clearUidArray(id:any){
    return this.http.get<any>(GlobalConstants.apiBaseURL +'api/clear-concatnation-uid-array/'+id)
  }

  // getProjectTESTDetails(id:any) {
  //   return this.http.get<any>(this.baseUrl+'api/get-project/'+id).toPromise();
  // }
  // getProjectDetailsall() {
  //   return this.http.get<any>(this.basrProjectUrl+'newporjectData');
  // }

  updateProjectJSON(project: Projects): Observable<Projects> {
    return this.http.post<Projects>(
      GlobalConstants.apiBaseURL + 'api/save-configure-project', project)
  }


  OnsaveResult(data: any): Observable<Projects> {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/mapped-insturment-data', data)
  }

  createProject(project: Projects) {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/save-project', project)
  }



  getProjectID(projectId: any, projectName: any) {
    this.projectID = projectId;
    this.projectnm = projectName;
    this.projectIdSource.next(this.projectID);
    this.projectName.next(this.projectnm);
    // this.setProject(projectId);
    // this.setProjectName(projectName);
  }


  setProject(projectID: any) {
    localStorage.setItem('project', projectID)
  }


  setProjectName(projectName: any) {
    localStorage.setItem('projectName', projectName)
  }


  setProjectStartStatus(status: any) {
    localStorage.setItem('projectStatus', status)
  }

  getProjectStartStatus() {
    return localStorage.getItem('projectStatus')
  }




  //   getProjectName() {
  //   return localStorage.getItem('projectName')
  // }

  getProjectI() {
    return localStorage.getItem('project')
  }
  removeProject() {
    return localStorage.removeItem('project')
  }

  getProjectCloseStatus(status: any) {
    this.isClose = status
    this.isPorjectClosed.next(this.isClose);
    console.log(this.isClose)

  }

  savePorjectInDB(data: Projects) {
    return this.http.post<Projects>(GlobalConstants.apiBaseURL + 'api/save-configuration-db', data)
  }

  updateProjectInDB(project: Projects): Observable<Projects> {
    return this.http.post<Projects>(`${GlobalConstants.apiBaseURL + 'api/update-project'}/${project.id}`, project, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  // updateProjectInDB(project:Projects):Observable<Projects>{
  //   return this.http.post<Projects>(this.baseUrl+'api/update-project',project)
  // }

  dashboardUserWiseCount(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/DashBoard/Instrumentconfig/'+ id);
  }

  dashboardAllUserWiseCount() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/DashBoard/AllInstrumentConfig');
  }


  getAllconfiugredProject() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-all-configure-project')
  }


  saveProjectinDB(project: Projects) {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/save-project-mongo-db', project)
  }


  getProjectIdwiseFromMONGO(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-project-mongo-db/' + id)
  }

  getallFromMONOG() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-all-project-mongo-db')
  }


  getRecent_ten_records() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/dashboard/allUserInstrumentConfiguredDetails_TENRECORDS')

  }


  sendProjectLoadStatus(stat: any) {
    this.sendisLoad = stat;
    this.nextIsLoad.next(this.sendisLoad)
  }

  getAutomap(data:any){
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/automapping-mongodb',data);
  }

  saveSourceDataMDB(data: SourceDataForLoad) {
    return this.http.post<SourceDataForLoad>(GlobalConstants.apiBaseURL + 'api/save-sourcelegacy-mongo-db', data)

  }

  getSourceDataIdwise(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-sourcelegacy-mongo-db/' + id)

  }

  // regenrationUID(data: Uid_regenrate_post) {
  //   return this.http.post<Uid_regenrate_post>(GlobalConstants.apiBaseURL + 'api/post-uid-genration-mongodb', data)
  // }

  projectwiseSavedUid(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-projectidwise-uid/' + id)
  }

  regenrationUID(data: any) {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/post-auto-uiddata-genration', data)
  }

  

  getInstrumentType(data: any) {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/post-instrument-type-mongodb', data)

  };


  saveProjectinMongo(project: Projects) {
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/save-project-mongodb', project)
  }

  getProject_id_Mongo(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-project-mongodb/' + id)
  }



  onsaveMappedInstrument(data:any){
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/post-mapped-instrument-mongodb', data)
  }

  onGetMappedInstrument(id:any){
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-mapped-instrument-mongodb/'+id)
  }



  saveNewProject_SourceDataMDB(data: SourceDataForLoad) {
    return this.http.post<SourceDataForLoad>(GlobalConstants.apiBaseURL + 'api/save-projectSource-mongodb', data)
  }

  saveAutoMap(data:any){
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/saveAutoMap', data)
  }

  getautomapPost(id:any,instrumentId:any){
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/getautomapPost/'+id +'/'+instrumentId)
  }

  clearAutomapUID(){
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/automapUID')
  }
  // async getNewProject_SourceDataIdwise(id:any) {
  //   return await this.http.get<any>(GlobalConstants.apiBaseURL+'api/get-projectSource-mongodb/'+id).toPromise();
  //   // console.log('No issues, I will wait until promise is resolved..');
  // }

  getNewProject_SourceDataIdwise(id: any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-projectSource-mongodb/' + id)

  }
 

  getInstrumentTypeIdwise(id: any, instID:any) {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-instrument-type-mongodb/' + id+'/'+instID)

  }

  sendProjectDataFromResult(mappedResult: any) {
    this.project = mappedResult;
    this.projectNext.next(this.project)
  }

  sendInstrumentTypeCheckingStatus(stat:any){
  this.instrumentTypeStat = stat;
  this.instrumentTypeNext.next(this.instrumentTypeStat)

  }


  getAutomapResult(data:any){
    this.automapResult = data;
    this.SendautoMapResult.next(this.automapResult)
    
  }

  sendInstrumentID(id:any){
    this.instID = id;
    this.sendInstrumentIDto_mapping.next(this.instID)

  }

sendDowneloadStatus(status:any){
  this.downloadDisabledStatus = status;
  this.sendDownloadDisabledStatus.next(this.downloadDisabledStatus)
}


sendAutomapSaveResultTosave(data:any){
  this.sendAutomapData =  data;
  this.automapData.next(this.sendAutomapData)
}



private sendInsttypstatN;
private sendInstStatus = new BehaviorSubject<any>('');;
getsendInsttypstatN = this.sendInstStatus.asObservable()

send_Instrument_StatusIn_NewProject(stats:any){
  this.sendInsttypstatN = stats;
  this.sendInstStatus.next(this.sendInsttypstatN)
}

private sendProjectId;
private sendprojID = new BehaviorSubject<any>('');;
getProjectID_new = this.sendprojID.asObservable()

send__NewProject_ID(projectID:any){
  this.sendProjectId = projectID;
  this.sendprojID.next(this.sendProjectId)
}

private sendautomapExisitingData;
private sendautodata = new BehaviorSubject<any>('');;
getautomapExisitingData = this.sendautodata.asObservable()

sendautomapPostresponse(data:any){
  this.sendautomapExisitingData = data;
  this.sendautodata.next(this.sendautomapExisitingData)
}

private sendDataClearstat;
private sendDataClears = new BehaviorSubject<any>('');;
getDataClear = this.sendDataClears.asObservable()
sendDataClear(stats:any){
  this.sendDataClearstat = stats;
  this.sendDataClears.next(this.sendDataClearstat)
}



private sendAllAutomapData;
private sendAllautomap = new BehaviorSubject<any>('');
getAllAutomapData = this.sendAllautomap.asObservable()
SendAllAutomapData(data:any){
  this.sendAllAutomapData = data;
  this.sendAllautomap.next(this.sendAllAutomapData)
}

private sendbtndisabled;
private sendMappingbtndisabled = new BehaviorSubject<any>('');;
getmappingbtnStatus = this.sendMappingbtndisabled.asObservable()
sendMappingbtnstats(data:any){
  this.sendbtndisabled = data;
  this.sendMappingbtndisabled.next(this.sendbtndisabled)
}


private senddisableDrpdown;
private senddisableDrpdownstat = new BehaviorSubject<any>('');;
getDisableDrpdownstat = this.senddisableDrpdownstat.asObservable()
sendDisabledrpstat(data:any){
  this.senddisableDrpdown = data;
  this.senddisableDrpdownstat.next(this.senddisableDrpdown)
}


private sendInstrumentTypeSource;
private sendInstrumentTypeSourceName = new BehaviorSubject<any>('');;
getInstrumentTypeSourceN = this.sendInstrumentTypeSourceName.asObservable()
sendInstrumentTypeSourcefileName(name:any){
  this.sendInstrumentTypeSource = name;
  this.sendInstrumentTypeSourceName.next(this.sendInstrumentTypeSource)
}



}
