import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

const createOAuthClient = (authData) => {
  if (!authData || !authData.consumerKey || !authData.consumerSecret) {
    throw new Error('Missing required auth data');
  }

  const consumerData = {
    key: authData.consumerKey,
    secret: authData.consumerSecret,
  };

  return new OAuth({
    consumer: consumerData,
    signature_method: 'HMAC-SHA1',
    hash_function: (base_string, key) => {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    },
  });
};

export default createOauthClient;
