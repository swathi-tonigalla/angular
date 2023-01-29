import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PassMappingService {
  private mappedResultFromMP;
  private desti;

 

  private getConditions
  private conditions = new BehaviorSubject<any>('');
  condiv= this.conditions.asObservable();

  
  private mappedResult = new BehaviorSubject<any>('');
  mapRes = this.mappedResult.asObservable();


  private destiData = new BehaviorSubject<any>('');
  Ddata = this.destiData.asObservable();

  private send_resetHardcoded;
  private send_hardcodedData = new BehaviorSubject<any>('');
  get_rest_hrd_data = this.send_hardcodedData.asObservable()

sendDestinationDataTomappedResult(rowData:any){
  this.desti = rowData;
  this.destiData.next( this.desti)
}


sendMappedResult(mapfile:any){

this.mappedResultFromMP = mapfile;
this.mappedResult.next(this.mappedResultFromMP);
// console.log(this.mappedResultFromMP)
}


sendConditionsToOtherCompo(condition:any){
 this.getConditions =  condition
 this.conditions.next( this.getConditions)
}


 sendResetStats(status:any){
   this.send_resetHardcoded = status;
   this.send_hardcodedData.next(this.send_resetHardcoded);
 }

}
