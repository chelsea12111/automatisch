const verifyCredentials = async ($) => {
  const params = {
    client_id: $.auth.data.clientId,
    client_secret: $.auth.data.clientSecret,
    code: $.auth.data.code,
    grant_type: 'authorization_code',
  };

  try {
    const {
      data: {
        access_token,
        refresh_token,
        token_type,
        athlete: { id: athleteId, firstname: firstname, lastname: lastname },
      },
    } = await $.http.post('/v3/oauth/token', null, { params });

    $.auth.set({
      accessToken: access_token,
      refreshToken: refresh_token,
      tokenType: token_type,
      athleteId,
      screenName: `${firstname} ${lastname}`,
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the function
    console.error(error);
  }
};

export default verifyCredentials;
