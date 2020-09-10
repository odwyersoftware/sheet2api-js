import {request, update, updatePartial} from './request';

const Sheet2API = {
  read: request,
  write: request,
  update: update,
  updatePartial: updatePartial,
  version: '1.0'
}

export default Sheet2API;
