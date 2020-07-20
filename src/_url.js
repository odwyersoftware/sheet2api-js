var baseUrl = "https://sheet2api.com/v1/";

var sheetUrlGet = function (slug_or_url, options) {
  return buildUrl(slug_or_url, options);
};

var serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

var sheetUrlPost = function (slug_or_url, options) {
  return buildUrl(slug_or_url, options);
};

var buildUrl = function (urlOrSlug, options) {
  var url = '';
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

var startsWith = function (string, searchString, position) {
  position = position || 0;
  return string.indexOf(searchString, position) === position;
};
