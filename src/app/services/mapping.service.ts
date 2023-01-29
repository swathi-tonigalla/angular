import { Injectable } from '@angular/core';
import { InstrumentsData } from '../model/projects.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projects } from '../model/projects.model';
import { BehaviorSubject } from 'rxjs';
import { IfConcatSend, Uids } from '../model/Uid.model';
import { Ifonly } from '../model/If.model';
import { GlobalConstants } from '../shared/global.constants';


@Injectable({
  providedIn: 'root'
})
export class MappingService {

  instrumentDataCheck!: InstrumentsData
  projects!: Projects[];

  private destinationData;
  private destinationRowData;
  private sourceRowData;

  private mapst;
  private dStatus;

  private filterTypeSelection;
  private conditionalStatus;

  private sourceEventStatus;
  private CancelStatus;

  defaultStat: boolean = false;
  defaultSource: boolean = false;

  private multipleData;
  private isWhereDoneAlready;

  private filtredInstrumentTypes;
  private uids;

  private getdataFromConcat;

  private getDataFromHardcoded;

  private _sendCriteria;
  private sendNestedIfcondition;

  private getIFonlydata;

  private getIf_ConcatData;

  private getIf_Concat_criteria_Data;

  private isIntrumentSelected;

  private sendUIDStatus


  private messageSrouce = new BehaviorSubject<any>('-');
  currentMsg = this.messageSrouce.asObservable();

  private desRow = new BehaviorSubject<any>('-');
  desRowMsg = this.desRow.asObservable();

  private sourceRow = new BehaviorSubject<any>(this.defaultSource);
  sourceRowD = this.sourceRow.asObservable();

  private DestinationStatus = new BehaviorSubject<any>(this.defaultStat);
  desStatus = this.DestinationStatus.asObservable();

  private mappingStatus = new BehaviorSubject<any>(this.defaultStat);
  mapStatus = this.mappingStatus.asObservable();

  private instTypesSel = new BehaviorSubject<any>('');
  instTypeStatus = this.instTypesSel.asObservable();

  private condition = new BehaviorSubject<any>('');
  condiStatus = this.condition.asObservable();

  private sourceEvent = new BehaviorSubject<any>('');
  sourceEVe = this.sourceEvent.asObservable();

  private afterCancelStatus = new BehaviorSubject<any>('');
  canStatus = this.afterCancelStatus.asObservable();

  private sendDataTomap = new BehaviorSubject<any>('');
  getDatafromMultiple = this.sendDataTomap.asObservable();

  private sendIsWhereDone = new BehaviorSubject<any>('');
  whereDone = this.sendIsWhereDone.asObservable()

  private instrumentTypes = new BehaviorSubject<any>('');
  getinstTyps = this.instrumentTypes.asObservable()

  private uidsData = new BehaviorSubject<any>('');
  getUidsData = this.uidsData.asObservable()

  private concatFinalData = new BehaviorSubject<any>('');
  getConcatFinalData = this.concatFinalData.asObservable();

  private hardcodedFinalData = new BehaviorSubject<any>('');
  getHardcodedData = this.hardcodedFinalData.asObservable()

  private NextcirteriaData = new BehaviorSubject<any>('');
  getCriteria = this.NextcirteriaData.asObservable();

  private nextNestedIfCondition = new BehaviorSubject<any>('');
  nestedIfStus = this.nextNestedIfCondition.asObservable();


  private nextTomaapFromIf = new BehaviorSubject<any>('');
  ifonlyData = this.nextTomaapFromIf.asObservable();

  private nexttomap_if_concat = new BehaviorSubject<any>('');
  get_if_Data = this.nexttomap_if_concat.asObservable();


  private nexttomap_if_concat_criteria = new BehaviorSubject<any>('');
  get_if_criteria_Data = this.nexttomap_if_concat_criteria.asObservable();


  private instrumentSelection = new BehaviorSubject<any>('');
  getInstrumentSelection = this.instrumentSelection.asObservable();


  private uidStatus = new BehaviorSubject<any>('');
  getuidStatus = this.uidStatus.asObservable();


  private sendHRDStatus;
  private hrdstat = new BehaviorSubject<any>('');
  gethrdStat = this.hrdstat.asObservable();

  private sendCancelStatus;
  private canStat = new BehaviorSubject<any>('');
  getCancelStatus = this.canStat.asObservable();


  private sendChkboxCancleStatus;
  private chboxCanstat = new BehaviorSubject<any>('');
  getchboxCancelstuts = this.chboxCanstat.asObservable();


  private sendHardCodeValueSetupStatus;
  private hdcdValuesetstat = new BehaviorSubject<any>('');
  getHardCodeValueSetupStatus = this.hdcdValuesetstat.asObservable();

  private sendTouncheckSource;
  private touncheckSourceData = new BehaviorSubject<any>('');
  getTouncheckSource = this.hdcdValuesetstat.asObservable();


  private uidGeneratedAutomapStatus;
  private uidStatusatmap = new BehaviorSubject<any>('');
  getuidGeneratedAutomapStatus = this.uidStatusatmap.asObservable();

  private sendInstrumentTypeFileName;
  private instrumentTypeFileName = new BehaviorSubject<any>('');
  getInstrumentTypeFileName = this.instrumentTypeFileName.asObservable();

  private sendenableStatus;
  private enablestatus = new BehaviorSubject<any>('');
  getEnablestatus = this.enablestatus.asObservable();


  private sendAllowtypeStat;
  private edittype = new BehaviorSubject<any>('');
  getAllowtypeStat = this.edittype.asObservable();

  constructor(private http: HttpClient) {
    this.projects = []
  }


  retrunDestinationCheck() {
    return this.instrumentDataCheck
  }

  // getDestinationColnCheck(instrumentData: InstrumentsData) {

  //   console.log(instrumentData)
  //   return this.http.put<InstrumentsData>(`${this.id_url}/${instrumentData.colId}`, instrumentData)

  // }



  //sendDestinationData
  setData(data: any) {
    this.destinationData = data;
    // localStorage.setItem('destinationData',JSON.stringify(this.destinationData))
    this.messageSrouce.next(this.destinationData)
    // console.log(this.destinationData);
  }

  setRowData(rowdata: any) {
    this.destinationRowData = rowdata;
    this.desRow.next(this.destinationRowData)

  }


  //sendSourceData
  sendSourceRowData(sourceRowdata: any) {
    this.sourceRowData = sourceRowdata;
    // localStorage.setItem('destinationData',JSON.stringify(this.destinationData))
    this.sourceRow.next(this.sourceRowData)
    // console.log(this.destinationData);
  }

  sourceDataEvent(eve: any) {
    this.sourceEventStatus = eve
    this.sourceEvent.next(eve)
  }


  getData() {
    let temp = this.destinationData;
    this.clearData();
    return temp;
  }

  clearData() {
    this.destinationData = undefined;
  }

  sendMappingStatus(status: boolean) {
    this.mapst = status;
    this.mappingStatus.next(this.mapst)
  }


  sendDestinationStatus(destiStatus: boolean) {
    this.dStatus = destiStatus
    this.DestinationStatus.next(this.dStatus)
  }


  sendFilterInstTypeStatus(typeStatus: boolean) {
    this.filterTypeSelection = typeStatus
    this.instTypesSel.next(this.filterTypeSelection)
  }


  sendCondition(condition: any) {
    this.conditionalStatus = condition;
    this.condition.next(this.conditionalStatus)
  }

  senCancelStatus(status: any) {
    this.CancelStatus = status;
    this.afterCancelStatus.next(this.CancelStatus)

  }

  sendDataToMapping(data: any) {
    this.multipleData = data;
    this.sendDataTomap.next(this.multipleData)
  }

  //sendWhereDoneTO others

  sendWhereOther(status: any) {
    this.isWhereDoneAlready = status;
    this.sendIsWhereDone.next(this.isWhereDoneAlready)

  }


  sendUIDArray(data: Uids) {
    // console.log(data);
    return this.http.post<any>(GlobalConstants.apiBaseURL + 'api/uid-genration', data);

  }

  getUid() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/uid-genration-get')
  }


  sendIfDataToLaravel(if_onlyData: Ifonly) {
    return this.http.post<Ifonly>(GlobalConstants.apiBaseURL + 'api/if-condition-replace', if_onlyData);
  }

  getIfData() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-if-condition-replace');
  }


  sendToservere_If_concat(data: IfConcatSend) {
    return this.http.post<IfConcatSend>(GlobalConstants.apiBaseURL + 'api/if-condition-concate', data);
  }

  getIfConcatData() {
    return this.http.get<any>(GlobalConstants.apiBaseURL + 'api/get-if-condition-concate');
  }

  sendInstrumetnTypes(types: any) {
    this.filtredInstrumentTypes = types;
    this.instrumentTypes.next(this.filtredInstrumentTypes)
  }


  sendUidData(data: any) {
    this.uids = data;
    this.uidsData.next(this.uids)
  }


  sendConcatDataToMap(data: any) {
    this.getdataFromConcat = data;
    this.concatFinalData.next(this.getdataFromConcat)
  }

  sendHardcodedData(data: any) {
    this.getDataFromHardcoded = data
    this.hardcodedFinalData.next(this.getDataFromHardcoded)
  }

  sendCriteriatoMap(criteriaData: any) {
    this._sendCriteria = criteriaData;
    this.NextcirteriaData.next(this._sendCriteria)
  }

  sendCheckedConditionToOthers(nestIfCondition: any) {
    this.sendNestedIfcondition = nestIfCondition
    this.nextNestedIfCondition.next(this.sendNestedIfcondition)
  }



  sendToMappingFromIF(data: any) {
    this.getIFonlydata = data
    this.nextTomaapFromIf.next(this.getIFonlydata)
  }

  sendDataToMapping_If_concat(data: any) {
    this.getIf_ConcatData = data;
    this.nexttomap_if_concat.next(this.getIf_ConcatData)
  }

  sendDataToMapping_If_concat_criteria(data: any) {
    this.getIf_Concat_criteria_Data = data;
    this.nexttomap_if_concat_criteria.next(this.getIf_Concat_criteria_Data)
  }


  sendInstrumentSelectiondata(data: any) {
    this.isIntrumentSelected = data
    this.instrumentSelection.next(this.isIntrumentSelected)
  }



  sendConditionToSOurce(status: any) {
    this.sendUIDStatus = status
    this.uidStatus.next(this.sendUIDStatus)
  }

  sendHrdCOdeStatus(status: any) {
    this.sendHRDStatus = status;
    this.hrdstat.next(this.sendHRDStatus)

  }


  sendcancelStatus(stat: boolean) {
    this.sendCancelStatus = stat;
    this.canStat.next(this.sendCancelStatus)
  }

  sendClearStatus(stat: boolean) {
    this.sendChkboxCancleStatus = stat;
    this.chboxCanstat.next(this.sendChkboxCancleStatus)

  }

  status(stat: any) {
    this.sendHardCodeValueSetupStatus = stat;
    this.hdcdValuesetstat.next(this.sendHardCodeValueSetupStatus)
  }


  sendtoUncheck(status: any) {
    this.sendTouncheckSource = status;
    this.touncheckSourceData.next(this.sendTouncheckSource)

  }

  sendUidStatusTomapping(status:any){
    this.uidGeneratedAutomapStatus =  status;
    this.uidStatusatmap.next(this.uidGeneratedAutomapStatus);
  }


  sendInstrumentTypeName(typeFileName:any){  
  this.sendInstrumentTypeFileName = typeFileName;
  this.instrumentTypeFileName.next(this.sendInstrumentTypeFileName)
  
  }
 
  sendEnableStatusTOSource(stat:any){
    this.sendenableStatus = stat;
    this.enablestatus.next(this.sendenableStatus)  
  }

  allowEditInstrumentTypeinEdit(stat:any){
    this.sendAllowtypeStat = stat;
    this.edittype.next(this.sendAllowtypeStat);
  }
}
