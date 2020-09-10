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
const Sheet2API = require('sheet2api-js');
// Or, ES6 import
import Sheet2API from 'sheet2api-js';
```

### Read rows

```html
<script src="//sheet2api.com/v1/api.js"></script>
<script>
const url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
const options = {};
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
const url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
const options = {query: { 'Name': 'Bugs Bunny' }};
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
const url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
const newRowData = { "Favourite Thing": "Carrots", "Name": "Bugs Bunny" };
const options = {};
Sheet2API.write(url, options, newRowData).then(function(result){
  console.log(result);
}, function(error){
  console.log(error);
});
</script>
```

### Update existing rows matching a search query

```html
<script src="//sheet2api.com/v1/api.js"></script>
<script>
const url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
const updateWithData = { "Favourite Thing": "Beer", "Name": "Bugs Bunny" };
const options = {query: { 'Name': 'Bugs Bunny' }};
Sheet2API.update(url, options, updateWithData).then(function(result){
  console.log(result);
}, function(error){
  console.log(error);
});
</script>
```

### Update partially, existing rows matching a search query

Note, If you don’t include values for all columns (Name, Favourite Thing, Image) in the request body, then missing column values will not be updated, just the ones which were present in the request body.

```html
<script src="//sheet2api.com/v1/api.js"></script>
<script>
const url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
const updateWithData = { "Name": "Bugs" };
const options = {query: { 'Name': 'Bugs Bunny' }};
Sheet2API.updatePartial(url, options, updateWithData).then(function(result){
  console.log(result);
}, function(error){
  console.log(error);
});
</script>
```

### Authentication

If you have enabled Basic Authentication on your sheet2api API.

```javascript
const options = {
  auth: ['username', 'password']
};
Sheet2API.read(url, options).then(function(result){
  console.log(result);
}, function(error){
  console.log(error);
});
</script>
```

Something missing you'd like to see? Please create an issue.
