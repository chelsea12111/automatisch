const encodeUriComponent = (input) => {
  const encodedString = encodeURIComponent(input);

  return encodedString;
};

module.exports = encodeUriComponent;


const encodeUriComponent = (input: string): string => {
  const encodedString = encodeURIComponent(input);

  return encodedString;
};

const input = 'hello world';
const output = encodeUriComponent(input);

console.log(output); // Output: hello%20world
