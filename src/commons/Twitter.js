import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

export default class {
  constructor(options) {
    this.options = Object.assign({}, {
      consumer_key: null,
      consumer_secret: null,
      access_token_key: null,
      access_token_secret: null,
      bearer_token: null, //TODO 未対応
      rest_base: 'https://api.twitter.com/1.1',
      stream_base: 'https://stream.twitter.com/1.1',
      user_stream_base: 'https://userstream.twitter.com/1.1',
      site_stream_base: 'https://sitestream.twitter.com/1.1',
      media_base: 'https://upload.twitter.com/1.1',
      request_options: {
        headers: {
          Accept: '*/*',
          Connection: 'close',
          'User-Agent': 'rn-twitter/' + '0.0.1'
        }
      }
    }, options);
  }

  get(path, params = {}) {
    const url = this.options.rest_base + path;
    const method = 'GET';

    return fetch(url + (params ? '?' + this._toQueryString(params) : ''), {
      method: method,
      headers: {
        Authorization: 'OAuth ' + this._buildOauthHeader(method, url, params),
      },
    }).then(res => {
      if (!res.ok) {
        console.warn(res);
      }
      return res.json();
    });
  }

  post(path, params = {}) {
    const url = this.options.rest_base + path;
    const method = 'POST';

    return fetch(url, {
      method: method,
      headers: {
        Authorization: 'OAuth ' + this._buildOauthHeader(method, url, params),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this._toQueryString(params),
    }).then(res => {
      if (!res.ok) {
        console.warn(res);
      }
      return res.json();
    });
  }

  getRequestToken() {
    const method = 'POST';
    const url = 'https://api.twitter.com/oauth/request_token';

    return fetch(url, {
      method: method,
      headers: {
        Authorization: 'OAuth ' + this._buildOauthHeader(method, url),
      },
    }).then(res => {
      if (!res.ok) {
        console.warn(res);
      }
      return res.text();
    }).then(text => {
      return this._toObject(text);
    });
  }

  getAccessToken(oauth_token, oauth_token_secret, oauth_verifier) {
    const method = 'POST';
    const url = 'https://api.twitter.com/oauth/access_token';

    const params = {
      oauth_token,
      oauth_token_secret,
      oauth_verifier,
    }

    return fetch(url, {
      method: method,
      headers: {
        Authorization: 'OAuth ' + this._buildOauthHeader(method, url, params),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this._toQueryString(params),
    }).then(res => {
      if (!res.ok) {
        console.warn(res);
      }
      return res.text();
    }).then(text => {
      return this._toObject(text);
    });
  }

  _buildOauthHeader(method, url, params = {}) {

    const oauthParams = {
      oauth_consumer_key: this.options.consumer_key,
      oauth_nonce: new Date().getTime(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(new Date().getTime() / 1000),
      oauth_version: '1.0',
    };
    if (this.options.access_token_key) {
      oauthParams['oauth_token'] = this.options.access_token_key;
    }

    // 署名に使うシークレットトークンを作る
    const oauth_token_secret = params.oauth_token_secret || this.options.access_token_secret || '';
    if (params.oauth_token_secret) {
      delete params.oauth_token_secret;
    }

    // 署名を作成する
    const secret = this.options.consumer_secret + '&' + oauth_token_secret;
    const message = encodeURIComponent(method)
      + '&' + encodeURIComponent(url)
      + '&' + encodeURIComponent(this._toQueryString(Object.assign({}, oauthParams, params)));
    const signature = Base64.stringify(HmacSHA1(message, secret));

    // headerに設定するために形に整える
    return this._toQueryString(Object.assign({}, oauthParams, {
      oauth_signature: signature
    }), ',');
  }

  _toQueryString(params = {}, delimiter = '&') {
    return Object.keys(params).sort().map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join(delimiter);
  }

  _toObject(queryString, delimiter = '&') {
    let obj = {};
    queryString.split(delimiter).forEach(item => {
      const pair = item.split('=');
      obj[decodeURIComponent(pair[0])] = (decodeURIComponent(pair[1] || ''));
    });
    return obj;
  }
}