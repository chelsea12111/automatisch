import paginateAll from '../../common/paginate-all.js';

export default {
  name: 'List repos',
  key: 'listRepos',

  async run(context) {
    const { $, http } = context;
    const firstPageRequest = http.get('/user/repos');
    const response = await paginateAll(context, firstPageRequest);

    response.data = response.data.map((repo) => {
      return {
        value: repo.full_name,
        name: repo.full_name,
      };
    });

    return response;
  },
};
