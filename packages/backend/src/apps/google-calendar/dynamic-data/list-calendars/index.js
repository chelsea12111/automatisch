import { AxiosResponse } from 'axios';

export default {
  name: 'List Calendars',
  key: 'listCalendars',

  async run($: any): Promise<{ data: { value: string; name: string }[] }> {
    const calendars = {
      data: [],
    };

    let nextPageToken: string | undefined = undefined;

    do {
      const params = {
        pageToken: nextPageToken,
      };

      let response: AxiosResponse;
      try {
        response = await $.http.get(`/v3/users/me/calendarList`, { params });
      } catch (error) {
        response = error.response;
      }

      if (response && response.data) {
        nextPageToken = response.data.nextPageToken;

        if (response.data.items) {
          for (const calendar of response.data.items) {
            calendars.data.push({
              value: calendar.id,
              name: calendar.summary,
            });
          }
        }
      }
    } while (nextPageToken !== null && nextPageToken !== undefined);

    return calendars;
  },
};
