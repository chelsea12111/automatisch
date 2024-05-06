import {
  defineTrigger,
  TriggerItem,
  TriggerTestRun,
  TriggerRun,
  TriggerRegisterHook,
  TriggerUnregisterHook,
} from 'your-flow-sdk';
import { nanoid } from 'nanoid';
import axios from 'axios';
import omit from 'lodash/omit.js';

// Define the trigger's input and output types
type TriggerData = { raw: unknown };
type TriggerTestData = void;

// Define the trigger
export default defineTrigger<TriggerRun<TriggerData>, TriggerTestRun, TriggerRegisterHook, TriggerUnregisterHook>({
  id: nanoid(),
  name: 'My Improved Trigger',
  description: 'An example of a rewritten and improved trigger.',

  // Define the trigger's behavior
  async run({ inputs }) {
    const { raw } = inputs;

    // Perform some action with the raw data
    // For example, send a request to an external API
    const response = await axios.post('https://example.com/api', omit(raw, ['sensitiveField']));

    // Return the result
    return {
      success: true,
      outputs: {
        result: response.data,
      },
    };
  },

  // Define the trigger's test behavior
  async test({ inputs }) {
    // Perform some lightweight test to check if the trigger is working as expected
    // For example, check if the raw data has the required properties
    const { raw } = inputs;

    if (typeof raw === 'object' && 'property1' in raw && 'property2' in raw) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      error: 'The raw data does not have the required properties.',
    };
  },

  // Register the trigger
  async register(register: TriggerRegisterHook) {
    // Register the trigger with the flow
    await register('my-improved-trigger', {
      name: 'My Improved Trigger',
      description: 'An example of a rewritten and improved trigger.',
      inputFields: [
        {
          name: 'raw',
          label: 'Raw Data',
          type: 'object',
          required: true,
        },
      ],
      outputFields: [
        {
          name: 'result',
          label: 'Result',
          type: 'object',
        },
      ],
    });
  },

  // Unregister the trigger
  async unregister(unregister: TriggerUnregisterHook) {
    // Unregister the trigger from the flow
    await unregister('my-improved-trigger');
  },
});
