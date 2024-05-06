// TODO: replace with axios-with-proxy when needed
import axios from 'axios';
import appConfig from '../../config/app.js';
import { DateTime } from 'luxon';

const PADDLE_VENDOR_URL = appConfig.isDev
  ? 'https://sandbox-vendors.paddle.com'
  : 'https://vendors.paddle.com';

const axiosInstance = axios.create({ baseURL: PADDLE_VENDOR_URL });

const getSubscription = async (subscriptionId) => {
  if (typeof subscriptionId !== 'string') {
    throw new Error('subscriptionId must be a string');
  }

  const data = {
    vendor_id: appConfig.paddleVendorId,
    vendor_auth_code: appConfig.paddleVendorAuthCode,
    subscription_id: subscriptionId,
  };

  let response;
  try {
    response = await axiosInstance.post('/api/2.0/subscription/users', data);
  } catch (error) {
    throw new Error(`Error getting subscription: ${error.message}`);
  }

  const { response: subscription } = response.data;
  return subscription;
};

const getInvoices = async (subscriptionId) => {
  if (typeof subscriptionId !== 'string') {
    throw new Error('subscriptionId must be a string');
  }

  const data = {
    vendor_id: appConfig.paddleVendorId,
    vendor_auth_code: appConfig.paddleVendorAuthCode,
    subscription_id: subscriptionId,
    is_paid: 1,
    from: DateTime.now().minus({ years: 3 }).toISODate(),
    to: DateTime.now().plus({ days: 3 }).toISODate(),
  };

  let response;
  try {
    response = await axiosInstance.post('/api/2.0/subscription/payments', data);
  } catch (error) {
    throw new Error(`Error getting invoices: ${error.message}`);
  }

  const { response: invoices } = response.data;
  return invoices;
};

const paddleClient = {
  getSubscription,
  getInvoices,
};

export default paddleClient;
