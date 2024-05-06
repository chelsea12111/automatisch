const refreshToken = async ($) => {
  const params = {
    client_id: $.auth.data.clientId,
    client_secret: $.auth.data.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: $.auth.data.refreshToken,
  };

  try {
    const { data } = await $.http.post('/v3/oauth/token', null, { params });
    const {
      access_token,
      expires_in,
      expires_at,
      token_type,
      refresh_token,
    } = data;

    await $.auth.set({
      accessToken: access_token,
      expiresIn: expires_in,
      expiresAt: expires_at,
      tokenType: token_type,
      refreshToken: refresh_token,
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the function
    console.error('An error occurred while refreshing the token:', error);
  }
};

export default refreshToken;

