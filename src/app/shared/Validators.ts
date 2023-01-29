export function checkMatchValidator(field1: string, field2: string) {
    return function (frm:any) {
      let field1Value = frm.get(field1).value;
      let field2Value = frm.get(field2).value;
      // let field3Value = frm.get(field3).value;
      // let field4Value = frm.get(field4).value;

      if (field1Value !== '' && field1Value !== field2Value) {
        return { 'notMatch': true }
      }
     
        // if (field3Value !== '' && field3Value !== field4Value) {
        // return { 'passwordNotMatch': true }
        // }
    
        return null; 
     }
  }
  export function checkPasswordMatchValidator(field1: string, field2: string) {
    return function (frm:any) {
      let field1Value = frm.get(field1).value;
      let field2Value = frm.get(field2).value;
     

      if (field1Value !== '' && field1Value !== field2Value) {
        return { 'passwordNotMatch': true }
      }
     
      return null; 
     }
  }