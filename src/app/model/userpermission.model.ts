export interface Selectedclients {
  clientName?: string[];

}

export interface UserP {
  id?: number;
  unique_id?: string;
  name?: string;
  emailid?: string;
  instrument_destination?: boolean;
  audit_report?: boolean;
  load_project?: boolean;
  clients?: Selectedclients[];
  //created_at?:any;
  primary_role?:any;
}
export interface UserPermission{
  uid?:number;
  userName?:string;
  createdstartAt?:any;
  createdendAt?:any;
  //primary_role?:any;
}

