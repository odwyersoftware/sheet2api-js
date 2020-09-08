function write(slug_or_url, data, options) {
  return new Promise(function (resolve, reject) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("POST", sheetUrlPost(slug_or_url, options), true);
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

    xhr.send(JSON.stringify(data));
  });
}
