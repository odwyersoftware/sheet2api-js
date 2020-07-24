import sheetUrl from './_url'

function request(slugOrUrl, options, data) {
  const method = data ? 'POST' : 'GET';
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

export default request
