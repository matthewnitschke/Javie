/*!
    Javie - Java Script Validator
    Author: Matthew Nitschke
    License: MIT (http://www.opensource.org/licenses/mit-license.php)
    Version: 0.1.0
*/

;(function(ns){

  ns.showValidationMessages = false;
  ns.validationMessageClass = "validation-message";
  ns.validationErrorClass = "validation-error";


  ns.isValid = function(dom) {
    var isValid = true;

    var inputs = getInputs(dom);

    inputs.forEach(function(input){
      var isInputValid = startValidation(input);

      if (!isInputValid && isValid){
        isValid = false;
      }
    })

    return isValid;
  }

  function startValidation(input) {
    input.addEventListener("input", function(){ validate(input) });

    return validate(input);
  }

  function validate(input){
    var isValid = true;
    var validationMessage = "";

    var validators = input.dataset;
    for (var validatorName in validators){
      if (!validators.hasOwnProperty(validatorName)) continue;

      // if the validator is empty eg data-required, set the property to true
      if (!hasValue(validators[validatorName])){
        validators[validatorName] = true;
      }

      var validatorSuccess = ns.validatorFunctions[validatorName].validator(validators[validatorName], input.value);

      if (!validatorSuccess && isValid) {
        isValid = false;
        validationMessage = ns.validatorFunctions[validatorName].message;
      }
    }

    if (!isValid){
      input.classList.add(ns.validationErrorClass);

      if (ns.showValidationMessages){
        addValidationMessage(input, validationMessage);
      }
    } else {
      input.classList.remove(ns.validationErrorClass);

      if (ns.showValidationMessages){
        removeValidationMessage(input);
      }
    }

    return isValid;
  }

  function addValidationMessage(input, message){
    if (!input.nextElementSibling.classList.contains(ns.validationMessageClass)){
      input.insertAdjacentHTML('afterend', "<div class='" + ns.validationMessageClass + "'>" + message + "</div>")
    }
  }

  function removeValidationMessage(input){
    var messageEle = input.nextElementSibling;
    if (messageEle.classList.contains(ns.validationMessageClass)){
      messageEle.parentNode.removeChild(messageEle);
    }
  }

  function getInputs(dom){
    return dom.querySelectorAll("input[type=text]");
  }

  ns.validatorFunctions = {
   required: {
     validator: function(propVal, eleVal){
       if (propVal) {
           return hasValue(eleVal);
       } else {
           return true;
       }
     },
     message: "This field is required"
   },
   numeric: {
     validator: function(propVal, eleVal){
       if (propVal && hasValue(eleVal)){
          return !isNaN(parseFloat(eleVal)) && isFinite(eleVal);
       } else {
         return true;
       }
     },
     message: "Please enter a numeric value"
   },
   maxLength: {
     validator: function (propVal, eleVal){
       if (eleVal){
         return eleVal.length <= propVal;
       }
       return true; // if no value is found, it doesnt have a length. So thus it is less than the propVal
     },
     message: "Please enter a value less than or equal to {propVal}"
   },
   minLength:{
     validator: function(propVal, eleVal){
         if (eleVal){
           return eleVal.length >= propVal;
         }
         return false; // opposite from above
     },
     message: "Please enter a value greater than or equal to {propVal}"
   },
   matches: function(propVal, eleVal){
     if (ko.unwrap(propVal) == ko.unwrap(eleVal)){
       return true;
     }
     return false;
   },
   date: {
     validator: function (propVal, eleVal){
       // change date to accept no preceding 0 on month and day
       if (propVal && hasValue(eleVal)){
         if (eleVal.length >= 8 && eleVal.length <= 10) {
             if (new Date(eleVal) == "Invalid Date") {
                 return false;
             }
             return true;
         }
         return false;
       } else {
         return true;
       }
     },
     message: "Please enter a valid date"
   },
   birthdate: {
     validator: function (propVal, eleVal){
       if (propVal && hasValue(eleVal)){
         // check to see if it is a valid date
         if (!Kavie.validatorFunctions.date.validator(propVal, eleVal)) {
             return false;
         }

         var date = new Date(eleVal);

         // check to see if the date is in the future
         if (date > new Date()){
             return false;
         }

         // check to see if date is a rational birthdate
         var minDateAllowed = new Date();
         minDateAllowed.setFullYear(minDateAllowed.getFullYear() - 120); // 120 is age of oldest person allowd

         if (date < minDateAllowed){
             return false;
         }
         return true;

       } else {
         return true;
       }
     },
     message: "Please enter a valid birthdate"
   },
   phone: {
     validator: function (propVal, eleVal){
       if (propVal && hasValue(eleVal)){
         if (eleVal.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)) {
             return true;
         } else {
             return false;
         }
       } else {
         return true;
       }
     },
     message: "Please enter a valid phone number"
   },
   email: {
     validator: function (propVal, eleVal){
       if (propVal && hasValue(eleVal)){
         if (eleVal.match(/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/)) {
             return true;
         } else {
             return false;
         }
       } else {
         return true;
       }
     },
     message: "Please enter a valid email address"
   },
   regexPattern: function(propVal, eleVal){
     return eleVal.toString().match(propVal) !== null;
   }
 }

 var hasValue = function(value){
    return !(value == null || value.length === 0);
 }

}(this.Javie = this.Javie || {}));
