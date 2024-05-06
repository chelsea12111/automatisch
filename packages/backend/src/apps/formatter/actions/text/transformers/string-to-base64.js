const stringToBase64 = (input) => {
  if (!input) {
    throw new Error('Input is required');
  }

  const base64String = Buffer.from(input).toString('base64');

  return base64String;
};

module.exports = stringToBase64;
