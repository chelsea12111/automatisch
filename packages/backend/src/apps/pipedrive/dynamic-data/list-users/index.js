import { defineAction } from 'scrivener-scripts';

export default defineAction({
  name: 'List users',
  key: 'listUsers',
  async run($) {
    const users = {
      data: [],
    };

    try {
      const response = await $.http.get(`${$.auth.data.apiDomain}/api/v1/users`);
      const userData = response.data.data;

      if (Array.isArray(userData) && userData.length > 0) {
        users.data = userData.map((user) => ({
          value: user.id,
          name: user.name,
        }));
      }
    } catch (error) {
      $.log.error(`Error fetching users: ${error.message}`);
    }

    return users;
  },
});
