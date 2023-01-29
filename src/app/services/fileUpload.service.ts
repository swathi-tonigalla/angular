import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {


  private instrumentData;
  private sourceData;

  private destinationStatus;

  finalArray: File[] = [];

  private instrumentSource = new BehaviorSubject<any>('');
  instmsg = this.instrumentSource.asObservable();


  private sourceFileData = new BehaviorSubject<any>('');
  srcMsg = this.sourceFileData.asObservable();


  private destistat = new BehaviorSubject<any>('');
  destiStats = this.destistat.asObservable();

  private startStatus;
  private sendStartStatus = new BehaviorSubject<any>('');
  getStartStatus = this.sendStartStatus.asObservable();


  private savedmsg;
  private sendSavedMsg = new BehaviorSubject<any>('');
  getSavedMsg = this.sendSavedMsg.asObservable();

  constructor(private http: HttpClient) {

  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file)

    const req = new HttpRequest('POST', `${GlobalConstants.apiBaseURL+'api/source-file-upload'}`, formData, {
      reportProgress: true,
      //  responseType: 'json'
    });
    //console.log(formData)
    return this.http.request(req);


  }

  uploadDestination(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file)

    const req = new HttpRequest('POST', `${GlobalConstants.apiBaseURL+'api/distination-file-upload'}`, formData, {
      reportProgress: true,
      //  responseType: 'json'
    });
    // console.log(formData)
    return this.http.request(req);


  }

  getInstruments() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/get-json-distination')
  }

  getNewProject_SourceDataparsed() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-source-result-mongo')
  }

  getSource() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/get-json-source')
  }

  sendInstrumenttoDestination(data: any) {
    this.instrumentData = data
    this.instrumentSource.next(this.instrumentData)
    //  console.log(this.instrumentData);
  }


  sendSourceData(srcData: any) {
    this.sourceData = srcData;
    this.sourceFileData.next(this.sourceData)
  }

  clearFiles() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/clear-files');
  }

  clearJsonFiles() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/json-clear-files');
  }


  clearSourceFiles() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/source-clear-files');
  }

  cliearSourceJsonFiles() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/source-clear-JSONfiles');
  }

  ClearSourceTempData(collectionName:any){
    return this.http.post<any>(GlobalConstants.apiBaseURL+'api/get-table-truncate-mongodb',collectionName);
  }


  sendDestinationUploadStatus(stat: any) {
    this.destinationStatus = stat;
    this.destistat.next(this.destinationStatus)
  }


  sendProjectStatusToOthers(stat:any){
    this.startStatus = stat;
    this.sendStartStatus.next(this.startStatus)

  }

  projectSavedStat(msg:any){
    this.savedmsg =msg;
    this.sendSavedMsg.next(this.savedmsg)

  }



}
