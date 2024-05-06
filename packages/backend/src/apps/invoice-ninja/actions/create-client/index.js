import defineAction from '../../../../helpers/define-action.js';
import { filterProvidedFields } from '../../common/filter-provided-fields.js';
import { buildClientFields } from './fields.js';

export default defineAction({
  name: 'Create client',
  key: 'createClient',
  description: 'Creates a new client.',
  arguments: {
    // Use the built fields object from fields.js
    fields: buildClientFields(),
  },

  async run($) {
    const providedFields = $.step.parameters;
    const bodyFields = buildClientFields(providedFields);

    const body = filterProvidedFields(bodyFields);

    const response = await $.http.post('/v1/clients', body);


