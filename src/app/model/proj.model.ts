export interface Instruments {
    name: string; group?:string;
    completed: boolean;
    mandatory:boolean;
    instrumentsData?: Instruments[];
  }