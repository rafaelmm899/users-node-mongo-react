const validate = (value, rules) => {
    let isValid = true;
    
    for (let rule in rules) {
    
        switch (rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]); break;
          
            case 'isRequired': isValid = isValid && requiredValidator(value); break;
              
            case 'isEmail': isValid = isValid && emailValidator(value); break;

            case 'isDate' : isValid = isValid && dateValidator(value); break;
          
            default: isValid = true;
        }
  
    }
    
    return isValid;
}
  
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
}
  
const requiredValidator = value => {
    return value.trim() !== '';	
}

const dateValidator = value => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!value.match(regEx)) return false;
    var d = new Date(value);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0,10) === value;
}

const emailValidator = value => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}
  
export default validate;