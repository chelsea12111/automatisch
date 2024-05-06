const useDefaultValue = ({$step: {parameters: {input, defaultValue}}}) => {
  if (input) {
    input = input.trim();
    if (input.length > 0) {
      return input;
    }
  }

  return defaultValue;
};

export default useDefaultValue;
