# sheet2api JavaScript Client

JavaScript Library for Google Sheets/Microsoft Excel Online through sheet2api. https://sheet2api.com/

## Installation

The sheet2api JS library can be installed through npm.

```bash
npm install sheet2api-js --save
```

## Example Usage

To get started you need to provide your sheet2api Spreadsheet API URL. You can find it on the [sheet2api Dashboard](https://sheet2api.com).

Try it out with the codepen https://codepen.io/sheet2api/pen/MWKZrqW

### Importing the library

```html
<!-- Server import -->
<script src="//sheet2api.com/v1/api.js"></script>
```
```js
// Or, Require import
var Sheet2API = require('sheet2api-js');
// Or, ES6 import
import Sheet2API from 'sheet2api-js';
```

### Read rows

```html
<script src="//sheet2api.com/v1/api.js"></script>
<script>
var url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
var options = {};
Sheet2API.read(url, options).then(function(result){
  console.log(result);
}, function(error){
  console.log(error);
});
</script>
```

### Read rows matching a search query

```html
<script src="//sheet2api.com/v1/api.js"></script>
<script>
var url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
var options = {query: { 'Name': 'Bugs Bunny' }};
Sheet2API.read(url, options).then(function(result){
  console.log(result);
}, function(error){
  console.log(error);
});
</script>
```

### Create new rows

```html
<script src="//sheet2api.com/v1/api.js"></script>
<script>
var url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
var newRowData = { "Favourite Thing": "Carrots", "Name": "Bugs Bunny" };
var options = {};
Sheet2API.write(url, options, newRowData).then(function(result){
  console.log(result);
}, function(error){
  console.log(error);
});
</script>
```

Something missing you'd like to see? Please create an issue.
