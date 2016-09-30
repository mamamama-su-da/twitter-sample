export default class Query {

  static stringfy(params = {}, delimiter = '&') {
    return Object.keys(params).sort().map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join(delimiter);
  }

  static parse(queryString, delimiter = '&') {
    let obj = {};
    queryString.replace(/.*\?/, '').split(delimiter).forEach(item => {
      const pair = item.split('=');
      obj[decodeURIComponent(pair[0])] = (decodeURIComponent(pair[1] || ''));
    })
    return obj;
  }
}