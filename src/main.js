import read from './read';
import write from './write';

const Sheet2API = {
  read: function(){
    return read.apply(null, arguments);
  },
  write: function(){
    return write.apply(null, arguments);
  },
  version: '1.0'
}

export default Sheet2API;
