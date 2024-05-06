import axios from 'axios';

export default {
  name: 'List forums',
  key: 'listForums',

  async run() {
    const forums = {
      data: [],
    };

    let cursor = undefined;
    let hasNext;

    do {
      const params = {
        limit: 100,
        order: 'desc',
        cursor,
      };

      const { data: responseData } = await axios.get('/3.0/users/listForums.json', {
        params,
      });

      cursor = responseData.cursor?.next;
      hasNext = responseData.cursor?.hasNext;

      if (responseData.response?.length) {
        for (const forum of responseData.response) {
          forums.data.push({
            value: forum.id,
            name: forum.id,
          });
        }
      }
    } while (hasNext);

    return forums;
  },
};
