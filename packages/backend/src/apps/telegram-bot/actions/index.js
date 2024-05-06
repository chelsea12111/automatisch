// send-message.js
export default function sendMessage(message) {
  // implementation to send a message
}

// index.js
import sendMessage from './send-message.js';

export { sendMessage };

// someOtherFile.js
import { sendMessage } from './index.js';

// usage
sendMessage('Hello, world!');

