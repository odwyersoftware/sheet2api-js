const { sheetUrlGet } = require('./_url')

function read(slug_or_url, options) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    const url = sheetUrlGet(slug_or_url, options);
    xhr.open('GET', url, true);
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
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.send();
  });
}

module.exports = {
  read
}
