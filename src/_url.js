const baseUrl = 'https://sheet2api.com/v1/';

function serialize(obj) {
  const str = [];
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

function sheetUrl(urlOrSlug, options) {
  let url = '';
  if (urlOrSlug.startsWith(baseUrl)) {
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
}

export default sheetUrl;
