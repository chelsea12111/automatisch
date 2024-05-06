import axios from 'axios';

export default async function getIncomingPhoneNumber({ step, auth }) {
  const phoneNumberSid = step.parameters.phoneNumberSid;
  const accountSid = auth.data.accountSid;
  const path = `/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers/${phoneNumberSid}.json`;

  try {
    const response = await axios.get(path, {
      auth: {
        username: accountSid,
        password: auth.data.authToken,
      },
    });

    return response.data;
  } catch (error) {
    // Handle error here
    console.error(error);
    throw error;
  }
}
