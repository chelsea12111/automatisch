import defineAction from '../../../../helpers/define-action.js';
import { filterProvidedFields } from '../../common/filter-provided-fields.js';

export default defineAction({
  name: 'Create Deal',
  key: 'createDeal',
  description: 'Creates a new deal with the provided details.',
  arguments: [
    {
      label: 'Title',
      key: 'title',
      type: 'string',
      required: true,
      description: 'The title of the deal.',
      variables: true,
    },
    {
      label: 'Creation Date',
      key: 'addTime',
      type: 'string',
      required: false,
      description:
        'The creation date and time of the deal in the format YYYY-MM-DD HH:MM:SS. Requires admin access to Pipedrive account.',
      variables: true,
    },
    {
      label: 'Status',
      key: 'status',
      type: 'dropdown',
      required: false,
      description: 'The status of the deal.',
      options: [
        {
          label: 'Open',
          value: 'open',
        },
        {
          label: 'Won',
          value: 'won',
        },
        {
          label: 'Lost',
          value: 'lost',
        },
        {
          label: 'Deleted',
          value: 'deleted',
        },
      ],
      variables: true,
    },
    {
      label: 'Lost Reason',
      key: 'lostReason',
      type: 'string',
      required: false,
      description: 'The reason why the deal was lost.',
      variables: true,
    },
    {
      label: 'Stage',
      key: 'stageId',
      type: 'dropdown',
      required: false,
      description:
        'The ID of the stage to add the deal to. If omitted, the deal will be placed in the first stage of the default pipeline.',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listStages',
          },
        ],
      },
    },
    {
      label: 'Owner',
      key: 'userId',
      type: 'dropdown',
      required: false,
      description: 'The user who will be marked as the owner of this deal.',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listUsers',
          },
        ],
      },
    },
    {
      label: 'Organization',
      key: 'organizationId',
      type: 'dropdown',
      required: false,
      description: 'The organization associated with this deal.',
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
    {
      label: 'Person',
      key: 'personId',
      type: 'dropdown',
      required: false,
      description: 'The person associated with this deal.',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listPersons',
          },
        ],
      },
    },
    {
      label: 'Probability',
      key: 'probability',
      type: 'string',
      required: false,
      description:
        'The success probability percentage of the deal. Used/shown only when deal_probability for the pipeline of the deal is enabled.',
      variables: true,
    },
    {
      label: 'Expected Close Date',
      key: 'expectedCloseDate',
      type: 'string',
      required: false,
      description:
        'The expected close date of the deal in the format YYYY-MM-DD.',
      variables: true,
    },
    {
      label: 'Value',
      key: 'value',
      type: 'string',
      required: false,
      description: 'The value of the deal.',
      variables: true,
    },
    {
      label: 'Currency',
      key: 'currency',
      type: 'dropdown',
      required: false,
      description:
        'The currency of the deal. Accepts a 3-character currency code. If omitted, currency will be set to the default currency of the authorized user.',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listCurrencies',
          },
        ],
      },
    },
  ],

  async run($) {
    const {
      title,
      addTime,
      status,
      lostReason,
      stageId,
      userId,
      organizationId,
      personId,
      probability,
      expectedCloseDate,
      value,
      currency,
    } = $.step.parameters;

    const fields = {
      title: title,
      value: value || '0',
      add_time: addTime,
      status: status || 'open',
      lost_reason: lostReason,
      stage_id: stageId,
      user_id: userId,
      org_id: organizationId,
      person_id: personId,
      probability: probability || '0',
      expected_close_date: expectedCloseDate,
      currency: currency || 'USD',
    };

    const body = filterProvidedFields(fields);

    const {
      data: { data },
    } = await $.http.post('/api/v1/deals', body);

    $.setActionItem({
      raw: data,
    });
  },
});
