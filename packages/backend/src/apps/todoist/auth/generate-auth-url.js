import { URLSearchParams } from 'url';

export default async function generateAuthUrl({ auth: { data: { clientId } }, app: { baseUrl } }) {
  const scopes = ['data:read_write'];
  const searchParams = new URLSearchParams({
    client_id: clientId,
    scope: scopes.join(','),
  });

  const authUrl = `${baseUrl}/oauth/authorize?${searchParams.toString()}`;

  await $.auth.set({
    authUrl,
  });
}

