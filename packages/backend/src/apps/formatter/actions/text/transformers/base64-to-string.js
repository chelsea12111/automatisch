const base64ToString = (input) => {
  if (!input) {
    throw new Error('Input parameter is required');
  }

  const decodedString = Buffer.from(input, 'base64').toString('utf8');

  return decodedString;
};

module.exports = base64ToString;
