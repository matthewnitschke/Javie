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
