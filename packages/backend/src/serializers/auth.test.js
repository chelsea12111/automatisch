import { describe, it, expect } from 'vitest';
import App from '../models/app';
import authSerializer from './auth';

describe('authSerializer', () => {
  it('should return auth data', async () => {
    const authKey = 'deepl';
    const auth = await App.findAuthByKey(authKey);

    const expectedPayload = {
      fields: auth.fields,
      authenticationSteps: auth.authenticationSteps,
      reconnectionSteps: auth.reconnectionSteps,
    };

    expect(authSerializer(auth)).toEqual(expectedPayload);
  });

  // Add more tests for different scenarios if needed
});

