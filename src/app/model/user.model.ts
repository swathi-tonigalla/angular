export class User {
    
  email?: string;
  password?: string;

  constructor(email: string, password: string) {
        this.email = email,
        this.password = password
  }
}
export interface ForgotPassword{ 
 email?:any,
 message?:any
}

export interface ConfirmPassword{ 
  id?:any,
  email?:any,
  passwordToken?:any,
  password?: string,
  password_confirmation?: string
}
