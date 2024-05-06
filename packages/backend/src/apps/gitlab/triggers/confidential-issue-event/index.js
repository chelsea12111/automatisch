import { defineTrigger } from '../../../../helpers/define-trigger.js';
import {
  GITLAB_EVENT_TYPE,
} from '../types.js';
import {
  getRegisterHookFn,
  getRunFn,
  getTestRunFn,
  projectArgumentDescriptor,
  unregisterHook,
} from '../lib.js';

import data from './issue_event.js';

const registerHookFn = getRegisterHookFn(GITLAB_EVENT_TYPE.confidential_issues_events);
const runFn = getRunFn($);
const testRunFn = getTestRunFn(data);

export const triggerDescriptor = {
  name: 'Confidential issue event',
  description: 'Confidential issue event (triggered when a new confidential issue is created or an existing issue is updated, closed, or reopened)',
  key: GITLAB_EVENT_TYPE.confidential_issues_events,
  type: 'webhook',
  arguments: [projectArgumentDescriptor],
  run: async ($) => {
    try {
      await runFn($);
    } catch (error) {
      // handle error
      console.error(error);
    }
  },
  testRun: async (data) => {
    try {
      await testRunFn(data);
    } catch (error) {
      // handle error
      console.error(error);
    }
  },
  registerHook,
  unregisterHook,
};

export default defineTrigger(triggerDescriptor);
