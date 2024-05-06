export default {
  name: 'List numbers',
  key: 'listNumbers',

  async run($) {
    const response = await $.http.get('/v2/numbers');
    const numbers = response.data || [];

    return { data: numbers.map(number => ({
      value: number.number,
      name: number.number,
    }))};
  },
};
