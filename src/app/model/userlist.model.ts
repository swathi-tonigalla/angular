export class User{
    [x: string]: any;
    id?:string;
    userName?:string;
    email_id?:string;
    email_verified_at?:string;
    password?:string;
    password_confirmation?:string;
    roles?:string;
    createdAt?:number;
    checked ?:boolean;
   
    constructor(id: string, userName:string, emailID:string, confirmEmail:string, password:string,confirmPassword:string, roles:string, createdAt:number){
        this.id=id,
        this.userName= userName,
        this.email_id=emailID,
        this.email_verified_at=confirmEmail,
        this.password=password,
        this.password_confirmation=confirmPassword,
        this.roles=roles
        this.createdAt = createdAt
    }
}