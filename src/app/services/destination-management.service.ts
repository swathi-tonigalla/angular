import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Destinations } from '../model/DestinationManage.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class DestinationManagementService {
  // _url="http://3.11.187.218/api/instrument"

  destinations!:Destinations[];
  destination!:Destinations;
  
  constructor(private http: HttpClient) {}

  getAllDestinations() {
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/instrumentjson')
  }

  addDestination(destination:Destinations){
   // this.destinations.push(destination);
    return this.http.post<Destinations>(GlobalConstants.apiBaseURL+'api/instrument/create',destination);
  }
  // addDestinationName(destination:Destinations){
  //   // this.destinations.push(destination);
  //    return this.http.post<Destinations>(GlobalConstants.apiBaseURL+'api/instrumentjson/distInput',destination);
  //  }


  addDestinationJSON(destination:Destinations){
    // this.destinations.push(destination);
     return this.http.post<any>(GlobalConstants.apiBaseURL+'api/instrumentjson/create',destination)
    }
 
    updateDestination(destination:Destinations):Observable<Destinations>{
    return this.http.post<Destinations>(`${GlobalConstants.apiBaseURL+'api/instrument/update'}/${destination.id}`,destination ,{
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
  }

  updateDestinationJSON(destination:Destinations):Observable<Destinations>{
    return this.http.post<Destinations>(`${GlobalConstants.apiBaseURL+'api/instrumentjson/update'}/${destination.id}`,destination)}

  deleteClient(id:string):Observable<any>{
    //this.clients.splice(client);
   // this.clients = this.clients.filter(val => val.id !== client.id)
    return this.http.get<any>(`${'api/instrument/delete'}/${id}`);
 
  }

  deleteClientJSON(id:string):Observable<any>{
    //this.clients.splice(client);
   // this.clients = this.clients.filter(val => val.id !== client.id)
    return this.http.get<any>(`${GlobalConstants.apiBaseURL+'api/instrumentjson/delete'}/${id}`)
  }

deleteSelectedDestinations(destinations:any): Observable < string > {  
      const httpOptions = {  
            headers: new HttpHeaders({  
                'Content-Type': 'application/json'  
            })  
        };  
        return this.http.post<string>(`${GlobalConstants.apiBaseURL}api/instrumentjson/mult-dest-del`, destinations, httpOptions);  
    }
    
}

