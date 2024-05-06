const pushTriggerItems = (messages) => {
  for (const message of messages) {
    const dataItem = {
      raw: message,
      meta: {
        internalId: message.date_sent,
      },
    };

    $.pushTriggerItem(dataItem);
  }
};

const fetchMessages = async ({ step: { parameters: { toNumber } } }) => {
  // Check if toNumber is a non-empty string
  if (typeof toNumber !== 'string' || toNumber.trim() === '') {
    throw new Error('toNumber must be a non-empty string');
  }

  // Check if toNumber is a valid number
  const toNumberValue = parseFloat(toNumber);
  if (isNaN(toNumberValue) || !Number.isInteger(toNumberValue)) {
    throw new Error('toNumber must be a valid integer');
  }

  let requestPath = `/api/laml/2010-04-01/Accounts/${$.auth.data.accountSid}/Messages?To=${toNumber}`;

  let response = await $.http.get(requestPath);

  // Loop through messages and push trigger items
  if (response.data.messages && Array.isArray(response.data.messages)) {
    pushTriggerItems(response.data.messages);
  }

  // Check if there is a next page and fetch it
  while (response.data.next_page_uri && typeof response.data.next_page_uri === 'string') {
    try {
      response = await $.http.get(response.data.next_page_uri);

      if (response.data.messages && Array.isArray(response.data.messages)) {
        pushTriggerItems(response.data.messages);
      }
    } catch (error) {
      throw new Error(`Failed to fetch messages from next page: ${error.message}`);
    }
  }
};

export default fetchMessages;
