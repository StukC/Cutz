export const validateEmail = email => {
    var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,9})$/;
    return re.test(email);
  };
    
  export const validatePassword = password => {
    var re = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };
  export const checkCharPassword = password => {
    var re = /(?=.{8,})/;
    return re.test(password);
  };

  export const checkNum = password => {
    var re =  /^(?=.{0,100}$)\D*\d/
    return re.test(password);
  };
  export const checkSymbol = password => {
    var re =  /[!#$%&'(/){}=-|?><+;:*]/
    return re.test(password);
  };

 
 


