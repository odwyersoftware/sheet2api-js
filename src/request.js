import sheetUrl, {addAuth} from './_url'

export function update(slugOrUrl, options, data) {
  return request(slugOrUrl, options, data, 'PUT');
}

export function request(slugOrUrl, options, data, method_override = null) {
  let method;
  if(method_override == null) {
    method = data ? 'POST' : 'GET';
  } else {
    method = method_override;
  }
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    const url = sheetUrl(slugOrUrl, options);
    xhr.open(method, url, true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    addAuth(xhr, options);
    xhr.onerror = function (e) {
      reject(e);
    };
    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}
