import { URLSearchParams } from 'url';
import scopes from '../common/scopes.js';

export default async function generateAuthUrl($) {
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field) => field.key === 'oAuthRedirectUrl'
  );

  if (!oauthRedirectUrlField) {
    throw new Error('OAuth redirect URL field not found');
  }

  const callbackUrl = oauthRedirectUrlField.value;

  if (!callbackUrl) {
    throw new Error('OAuth redirect URL is not set');
  }

  const searchParams = new URLSearchParams({
    client_id: $.auth.data.clientId,
    redirect_uri: callbackUrl,
    scope: scopes.join(' '),
  });

  const authUrl = `https://app.hubspot.com/oauth/authorize?${searchParams.toString()}`;

  await $.auth.set({ authUrl });
}

