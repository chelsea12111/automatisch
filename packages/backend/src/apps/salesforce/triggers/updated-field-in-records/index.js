import defineTrigger from '../../../../helpers/define-trigger';
import updatedFieldInRecords from './updated-field-in-records';

type TriggerArguments = {
  object: string;
  field: string;
};

export default defineTrigger<TriggerArguments>({
  name: 'Updated field in records',
  key: 'updatedFieldInRecords',
  pollInterval: 15,
  delay: 5000, // delay between polling intervals
  description: 'Triggers when a field is updated in a record.',
  arguments: [
    {
      label: 'Object',
      key: 'object',
      type: 'dropdown',
      required: true,
      variables: false,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listObjects',
          },
        ],
        onError: (error) => {
          $.log.error(`Error fetching objects: ${error}`);
        },
      },
    },
    {
      label: 'Field',
      key: 'field',
      type: 'dropdown',
      description: 'Track updates by this field',
      required: true,
      variables: false,
      dependsOn: ['parameters.object'],
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listFields',
          },
          {
            name: 'parameters.object',
            value: '{parameters.object}',
          },
        ],
        onError: (error) => {
          $.log.error(`Error fetching fields for object ${parameters.object}: ${error}`);
        },
      },
    },
  ],

  async run($: TriggerContext, args: TriggerArguments) {
    if (!args.object || !args.field) {
      throw new Error('Invalid object or field value');
    }

    await updatedFieldInRecords($, args);
  },
});

