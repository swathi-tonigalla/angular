export class Client {
    
   id?: string;
   clientName?: string;
   remarks?: string;
   createdAt?:number;
   checked ?:boolean;
  // updatedAt?:number;
 
   constructor(id: string, clientName: string, remarks: string, createdAt: number) {
      this.id = id,
         this.clientName = clientName,
         this.remarks = remarks,
         this.createdAt = createdAt
       //  this.updatedAt = updatedAt
   }
}