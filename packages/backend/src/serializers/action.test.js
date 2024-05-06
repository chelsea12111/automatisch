import { describe, it, expect } from 'vitest';
import App from '../models/app';
import actionSerializer from './action';

describe('actionSerializer', () => {
  let app;
  let actions;
  let action;
  let expectedPayload;

  beforeEach(async () => {
    app = new App();
    actions = await app.findActionsByKey('github');
    action = actions[0];

    expectedPayload = {
      description: action.description,
      key: action.key,
      name: action.name,
      pollInterval: action.pollInterval,
      showWebhookUrl: action.showWebhookUrl,
      type: action.type,
    };
  });

  it('should return the action data', () => {
    expect(actionSerializer(action)).toEqual(expectedPayload);
  });
});
