import type { HttpClient, HttpResponse } from '$types/http';

interface DatabaseItem {
  id: string;
  last_edited_time: string;
}

interface QueryResponse {
  results: DatabaseItem[];
  next_cursor?: string;
}

const fetchUpdatedDatabaseItems = async (
  http: HttpClient,
  databaseId: string
): Promise<DatabaseItem[]> => {
  let payload = {
    sorts: [
      {
        timestamp: 'last_edited_time',
        direction: 'descending',
      },
    ],
  };

  let queryResponse: QueryResponse | null = { results: [] };
  while (queryResponse && queryResponse.results.length > 0) {
    const response = await http.post<QueryResponse>(
      `/v1/databases/${databaseId}/query`,
      payload
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch database items: ${response.statusText}`);
    }

    queryResponse = response.data;
    payload.start_cursor = queryResponse.next_cursor;

    for (const databaseItem of queryResponse.results) {
      // Add any necessary validation or transformation here
      $.pushTriggerItem({
        raw: databaseItem,
        meta: {
          internalId: `${databaseItem.id}-${databaseItem.last_edited_time}`,
        },
      });
    }
  }

  return [];
};

export default fetchUpdatedDatabaseItems;
