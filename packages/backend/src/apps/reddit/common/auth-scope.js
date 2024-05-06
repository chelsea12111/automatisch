// authScope.js

export const authScope = ['identity', 'read', 'account', 'submit'];


// someOtherModule.js

import { authScope } from './authScope.js';

// Use authScope array here
console.log(authScope); // ['identity', 'read', 'account', 'submit']

// Additional code to demonstrate using the authScope array
authScope.forEach(permission => {
  console.log(`Checking permission: ${permission}`);
  // Perform permission checks or other logic here
});
