const fetchMessages = async ({ step: { parameters: { toNumber } } }) => {
  // Check if toNumber is a valid number
  if (typeof toNumber !== 'number') {
    throw new Error('toNumber must be a valid number');
  }

  const requestPath = `/api/laml/2010-04-01/Accounts/${$.auth.data.accountSid}/Messages?To=${toNumber}`;

  let response = await $.http.get(requestPath);

  // Loop through messages and push trigger items
  for (const message of response.data.messages) {
    const dataItem = {
      raw: message,
      meta: {
        internalId: message.date_sent,
      },
    };

    $.pushTriggerItem(dataItem);
  }

  // Check if there is a next page and fetch it
  while (response.data.next_page_uri) {
    response = await $.http.get(response.data.next_page_uri);

    for (const message of response.data.messages) {
      const dataItem = {
        raw: message,
        meta: {
          internalId: message.date_sent,
        },
      };

      $.pushTriggerItem(dataItem);
    }
  }
};

export default fetchMessages;
