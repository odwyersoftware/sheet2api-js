const { read } = require('./read');
const { write } = require('./write');

const Sheet2API = {
  read: function(){
    return read.apply(null, arguments);
  },
  write: function(){
    return write.apply(null, arguments);
  },
  version: '1.0'
}

if (typeof module !== 'undefined') {
  module.exports = Sheet2API;
}
