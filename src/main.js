import {request, update} from './request';

const Sheet2API = {
  read: request,
  write: request,
  update: update,
  version: '1.0'
}

export default Sheet2API;
