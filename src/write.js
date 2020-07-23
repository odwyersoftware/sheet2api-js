import sheetUrl, {addAuth} from './_url'

function write(slug_or_url, options, data) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    const url = sheetUrl(slug_or_url, options);
    xhr.open('POST', url, true);
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
    xhr.send(JSON.stringify(data));
  });
}

export default write;
