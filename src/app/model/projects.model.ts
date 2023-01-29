import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { MappedResultComponent } from "../components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/mapped-result/mapped-result.component";


export interface MappedInstrumentsData{
    mpColID?:number;
    instID?:number;
    mpgroup?:string;
    mappedFile?:string;
    mappedSourceName?:string;
    mpColName?:string;
    mpcompleted?: boolean;
    mpcolData?:any[];
    mpcolResultCOl?:boolean;
    mappedColDataCheckbox?:boolean;
    isTrim?: boolean,
    isLowerCase?: boolean,
    isUpperCase?: boolean,
    isStringToNumber?: boolean,
    isTruncateDecimal?: boolean,
    isRemoveZero?: boolean,
    isUKDate?: boolean,
    isUSDate?: boolean,
}

export interface MappedInstruments{
    mappedInstID?:number;
    mappedInstrumentName?:string;
    instumentDataMapped?:MappedInstrumentsData[];
}

export interface MappingModel{
    MDcolId?:number;
    MDgroup?:string;
    MDname?:string,
    MDmandatory?:boolean;
    MDisMultiple?:boolean;
    MDcompleted?: boolean;
 
  
}

export interface SourceLegacyDataColn{
    LDcolId?:number;
    LDgroup?:string;
    LDname?:string,
    LDmandatory?:boolean;
    LDisMultiple?:boolean;
    LDcompleted?: boolean;
    isSourceDataRow?:boolean;
    LDcolData?:any[]
}

export interface SourceLegacy{
    sourceID?:number;
    sourceName?:string;
    completed?: boolean;
    isChecked?:boolean;
    isMasterSel?:boolean;
    sourceLegacyData?:SourceLegacyDataColn[];
    toggleCheck?:boolean;
}

export interface InstrumentTypes{
    instrumentTypename?:string
}

export interface InstrumentsData{
    colId?:number;
    group?:string;
    name?:string,
    mandatory?:boolean;
    isMultiple?:boolean;
    completed?: boolean;
    isDestination?:boolean;
    mappedResultText?:any;
    MDisChecked?:boolean;
    MDisDesabled?:boolean;
    MDconditionChecked?:boolean;
    MDCondition?:string;
    // mappingInstData?:MappingModel[];  
}
export interface Instruments{
    instrumentID?:string;
    instrumentName?:string;
    completed?: boolean;
    isChecked?:boolean;
    isMasterSel?:boolean;
    selectedInstrumentType?:string;
    instrumentsData?:InstrumentsData[];
    toggleCheck?:boolean;
    projectID?:boolean;
    instTypeSourceID?:any;
    LDcolId?:any;
    sourceName?:any;
    isInstrumentSaved?:boolean;
    instTypeSourceColName?:any;
    projectStatus?:any
    isMappingStartedForInstrument?:boolean
}
 
export interface Projects{
    id?:string;
    user_id?:any;
    projectName?:string;
    destinationID?:string;
    destinationName?:string;
    instruments?:Instruments[];
    instrumentTypes?:InstrumentTypes[]
    sourceLegacy?:SourceLegacy[];
    mappingModel?:MappingModel[];
    mappedInstruments?:MappedInstruments[];
    autoMap?:AutoMap
    userName?:string;
    clientName?:string;
    updatedAt?:string;
    createdAt?:number;
    isProjectStarted?:boolean;
    isProjectAutoomapped?:any
    mappedInstrumentCount?:any;
  
}

export interface ResultSend{
    mappedInstruments?:MappedInstruments[];
}

export interface AllProjectConfigCount{
    AllUserInstrumentConfigured?:any;
    instrumentConfuguredByYou?:any;
}

export interface LoadProjectID_Status{
    isLoad?:boolean;
    isEdit?:boolean;
    projectID?:any;
  }

export interface SourceDataForLoad{
    projectID?:any;
    sourceLegacy?:SourceLegacy[]
}

export interface ClearSourceData{
    table_name?:any
}
 

export interface InstrumentType{
    projectID?:any;
    sourceName?:string;
    LDcolId?:any;
    selectedInstrumentType?:any;
    instrumentID?:any;
    projectStatus?:any;
    sourceLegacy?:any;
    instrumentName?:any;
    instrumentTypeData?:any
 
}




export interface MappedInstrumentData{
    projectID?:any;
    projectName?:any;
    clientName?:any;
    userName?:any;
    isprojectAutommaped?:boolean
    mappedInstruments?:any;
}
 
export interface AutoMap{
    projectID?:any;
    instrumentID?:any;
    instrumentName?:any;
    OneToOne?:AutoMapRule[];
    Hardecoded?:AutoMapRule[];
    Concatinate?:AutoMapRule[];
    Criteria?:AutoMapRule[];
    If_Only?:AutoMapRule[];
    If_Concate?:AutoMapRule[];
    If_Concate_Criteria?:AutoMapRule[];
    Filter?:AutoMapRule[];
    Blank:AutoMapRule[];
}

export interface AutoMapRule{
    projectID?:any;
    instrumentID?:any;
    instrumentName?:any;
    instColName?:any;
    instColID?:any;
    uidsName?:any[]; 
    uidsLength?:any[]; 
    actualUidName?:any[]; 
    uidID?:any[];  
    sourceName?:any[];
    sourceColName?:any[];
    sourceColID?:any[];
    resultValue?: any;
    uidsName_2?:any[]; 
    uidsLength_2?:any[]; 
    actualUidName_2?:any[]; 
    uidID_2?:any[];  
    selectedIf_condition?:any;
    Condition_Value?:any
    mapping_sourceName?:any;
    LegacyColn?:any
    replaceValue?:any
    condition?:any;
    selected_filter_condition?:any;
    isTrim?:boolean;
    isLowerCase?: boolean,
    isUpperCase?: boolean,
    isStringToNumber?: boolean,
    isTruncateDecimal?: boolean,
    isRemoveZero?: boolean,
    isUKDate?: boolean,
    isUSDate?: boolean,
}

export interface sourceLegacyautoMap{
    projectID?:any
    instrumentID?:any
    sourceLegacy?:any
}

export interface AutoSourceData{
    sourceLegacy?:any
}


