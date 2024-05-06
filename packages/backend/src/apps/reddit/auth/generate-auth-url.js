import { URLSearchParams } from 'url';
import authScope from '../common/auth-scope.js';

export default async function generateAuthUrl($) {
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field) => field.key === 'oAuthRedirectUrl'
  );

  if (!oauthRedirectUrlField) {
    throw new Error('Missing oAuthRedirectUrl field');
  }

  const redirectUri = oauthRedirectUrlField.value;
  const state = Math.random().toString();
  const searchParams = new URLSearchParams({
    client_id: $.auth.data.clientId,
    response_type: 'code',
    redirect_uri,
    duration: 'permanent',
    scope: authScope.join(' '),
    state,
  });

  const authUrl = new URL('https://www.reddit.com/api/v1/authorize');
  authUrl.search = searchParams.toString();

  await $.auth.set({
    url: authUrl.toString(),
    originalState: state,
  });
}
