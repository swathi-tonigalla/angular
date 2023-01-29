import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  constructor(private http: HttpClient) { }

  exportCSV(instID: any) {
    // console.log(instID)
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/export-result-data-Csv', instID)
  }

  exportExls(instID: any) {
    // console.log(instID)
    return this.http.post<any>(GlobalConstants.apiBaseURL+ 'api/export-result-data-Excel', instID)
  }




  exportALLCSV(projectID: any) {
    // console.log(projectID)
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/export-result-data-multiple-Csv', projectID)
  }

  exportALLExls(projectID: any) {
    // console.log(projectID)
    return this.http.post<any>(GlobalConstants.apiBaseURL+ 'api/export-result-data-multiple-Excel', projectID)
  };



  // donwloadZip(name: any) {
  //   return this.http.post<any>(this.baseExportUrl + '/api/download-csv-excel')
  // }


}