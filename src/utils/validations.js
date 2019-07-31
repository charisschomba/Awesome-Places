const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for(let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      case 'notEmpty':
        isValid = isValid && notEmpty(val, rules[rule]);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const emailValidator = email => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength
};

const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};
const notEmpty = (val, checkValue) => {
  return val.trim() !== "" && checkValue;
};

export default validate;
