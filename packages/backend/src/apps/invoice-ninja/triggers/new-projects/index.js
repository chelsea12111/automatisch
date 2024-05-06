import { defineTrigger, TriggerItem, TriggerTestRun, TriggerRun, TriggerRegisterHook, TriggerUnregisterHook } from 'your-flow-sdk';
import { nanoid } from 'nanoid';
import axios from 'axios';
import omit from 'lodash/omit.js';

export default defineTrigger<
  TriggerRun<{ raw: unknown }>,
  TriggerTestRun,
  TriggerRegisterHook,

