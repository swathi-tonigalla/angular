import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class SharedService{

    private isDashboarModel

    private fromDashboard = new BehaviorSubject<any>('-');
    isdashModel = this.fromDashboard.asObservable();

    constructor() {
   
        }

    sendNewProjectStatusToOthers(status:any){
        this.isDashboarModel = status;
        this.fromDashboard.next(this.isDashboarModel)

    }
  }
