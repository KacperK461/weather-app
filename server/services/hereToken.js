import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import axios from 'axios';
import querystring from 'querystring';
import env from '../config/variables.js';

const generateToken = async () => {
  const oauth = OAuth({
    consumer: {
      key: env.hereAccessKeyId,
      secret: env.hereAccessKeySecret,
    },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha256', key)
        .update(base_string)
        .digest('base64');
    },
  });

  const request_data = {
    url: env.hereTokenEndpoint,
    method: 'post',
    data: { grant_type: 'client_credentials' },
  };

  const response = await axios({
    url: request_data.url,
    method: request_data.method,
    data: querystring.stringify(request_data.data),
    headers: oauth.toHeader(oauth.authorize(request_data)),
  }).catch((err) => {
    throw new Error(err);
  });

  return response.data;
};

let tokenInfo;

const getToken = async () => {
  if ((tokenInfo && tokenInfo.expires_in < Date.now()) || !tokenInfo) {
    tokenInfo = await generateToken();
    tokenInfo.expires_in += Date.now();
  }

  return tokenInfo.access_token;
};

export default getToken;
