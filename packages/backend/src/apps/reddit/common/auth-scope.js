// authScope.js

const authScope = ['identity', 'read', 'account', 'submit'];

module.exports = {
  authScope,
};


// someOtherModule.js

import { authScope } from './authScope.js';

// Use authScope array here
console.log(authScope); // ['identity', 'read', 'account', 'submit']

