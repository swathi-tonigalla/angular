import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/abstract_emitter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Client} from '../model/usersclient.model'
import { GlobalConstants } from '../shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class UsersClientService {
    
   clients:Client[];
   client!:Client

  constructor(private http: HttpClient) { 
    this.clients =[];
  }

  // getClients() {
  //     return this.http.get<any>(this._url)
  //         .toPromise()
  //         .then(res => <Client[]>res.data)
  //         .then(data => { return data; });
  // }

  getallClients(){
    return this.http.get<any>(GlobalConstants.apiBaseURL+'api/client/GetAll')
  }

  addClient(newCLient:Client){
    this.clients.push(newCLient);
    return this.http.post<any>(GlobalConstants.apiBaseURL+'api/client/create',newCLient);
  }

  addClienttojson(newCLient:Client){
    this.clients.push(newCLient);
    return this.http.post<any>(GlobalConstants.apiBaseURL+'api/clientjson/create',newCLient);
  }
  

  updateClient(client:Client):Observable<Client>{
    return this.http.post<Client>(`${GlobalConstants.apiBaseURL+'api/client/update'}/${client.id}`,client ,{
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
  }

  updateClientJSON(client:Client):Observable<Client>{
    return this.http.post<Client>(`${GlobalConstants.apiBaseURL+'api/clientjson/update'}/${client.id}`,client)
  }


  deleteClient(id:string):Observable<void>{
    //this.clients.splice(client);
   // this.clients = this.clients.filter(val => val.id !== client.id)
    return this.http.get<any>(`${GlobalConstants.apiBaseURL+'api/client/delete'}/${id}`);
 
  }

  deleteClientJSON(id:string):Observable<any>{
    //this.clients.splice(client);
   // this.clients = this.clients.filter(val => val.id !== client.id)
    return this.http.get<any>(`${GlobalConstants.apiBaseURL+'api/clientjson/delete'}/${id}`);
 
  }

  deleteSelectedclients(clients:any): Observable < string > {  
  const httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json'  
        })  
    };  
    return this.http.post<string>(`${GlobalConstants.apiBaseURL}api/client/deleteall`, clients, httpOptions);  
}
}