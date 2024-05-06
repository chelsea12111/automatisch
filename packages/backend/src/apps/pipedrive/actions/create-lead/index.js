import defineAction from '../../../../helpers/define-action.js';
import { filterProvidedFields } from '../../common/filter-provided-fields.js';

export default defineAction({
  name: 'Create lead',
  key: 'createLead',
  description: 'Creates a new lead.',
  arguments: [
    // ... (same as the original code)
  ],

  async run($) {
    const {
      title,
      personId,
      organizationId,
      ownerId,
      labelIds,
      expectedCloseDate,
      value,
      currency,
    } = $.step.parameters;

    if (!personId && !organizationId) {
      throw new Error('At least one of "Person" or "Organization" must be provided.');
    }

    const onlyLabelIds = Array.isArray(labelIds)
      ? labelIds.filter(Boolean).map((label) => label.leadLabelId)
      : [];

    const labelValue = {};

    if (value) {
      if (typeof value !== 'string' || !/^\d+$/.test(value)) {
        throw new Error('Invalid value for "Lead Value": must be a non-negative integer.');
      }
      labelValue.amount = Number(value);
    }

    if (currency) {
      if (typeof currency !== 'string') {
        throw new Error('Invalid value for "Lead Value Currency": must be a string.');
      }
    }

    if (expectedCloseDate) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(expectedCloseDate)) {
        throw new Error('Invalid value for "Expected Close Date": must be in YYYY-MM-DD format.');
      }
    }

    const fields = {
      title: title,
      person_id: Number(personId),
      organization_id: Number(organizationId),
      owner_id: Number(ownerId),
      expected_close_date: expectedCloseDate,
      label_ids: onlyLabelIds,
      value: labelValue,
    };

    const body = filterProvidedFields(fields);

    try {
      const {
        data: { data },
      } = await $.http.post('/api/v1/leads', body);

      $.setActionItem({
        raw: data,
      });
    } catch (error) {
      throw new Error('Error creating lead: ' + error.message);
    }
  },
});
