// utils/index.js

export { default as sendPrompt } from './send-prompt';
export { default as sendChatPrompt } from './send-chat-prompt';



// send-prompt.js

import { sendV1Prompt } from './v1/send-prompt';
import { sendV2Prompt } from './v2/send-prompt';

// Add more versions if needed

const sendPrompt = (version, prompt) => {
  switch (version) {
    case 1:
      return sendV1Prompt(prompt);
    case 2:
      return sendV2Prompt(prompt);
    // Add more cases if needed
    default:
      throw new Error('Invalid version specified');
  }
};

export default sendPrompt;



// send-chat-prompt.js

import { sendV1ChatPrompt } from './v1/send-chat-prompt';
import { sendV2ChatPrompt } from './v2/send-chat-prompt';

// Add more versions if needed

const sendChatPrompt = (version, chatPrompt) => {
  switch (version) {
    case 1:
      return sendV1ChatPrompt(chatPrompt);
    case 2:
      return sendV2ChatPrompt(chatPrompt);
    // Add more cases if needed
    default:
      throw new Error('Invalid version specified');
  }
};

export default sendChatPrompt;

