import defineTrigger from '../../../../helpers/define-trigger.js';

export default defineTrigger({
  name: 'New Bank Transactions',
  key: 'newBankTransactions',
  pollInterval: 15,
  description: 'Triggers when a new bank transaction occurs.',
  arguments: [
    {
      label: 'Organization',
      key: 'organizationId',
      type: 'dropdown',
      required: true,
      description: 'The organization to fetch bank transactions for.',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listOrganizations',
          },
        ],
      },
    },
  ],

  async run($) {
    const params = {
      page: 1,
      order: 'Date DESC',
      organizationId: $.arguments.organizationId,
    };

    let nextPage = true;

    while (nextPage) {
      const { data } = await $.http.get('/api.xro/2.0/BankTransactions', {
        params,
      });

      if (data.BankTransactions?.length) {
        for (const bankTransaction of data.BankTransactions) {
          $.pushTriggerItem({
            raw: bankTransaction,
            meta: {
              internalId: bankTransaction.BankTransactionID,
            },
          });
        }
      }

      nextPage = data.BankTransactions?.length === 100;
      if (nextPage) {
        params.page++;
      }
    }
  },
});
