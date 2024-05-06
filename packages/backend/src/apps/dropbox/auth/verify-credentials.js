import getCurrentAccount from '../common/get-current-account.js';

const verifyCredentials = async ($) => {
  // Find the oAuthRedirectUrl field
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field) => field.key === 'oAuthRedirectUrl'
  );

  // Validate the redirect URL
  if (!oauthRedirectUrlField || !oauthRedirectUrlField.value) {
    throw new Error('Missing oAuthRedirectUrl');
  }

  const redirectUrl = oauthRedirectUrlField.value;

  // Define the parameters for the OAuth2 token request
  const params = {
    client_id: $.auth.data.clientId,
    redirect_uri: redirectUrl,
    client_secret: $.auth.data.clientSecret,
    code: $.auth.data.code,
    grant_type: 'authorization_code',
  };

  try {
    // Send the OAuth2 token request
    const { data } = await $.http.post('/oauth2/token', null, { params });

    // Check if the response data has the expected properties
    const expectedProperties = [
      'access_token',
      'refresh_token',
      'expires_in',
      'scope',
      'token_type',
      'account_id',
      'team_id',
      'id_token',
      'uid',
    ];

    for (const property of expectedProperties) {
      if (!data.hasOwnProperty(property)) {
        throw new Error(`Missing property "${property}" in response data`);
      }
    }

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      scope: scope,
      token_type: tokenType,
      account_id: accountId,
      team_id: teamId,
      id_token: idToken,
      uid,
    } = data;

    // Set the authentication data
    await $.auth.set({
      accessToken,
      refreshToken,
      expiresIn,
      scope,
      tokenType,
      accountId,
      teamId,
      idToken,
      uid,
    });

    // Get the current account
    const account = await getCurrentAccount($);

    // Set the account data
    await $.auth.set({
      accountId: account.account_id,
      name: {
        givenName: account.name.given_name,
        surname: account.name.surname,
        familiarName: account.name.familiar_name,
        displayName: account.name.display_name,
        abbreviatedName: account.name.abbreviated_name,
      },
      email: account.email,
      emailVerified: account.email_verified,
      disabled: account.disabled,
      country: account.country,
      locale: account.locale,
      referralLink: account.referral_link,
      isPaired: account.is_paired,
      accountType: {
        '.tag': account.account_type['.tag'],
      },
      rootInfo: {
        '.tag': account.root_info['.tag'],
        rootNamespaceId: account.root_info.root_namespace_id,
        homeNamespaceId: account.root_info.home_namespace_id,
      },
      screenName: `${account.name.display_name} - ${account.email}`,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    throw error;
  }
};

export default verifyCredentials;
