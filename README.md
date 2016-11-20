# Javie

Javie is a vanilla javascript version of my other vaidation project [Kavie](https://github.com/matthewnitschke/Kavie)

# Usage

```html
<input type="text" data-required />

<input type="button" id="submit" />

<script>
  document.getElementById("submit").onclick = function(){
    if (Javie.isValid(document)){
      console.log("Valid");
    } else {
      console.log("Invalid");
    }
  }
</script>
```


# Validation Methods
Built in validation methods are as follows

```html
data-required
data-numeric
data-max-length="12"
data-min-length="3"
data-matches="<regex>"
data-date
data-birthdate
data-phone
data-email
```

# Options
There are three configuration options currently availible in Javie. Each can be changed by simply accessing the public Javie object and setting them

```javascirpt
Javie.showValidationMessages = true; // default is false
Javie.validationMessageClass = "error-message"; // default is 'validation-message'
Javie.validationErrorClass = "error"; // default is 'validation-error'
```
