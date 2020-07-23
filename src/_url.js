const baseUrl = 'https://sheet2api.com/v1/';

const sheetUrl = function (slug_or_url, options) {
  return buildUrl(slug_or_url, options);
};

const serialize = function (obj) {
  const str = [];
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

const buildUrl = function (urlOrSlug, options) {
  let url = '';
  if (startsWith(urlOrSlug, baseUrl)) {
    url += urlOrSlug;
  } else {
    url += (baseUrl + urlOrSlug);
  }
  if (options && options.sheet !== undefined) {
    url += options.sheet + '/'
    delete options.sheet;
  }
  if (options && options.query !== undefined) {
    url += '?' + serialize(options.query);
  }
  return url;
};

export const addAuth = function (xhr, options) {
  if(options && options.auth !== undefined) {
    const auth_user = options.auth[0];
    const auth_pass = options.auth[1];
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(`${auth_user}:${auth_pass}`));
  }
}

const startsWith = function (string, searchString, position) {
  position = position || 0;
  return string.indexOf(searchString, position) === position;
};

export default sheetUrl;
