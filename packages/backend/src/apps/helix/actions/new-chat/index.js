import defineAction from '../../../../helpers/define-action.js';
import { validateString, validateNotEmpty } from '../../../../helpers/validate.js';

export default defineAction({
  name: 'New chat',
  key: 'newChat',
  description: 'Create a new chat session for Helix AI.',
  arguments: [
    {
      label: 'Session ID',
      key: 'sessionId',
      type: 'string',
      required: false,
      description:
        'ID of the chat session to continue. Leave empty to start a new chat.',
      variables: true,
    },
    {
      label: 'System Prompt',
      key: 'systemPrompt',
      type: 'string',
      required: false,
      description:
        'Optional system prompt to start the chat with. It will be used only for new chat sessions.',
      variables: true,
    },
    {
      label: 'Input',
      key: 'input',
      type: 'string',
      required: true,
      description: 'User input to start the chat with.',
      variables: true,
    },
  ],

  async run($) {
    // Validate input parameters
    const sessionId = $.step.parameters.sessionId;
    if (sessionId && !validateString(sessionId)) {
      throw new Error('Invalid session ID.');
    }

    const systemPrompt = $.step.parameters.systemPrompt;
    if (systemPrompt && !validateString(systemPrompt)) {
      throw new Error('Invalid system prompt.');
    }

    const input = $.step.parameters.input;
    if (!validateNotEmpty(input)) {
      throw new Error('Input cannot be empty.');
    }

    const data = {
      session_id: sessionId,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: {
            content_type: 'text',
            parts: [input],
          },
        },
      ],
    };

    try {
      const response = await $.http.post('/api/v1/sessions/chat', data);

      if (response.statusCode >= 400) {
        throw new Error('Failed to create a new chat session.');
      }

      $.setActionItem({
        raw: response.data,
      });
    } catch (error) {
      // Handle errors and throw a new error with a user-friendly message
      throw new Error('Failed to create a new chat session. Please try again later.');
    }
  },
});
