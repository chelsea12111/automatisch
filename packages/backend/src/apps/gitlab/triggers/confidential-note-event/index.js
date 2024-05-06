import defineTrigger from '../../../../helpers/define-trigger.js';
import { GITLAB_EVENT_TYPE } from '../types.js';
import {
  getRegisterHookFn,
  getRunFn,
  getTestRunFn,
  projectArgumentDescriptor,
  unregisterHook,
} from '../lib.js';

import data from './note_event.js';

const triggerDescriptor = {
  name: 'Confidential comment event',
  description: 'Confidential comment event (triggered when a new confidential comment is made on commits, merge requests, issues, and code snippets)',
  key: GITLAB_EVENT_TYPE.confidential_note_events,
  type: 'webhook',
  arguments: [projectArgumentDescriptor],
  run: ($) => {
    return getRunFn($);
  },
  testRun: (eventData) => getTestRunFn(data, eventData),
  registerHook: (project) => getRegisterHookFn(GITLAB_EVENT_TYPE.confidential_note_events)(project),
  unregisterHook,
};

export default defineTrigger(triggerDescriptor);

