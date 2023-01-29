export interface Uids{
    id?:string;
    prid?:string;
    uidName?:string;
    uidLength?:number;
    LDcolID?:any[];
    LDcolname?:any[];
    sourceID?:any;
    uids?:any[];
    udname?:any;
    status?:any;
   autoStatus?:any;
 }

 export interface ProjectUids{
   projectID?:string;
   uidArr?:Uids[];
 }

 export interface FilltredArray{
    RawfilterArray?:any[];
 }

 export interface GetFinalResult{
  final_result?:any[];
 }

 export interface Criteria{
  LegacyColn?:any;
  replaceValue?:any;
  filterCheck?:any;
 }

 export interface IfConditionOnly{
  filterCheck?:any;
 }

 export interface IfConcatSend{
  selectedCondition?:string;
  filtercheckIfConcat?:any;
  valueReplace?:any;
 }

 export interface IfconcatGetData{
  finalIFConcateArray?:any;
 }

 export interface Uid_regenrate_post{
  projectID?:any;
  id?:any
  uidName?:any
  sourceID?:any;
  LDcolId?:any[];
  sourceLegacy?:any;
  status?:any;
  autoStatus?:any;
 }

 export interface uidRepost{
   uidProjectAutomapData?:Uid_regenrate_post
 }

 