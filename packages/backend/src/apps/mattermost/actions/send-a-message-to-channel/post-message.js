import type { StepFunctions, Context, HttpResponse } from 'middy';

interface InputParameters {
  channel_id: string;
  message: string;
}

const postMessage = async (
  { step }: StepFunctions,
  context: Context
): Promise<HttpResponse> => {
  const { channel_id, message } = step.parameters as InputParameters;

  if (!channel_id || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Both `channel_id` and `message` are required.',
      }),
    };
  }

  const data = {
    channel_id,
    message,
  };

  try {
    const response = await context.http.post('/api/v4/posts', data);

    const actionData = {
      raw: response?.data,
    };

    step.setActionItem(actionData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Posted message successfully.',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to post message.',
        error: error.message,
      }),
    };
  }
};

export default postMessage;
