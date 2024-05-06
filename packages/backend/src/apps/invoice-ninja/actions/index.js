import createClient from './create-client/index.js';
import createInvoice from './create-invoice/index.js';
import createPayment from './create-payment/index.js';
import createProduct from './create-product/index.js';

export {
  createClient,
  createInvoice,
  createPayment,
  createProduct,
};


import * as factories from './factories.js';

const client = factories.createClient();
const invoice = factories.createInvoice();
// ...
