const newDatabaseItems = async ($) => {
  const payload = {
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
  };

  const databaseId = $.step.parameters.databaseId;
  if (!databaseId) {
    console.error("Missing required parameter: databaseId");
    return;
  }

  const path = `/v1/databases/${databaseId}/query`;
  let nextCursor = null;

  do {
    try {
      const response = await $.http.post(path, payload);

      if (response.statusCode !== 200) {
        console.error(`Unexpected status code: ${response.statusCode}`);
        return;
      }

      nextCursor = response.data.next_cursor;

      for (const databaseItem of response.data.results) {
        $.pushTriggerItem({
          raw: databaseItem,
          meta: {
            internalId: databaseItem.id,
          },
        });
      }

      console.log(`Fetched ${response.data.results.length} items.`);
    } catch (error) {
      console.error("Error fetching data:", error);
      return;
    }
  } while (nextCursor !== null && nextCursor !== '');

  console.log("Finished fetching data.");
};

export default newDatabaseItems;
