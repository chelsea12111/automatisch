import qs from 'qs';

export default async function generateAuthUrl({ app: { auth: { fields } } }) {
  const oauthRedirectUrlField = fields.find(field => field.key === 'oAuthRedirectUrl');
  if (!oauthRedirectUrlField) {
    throw new Error('Missing oAuthRedirectUrl field');
  }

  const redirectUri = oauthRedirectUrlField.value;
  const searchParams = qs.stringify({
    client_id: $.auth.data.consumerKey,
    redirect_uri: redirectUri,
    response_type: 'code',
  });

  await $.auth.set({
    url: `${$.auth.data.oauth2Url}/authorize?${searchParams}`,
  });
}

