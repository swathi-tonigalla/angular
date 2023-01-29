export interface Instruments{
        instrumentName?:string[];
        toggleCheck?:boolean
}
export interface IntsrumentType{
        instrumentTypename?:string[];
        typtoggleCheck?:boolean
}
export interface Destinations{
        id?:string;
        destinationName?:string;
        selectedClientName?:string;
        instruments?:Instruments[];
        insrtumentTypes?:IntsrumentType[];
        createdAt?:number;
       checkedDestination?:boolean;
}