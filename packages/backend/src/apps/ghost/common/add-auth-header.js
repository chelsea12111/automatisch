import jwt from 'jsonwebtoken';

const addAuthHeader = (reqConfig) => {
  const authData = reqConfig?.context?.auth?.data;
  if (!authData) {
    throw new Error('Auth data not found in request config');
  }

  const apiKey = authData.apiKey;
  if (!apiKey) {
    throw new Error('API key not found in auth data');
  }

  const [id, secret] = apiKey.split(':');
  if (!id || !secret) {
    throw new Error('Invalid format of API key');
  }

  const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    kid: id,
    algorithm: 'HS256',
    expiresIn: '1h',
    audience: '/admin/',
  });

  reqConfig.headers = reqConfig.headers || {};
  reqConfig.headers.Authorization = `Ghost ${token}`;

  return reqConfig;
};

export default addAuthHeader;
