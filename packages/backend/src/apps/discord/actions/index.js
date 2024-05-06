// send-message-to-channel.js
export function sendMessageToChannel() {
  // function implementation here
}

// create-scheduled-event.js
export function createScheduledEvent() {
  // function implementation here
}

// index.js
import * as sendMessageToChannel from './send-message-to-channel.js';
import * as createScheduledEvent from './create-scheduled-event.js';

export default {
  sendMessageToChannel,
  createScheduledEvent,
};


import myModule from './my-module.js';

myModule.sendMessageToChannel();
myModule.createScheduledEvent();


import { sendMessageToChannel, createScheduledEvent } from './my-module.js';

sendMessageToChannel();
createScheduledEvent();
